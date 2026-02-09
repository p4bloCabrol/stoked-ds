import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface AppShellProps extends ComponentPropsWithoutRef<'div'> {
  /** Sidebar element */
  sidebar?: ReactNode;
  /** Header element rendered above the main content */
  header?: ReactNode;
}
