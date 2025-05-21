import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalibration } from '../../contexts/CalibrationContext';

const CalibrationScreen = () => {
  const navigate = useNavigate();
  const { currentStep: step, setCurrentStep: setStep, getAverages } = useCalibration();
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
        console.log("➡️ advancing to step", step + 1);
        setStep(step + 1);
      } else {
        setStep(step + 1);

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

      <div className="absolute bottom-4 left-4 bg-gray-100 p-4 rounded shadow-md z-20 text-sm text-gray-800">
        <h2 className="font-semibold mb-2">평균 시선 좌표 (gaze)</h2>
        {getAverages().map((avg, index) => (
          <div key={index}>
            위치 {index + 1}: {avg ? `[${avg[0].toFixed(3)}, ${avg[1].toFixed(3)}]` : '측정 안됨'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalibrationScreen;