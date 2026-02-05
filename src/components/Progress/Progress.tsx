import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { ProgressProps } from './Progress.types';
import styles from './Progress.module.css';

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      size = 'md',
      color = 'primary',
      showValue = false,
      indeterminate = false,
      animated = false,
      label,
      className,
      ...rest
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        aria-valuetext={indeterminate ? undefined : `${Math.round(percentage)}%`}
        className={cn(styles.wrapper, className)}
        data-size={size}
        {...rest}
      >
        <div className={styles.track}>
          {indeterminate ? (
            <motion.div
              className={styles.bar}
              data-color={color}
              data-indeterminate
              style={{ width: '50%' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'loop',
              }}
            />
          ) : animated ? (
            <div
              className={styles.bar}
              data-color={color}
              data-animated
              style={{ width: `${percentage}%` }}
            />
          ) : (
            <div
              className={styles.bar}
              data-color={color}
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
        {showValue && !indeterminate && (
          <span className={styles.value}>{Math.round(percentage)}%</span>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';
export { Progress };
