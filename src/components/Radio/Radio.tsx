import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../utils/useId';
import { useRadioContext } from './RadioContext';
import type { RadioProps } from './Radio.types';
import styles from './Radio.module.css';

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      label,
      description,
      size: sizeProp,
      disabled: disabledProp,
      className,
      id: providedId,
      onChange,
      ...rest
    },
    ref
  ) => {
    const context = useRadioContext();
    const generatedId = useId('radio');
    const id = providedId || generatedId;
    const descriptionId = description ? `${id}-description` : undefined;

    const size = sizeProp || context?.size || 'md';
    const disabled = disabledProp || context?.disabled || false;
    const name = context?.name || rest.name;
    const isChecked = context ? context.value === value : rest.checked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (context) {
        context.onChange(value);
      }
      onChange?.(e);
    };

    return (
      <div
        className={cn(styles.wrapper, className)}
        data-size={size}
        data-disabled={disabled || undefined}
      >
        <div className={styles.radioWrapper}>
          <input
            ref={ref}
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={isChecked}
            disabled={disabled}
            onChange={handleChange}
            aria-describedby={descriptionId}
            className={styles.input}
            {...rest}
          />
          <div className={styles.radio} aria-hidden="true">
            <div className={styles.dot} />
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

Radio.displayName = 'Radio';
export { Radio };
