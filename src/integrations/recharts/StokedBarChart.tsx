import {
  BarChart,
  Bar,
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

function StokedBarChart({
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
      <BarChart data={data}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
        )}
        <XAxis dataKey={xAxisKey} {...axisProps} />
        <YAxis {...axisProps} />
        {showTooltip && (
          <Tooltip
            contentStyle={createTooltipStyle(theme)}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
        )}
        {showLegend && <Legend wrapperStyle={createLegendStyle(theme)} />}
        {dataKeys.map((key, i) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

StokedBarChart.displayName = 'StokedBarChart';
export { StokedBarChart };
