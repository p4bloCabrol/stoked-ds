import { forwardRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import { useControllable } from '../../utils/useControllable';
import type { SwitchProps } from './Switch.types';
import styles from './Switch.module.css';

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      size = 'md',
      disabled,
      className,
      id: providedId,
      name,
      value,
      ...rest
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = useControllable(
      controlledChecked,
      defaultChecked,
      onCheckedChange
    );

    const generatedId = useId('switch');
    const id = providedId || generatedId;
    const descriptionId = description ? `${id}-description` : undefined;

    const handleClick = useCallback(() => {
      if (!disabled) {
        setIsChecked(!isChecked);
      }
    }, [disabled, isChecked, setIsChecked]);

    return (
      <div
        className={cn(styles.wrapper, className)}
        data-size={size}
        data-disabled={disabled || undefined}
      >
        <button
          ref={ref}
          type="button"
          role="switch"
          id={id}
          aria-checked={isChecked}
          aria-describedby={descriptionId}
          disabled={disabled}
          onClick={handleClick}
          className={styles.switch}
          data-checked={isChecked || undefined}
          {...rest}
        >
          <span className={styles.thumb} />
        </button>
        {name && (
          <input
            type="hidden"
            name={name}
            value={isChecked ? (value || 'on') : ''}
          />
        )}
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

Switch.displayName = 'Switch';
export { Switch };
