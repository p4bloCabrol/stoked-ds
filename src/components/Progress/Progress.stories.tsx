import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100 },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
    },
    showValue: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    animated: { control: 'boolean' },
  },
  args: {
    value: 60,
    size: 'md',
    color: 'primary',
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Progress size="xs" value={60} />
      <Progress size="sm" value={60} />
      <Progress size="md" value={60} />
      <Progress size="lg" value={60} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Progress color="primary" value={80} showValue />
      <Progress color="success" value={100} showValue />
      <Progress color="warning" value={45} showValue />
      <Progress color="danger" value={20} showValue />
    </div>
  ),
};

export const Animated: Story = {
  args: {
    value: 70,
    animated: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const UploadExample: Story = {
  name: 'Upload Progress Example',
  render: () => (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 'var(--stoked-spacing-2)',
          fontSize: 'var(--stoked-text-sm)',
          color: 'var(--stoked-color-text-secondary)',
        }}
      >
        <span>Uploading file.zip</span>
        <span>68%</span>
      </div>
      <Progress value={68} color="primary" animated />
    </>
  ),
};

export const StepsExample: Story = {
  name: 'Multi-step Progress',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--stoked-spacing-4)',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--stoked-spacing-1)',
            fontSize: 'var(--stoked-text-sm)',
          }}
        >
          <span>Step 1: Account details</span>
          <span style={{ color: 'var(--stoked-color-success)' }}>Complete</span>
        </div>
        <Progress value={100} color="success" size="sm" />
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--stoked-spacing-1)',
            fontSize: 'var(--stoked-text-sm)',
          }}
        >
          <span>Step 2: Personal info</span>
          <span style={{ color: 'var(--stoked-color-primary)' }}>In progress</span>
        </div>
        <Progress value={60} color="primary" size="sm" animated />
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--stoked-spacing-1)',
            fontSize: 'var(--stoked-text-sm)',
            color: 'var(--stoked-color-text-muted)',
          }}
        >
          <span>Step 3: Confirmation</span>
          <span>Pending</span>
        </div>
        <Progress value={0} size="sm" />
      </div>
    </div>
  ),
};
