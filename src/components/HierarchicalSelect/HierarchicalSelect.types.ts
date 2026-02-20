import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// =============================================================================
// Data Types
// =============================================================================

export interface HierarchicalOption {
  /** Unique identifier for this option */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon to render before the label */
  icon?: ReactNode;
  /** Nested child options */
  children?: HierarchicalOption[];
  /** Whether this option is disabled */
  disabled?: boolean;
}

// =============================================================================
// Component Types
// =============================================================================

export type HierarchicalSelectMode = 'single' | 'multi';
export type HierarchicalSelectSize = 'sm' | 'md' | 'lg';

export interface HierarchicalSelectProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange' | 'defaultValue'> {
  /** Tree data structure of options */
  options: HierarchicalOption[];
  /** Selection mode */
  mode?: HierarchicalSelectMode;
  /** Size preset */
  size?: HierarchicalSelectSize;
  /** Controlled selected value(s) — single: string, multi: string[] */
  value?: string | string[];
  /** Default value(s) for uncontrolled mode */
  defaultValue?: string | string[];
  /** Callback when selection changes */
  onChange?: (value: string | string[]) => void;
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Enable search filtering */
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
  /** Show "Apply Selection" button in multi mode */
  showApplyButton?: boolean;
  /** Label for the apply button */
  applyButtonLabel?: string;
  /** Label for the clear button */
  clearButtonLabel?: string;
  /** Callback when apply is clicked (multi mode) */
  onApply?: (value: string[]) => void;
  /** aria-label for the trigger */
  'aria-label'?: string;
}
