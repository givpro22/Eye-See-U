// src/models/runAffNet.ts
import * as ort from 'onnxruntime-web';

let session: ort.InferenceSession | null = null;

export const loadAffNetModel = async () => {
  if (!session) {
    session = await ort.InferenceSession.create('/models/affnet.onnx');
  }
  return session;
};

/**
 * ImageData (canvas 기반) → Float32Array로 변환
 * @param imageData ImageData
 * @param size [width, height]
 * @returns Float32Array with shape [1, 3, H, W]
 */
const preprocessImage = (imageData: ImageData, size: [number, number]): Float32Array => {
  const [width, height] = size;
  const { data } = imageData;
  const floatData = new Float32Array(1 * 3 * height * width);

  for (let i = 0; i < height * width; i++) {
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;

    floatData[i] = r;                         // Red
    floatData[height * width + i] = g;        // Green
    floatData[2 * height * width + i] = b;    // Blue
  }

  return floatData;
};

export const runAffNet = async (
  leftEye: ImageData,
  rightEye: ImageData,
  face: ImageData,
  rects: number[] // [12]
): Promise<{ x: number; y: number }> => {
  const session = await loadAffNetModel();

  const leftEyeTensor = new ort.Tensor('float32', preprocessImage(leftEye, [112, 112]), [1, 3, 112, 112]);
  const rightEyeTensor = new ort.Tensor('float32', preprocessImage(rightEye, [112, 112]), [1, 3, 112, 112]);
  const faceTensor = new ort.Tensor('float32', preprocessImage(face, [224, 224]), [1, 3, 224, 224]);
  const rectsTensor = new ort.Tensor('float32', Float32Array.from(rects), [1, 12]);

  const feeds: Record<string, ort.Tensor> = {
    leftEyeImg: leftEyeTensor,
    rightEyeImg: rightEyeTensor,
    faceImg: faceTensor,
    rects: rectsTensor,
  };

  const results = await session.run(feeds);
  const output = results.gaze; // 모델 출력 이름이 'gaze'라고 가정

  const [x, y] = output.data as Float32Array;
  return { x, y };
};
