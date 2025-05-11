import React, { useRef, useEffect, useState } from 'react';
import { useGaze } from '../contexts/GazeContext';

function WebcamOverlay() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gazeResult } = useGaze();
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!gazeResult || gazeResult.length !== 2) return;

    const [gx, gy] = gazeResult;

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const normalizedX = Math.max(0, Math.min(1, gx));
    const normalizedY = Math.max(0, Math.min(1, (gy + 8) / 8));

    const x = normalizedX * screenW;
    const y = normalizedY * screenH;

    setCursorPos({ x, y });
  }, [gazeResult]);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        playsInline
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      {cursorPos && (
        <div
          className="absolute z-50 w-6 h-6 bg-red-500 rounded-full opacity-70 pointer-events-none"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
          }}
        />
      )}
      {gazeResult && (
        <div className="fixed bottom-4 left-4 bg-black text-white text-sm px-4 py-2 rounded z-50">
          보정된 시선: X {(Math.max(0, Math.min(1, gazeResult[0]))).toFixed(3)}, 
          Y {(Math.max(0, Math.min(1, (gazeResult[1] + 8) / 8))).toFixed(3)}
        </div>
      )}
    </>
  );
}

export default WebcamOverlay;