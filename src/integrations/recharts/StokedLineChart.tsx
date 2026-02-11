import {
  LineChart,
  Line,
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

function StokedLineChart({
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
      <LineChart data={data}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
        )}
        <XAxis dataKey={xAxisKey} {...axisProps} />
        <YAxis {...axisProps} />
        {showTooltip && <Tooltip contentStyle={createTooltipStyle(theme)} />}
        {showLegend && <Legend wrapperStyle={createLegendStyle(theme)} />}
        {dataKeys.map((key, i) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

StokedLineChart.displayName = 'StokedLineChart';
export { StokedLineChart };
