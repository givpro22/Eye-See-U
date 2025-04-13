import { useEffect, useRef, useState } from 'react';

const WebcamManager = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        console.error('웹캠 접근 실패:', error);
      }
    };

    startWebcam();
  }, []);

  // 1초마다 이미지 캡처해서 상태 저장
  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData); // 상태에 저장 → 아래에서 화면에 보여줌
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-4 right-4 w-40 h-auto flex flex-col items-center space-y-2 z-50">
      <div className="w-32 h-32 border-2 border-gray-300 rounded-md overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />
      </div>

      {/* 캡처된 이미지 보여주기 */}
      {capturedImage && (
        <img
          src={capturedImage}
          alt="Captured"
          className="w-32 h-32 border rounded object-cover"
        />
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default WebcamManager;
