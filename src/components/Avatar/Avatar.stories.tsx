import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size preset',
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'busy', 'away'],
      description: 'Status indicator',
    },
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'John Doe',
  },
};

export const WithFallback: Story = {
  args: {
    fallback: 'John Doe',
    alt: 'John Doe',
  },
};

export const WithoutImageOrFallback: Story = {
  args: {
    alt: 'Unknown User',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar size="xs" src="https://i.pravatar.cc/150?img=1" alt="XS" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?img=2" alt="SM" />
      <Avatar size="md" src="https://i.pravatar.cc/150?img=3" alt="MD" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?img=4" alt="LG" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?img=5" alt="XL" />
      <Avatar size="2xl" src="https://i.pravatar.cc/150?img=6" alt="2XL" />
    </div>
  ),
};

export const FallbackSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar size="xs" fallback="AB" />
      <Avatar size="sm" fallback="CD" />
      <Avatar size="md" fallback="EF" />
      <Avatar size="lg" fallback="GH" />
      <Avatar size="xl" fallback="IJ" />
      <Avatar size="2xl" fallback="KL" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar src="https://i.pravatar.cc/150?img=10" status="online" alt="Online" />
      <Avatar src="https://i.pravatar.cc/150?img=11" status="away" alt="Away" />
      <Avatar src="https://i.pravatar.cc/150?img=12" status="busy" alt="Busy" />
      <Avatar src="https://i.pravatar.cc/150?img=13" status="offline" alt="Offline" />
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: 'flex' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ marginLeft: i > 1 ? '-0.75rem' : 0 }}>
          <Avatar
            src={`https://i.pravatar.cc/150?img=${i + 20}`}
            alt={`User ${i}`}
            style={{
              border: '2px solid var(--stoked-color-background)',
            }}
          />
        </div>
      ))}
    </div>
  ),
};
