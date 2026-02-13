import { useState, useCallback, useRef, useEffect } from 'react';

type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

/**
 * Delays unmount of a component until its CSS exit animation finishes.
 * Replaces framer-motion's AnimatePresence pattern with pure CSS animations.
 */
export function useExitAnimation(isOpen: boolean, animationDuration = 200) {
  const [animState, setAnimState] = useState<AnimationState>(
    isOpen ? 'entered' : 'exited'
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const animStateRef = useRef(animState);
  animStateRef.current = animState;

  useEffect(() => {
    if (isOpen) {
      setAnimState('entering');
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimState('entered'));
      });
      return () => cancelAnimationFrame(raf);
    }

    const current = animStateRef.current;
    if (current === 'entered' || current === 'entering') {
      setAnimState('exiting');
      timeoutRef.current = setTimeout(
        () => setAnimState('exited'),
        animationDuration + 50
      );
    }
  }, [isOpen, animationDuration]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onAnimationEnd = useCallback(() => {
    if (animState === 'exiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setAnimState('exited');
    }
  }, [animState]);

  const shouldRender = animState !== 'exited';

  return { shouldRender, animationState: animState, onAnimationEnd };
}
