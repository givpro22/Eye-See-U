import { useRef, useState, useEffect } from 'react';
import { useGaze } from '../../contexts/GazeContext';
import { useGazeHold } from '../../hooks/useGazeHold';

type Props = {
  children: React.ReactNode;
  holdTimeMs?: number;
  onHold: () => void;
};

const FocusableGazeWrapper = ({ children, holdTimeMs = 2000, onHold }: Props) => {
  const ref = useRef<any>(null);
  const { cursorPos } = useGaze();

  // Track if gaze is inside the element
  const [isGazeInside, setIsGazeInside] = useState(false);
  const [remainingTime, setRemainingTime] = useState((holdTimeMs / 1000).toFixed(1));
  // Track previous inside status to reset timer
  const prevInsideRef = useRef<boolean>(false);

  useGazeHold({
    targetRef: ref,
    gazePos: cursorPos,
    holdTimeMs,
    onHoldComplete: () => {
      console.log('👁️ Gaze hold triggered');
      console.log('✅ Element bounding box:', ref.current?.getBoundingClientRect());
      onHold();
    },
    onGazeEnter: () => setIsGazeInside(true),
    onGazeLeave: () => setIsGazeInside(false),
  });

  // Determine if gaze is inside the element
  useEffect(() => {
    if (!ref.current || !cursorPos) {
      setIsGazeInside(false);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const inside =
      cursorPos.x >= rect.left &&
      cursorPos.x <= rect.right &&
      cursorPos.y >= rect.top &&
      cursorPos.y <= rect.bottom;
    setIsGazeInside(inside);
  }, [cursorPos]);

  // Countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let startTime = Date.now();
    if (isGazeInside) {
      setRemainingTime((holdTimeMs / 1000).toFixed(1));
      startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, holdTimeMs - elapsed);
        setRemainingTime((remaining / 1000).toFixed(1));
      }, 100);
    } else {
      setRemainingTime((holdTimeMs / 1000).toFixed(1));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGazeInside, holdTimeMs]);

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
      <div style={{         display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'}}>
        {children}
        {isGazeInside && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: '2px 6px',
              backgroundColor: 'rgba(255,0,0,0.7)',
              color: '#fff',
              fontSize: '0.75rem',
              borderRadius: '0 0 0 5px',
              zIndex: 10,
            }}
          >
            {remainingTime}s
          </div>
        )}
      </div>
    </div>
  );

};

export default FocusableGazeWrapper;