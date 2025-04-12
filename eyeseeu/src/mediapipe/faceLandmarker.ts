import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';
import type { NormalizedLandmarkList } from '@mediapipe/face_mesh';

let faceMesh: FaceMesh | null = null;
let camera: Camera | null = null;

export const initializeFaceMesh = async (
  videoElement: HTMLVideoElement,
  onLandmarks: (landmarks: NormalizedLandmarkList) => void
): Promise<void> => {
  if (!faceMesh) {
    faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks?.[0]) {
        onLandmarks(results.multiFaceLandmarks[0]);
      }
    });
  }

  if (!camera) {
    camera = new Camera(videoElement, {
      onFrame: async () => {
        if (faceMesh) {
          await faceMesh.send({ image: videoElement });
        }
      },
      width: 640,
      height: 480,
    });

    camera.start();
  }
};
