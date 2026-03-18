import type { ComponentPropsWithoutRef } from 'react';

// =============================================================================
// Data Types
// =============================================================================

export interface MultiSelectOption {
  /** Unique value for this option */
  value: string;
  /** Display label */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
}

// =============================================================================
// Component Types
// =============================================================================

export type MultiSelectSize = 'sm' | 'md' | 'lg';

export interface MultiSelectProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  /** Available options */
  options: MultiSelectOption[];
  /** Controlled selected values */
  value?: string[];
  /** Default selected values (uncontrolled) */
  defaultValue?: string[];
  /** Callback when selection changes */
  onChange?: (value: string[]) => void;
  /** Size preset */
  size?: MultiSelectSize;
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Enable search/filter */
  searchable?: boolean;
  /** Search input placeholder */
  searchPlaceholder?: string;
  /** Whether the dropdown is open (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Label for the select */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (replaces helper text) */
  error?: string;
  /** Maximum number of items that can be selected */
  max?: number;
  /** aria-label for the trigger */
  'aria-label'?: string;
}
