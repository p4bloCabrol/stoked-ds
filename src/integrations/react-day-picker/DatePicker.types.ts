import type { ReactNode } from 'react';
import type { DateRange } from 'react-day-picker';

export type DatePickerSize = 'sm' | 'md' | 'lg';

export interface DatePickerProps {
  /** Selected date value (controlled) */
  value?: Date;
  /** Default date value (uncontrolled) */
  defaultValue?: Date;
  /** Callback when date changes */
  onValueChange?: (date: Date | undefined) => void;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Size preset */
  size?: DatePickerSize;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Full width mode */
  fullWidth?: boolean;
  /** Custom date formatter */
  formatDate?: (date: Date) => string;
  /** Additional class name */
  className?: string;
}

export interface DateRangePickerProps {
  /** Selected date range (controlled) */
  value?: DateRange;
  /** Default date range (uncontrolled) */
  defaultValue?: DateRange;
  /** Callback when range changes */
  onValueChange?: (range: DateRange | undefined) => void;
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Size preset */
  size?: DatePickerSize;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Whether the picker is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Full width mode */
  fullWidth?: boolean;
  /** Custom date formatter */
  formatDate?: (date: Date) => string;
  /** Separator between from and to dates */
  separator?: ReactNode;
  /** Additional class name */
  className?: string;
}
