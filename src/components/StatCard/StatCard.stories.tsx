import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Data Display/StatCard',
  component: StatCard,
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: {
    label: 'Total Items',
    value: '12,450',
    icon: '📦',
    trend: '+2.4%',
    trendDirection: 'up',
  },
};

export const Warning: Story = {
  args: {
    label: 'Low Stock Alerts',
    value: '14',
    icon: '⚠️',
    trend: 'Critical',
    trendDirection: 'neutral',
    status: 'warning',
  },
};

export const Danger: Story = {
  args: {
    label: 'Out of Stock',
    value: '5',
    icon: '🚫',
    status: 'danger',
  },
};

export const Grid: Story = {
  name: 'Grid Layout',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', width: 900 }}>
      <StatCard label="Total Items" value="12,840" icon="📦" trend="+2.4%" trendDirection="up" />
      <StatCard label="Low Stock" value="24" icon="⚠️" trend="Critical" trendDirection="neutral" status="warning" />
      <StatCard label="Out of Stock" value="5" icon="🚫" status="danger" />
      <StatCard label="Monthly Growth" value="+$42.3k" icon="📈" trend="+12.5%" trendDirection="up" status="success" />
    </div>
  ),
};
