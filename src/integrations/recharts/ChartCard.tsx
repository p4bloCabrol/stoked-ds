import { cn } from '../../utils/cn';
import type { ChartCardProps } from './Recharts.types';
import styles from './ChartCard.module.css';

function ChartCard({ title, description, children, className }: ChartCardProps) {
  return (
    <div className={cn(styles.card, className)}>
      {(title || description) && (
        <div className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

ChartCard.displayName = 'ChartCard';
export { ChartCard };
