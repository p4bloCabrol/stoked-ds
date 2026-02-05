import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import type { SpinnerProps } from './Spinner.types';
import styles from './Spinner.module.css';

const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      size = 'md',
      color = 'primary',
      label = 'Loading',
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn(styles.spinner, className)}
        data-size={size}
        data-color={color}
        {...rest}
      >
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          className={styles.svg}
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.25"
          />
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={styles.circle}
            animate={{
              strokeDasharray: ['1 62.8', '31.4 31.4', '1 62.8'],
              strokeDashoffset: [0, -15.7, -62.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'loop',
            }}
          />
        </motion.svg>
        <span className={styles.srOnly}>{label}</span>
      </span>
    );
  }
);

Spinner.displayName = 'Spinner';
export { Spinner };
