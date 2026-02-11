import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type SortingState,
} from '@tanstack/react-table';
import { cn } from '../../utils/cn';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import { Skeleton } from '../../components/Skeleton';
import type { DataTableProps } from './DataTable.types';
import styles from './DataTable.module.css';

function DataTable<TData>({
  columns,
  data,
  variant = 'simple',
  size = 'md',
  enableSorting = false,
  sorting: controlledSorting,
  onSortingChange: controlledOnSortingChange,
  enablePagination = false,
  pageSize = 10,
  isLoading = false,
  loadingRows = 5,
  emptyMessage = 'No data available.',
  onRowClick,
  hoverable,
  caption,
  className,
  ...rest
}: DataTableProps<TData>) {
  const [internalSorting, setInternalSorting] = useState<SortingState>([]);

  const sorting = controlledSorting ?? internalSorting;
  const onSortingChange = controlledOnSortingChange ?? setInternalSorting;

  const isHoverable = hoverable ?? !!onRowClick;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const headerGroups = table.getHeaderGroups();
  const rows = table.getRowModel().rows;

  const paginationState = table.getState().pagination;
  const totalPages = table.getPageCount();
  const currentPage = paginationState.pageIndex + 1;
  const totalRows = data.length;

  const skeletonRows = useMemo(
    () =>
      Array.from({ length: loadingRows }, (_, i) => (
        <Tr key={`skeleton-${i}`}>
          {columns.map((_, colIdx) => (
            <Td key={colIdx}>
              <Skeleton variant="text" width="80%" />
            </Td>
          ))}
        </Tr>
      )),
    [loadingRows, columns]
  );

  return (
    <div className={cn(styles.wrapper, className)} {...rest}>
      <TableContainer>
        <Table variant={variant} size={size}>
          {caption && <TableCaption placement="top">{caption}</TableCaption>}
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = enableSorting && header.column.getCanSort();
                  const sorted = header.column.getIsSorted();

                  return (
                    <Th
                      key={header.id}
                      isSortable={canSort}
                      sortDirection={sorted === false ? null : (sorted as 'asc' | 'desc')}
                      onSort={canSort ? () => header.column.toggleSorting() : undefined}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {isLoading ? (
              skeletonRows
            ) : rows.length === 0 ? (
              <Tr>
                <Td colSpan={columns.length}>
                  <div className={styles.emptyState}>{emptyMessage}</div>
                </Td>
              </Tr>
            ) : (
              rows.map((row) => (
                <Tr
                  key={row.id}
                  isHoverable={isHoverable}
                  className={onRowClick ? styles.clickableRow : undefined}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      {enablePagination && !isLoading && rows.length > 0 && (
        <div className={styles.footer}>
          <span className={styles.rowCount}>
            {totalRows} {totalRows === 1 ? 'row' : 'rows'}
          </span>
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        </div>
      )}
    </div>
  );
}

DataTable.displayName = 'DataTable';
export { DataTable };
