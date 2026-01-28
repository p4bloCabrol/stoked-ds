import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TabsVariant = 'line' | 'enclosed' | 'pills';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Visual variant of the tabs */
  variant?: TabsVariant;
  /** Size of the tabs */
  size?: TabsSize;
  /** Default selected tab index - uncontrolled */
  defaultIndex?: number;
  /** Controlled selected tab index */
  index?: number;
  /** Callback when tab changes */
  onChange?: (index: number) => void;
  /** Whether tabs take full width */
  isFitted?: boolean;
  /** Tab content */
  children?: ReactNode;
}

export interface TabListProps extends ComponentPropsWithoutRef<'div'> {
  /** Tab buttons */
  children?: ReactNode;
}

export interface TabProps extends ComponentPropsWithoutRef<'button'> {
  /** Whether the tab is disabled */
  isDisabled?: boolean;
  /** Tab label content */
  children?: ReactNode;
}

export interface TabPanelsProps extends ComponentPropsWithoutRef<'div'> {
  /** Tab panels */
  children?: ReactNode;
}

export interface TabPanelProps extends ComponentPropsWithoutRef<'div'> {
  /** Panel content */
  children?: ReactNode;
}

export interface TabsContextValue {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  variant: TabsVariant;
  size: TabsSize;
  isFitted: boolean;
  baseId: string;
}
