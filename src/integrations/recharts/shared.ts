import type { ChartTheme } from './theme';

export const createAxisProps = (theme: ChartTheme) => ({
  tick: { fill: theme.textColor, fontSize: 12 },
  stroke: theme.gridColor,
  tickLine: false as const,
});

export const createTooltipStyle = (theme: ChartTheme) => ({
  backgroundColor: theme.tooltipBg,
  border: `1px solid ${theme.tooltipBorder}`,
  borderRadius: 8,
  color: theme.tooltipText,
  fontSize: 13,
});

export const createLegendStyle = (theme: ChartTheme) => ({
  fontSize: 13,
  color: theme.textColor,
});
