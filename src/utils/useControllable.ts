import { useState, useCallback } from 'react';

/**
 * Hook to manage controlled/uncontrolled state for form components.
 *
 * @param controlledValue - The controlled value (if provided)
 * @param defaultValue - The default value for uncontrolled mode
 * @param onChange - Callback when value changes
 * @returns Tuple of [value, setValue]
 */
export function useControllable<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (next: T) => void] {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);

  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [value as T, setValue];
}
