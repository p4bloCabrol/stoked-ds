import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import type { SelectProps } from './Select.types';
import styles from './Select.module.css';

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      placeholder,
      options,
      required,
      fullWidth,
      disabled,
      className,
      id: providedId,
      children,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId('select');
    const id = providedId || generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const hasError = Boolean(error);
    const describedBy = [
      helperText && !hasError ? helperId : null,
      hasError ? errorId : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        className={cn(styles.wrapper, className)}
        data-size={size}
        data-error={hasError || undefined}
        data-disabled={disabled || undefined}
        data-full-width={fullWidth || undefined}
      >
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy || undefined}
            className={styles.select}
            {...rest}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>
          <span className={styles.icon} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
        {helperText && !hasError && (
          <span id={helperId} className={styles.helperText}>
            {helperText}
          </span>
        )}
        {hasError && (
          <span id={errorId} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export { Select };
