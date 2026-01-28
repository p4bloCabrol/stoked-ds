import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioGroupProps {
  /** Name for all radios in the group */
  name: string;
  /** Currently selected value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Size preset for all radios */
  size?: RadioSize;
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Orientation of the group */
  orientation?: 'horizontal' | 'vertical';
  /** Children (Radio components) */
  children: ReactNode;
  /** Additional class name */
  className?: string;
}

export interface RadioProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'size'> {
  /** Value of this radio option */
  value: string;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Size preset (inherited from group if not specified) */
  size?: RadioSize;
}

export interface RadioContextValue {
  name: string;
  value?: string;
  onChange: (value: string) => void;
  size: RadioSize;
  disabled: boolean;
}
