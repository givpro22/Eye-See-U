import { useRef } from 'react';
import { useGaze } from '../../contexts/GazeContext';
import { useGazeHold } from '../../hooks/useGazeHold';

type Props = {
  children: React.ReactNode;
  holdTimeMs?: number;
  onHold: () => void;
};

const FocusableGazeWrapper = ({ children, holdTimeMs = 1000, onHold }: Props) => {
  const ref = useRef<any>(null);
  const { cursorPos } = useGaze();

  useGazeHold({
    targetRef: ref,
    gazePos: cursorPos,
    holdTimeMs,
    onHoldComplete: () => {
      console.log('👁️ Gaze hold triggered');
      console.log('✅ Element bounding box:', ref.current?.getBoundingClientRect());
      onHold();
    },
  });

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {children}
    </div>
  );

};

export default FocusableGazeWrapper;