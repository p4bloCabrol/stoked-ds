import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type {
  TableProps,
  TableHeadProps,
  TableBodyProps,
  TableFootProps,
  TableRowProps,
  TableHeaderCellProps,
  TableCellProps,
  TableCaptionProps,
  TableContainerProps,
} from './Table.types';
import styles from './Table.module.css';

const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  function TableContainer({ className, children, ...rest }, ref) {
    return (
      <div ref={ref} className={cn(styles.container, className)} {...rest}>
        {children}
      </div>
    );
  }
);

const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { variant = 'simple', size = 'md', className, children, ...rest },
  ref
) {
  return (
    <table
      ref={ref}
      className={cn(styles.table, className)}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {children}
    </table>
  );
});

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  function TableHead({ className, children, ...rest }, ref) {
    return (
      <thead ref={ref} className={cn(styles.thead, className)} {...rest}>
        {children}
      </thead>
    );
  }
);

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, children, ...rest }, ref) {
    return (
      <tbody ref={ref} className={cn(styles.tbody, className)} {...rest}>
        {children}
      </tbody>
    );
  }
);

const TableFoot = forwardRef<HTMLTableSectionElement, TableFootProps>(
  function TableFoot({ className, children, ...rest }, ref) {
    return (
      <tfoot ref={ref} className={cn(styles.tfoot, className)} {...rest}>
        {children}
      </tfoot>
    );
  }
);

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { isSelected = false, isHoverable = false, className, children, ...rest },
  ref
) {
  return (
    <tr
      ref={ref}
      className={cn(styles.tr, className)}
      data-selected={isSelected || undefined}
      data-hoverable={isHoverable || undefined}
      {...rest}
    >
      {children}
    </tr>
  );
});

const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  function TableHeaderCell(
    {
      isSortable = false,
      sortDirection,
      onSort,
      isNumeric = false,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const content = isSortable ? (
      <button
        type="button"
        className={styles.sortButton}
        onClick={onSort}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
              ? 'descending'
              : 'none'
        }
      >
        {children}
        <svg
          className={styles.sortIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          {sortDirection === 'asc' ? (
            <path d="M12 19V5M5 12l7-7 7 7" />
          ) : sortDirection === 'desc' ? (
            <path d="M12 5v14M5 12l7 7 7-7" />
          ) : (
            <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
          )}
        </svg>
      </button>
    ) : (
      children
    );

    return (
      <th
        ref={ref}
        className={cn(styles.th, className)}
        data-sortable={isSortable || undefined}
        data-sort-direction={sortDirection || undefined}
        data-numeric={isNumeric || undefined}
        {...rest}
      >
        {content}
      </th>
    );
  }
);

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ isNumeric = false, className, children, ...rest }, ref) {
    return (
      <td
        ref={ref}
        className={cn(styles.td, className)}
        data-numeric={isNumeric || undefined}
        {...rest}
      >
        {children}
      </td>
    );
  }
);

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ placement = 'bottom', className, children, ...rest }, ref) {
    return (
      <caption
        ref={ref}
        className={cn(styles.caption, className)}
        data-placement={placement}
        {...rest}
      >
        {children}
      </caption>
    );
  }
);

TableContainer.displayName = 'TableContainer';
Table.displayName = 'Table';
TableHead.displayName = 'TableHead';
TableBody.displayName = 'TableBody';
TableFoot.displayName = 'TableFoot';
TableRow.displayName = 'TableRow';
TableHeaderCell.displayName = 'TableHeaderCell';
TableCell.displayName = 'TableCell';
TableCaption.displayName = 'TableCaption';

// Shorthand aliases
const Thead = TableHead;
const Tbody = TableBody;
const Tfoot = TableFoot;
const Tr = TableRow;
const Th = TableHeaderCell;
const Td = TableCell;

export {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFoot,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableCaption,
  // Shorthand aliases
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
};
