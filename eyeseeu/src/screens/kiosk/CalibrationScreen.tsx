import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CalibrationScreen = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  // Calibration sequence: [top-center, bottom-center, left-center, right-center, center]
  const calibrationPoints = [
    { left: '50%', top: '0%' },    // Top-center (actual edge)
    { left: '50%', top: '100%' },  // Bottom-center (actual edge)
    { left: '0%', top: '50%' },    // Left-center (actual edge)
    { left: '100%', top: '50%' },  // Right-center (actual edge)
    { left: '50%', top: '50%' },   // Center
  ];
  const totalSteps = calibrationPoints.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep(step + 1);
      } else {
        navigate('/kiosk/home');
      }
    }, 4000); // 4초마다 다음 점으로 이동

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Overlayed instruction text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-10">
        <h1 className="text-3xl font-bold mb-4 text-primary">시선 보정 중...</h1>
        <p className="text-lg text-gray-600 mb-8">화면의 점을 따라 시선을 움직여 주세요 ({step + 1}/{totalSteps})</p>
      </div>
      {/* Calibration points area */}
      <div className="relative w-full h-full">
        {calibrationPoints.map((point, index) => (
          <div
            key={index}
            className={`absolute transition-opacity duration-300 flex items-center justify-center ${
              step === index ? 'opacity-100' : 'opacity-30'
            }`}
            style={{
              left: point.left,
              top: point.top,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Pulsing animation behind the calibration dot */}
            {step === index && (
              <span className="absolute w-16 h-16 rounded-full bg-primary opacity-75 animate-ping" />
            )}
            {/* Main calibration dot */}
            <span className="w-16 h-16 rounded-full bg-primary block relative z-10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalibrationScreen;