import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type StatCardStatus = 'default' | 'success' | 'warning' | 'danger';

export interface StatCardProps extends ComponentPropsWithoutRef<'div'> {
  /** Icon displayed at the top */
  icon?: ReactNode;
  /** Metric label (e.g. "Total Items") */
  label: string;
  /** Metric value (e.g. "12,450") */
  value: string | number;
  /** Trend percentage (e.g. "+2.4%") */
  trend?: string;
  /** Trend direction */
  trendDirection?: 'up' | 'down' | 'neutral';
  /** Status color for the icon background */
  status?: StatCardStatus;
}
