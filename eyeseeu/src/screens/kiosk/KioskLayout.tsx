import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import WebcamManager from '../../webcam/WebcamManager';
import WebcamOverlay from '../../webcam/WebcamOverlay';

const KioskLayout = () => {
  const [gaze, setGaze] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="relative w-full h-full">
      <WebcamManager onGazeUpdate={setGaze} />   {/* 시선 좌표 추적 */}
      <WebcamOverlay gaze={gaze} />              {/* 시선 포인터 표시 */}
      <Outlet />
    </div>
  );
};

export default KioskLayout;
