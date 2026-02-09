import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface SidebarProps extends ComponentPropsWithoutRef<'aside'> {
  /** Whether the sidebar is collapsed (icon-only mode) */
  collapsed?: boolean;
  /** Callback when collapse state changes */
  onToggle?: () => void;
  /** Logo element shown at the top */
  logo?: ReactNode;
  /** Logo element shown when collapsed (e.g. just an icon) */
  collapsedLogo?: ReactNode;
  /** Content rendered at the bottom (e.g. user profile) */
  footer?: ReactNode;
}

export interface SidebarItemProps extends ComponentPropsWithoutRef<'button'> {
  /** Icon element (e.g. SVG or emoji) */
  icon?: ReactNode;
  /** Label text */
  label: string;
  /** Whether this item is active */
  active?: boolean;
  /** Optional href - renders as link behavior */
  href?: string;
}

export interface SidebarSectionProps extends ComponentPropsWithoutRef<'div'> {
  /** Optional section title */
  title?: string;
}
