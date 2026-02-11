import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CHART_COLORS, getChartTheme } from './theme';
import { createTooltipStyle, createLegendStyle } from './shared';
import type { StokedPieChartProps } from './Recharts.types';

function StokedPieChart({
  data,
  dataKey,
  nameKey = 'name',
  height = 300,
  colors = CHART_COLORS,
  innerRadius = 0,
  outerRadius = 80,
  showLegend = true,
  showTooltip = true,
}: StokedPieChartProps) {
  const theme = getChartTheme();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          strokeWidth={0}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={colors[i % colors.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip contentStyle={createTooltipStyle(theme)} />}
        {showLegend && <Legend wrapperStyle={createLegendStyle(theme)} />}
      </PieChart>
    </ResponsiveContainer>
  );
}

StokedPieChart.displayName = 'StokedPieChart';
export { StokedPieChart };
