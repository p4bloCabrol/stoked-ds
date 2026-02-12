import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { ChartCard } from './ChartCard';
import { StokedLineChart } from './StokedLineChart';
import { StokedBarChart } from './StokedBarChart';
import { StokedAreaChart } from './StokedAreaChart';
import { StokedPieChart } from './StokedPieChart';
import { CHART_COLORS, getChartTheme } from './theme';

// Mock ResizeObserver for ResponsiveContainer
beforeAll(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
  );
});

const sampleData = [
  { month: 'Jan', revenue: 4000, profit: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398 },
  { month: 'Mar', revenue: 5000, profit: 3800 },
];

const pieData = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
];

describe('ChartCard', () => {
  it('renders title and description', () => {
    render(
      <ChartCard title="Revenue" description="Monthly revenue chart">
        <div>chart</div>
      </ChartCard>
    );
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Monthly revenue chart')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <ChartCard>
        <div data-testid="child">content</div>
      </ChartCard>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders without title', () => {
    const { container } = render(
      <ChartCard>
        <div>content</div>
      </ChartCard>
    );
    expect(container.querySelector('h3')).not.toBeInTheDocument();
  });
});

describe('getChartTheme', () => {
  it('returns theme object with expected keys', () => {
    const theme = getChartTheme();
    expect(theme).toHaveProperty('textColor');
    expect(theme).toHaveProperty('gridColor');
    expect(theme).toHaveProperty('tooltipBg');
    expect(theme).toHaveProperty('tooltipBorder');
    expect(theme).toHaveProperty('tooltipText');
  });

  it('returns string values', () => {
    const theme = getChartTheme();
    expect(typeof theme.textColor).toBe('string');
    expect(typeof theme.gridColor).toBe('string');
  });
});

describe('CHART_COLORS', () => {
  it('has at least 8 colors', () => {
    expect(CHART_COLORS.length).toBeGreaterThanOrEqual(8);
  });

  it('contains valid hex colors', () => {
    CHART_COLORS.forEach((color) => {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });
});

describe('StokedLineChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <StokedLineChart
        data={sampleData}
        dataKeys={['revenue']}
        xAxisKey="month"
      />
    );
    expect(container).toBeTruthy();
  });
});

describe('StokedBarChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <StokedBarChart
        data={sampleData}
        dataKeys={['revenue']}
        xAxisKey="month"
      />
    );
    expect(container).toBeTruthy();
  });
});

describe('StokedAreaChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <StokedAreaChart
        data={sampleData}
        dataKeys={['revenue']}
        xAxisKey="month"
      />
    );
    expect(container).toBeTruthy();
  });
});

describe('StokedPieChart', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <StokedPieChart data={pieData} dataKey="value" />
    );
    expect(container).toBeTruthy();
  });
});
