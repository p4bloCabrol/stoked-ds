import type { GroupBase, Props } from 'react-select';

export type AdvancedSelectProps<
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> = {
  /** Label displayed above the select */
  label?: string;
  /** Error message displayed below the select */
  error?: string;
  /** Helper text displayed below the select */
  helperText?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the select takes full width */
  fullWidth?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Render CreatableSelect instead of Select */
  isCreatable?: boolean;
  /** Additional CSS class for the wrapper */
  className?: string;
} & Omit<Props<Option, IsMulti, Group>, 'classNamePrefix' | 'styles'>;
