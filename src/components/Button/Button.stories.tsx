import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'danger', 'success', 'neutral'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    ripple: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    color: 'primary',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button {...args} variant="solid">
        Solid
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button {...args} color="primary">
        Primary
      </Button>
      <Button {...args} color="success">
        Success
      </Button>
      <Button {...args} color="danger">
        Danger
      </Button>
      <Button {...args} color="neutral">
        Neutral
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true, children: 'Loading...' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button
        {...args}
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        }
      >
        Add Item
      </Button>
      <Button
        {...args}
        variant="outline"
        rightIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        }
      >
        Next
      </Button>
    </div>
  ),
};

export const WithRipple: Story = {
  name: 'With Ripple Effect',
  args: { ripple: true, children: 'Click me!' },
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <Button {...args} variant="solid" color="primary">
        Primary
      </Button>
      <Button {...args} variant="solid" color="success">
        Success
      </Button>
      <Button {...args} variant="outline" color="primary">
        Outline
      </Button>
      <Button {...args} variant="ghost" color="primary">
        Ghost
      </Button>
    </div>
  ),
};

export const AllCombinations: Story = {
  name: 'All Combinations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {(['solid', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant}>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--stoked-color-text-muted)',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {variant}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {(['primary', 'success', 'danger', 'neutral'] as const).map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
