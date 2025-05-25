import React, { createContext, useContext, useState } from 'react';

type Gaze = [number, number];

interface CalibrationContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  saveGaze: (step: number, gaze: Gaze) => void;
  getAverages: () => (Gaze | null)[];
}

const CalibrationContext = createContext<CalibrationContextType>({
  currentStep: 0,
  setCurrentStep: () => {},
  saveGaze: () => {},
  getAverages: () => [],
});

export const useCalibration = () => useContext(CalibrationContext);

export const CalibrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const gazeLogs = useState<Gaze[][]>([[], [], [], [], []])[0];

  const saveGaze = (step: number, gaze: Gaze) => {
    if (step >= 0 && step < gazeLogs.length) {
      gazeLogs[step].push(gaze);
    }
  };

  const getAverages = (): (Gaze | null)[] => {
    return gazeLogs.map(logs => {
      if (logs.length === 0) return null;
      const sum = logs.reduce(
        (acc, val) => [acc[0] + val[0], acc[1] + val[1]],
        [0, 0]
      );
      return [sum[0] / logs.length, sum[1] / logs.length];
    });
  };

  return (
    <CalibrationContext.Provider value={{ currentStep, setCurrentStep, saveGaze, getAverages }}>
      {children}
    </CalibrationContext.Provider>
  );
};