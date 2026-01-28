import { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';
import type { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.css';

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      size = 'md',
      status,
      onError,
      className,
      ...rest
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);
    const showImage = src && !hasError;

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    const getInitials = (text: string): string => {
      return text
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <span
        ref={ref}
        className={cn(styles.avatar, className)}
        data-size={size}
        role="img"
        aria-label={alt || fallback || 'Avatar'}
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className={styles.image}
            onError={handleError}
          />
        ) : (
          <span className={styles.fallback} aria-hidden="true">
            {fallback ? getInitials(fallback) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.icon}
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </span>
        )}
        {status && (
          <span
            className={styles.status}
            data-status={status}
            aria-label={status}
          />
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
export { Avatar };
