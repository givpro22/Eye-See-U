import { useEffect, useRef } from 'react';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

const WebcamManager = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          for (const landmark of landmarks) {
            const x = landmark.x * canvasRef.current.width;
            const y = landmark.y * canvasRef.current.height;

            // Draw a larger, visible dot
            canvasCtx.beginPath();
            canvasCtx.arc(x, y, 3.5, 0, 2 * Math.PI); // ★ radius = 3.5
            canvasCtx.fillStyle = 'lime'; // ★ bright green color
            canvasCtx.fill();

            // Add black outline
            canvasCtx.strokeStyle = 'black';
            canvasCtx.lineWidth = 1;
            canvasCtx.stroke();
          }
        }
      }
      canvasCtx.restore();
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          // canvas 크기를 비디오와 맞춤
          if (
            canvasRef.current.width !== videoRef.current.videoWidth ||
            canvasRef.current.height !== videoRef.current.videoHeight
          ) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
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
      </div>
    </div>
  );
};

export default WebcamManager;
