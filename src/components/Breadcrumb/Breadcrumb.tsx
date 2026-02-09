import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { BreadcrumbProps } from './Breadcrumb.types';
import styles from './Breadcrumb.module.css';

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator = '/', className, ...rest }, ref) => {
    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn(styles.breadcrumb, className)} {...rest}>
        <ol className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className={styles.item}>
                {item.href && !isLast ? (
                  <a href={item.href} className={styles.link}>
                    {item.label}
                  </a>
                ) : (
                  <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';
export { Breadcrumb };
