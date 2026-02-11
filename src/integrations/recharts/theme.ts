export const CHART_COLORS = [
  '#137fec', // primary-500
  '#10b981', // success-500
  '#f59e0b', // warning-500
  '#f43f5e', // danger-500
  '#60a5fa', // primary-400
  '#059669', // success-600
  '#d97706', // warning-600
  '#94a3b8', // slate-400
];

export interface ChartTheme {
  textColor: string;
  gridColor: string;
  tooltipBg: string;
  tooltipBorder: string;
  tooltipText: string;
}

const DEFAULT_THEME: ChartTheme = {
  textColor: '#94a3b8',
  gridColor: '#283039',
  tooltipBg: '#1e293b',
  tooltipBorder: '#334155',
  tooltipText: '#f8fafc',
};

export function getChartTheme(): ChartTheme {
  if (typeof window === 'undefined') return DEFAULT_THEME;

  const root = getComputedStyle(document.documentElement);
  const read = (prop: string, fallback: string) =>
    root.getPropertyValue(prop).trim() || fallback;

  return {
    textColor: read('--stoked-color-text-secondary', DEFAULT_THEME.textColor),
    gridColor: read('--stoked-color-border-muted', DEFAULT_THEME.gridColor),
    tooltipBg: read('--stoked-color-surface', DEFAULT_THEME.tooltipBg),
    tooltipBorder: read('--stoked-color-border', DEFAULT_THEME.tooltipBorder),
    tooltipText: read('--stoked-color-text', DEFAULT_THEME.tooltipText),
  };
}
