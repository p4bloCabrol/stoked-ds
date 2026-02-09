import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonGroupProps } from './ButtonGroup.types';
import styles from './ButtonGroup.module.css';

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ options, value, onChange, size = 'md', className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(styles.group, className)}
        data-size={size}
        {...rest}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={styles.button}
            data-active={option.value === value || undefined}
            onClick={() => onChange(option.value)}
            aria-pressed={option.value === value}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
export { ButtonGroup };
