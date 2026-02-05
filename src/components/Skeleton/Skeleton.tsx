import { forwardRef } from 'react';
import { motion } from 'framer-motion';
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
      // Exclude native events that conflict with framer-motion
      onDrag: _onDrag,
      onDragStart: _onDragStart,
      onDragEnd: _onDragEnd,
      onAnimationStart: _onAnimationStart,
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

    const renderSkeleton = (customStyle?: React.CSSProperties, key?: number) => {
      const combinedStyle = { ...getStyles(), ...customStyle };

      if (animation === 'wave') {
        return (
          <div
            key={key}
            className={cn(styles.skeleton, styles.waveContainer)}
            data-variant={variant}
            style={combinedStyle}
          >
            <motion.div
              className={styles.waveShimmer}
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              }}
            />
          </div>
        );
      }

      if (animation === 'pulse') {
        return (
          <motion.div
            key={key}
            className={styles.skeleton}
            data-variant={variant}
            style={combinedStyle}
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'loop',
            }}
          />
        );
      }

      // No animation
      return (
        <div
          key={key}
          className={styles.skeleton}
          data-variant={variant}
          style={combinedStyle}
        />
      );
    };

    // Multiple lines for text variant
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={cn(styles.textWrapper, className)} {...rest}>
          {Array.from({ length: lines }).map((_, index) =>
            renderSkeleton(
              { width: index === lines - 1 ? '80%' : width || '100%' },
              index
            )
          )}
        </div>
      );
    }

    // Single skeleton with ref and className
    if (animation === 'wave') {
      return (
        <div
          ref={ref}
          className={cn(styles.skeleton, styles.waveContainer, className)}
          data-variant={variant}
          style={getStyles()}
          {...rest}
        >
          <motion.div
            className={styles.waveShimmer}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          />
        </div>
      );
    }

    if (animation === 'pulse') {
      return (
        <motion.div
          ref={ref}
          className={cn(styles.skeleton, className)}
          data-variant={variant}
          style={getStyles()}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'loop',
          }}
          {...rest}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(styles.skeleton, className)}
        data-variant={variant}
        style={getStyles()}
        {...rest}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
export { Skeleton };
