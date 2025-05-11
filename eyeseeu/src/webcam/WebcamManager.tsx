import * as ort from 'onnxruntime-web';
import { useEffect, useRef, useState } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import { useGaze } from '../contexts/GazeContext';





const LEFT_EYE_INDEXES = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7, 130, 247, 30, 29, 27, 28, 56, 190, 243, 112, 26, 22, 23, 24, 110, 25];
const RIGHT_EYE_INDEXES = [362, 398, 384, 385, 386, 387, 388, 466, 263, 249, 390, 373, 374, 380, 381, 382, 463, 414, 286, 258, 257, 259, 260, 467, 359, 255, 339, 254, 253, 252, 256, 341];

const getBoundingBox = (landmarks: any[], indexes: number[], width: number, height: number) => {
  const points = indexes.map(i => {
    const x = landmarks[i].x * width;
    const y = landmarks[i].y * height;
    return [x, y];
  });
  const xs = points.map(p => p[0]);
  const ys = points.map(p => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
};

const WebcamManager = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { gazeResult, setGazeResult } = useGaze();

  const sessionRef = useRef<ort.InferenceSession | null>(null);

  useEffect(() => {
    ort.InferenceSession.create('/affnet.onnx').then(session => {
      sessionRef.current = session;
    });
  }, []);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

 
  

    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;

    

    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      canvasCtx.save();
      const width = canvasRef.current!.width;
      const height = canvasRef.current!.height;
      canvasCtx.clearRect(0, 0, width, height);

      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          // Draw landmarks
          for (const landmark of landmarks) {
            const x = landmark.x * width;
            const y = landmark.y * height;
            canvasCtx.beginPath();
            canvasCtx.arc(x, y, 3.5, 0, 2 * Math.PI);
            canvasCtx.fillStyle = 'lime';
            canvasCtx.fill();
            canvasCtx.strokeStyle = 'black';
            canvasCtx.lineWidth = 1;
            canvasCtx.stroke();
          }

          // Eye bounding boxes
          const leftEyeBox = getBoundingBox(landmarks, LEFT_EYE_INDEXES, width, height);
          const rightEyeBox = getBoundingBox(landmarks, RIGHT_EYE_INDEXES, width, height);

          canvasCtx.strokeStyle = 'blue';
          canvasCtx.lineWidth = 2;
          canvasCtx.strokeRect(leftEyeBox.x, leftEyeBox.y, leftEyeBox.width, leftEyeBox.height);
          canvasCtx.strokeStyle = 'red';
          canvasCtx.strokeRect(rightEyeBox.x, rightEyeBox.y, rightEyeBox.width, rightEyeBox.height);

          // === Face bounding box and face grid vector ===
          // All face points (468)
          const allPoints = landmarks.map(lm => {
            const x = lm.x * width;
            const y = lm.y * height;
            return [x, y];
          });
          const faceBox = getBoundingBox(landmarks, Array.from({ length: 468 }, (_, i) => i), width, height);

          // Draw face box in orange
          canvasCtx.strokeStyle = 'orange';
          canvasCtx.strokeRect(faceBox.x, faceBox.y, faceBox.width, faceBox.height);

          // rects: [faceW, faceH, faceX, faceY, leftW, leftH, leftX, leftY, rightW, rightH, rightX, rightY]
          const leftX = leftEyeBox.x / width;
          const leftY = leftEyeBox.y / height;
          const leftW = leftEyeBox.width / width;
          const leftH = leftEyeBox.height / height;

          const rightX = rightEyeBox.x / width;
          const rightY = rightEyeBox.y / height;
          const rightW = rightEyeBox.width / width;
          const rightH = rightEyeBox.height / height;

          const faceX = faceBox.x / width;
          const faceY = faceBox.y / height;
          const faceW = faceBox.width / width;
          const faceH = faceBox.height / height;

          const rects = [
            faceW, faceH, faceX, faceY,
            leftW, leftH, leftX, leftY,
            rightW, rightH, rightX, rightY
          ];
          // Log 12-dim face grid

          // === ONNX inference ===
          // Helper to extract region from video
          const extractRegion = (box: any) => {
            const canvas = document.createElement('canvas');
            canvas.width = box.width;
            canvas.height = box.height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(
              videoRef.current!,
              box.x,
              box.y,
              box.width,
              box.height,
              0,
              0,
              box.width,
              box.height
            );
            return ctx.getImageData(0, 0, box.width, box.height);
          };

          // Preprocess to Float32Array CHW
          const preprocess = (imageData: ImageData, width: number, height: number) => {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d')!;
            ctx.putImageData(imageData, 0, 0);
            const resized = ctx.getImageData(0, 0, width, height).data;
            const floatArray = new Float32Array(3 * width * height);
            for (let i = 0; i < width * height; i++) {
              floatArray[i] = resized[i * 4] / 255.0;
              floatArray[i + width * height] = resized[i * 4 + 1] / 255.0;
              floatArray[i + 2 * width * height] = resized[i * 4 + 2] / 255.0;
            }
            return floatArray;
          };

          const leftEyeImg = extractRegion(leftEyeBox);
          if (!leftEyeImg || leftEyeImg.width === 0 || leftEyeImg.height === 0) {
            console.error("❌ leftEyeImg is invalid", leftEyeImg);
          }
          const rightEyeImg = extractRegion(rightEyeBox);
          // Flip right eye image horizontally
          const flipImageDataHorizontally = (imageData: ImageData): ImageData => {
            const { width, height, data } = imageData;
            const flipped = new Uint8ClampedArray(data.length);
            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                const srcIndex = (y * width + x) * 4;
                const dstIndex = (y * width + (width - 1 - x)) * 4;
                for (let i = 0; i < 4; i++) {
                  flipped[dstIndex + i] = data[srcIndex + i];
                }
              }
            }
            return new ImageData(flipped, width, height);
          };
          const flippedRightEyeImg = flipImageDataHorizontally(rightEyeImg);
          const faceImg = extractRegion(faceBox);

          const leftEyeTensor = new ort.Tensor('float32', preprocess(leftEyeImg, 112, 112), [1, 3, 112, 112]);
          const rightEyeTensor = new ort.Tensor('float32', preprocess(flippedRightEyeImg, 112, 112), [1, 3, 112, 112]);
          const faceImgTensor = new ort.Tensor('float32', preprocess(faceImg, 224, 224), [1, 3, 224, 224]);
          const rectsTensor = new ort.Tensor('float32', new Float32Array(rects), [1, 12]);

          if (sessionRef.current) {
            sessionRef.current.run({
              leftEyeImg: leftEyeTensor,
              rightEyeImg: rightEyeTensor,
              faceImg: faceImgTensor,
              rects: rectsTensor
            }).then(output => {
              const gaze = output.gaze.data;
              // console.log('Predicted gaze:', gaze);
              setGazeResult(gaze);
            });
          }
        }
      }

      canvasCtx.restore();
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          if (
            canvasRef.current!.width !== videoRef.current.videoWidth ||
            canvasRef.current!.height !== videoRef.current.videoHeight
          ) {
            canvasRef.current!.width = videoRef.current.videoWidth;
            canvasRef.current!.height = videoRef.current.videoHeight;
          }
          await faceMesh.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480,
    });
    camera.start();

    return () => {
      camera.stop();
    };

    

  }, []);

  return (
    <div className="absolute top-4 right-4 w-40 h-auto flex flex-col items-center space-y-2 z-50">
      <div className="w-32 h-32 border-2 border-gray-300 rounded-md overflow-hidden shadow-lg relative">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        {gazeResult && (
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            Gaze: [{gazeResult[0].toFixed(3)}, {gazeResult[1].toFixed(3)}]
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamManager;
