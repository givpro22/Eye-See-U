import { useRef } from 'react';
import { useGaze } from '../../contexts/GazeContext';
import { useGazeHold } from '../../hooks/useGazeHold';

type Props = {
  children: React.ReactNode;
  holdTimeMs?: number;
  onHold: () => void;
};

const FocusableGazeWrapper = ({ children, holdTimeMs = 5000, onHold }: Props) => {
  const ref = useRef<any>(null);
  const { cursorPos } = useGaze();

  useGazeHold({
    targetRef: ref,
    gazePos: cursorPos,
    holdTimeMs,
    onHoldComplete: onHold,
  });

  return <div ref={ref} style={{ display: 'contents' }}>{children}</div>;
};

export default FocusableGazeWrapper;