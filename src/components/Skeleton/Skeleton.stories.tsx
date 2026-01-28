import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: { control: 'number' },
  },
  args: {
    variant: 'text',
    animation: 'pulse',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      <div style={{ width: 200 }}>
        <Skeleton variant="text" />
      </div>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ width: 200 }}>
        <Skeleton variant="rectangular" height={120} />
      </div>
      <div style={{ width: 200 }}>
        <Skeleton variant="rounded" height={120} />
      </div>
    </div>
  ),
};

export const Animations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 300 }}>
      <div>
        <span style={{ fontSize: 'var(--stoked-text-sm)', color: 'var(--stoked-color-text-muted)', marginBottom: '0.5rem', display: 'block' }}>
          Pulse (default)
        </span>
        <Skeleton animation="pulse" />
      </div>
      <div>
        <span style={{ fontSize: 'var(--stoked-text-sm)', color: 'var(--stoked-color-text-muted)', marginBottom: '0.5rem', display: 'block' }}>
          Wave
        </span>
        <Skeleton animation="wave" />
      </div>
      <div>
        <span style={{ fontSize: 'var(--stoked-text-sm)', color: 'var(--stoked-color-text-muted)', marginBottom: '0.5rem', display: 'block' }}>
          None
        </span>
        <Skeleton animation="none" />
      </div>
    </div>
  ),
};

export const MultipleLines: Story = {
  args: {
    variant: 'text',
    lines: 4,
  },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
};

export const CardSkeleton: Story = {
  name: 'Card Loading State',
  render: () => (
    <div
      style={{
        width: 320,
        padding: 'var(--stoked-spacing-4)',
        background: 'var(--stoked-color-surface)',
        borderRadius: 'var(--stoked-radius-xl)',
        border: '1px solid var(--stoked-color-border)',
      }}
    >
      <Skeleton variant="rounded" height={180} style={{ marginBottom: 'var(--stoked-spacing-4)' }} />
      <Skeleton variant="text" width="60%" style={{ marginBottom: 'var(--stoked-spacing-2)' }} />
      <Skeleton variant="text" lines={2} />
      <div style={{ display: 'flex', gap: 'var(--stoked-spacing-3)', marginTop: 'var(--stoked-spacing-4)' }}>
        <Skeleton variant="circular" width={32} height={32} />
        <div style={{ flex: 1 }}>
          <Skeleton variant="text" width="50%" style={{ marginBottom: 'var(--stoked-spacing-1)' }} />
          <Skeleton variant="text" width="30%" height="0.75em" />
        </div>
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  name: 'List Loading State',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stoked-spacing-4)', width: 400 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', gap: 'var(--stoked-spacing-3)', alignItems: 'center' }}>
          <Skeleton variant="circular" width={48} height={48} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" style={{ marginBottom: 'var(--stoked-spacing-2)' }} />
            <Skeleton variant="text" width="70%" height="0.75em" />
          </div>
          <Skeleton variant="rounded" width={80} height={32} />
        </div>
      ))}
    </div>
  ),
};

export const TableSkeleton: Story = {
  name: 'Table Loading State',
  render: () => (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr 1fr',
          gap: 'var(--stoked-spacing-4)',
          padding: 'var(--stoked-spacing-3)',
          borderBottom: '1px solid var(--stoked-color-border)',
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="text" height="0.75em" />
        ))}
      </div>
      {/* Rows */}
      {[1, 2, 3, 4, 5].map((row) => (
        <div
          key={row}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr 1fr',
            gap: 'var(--stoked-spacing-4)',
            padding: 'var(--stoked-spacing-3)',
            borderBottom: '1px solid var(--stoked-color-border)',
          }}
        >
          {[1, 2, 3, 4].map((col) => (
            <Skeleton key={col} variant="text" />
          ))}
        </div>
      ))}
    </div>
  ),
};
