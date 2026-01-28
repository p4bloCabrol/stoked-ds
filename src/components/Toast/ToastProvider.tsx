import { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext } from './ToastContext';
import { ToastItem } from './ToastItem';
import type { Toast, ToastOptions, ToastProviderProps } from './Toast.types';
import styles from './Toast.module.css';

let toastCount = 0;

function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const toast = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${++toastCount}`;
      const duration = options.duration ?? 5000;

      const newToast: Toast = {
        id,
        status: 'info',
        isClosable: true,
        ...options,
        duration,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Remove oldest if exceeding maxToasts
        if (updated.length > maxToasts) {
          const removed = updated.shift();
          if (removed) {
            const timer = timersRef.current.get(removed.id);
            if (timer) {
              clearTimeout(timer);
              timersRef.current.delete(removed.id);
            }
          }
        }
        return updated;
      });

      // Auto dismiss
      if (duration > 0) {
        const timer = setTimeout(() => {
          removeToast(id);
        }, duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [maxToasts, removeToast]
  );

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, removeToast, removeAllToasts }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div className={styles.container} data-position={position}>
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = 'ToastProvider';
export { ToastProvider };
