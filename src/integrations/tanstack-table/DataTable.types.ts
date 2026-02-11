import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { ColumnDef, SortingState, OnChangeFn } from '@tanstack/react-table';
import type { TableVariant, TableSize } from '../../components/Table/Table.types';

export interface DataTableProps<TData>
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /** Column definitions (TanStack Table ColumnDef) */
  columns: ColumnDef<TData, unknown>[];
  /** Data array to display */
  data: TData[];
  /** Table visual variant */
  variant?: TableVariant;
  /** Table cell size */
  size?: TableSize;
  /** Enable column sorting */
  enableSorting?: boolean;
  /** Controlled sorting state */
  sorting?: SortingState;
  /** Callback when sorting changes */
  onSortingChange?: OnChangeFn<SortingState>;
  /** Enable pagination */
  enablePagination?: boolean;
  /** Number of rows per page (default: 10) */
  pageSize?: number;
  /** Show loading skeleton */
  isLoading?: boolean;
  /** Number of skeleton rows to show when loading (default: 5) */
  loadingRows?: number;
  /** Message to show when data is empty */
  emptyMessage?: ReactNode;
  /** Callback when a row is clicked */
  onRowClick?: (row: TData) => void;
  /** Enable hoverable rows (default: true when onRowClick is set) */
  hoverable?: boolean;
  /** Caption text for accessibility */
  caption?: string;
}
