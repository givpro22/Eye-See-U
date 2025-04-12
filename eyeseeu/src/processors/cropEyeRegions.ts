// src/processors/cropEyeRegions.ts
import { NormalizedLandmarkList } from '@mediapipe/face_mesh';
import { leftEyeIndexes, rightEyeIndexes, faceIndexes } from '../mediapipe/landmarkIndexes';

type BoundingBox = { x: number; y: number; width: number; height: number };

export const cropRegionsFromLandmarks = (
  video: HTMLVideoElement,
  landmarks: NormalizedLandmarkList
): {
  leftEye: ImageData;
  rightEye: ImageData;
  face: ImageData;
  rects: number[]; // 정규화된 좌표 [l_x, l_y, l_w, l_h, r_x, r_y, r_w, r_h, f_x, f_y, f_w, f_h]
} => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // 현재 프레임 복사
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // bounding box 계산
  const leftEyeBox = getBoundingBox(landmarks, leftEyeIndexes, 30);
  const rightEyeBox = getBoundingBox(landmarks, rightEyeIndexes, 30);
  const faceBox = getBoundingBox(landmarks, faceIndexes, 50);

  const leftEye = cropAndResize(ctx, leftEyeBox, 112, 112);
  const rightEye = cropAndResize(ctx, rightEyeBox, 112, 112);
  const face = cropAndResize(ctx, faceBox, 224, 224);

  const rects = [
    ...normalizeBox(leftEyeBox, canvas.width, canvas.height),
    ...normalizeBox(rightEyeBox, canvas.width, canvas.height),
    ...normalizeBox(faceBox, canvas.width, canvas.height),
  ];

  return { leftEye, rightEye, face, rects };
};

// --- 도우미 함수들 ---

const getBoundingBox = (
  landmarks: NormalizedLandmarkList,
  indexes: number[],
  padding: number
): BoundingBox => {
  const points = indexes.map((i) => landmarks[i]);

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);

  const width = maxX - minX;
  const height = maxY - minY;

  return {
    x: minX * 640 - padding,
    y: minY * 480 - padding,
    width: width * 640 + padding * 2,
    height: height * 480 + padding * 2,
  };
};

const cropAndResize = (
  ctx: CanvasRenderingContext2D,
  box: BoundingBox,
  targetW: number,
  targetH: number
): ImageData => {
  const temp = document.createElement('canvas');
  const tempCtx = temp.getContext('2d')!;
  temp.width = targetW;
  temp.height = targetH;

  tempCtx.drawImage(
    ctx.canvas,
    box.x,
    box.y,
    box.width,
    box.height,
    0,
    0,
    targetW,
    targetH
  );

  return tempCtx.getImageData(0, 0, targetW, targetH);
};

const normalizeBox = (
  box: BoundingBox,
  width: number,
  height: number
): number[] => {
  return [
    box.x / width,
    box.y / height,
    box.width / width,
    box.height / height,
  ];
};
