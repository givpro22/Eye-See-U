import { useEffect, useRef } from 'react';

type UseGazeHoldProps = {
  targetRef: React.RefObject<HTMLElement>;
  gazePos: { x: number; y: number } | null;
  holdTimeMs?: number;
  onHoldComplete: () => void;
};

export function useGazeHold({
  targetRef,
  gazePos,
  holdTimeMs = 3000,
  onHoldComplete,
}: UseGazeHoldProps) {
  const holdStartTimeRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!gazePos || !targetRef.current) return;

    const rect = targetRef.current.getBoundingClientRect();
    const { x, y } = gazePos;

    const inTarget =
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom;

    if (inTarget) {
      if (!holdStartTimeRef.current) {
        holdStartTimeRef.current = performance.now();
      } else {
        const elapsed = performance.now() - holdStartTimeRef.current;
        if (elapsed >= holdTimeMs && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          onHoldComplete();
        }
      }
    } else {
      holdStartTimeRef.current = null;
      hasTriggeredRef.current = false;
    }
  }, [gazePos, targetRef, holdTimeMs, onHoldComplete]);
}