import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { Button } from '../Button';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['primary', 'white', 'current'],
    },
  },
  args: {
    size: 'md',
    color: 'primary',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Spinner color="primary" />
      <div style={{ padding: '1rem', background: 'var(--stoked-color-primary)', borderRadius: '8px' }}>
        <Spinner color="white" />
      </div>
      <div style={{ color: 'var(--stoked-color-success)' }}>
        <Spinner color="current" />
      </div>
    </div>
  ),
};

export const InButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button disabled>
        <Spinner size="sm" color="current" />
        <span style={{ marginLeft: '0.5rem' }}>Loading...</span>
      </Button>
      <Button variant="outline" disabled>
        <Spinner size="sm" color="current" />
        <span style={{ marginLeft: '0.5rem' }}>Processing</span>
      </Button>
    </div>
  ),
};

export const FullPage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '3rem',
      }}
    >
      <Spinner size="xl" />
      <span style={{ color: 'var(--stoked-color-text-secondary)' }}>Loading content...</span>
    </div>
  ),
};
