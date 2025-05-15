import { createContext, useContext, useState, ReactNode } from 'react';

interface GazeContextType {
  gazeResult: number[] | null;
  setGazeResult: (gaze: number[] | null) => void;
  cursorPos: { x: number; y: number } | null;
  setCursorPos: (pos: { x: number; y: number } | null) => void;
}

const GazeContext = createContext<GazeContextType | undefined>(undefined);

export const GazeProvider = ({ children }: { children: ReactNode }) => {
  const [gazeResult, setGazeResult] = useState<number[] | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <GazeContext.Provider value={{ gazeResult, setGazeResult, cursorPos, setCursorPos }}>
      {children}
    </GazeContext.Provider>
  );
};

export const useGaze = () => {
  const context = useContext(GazeContext);
  if (!context) {
    throw new Error('useGaze must be used within a GazeProvider');
  }
  return context;
};