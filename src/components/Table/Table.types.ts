import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type TableVariant = 'simple' | 'striped';
export type TableSize = 'sm' | 'md' | 'lg';

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
  /** Visual variant of the table */
  variant?: TableVariant;
  /** Size of the table cells */
  size?: TableSize;
  /** Table content */
  children?: ReactNode;
}

export interface TableHeadProps extends ComponentPropsWithoutRef<'thead'> {
  /** Table head content */
  children?: ReactNode;
}

export interface TableBodyProps extends ComponentPropsWithoutRef<'tbody'> {
  /** Table body content */
  children?: ReactNode;
}

export interface TableFootProps extends ComponentPropsWithoutRef<'tfoot'> {
  /** Table foot content */
  children?: ReactNode;
}

export interface TableRowProps extends ComponentPropsWithoutRef<'tr'> {
  /** Whether the row is selected */
  isSelected?: boolean;
  /** Whether the row is hoverable */
  isHoverable?: boolean;
  /** Table row content */
  children?: ReactNode;
}

export interface TableHeaderCellProps extends ComponentPropsWithoutRef<'th'> {
  /** Whether the column is sortable */
  isSortable?: boolean;
  /** Current sort direction */
  sortDirection?: 'asc' | 'desc' | null;
  /** Callback when sort is clicked */
  onSort?: () => void;
  /** Whether the column is numeric (right-aligned) */
  isNumeric?: boolean;
  /** Header cell content */
  children?: ReactNode;
}

export interface TableCellProps extends ComponentPropsWithoutRef<'td'> {
  /** Whether the cell contains numeric data (right-aligned) */
  isNumeric?: boolean;
  /** Table cell content */
  children?: ReactNode;
}

export interface TableCaptionProps extends ComponentPropsWithoutRef<'caption'> {
  /** Caption placement */
  placement?: 'top' | 'bottom';
  /** Caption content */
  children?: ReactNode;
}

export interface TableContainerProps extends ComponentPropsWithoutRef<'div'> {
  /** Container content (Table) */
  children?: ReactNode;
}
