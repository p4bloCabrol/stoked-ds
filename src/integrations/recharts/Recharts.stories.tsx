import type { Meta, StoryObj } from '@storybook/react';
import { ChartCard } from './ChartCard';
import { StokedLineChart } from './StokedLineChart';
import { StokedBarChart } from './StokedBarChart';
import { StokedAreaChart } from './StokedAreaChart';
import { StokedPieChart } from './StokedPieChart';

const monthlyData = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 5000, profit: 3800 },
  { month: 'Apr', revenue: 2780, profit: 1908 },
  { month: 'May', revenue: 1890, profit: 1200 },
  { month: 'Jun', revenue: 6390, profit: 3800 },
  { month: 'Jul', revenue: 3490, profit: 2300 },
];

const pieData = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 15 },
  { name: 'Other', value: 5 },
];

const meta = {
  title: 'Integrations/Recharts',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Pre-themed Recharts chart components styled with stoked-ds design tokens. Includes LineChart, BarChart, AreaChart, and PieChart wrappers with ChartCard container.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LineChart: Story = {
  name: 'Line Chart',
  render: () => (
    <ChartCard title="Monthly Revenue" description="Revenue and profit over time">
      <StokedLineChart
        data={monthlyData}
        dataKeys={['revenue', 'profit']}
        xAxisKey="month"
        showLegend
      />
    </ChartCard>
  ),
};

export const BarChart: Story = {
  name: 'Bar Chart',
  render: () => (
    <ChartCard title="Sales by Month">
      <StokedBarChart
        data={monthlyData}
        dataKeys={['revenue', 'profit']}
        xAxisKey="month"
        showLegend
      />
    </ChartCard>
  ),
};

export const AreaChart: Story = {
  name: 'Area Chart',
  render: () => (
    <ChartCard title="Revenue Trend">
      <StokedAreaChart
        data={monthlyData}
        dataKeys={['revenue']}
        xAxisKey="month"
      />
    </ChartCard>
  ),
};

export const PieChartStory: Story = {
  name: 'Pie Chart',
  render: () => (
    <ChartCard title="Traffic Sources" description="Distribution by device type">
      <StokedPieChart
        data={pieData}
        dataKey="value"
        showLegend
      />
    </ChartCard>
  ),
};

export const DonutChart: Story = {
  name: 'Donut Chart',
  render: () => (
    <ChartCard title="Device Distribution">
      <StokedPieChart
        data={pieData}
        dataKey="value"
        innerRadius={50}
        outerRadius={80}
        showLegend
      />
    </ChartCard>
  ),
};

export const MultiSeries: Story = {
  name: 'Multi-Series Line Chart',
  render: () => {
    const data = [
      { month: 'Jan', web: 4000, mobile: 2400, api: 1200 },
      { month: 'Feb', web: 3000, mobile: 1398, api: 2100 },
      { month: 'Mar', web: 5000, mobile: 3800, api: 2800 },
      { month: 'Apr', web: 2780, mobile: 1908, api: 1500 },
      { month: 'May', web: 1890, mobile: 1200, api: 1800 },
      { month: 'Jun', web: 6390, mobile: 3800, api: 3200 },
    ];

    return (
      <ChartCard title="API Requests by Platform">
        <StokedLineChart
          data={data}
          dataKeys={['web', 'mobile', 'api']}
          xAxisKey="month"
          showLegend
          height={350}
        />
      </ChartCard>
    );
  },
};

export const ChartCardOnly: Story = {
  name: 'Chart Card Container',
  render: () => (
    <ChartCard
      title="Custom Chart"
      description="Use ChartCard as a container for any chart content"
    >
      <div style={{ padding: '2rem', textAlign: 'center', opacity: 0.5 }}>
        Any chart content goes here
      </div>
    </ChartCard>
  ),
};

export const NoGrid: Story = {
  name: 'Without Grid',
  render: () => (
    <ChartCard title="Clean Look">
      <StokedLineChart
        data={monthlyData}
        dataKeys={['revenue']}
        xAxisKey="month"
        showGrid={false}
      />
    </ChartCard>
  ),
};
