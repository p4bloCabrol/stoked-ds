import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Form Controls/SearchInput',
  component: SearchInput,
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    placeholder: 'Search inventory...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search items...',
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Search...',
    fullWidth: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 300 }}>
      <SearchInput size="sm" placeholder="Small search..." />
      <SearchInput size="md" placeholder="Medium search..." />
      <SearchInput size="lg" placeholder="Large search..." />
    </div>
  ),
};
