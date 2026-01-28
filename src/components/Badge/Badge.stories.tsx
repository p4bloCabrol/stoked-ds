import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline'],
      description: 'Visual style variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'neutral'],
      description: 'Color scheme',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size preset',
    },
  },
  args: {
    children: 'Badge',
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge {...args} variant="solid">
        Solid
      </Badge>
      <Badge {...args} variant="subtle">
        Subtle
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge {...args} color="primary">
        Primary
      </Badge>
      <Badge {...args} color="success">
        Success
      </Badge>
      <Badge {...args} color="warning">
        Warning
      </Badge>
      <Badge {...args} color="danger">
        Danger
      </Badge>
      <Badge {...args} color="neutral">
        Neutral
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
      <Badge {...args} size="lg">
        Large
      </Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  name: 'Status Badges',
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <Badge variant="subtle" color="success">
        In Stock
      </Badge>
      <Badge variant="subtle" color="warning">
        Low Stock
      </Badge>
      <Badge variant="subtle" color="danger">
        Out of Stock
      </Badge>
    </div>
  ),
};

export const AllCombinations: Story = {
  name: 'All Combinations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {(['solid', 'subtle', 'outline'] as const).map((variant) => (
        <div key={variant}>
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--stoked-color-text-muted)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            {variant}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['primary', 'success', 'warning', 'danger', 'neutral'] as const).map((color) => (
              <Badge key={color} variant={variant} color={color}>
                {color}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
