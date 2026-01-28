import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    delayShow: { control: 'number' },
    delayHide: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
    content: 'This is a tooltip',
    placement: 'top',
    delayShow: 200,
    delayHide: 0,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        placeItems: 'center',
        minHeight: '200px',
      }}
    >
      <div />
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <div />
      <Tooltip content="Left tooltip" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <div />
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <div />
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <div />
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip content="This is a longer tooltip that provides more detailed information about the element.">
      <Button>Hover for details</Button>
    </Tooltip>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="Shows after 500ms" delayShow={500}>
        <Button variant="outline">500ms delay</Button>
      </Tooltip>
      <Tooltip content="Shows immediately" delayShow={0}>
        <Button variant="outline">No delay</Button>
      </Tooltip>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tooltip content="You won't see this" disabled>
      <Button>Tooltip disabled</Button>
    </Tooltip>
  ),
};

export const OnIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Tooltip content="Edit item">
        <button
          style={{
            padding: '0.5rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--stoked-color-text-secondary)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Delete item">
        <button
          style={{
            padding: '0.5rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--stoked-color-text-secondary)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Share item">
        <button
          style={{
            padding: '0.5rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--stoked-color-text-secondary)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};

export const KeyboardAccessible: Story = {
  name: 'Keyboard Accessible',
  render: () => (
    <div>
      <p style={{ marginBottom: '1rem', color: 'var(--stoked-color-text-muted)', fontSize: '0.875rem' }}>
        Tab to focus the button, press Escape to dismiss the tooltip
      </p>
      <Tooltip content="Press Escape to close">
        <Button>Focus me with Tab</Button>
      </Tooltip>
    </div>
  ),
};
