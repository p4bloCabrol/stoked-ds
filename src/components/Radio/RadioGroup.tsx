import { useCallback } from 'react';
import { cn } from '../../utils/cn';
import { useControllable } from '../../utils/useControllable';
import { RadioContext } from './RadioContext';
import type { RadioGroupProps } from './Radio.types';
import styles from './Radio.module.css';

function RadioGroup({
  name,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  size = 'md',
  disabled = false,
  orientation = 'vertical',
  children,
  className,
}: RadioGroupProps) {
  const [value, setValue] = useControllable(controlledValue, defaultValue, onValueChange);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
    },
    [setValue]
  );

  return (
    <RadioContext.Provider
      value={{
        name,
        value,
        onChange: handleChange,
        size,
        disabled,
      }}
    >
      <div
        role="radiogroup"
        className={cn(styles.group, className)}
        data-orientation={orientation}
      >
        {children}
      </div>
    </RadioContext.Provider>
  );
}

RadioGroup.displayName = 'RadioGroup';
export { RadioGroup };
