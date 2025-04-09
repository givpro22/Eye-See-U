// src/mediapipe/faceLandmarker.ts
import {
    FilesetResolver,
    FaceLandmarker,
  } from '@mediapipe/tasks-vision';
  
  let faceLandmarker: FaceLandmarker | null = null;
  
  export const getFaceLandmarker = async (): Promise<FaceLandmarker> => {
    if (faceLandmarker) return faceLandmarker;
  
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
  
    faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/face_landmarker.task',
        delegate: 'GPU',
      },
      outputFaceBlendshapes: false,
      outputFacialTransformationMatrixes: false,
      numFaces: 1,
    });
  
    return faceLandmarker;
  };
  