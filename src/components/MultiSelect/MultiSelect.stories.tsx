import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';

const warehouseOptions = [
  { value: 'warehouse-a', label: 'Warehouse_A' },
  { value: 'logistics-core', label: 'Logistics_Core' },
  { value: 'east-hub-01', label: 'East_Hub_01' },
  { value: 'global-sync', label: 'Global_Sync' },
  { value: 'west-depot', label: 'West_Depot' },
  { value: 'central-node', label: 'Central_Node' },
  { value: 'archive-vault', label: 'Archive_Vault' },
  { value: 'staging-env', label: 'Staging_Env', disabled: true },
];

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    options: warehouseOptions,
    size: 'md',
    searchable: true,
    placeholder: 'Select databases...',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480, minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Targeted Databases',
    helperText: 'Press enter or comma to add a new entity tag.',
  },
};

export const WithDefaults: Story = {
  args: {
    label: 'Targeted Databases',
    defaultValue: ['warehouse-a', 'logistics-core', 'east-hub-01', 'global-sync'],
    helperText: 'Press enter or comma to add a new entity tag.',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['warehouse-a', 'logistics-core']);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <MultiSelect
          options={warehouseOptions}
          label="Controlled MultiSelect"
          value={value}
          onChange={setValue}
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--stoked-color-text-secondary)' }}>
          Selected: {value.length > 0 ? value.join(', ') : 'none'}
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <MultiSelect
        options={warehouseOptions}
        size="sm"
        label="Small"
        defaultValue={['warehouse-a']}
      />
      <MultiSelect
        options={warehouseOptions}
        size="md"
        label="Medium (default)"
        defaultValue={['warehouse-a', 'logistics-core']}
      />
      <MultiSelect
        options={warehouseOptions}
        size="lg"
        label="Large"
        defaultValue={['warehouse-a']}
      />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    label: 'Targeted Databases',
    error: 'At least one database is required.',
  },
};

export const MaxSelection: Story = {
  args: {
    label: 'Select up to 3',
    max: 3,
    defaultValue: ['warehouse-a', 'logistics-core', 'east-hub-01'],
    helperText: 'You can select a maximum of 3 items. Try adding another.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
    defaultValue: ['warehouse-a', 'logistics-core'],
  },
};

export const NoSearch: Story = {
  args: {
    searchable: false,
    label: 'Without search',
  },
};
