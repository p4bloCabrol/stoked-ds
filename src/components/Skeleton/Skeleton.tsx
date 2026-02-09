import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SkeletonProps } from './Skeleton.types';
import styles from './Skeleton.module.css';

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      animation = 'pulse',
      lines = 1,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const getStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = { ...style };

      if (width) {
        baseStyles.width = typeof width === 'number' ? `${width}px` : width;
      }

      if (height) {
        baseStyles.height = typeof height === 'number' ? `${height}px` : height;
      }

      return baseStyles;
    };

    // Multiple lines for text variant
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={cn(styles.textWrapper, className)} {...rest}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={styles.skeleton}
              data-variant={variant}
              data-animation={animation}
              style={{
                ...getStyles(),
                width: index === lines - 1 ? '80%' : width || '100%',
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(styles.skeleton, className)}
        data-variant={variant}
        data-animation={animation}
        style={getStyles()}
        {...rest}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
export { Skeleton };
