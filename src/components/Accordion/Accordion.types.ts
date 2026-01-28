import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface AccordionProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Allow multiple items to be open at once */
  allowMultiple?: boolean;
  /** Default expanded item(s) - uncontrolled */
  defaultIndex?: number | number[];
  /** Controlled expanded item(s) */
  index?: number | number[];
  /** Callback when items are expanded/collapsed */
  onChange?: (index: number | number[]) => void;
  /** Accordion items */
  children?: ReactNode;
}

export interface AccordionItemProps extends ComponentPropsWithoutRef<'div'> {
  /** Whether the item is disabled */
  isDisabled?: boolean;
  /** Item content */
  children?: ReactNode;
}

export interface AccordionButtonProps extends ComponentPropsWithoutRef<'button'> {
  /** Button content */
  children?: ReactNode;
}

export interface AccordionPanelProps extends ComponentPropsWithoutRef<'div'> {
  /** Panel content */
  children?: ReactNode;
}

export interface AccordionContextValue {
  expandedItems: number[];
  toggleItem: (index: number) => void;
  allowMultiple: boolean;
}

export interface AccordionItemContextValue {
  index: number;
  isExpanded: boolean;
  isDisabled: boolean;
  buttonId: string;
  panelId: string;
}
