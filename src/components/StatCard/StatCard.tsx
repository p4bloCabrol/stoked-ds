import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { StatCardProps } from './StatCard.types';
import styles from './StatCard.module.css';

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      icon,
      label,
      value,
      trend,
      trendDirection = 'neutral',
      status = 'default',
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(styles.card, className)} {...rest}>
        <div className={styles.top}>
          {icon && (
            <span className={styles.icon} data-status={status}>
              {icon}
            </span>
          )}
          {trend && (
            <span className={styles.trend} data-direction={trendDirection}>
              {trendDirection === 'up' && '↑ '}
              {trendDirection === 'down' && '↓ '}
              {trend}
            </span>
          )}
        </div>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    );
  }
);

StatCard.displayName = 'StatCard';
export { StatCard };
