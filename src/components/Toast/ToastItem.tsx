import { forwardRef, useCallback, useEffect, useRef } from 'react';
import type { Toast, ToastStatus } from './Toast.types';
import styles from './Toast.module.css';

const statusIcons: Record<ToastStatus, JSX.Element> = {
  info: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
};

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
  onExitComplete: () => void;
}

const ToastItem = forwardRef<HTMLDivElement, ToastItemProps>(function ToastItem(
  { toast, onClose, onExitComplete },
  ref
) {
  const { title, description, status = 'info', isClosable, icon, _exiting } = toast;
  const exitedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (!exitedRef.current) {
      exitedRef.current = true;
      onExitComplete();
    }
  }, [onExitComplete]);

  const handleAnimationEnd = useCallback(
    (e: React.AnimationEvent) => {
      if (_exiting && e.animationName) {
        handleComplete();
      }
    },
    [_exiting, handleComplete]
  );

  // Safety timeout for environments where animationend doesn't fire
  useEffect(() => {
    if (_exiting) {
      const timer = setTimeout(handleComplete, 250);
      return () => clearTimeout(timer);
    }
  }, [_exiting, handleComplete]);

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="polite"
      className={styles.toast}
      data-status={status}
      data-state={_exiting ? 'exiting' : 'entered'}
      onAnimationEnd={handleAnimationEnd}
    >
      <span className={styles.icon}>{icon || statusIcons[status]}</span>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {isClosable && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close notification"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      )}
    </div>
  );
});

ToastItem.displayName = 'ToastItem';
export { ToastItem };
