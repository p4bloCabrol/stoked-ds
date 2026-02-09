import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { AppShellProps } from './AppShell.types';
import styles from './AppShell.module.css';

const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  ({ sidebar, header, className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(styles.shell, className)} {...rest}>
        {sidebar && <div className={styles.sidebar}>{sidebar}</div>}
        <div className={styles.main}>
          {header && <header className={styles.header}>{header}</header>}
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    );
  }
);

AppShell.displayName = 'AppShell';
export { AppShell };
