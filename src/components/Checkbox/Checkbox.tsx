import { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';
import { mergeRefs } from '../../utils/mergeRefs';
import { useId } from '../../utils/useId';
import type { CheckboxProps } from './Checkbox.types';
import styles from './Checkbox.module.css';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      size = 'md',
      indeterminate = false,
      error = false,
      disabled,
      className,
      id: providedId,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const generatedId = useId('checkbox');
    const id = providedId || generatedId;
    const descriptionId = description ? `${id}-description` : undefined;

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <div
        className={cn(styles.wrapper, className)}
        data-size={size}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
      >
        <div className={styles.checkboxWrapper}>
          <input
            ref={mergeRefs(ref, internalRef)}
            type="checkbox"
            id={id}
            disabled={disabled}
            aria-describedby={descriptionId}
            aria-invalid={error || undefined}
            className={styles.input}
            {...rest}
          />
          <div className={styles.checkbox} aria-hidden="true">
            <svg viewBox="0 0 12 12" fill="none" className={styles.checkIcon}>
              {indeterminate ? (
                <path
                  d="M2.5 6h7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </div>
        </div>
        {(label || description) && (
          <div className={styles.content}>
            {label && (
              <label htmlFor={id} className={styles.label}>
                {label}
              </label>
            )}
            {description && (
              <span id={descriptionId} className={styles.description}>
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export { Checkbox };
