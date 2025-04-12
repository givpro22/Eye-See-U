import React, { useEffect, useRef } from 'react';
import { initializeFaceMesh } from '../mediapipe/faceLandmarker';
import { cropRegionsFromLandmarks } from '../processors/cropEyeRegions';
import { runAffNet } from '../models/runAffNet';

type Props = {
  onGazeUpdate?: (gaze: { x: number; y: number }) => void;
};

const WebcamManager: React.FC<Props> = ({ onGazeUpdate }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    initializeFaceMesh(videoRef.current, async (landmarks) => {
      try {
        const { leftEye, rightEye, face, rects } = cropRegionsFromLandmarks(videoRef.current!, landmarks);
        const gaze = await runAffNet(leftEye, rightEye, face, rects);
        onGazeUpdate?.(gaze);
      } catch (err) {
        console.warn('시선 추정 실패:', err);
      }
    });

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return <video ref={videoRef} className="hidden" autoPlay muted playsInline />;
};

export default WebcamManager;
