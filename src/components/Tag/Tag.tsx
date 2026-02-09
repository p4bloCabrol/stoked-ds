import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { TagProps } from './Tag.types';
import styles from './Tag.module.css';

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      color = 'neutral',
      variant = 'solid',
      size = 'md',
      removable = false,
      onRemove,
      icon,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(styles.tag, className)}
        data-color={color}
        data-variant={variant}
        data-size={size}
        {...rest}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        <span className={styles.label}>{children}</span>
        {removable && (
          <button
            type="button"
            className={styles.remove}
            onClick={onRemove}
            aria-label="Remove"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
export { Tag };
