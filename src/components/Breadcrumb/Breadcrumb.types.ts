import type { ComponentPropsWithoutRef } from 'react';

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** URL (omit for current/last item) */
  href?: string;
}

export interface BreadcrumbProps extends ComponentPropsWithoutRef<'nav'> {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator character */
  separator?: string;
}
