import React, { useEffect, useRef } from 'react';

type Props = {
  gaze: { x: number; y: number } | null;
};

const WebcamOverlay: React.FC<Props> = ({ gaze }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    };

    initCamera();
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 w-40 h-28 rounded-lg overflow-hidden shadow-lg border border-gray-300 z-50 bg-black relative">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
      />
      {gaze && (
        <div
          className="absolute w-3 h-3 bg-red-500 rounded-full pointer-events-none transition-all duration-75"
          style={{
            left: `${gaze.x * 100}%`,
            top: `${gaze.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  );
};

export default WebcamOverlay;
