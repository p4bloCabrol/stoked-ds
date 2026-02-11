import type { ReactNode } from 'react';

export interface BaseChartProps {
  data: Record<string, unknown>[];
  height?: number;
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}

export interface CartesianChartProps extends BaseChartProps {
  dataKeys: string[];
  xAxisKey: string;
}

export interface StokedPieChartProps extends BaseChartProps {
  dataKey: string;
  nameKey?: string;
  innerRadius?: number;
  outerRadius?: number;
}

export interface ChartCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}
