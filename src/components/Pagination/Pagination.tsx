import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { PaginationProps } from './Pagination.types';
import styles from './Pagination.module.css';

function getPageRange(page: number, totalPages: number, siblings: number): (number | 'dots')[] {
  const range: (number | 'dots')[] = [];
  const left = Math.max(2, page - siblings);
  const right = Math.min(totalPages - 1, page + siblings);

  range.push(1);

  if (left > 2) {
    range.push('dots');
  }

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) {
    range.push('dots');
  }

  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 6 15 12 9 18" />
  </svg>
);

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ page, totalPages, onPageChange, siblings = 1, className, ...rest }, ref) => {
    const pages = getPageRange(page, totalPages, siblings);

    return (
      <nav ref={ref} aria-label="Pagination" className={cn(styles.pagination, className)} {...rest}>
        <button
          className={styles.button}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        {pages.map((p, i) =>
          p === 'dots' ? (
            <span key={`dots-${i}`} className={styles.dots}>…</span>
          ) : (
            <button
              key={p}
              className={styles.button}
              data-active={p === page || undefined}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}

        <button
          className={styles.button}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
export { Pagination };
