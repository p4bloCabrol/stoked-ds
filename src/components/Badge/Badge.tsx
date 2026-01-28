import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { BadgeProps } from './Badge.types';
import styles from './Badge.module.css';

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'solid',
      color = 'primary',
      size = 'md',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(styles.badge, className)}
        data-variant={variant}
        data-color={color}
        data-size={size}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export { Badge };
