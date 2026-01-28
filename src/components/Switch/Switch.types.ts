import type { ComponentPropsWithoutRef } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<'button'>, 'type' | 'role'> {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Callback when checked state changes */
  onCheckedChange?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Size preset */
  size?: SwitchSize;
  /** Name for form submission */
  name?: string;
  /** Value for form submission */
  value?: string;
}
