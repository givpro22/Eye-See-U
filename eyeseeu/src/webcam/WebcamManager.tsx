// src/webcam/WebcamManager.tsx
import React, { useEffect, useRef } from 'react';
import { getFaceLandmarker } from '../mediapipe/faceLandmarker';

const WebcamManager: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let stream: MediaStream;
    let animationFrameId: number;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const faceLandmarker = await getFaceLandmarker();

        const processFrame = async () => {
          if (!videoRef.current) return;

          const results = await faceLandmarker.detectForVideo(
            videoRef.current,
            performance.now()
          );

          if (results.faceLandmarks && results.faceLandmarks.length > 0) {
            console.log('얼굴 랜드마크:', results.faceLandmarks[0]);
          }

          animationFrameId = requestAnimationFrame(processFrame);
        };

        animationFrameId = requestAnimationFrame(processFrame);
      } catch (err) {
        console.error('웹캠/MediaPipe 오류:', err);
      }
    };

    startCamera();

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hidden"
      muted
      playsInline
    />
  );
};

export default WebcamManager;
