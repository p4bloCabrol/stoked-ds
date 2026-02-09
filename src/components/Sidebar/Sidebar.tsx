import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SidebarProps, SidebarItemProps, SidebarSectionProps } from './Sidebar.types';
import styles from './Sidebar.module.css';

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      collapsed = false,
      onToggle,
      logo,
      collapsedLogo,
      footer,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <aside
        ref={ref}
        className={cn(styles.sidebar, className)}
        data-collapsed={collapsed || undefined}
        {...rest}
      >
        <div className={styles.header}>
          <div className={styles.logo}>
            {collapsed ? (collapsedLogo || logo) : logo}
          </div>
          {onToggle && (
            <button
              className={styles.toggle}
              onClick={onToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {collapsed ? (
                  <polyline points="6 3 11 8 6 13" />
                ) : (
                  <polyline points="11 3 6 8 11 13" />
                )}
              </svg>
            </button>
          )}
        </div>

        <nav className={styles.nav}>{children}</nav>

        {footer && <div className={styles.footer}>{footer}</div>}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ icon, label, active = false, href, className, onClick, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.item, className)}
        data-active={active || undefined}
        onClick={onClick}
        role={href ? 'link' : undefined}
        {...rest}
      >
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemLabel}>{label}</span>
      </button>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';

const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ title, className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(styles.section, className)} {...rest}>
        {title && <span className={styles.sectionTitle}>{title}</span>}
        {children}
      </div>
    );
  }
);

SidebarSection.displayName = 'SidebarSection';

export { Sidebar, SidebarItem, SidebarSection };
