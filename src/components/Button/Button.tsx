import { forwardRef, useState, useCallback, useRef, useEffect, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let rippleCount = 0;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      color = 'primary',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      type = 'button',
      ripple = false,
      onClick,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const shouldReduceMotion = useReducedMotion();
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const rippleTimersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

    // Cleanup ripple timers on unmount
    useEffect(() => {
      const timers = rippleTimersRef.current;
      return () => {
        timers.forEach((timer) => clearTimeout(timer));
        timers.clear();
      };
    }, []);

    const handleClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        if (ripple && !isDisabled && !shouldReduceMotion) {
          const button = e.currentTarget;
          const rect = button.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height) * 2;
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          const newRipple: Ripple = {
            id: ++rippleCount,
            x,
            y,
            size,
          };

          setRipples((prev) => [...prev, newRipple]);

          // Remove ripple after animation with proper cleanup
          const timer = setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
            rippleTimersRef.current.delete(newRipple.id);
          }, 600);
          rippleTimersRef.current.set(newRipple.id, timer);
        }

        onClick?.(e);
      },
      [ripple, isDisabled, shouldReduceMotion, onClick]
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(styles.button, className)}
        data-variant={variant}
        data-size={size}
        data-color={color}
        data-loading={loading || undefined}
        data-full-width={fullWidth || undefined}
        data-ripple={ripple || undefined}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        onClick={handleClick}
        {...rest}
      >
        {ripple && (
          <span className={styles.rippleContainer} aria-hidden="true">
            {ripples.map((r) => (
              <span
                key={r.id}
                className={styles.ripple}
                style={{
                  left: r.x,
                  top: r.y,
                  width: r.size,
                  height: r.size,
                }}
              />
            ))}
          </span>
        )}
        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              className={styles.spinnerIcon}
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={shouldReduceMotion ? undefined : { duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="31.4 31.4"
              />
            </motion.svg>
          </span>
        )}
        {!loading && leftIcon && (
          <span className={styles.icon} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <span className={styles.label}>{children}</span>
        {!loading && rightIcon && (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
