import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HierarchicalSelect } from './HierarchicalSelect';
import type { HierarchicalOption } from './HierarchicalSelect.types';

const sampleOptions: HierarchicalOption[] = [
  {
    id: 'warehouse-a',
    label: 'Warehouse A',
    children: [
      {
        id: 'sector-1',
        label: 'Sector 1',
        children: [
          { id: 'shelf-1', label: 'Shelf 1' },
          { id: 'shelf-2', label: 'Shelf 2' },
        ],
      },
      {
        id: 'sector-2',
        label: 'Sector 2',
        children: [
          {
            id: 'shelf-3',
            label: 'Shelf 3',
            children: [
              { id: 'bin-a1', label: 'Bin A-1' },
              { id: 'bin-a2', label: 'Bin A-2' },
            ],
          },
          { id: 'shelf-4', label: 'Shelf 4' },
        ],
      },
    ],
  },
  {
    id: 'warehouse-b',
    label: 'Warehouse B',
    children: [
      {
        id: 'zone-d',
        label: 'Zone D',
        children: [
          { id: 'shelf-42', label: 'Shelf 42' },
          { id: 'shelf-43', label: 'Shelf 43' },
        ],
      },
    ],
  },
  {
    id: 'distribution-hub',
    label: 'Distribution Hub',
    children: [
      {
        id: 'cold-storage',
        label: 'Cold Storage',
        children: [
          { id: 'shelf-4-rear', label: 'Shelf 4-Rear' },
        ],
      },
    ],
  },
];

const meta = {
  title: 'Components/HierarchicalSelect',
  component: HierarchicalSelect,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multi'],
      description: 'Selection mode',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showApplyButton: { control: 'boolean' },
  },
  args: {
    options: sampleOptions,
    mode: 'single',
    size: 'md',
    searchable: true,
    placeholder: 'Select location...',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, minHeight: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HierarchicalSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleSelect: Story = {
  args: {
    mode: 'single',
    label: 'Location',
    placeholder: 'Choose a location...',
  },
};

export const MultiSelect: Story = {
  args: {
    mode: 'multi',
    label: 'Locations',
    placeholder: 'Select locations...',
    showApplyButton: true,
  },
};

export const WithDefaultValue: Story = {
  args: {
    mode: 'single',
    label: 'Pre-selected',
    defaultValue: 'shelf-4',
  },
};

export const MultiWithDefaults: Story = {
  args: {
    mode: 'multi',
    label: 'Pre-selected locations',
    defaultValue: ['shelf-4', 'bin-a1'],
    showApplyButton: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <HierarchicalSelect
          options={sampleOptions}
          mode="single"
          label="Controlled Select"
          value={value}
          onChange={(v) => setValue(v as string)}
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--stoked-color-text-secondary)' }}>
          Selected: {value || 'none'}
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <HierarchicalSelect
        options={sampleOptions}
        size="sm"
        label="Small"
        placeholder="Small select..."
      />
      <HierarchicalSelect
        options={sampleOptions}
        size="md"
        label="Medium (default)"
        placeholder="Medium select..."
      />
      <HierarchicalSelect
        options={sampleOptions}
        size="lg"
        label="Large"
        placeholder="Large select..."
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
    defaultValue: 'shelf-4',
  },
};

export const NoSearch: Story = {
  args: {
    searchable: false,
    label: 'Without search',
  },
};
