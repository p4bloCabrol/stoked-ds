import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_COLORS, getChartTheme } from './theme';
import { createAxisProps, createTooltipStyle, createLegendStyle } from './shared';
import type { CartesianChartProps } from './Recharts.types';

function StokedAreaChart({
  data,
  dataKeys,
  xAxisKey,
  height = 300,
  colors = CHART_COLORS,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
}: CartesianChartProps) {
  const theme = getChartTheme();
  const axisProps = createAxisProps(theme);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
        )}
        <XAxis dataKey={xAxisKey} {...axisProps} />
        <YAxis {...axisProps} />
        {showTooltip && <Tooltip contentStyle={createTooltipStyle(theme)} />}
        {showLegend && <Legend wrapperStyle={createLegendStyle(theme)} />}
        {dataKeys.map((key, i) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            fill={colors[i % colors.length]}
            fillOpacity={0.1}
            strokeWidth={2}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

StokedAreaChart.displayName = 'StokedAreaChart';
export { StokedAreaChart };
