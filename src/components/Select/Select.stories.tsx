import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    size: 'md',
    placeholder: 'Select an option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
    ],
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Priority',
    helperText: 'Select the priority level for this task',
    options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: 'Category',
    error: 'Please select a category',
    placeholder: 'Select a category',
  },
};

export const Required: Story = {
  args: {
    label: 'Department',
    required: true,
    placeholder: 'Select your department',
    options: [
      { value: 'engineering', label: 'Engineering' },
      { value: 'design', label: 'Design' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'sales', label: 'Sales' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Status',
    disabled: true,
    defaultValue: 'active',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
    ],
  },
};

export const DisabledOptions: Story = {
  args: {
    label: 'Plan',
    placeholder: 'Select a plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise', disabled: true },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 300 }}>
      <Select
        size="sm"
        label="Small"
        placeholder="Small select"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <Select
        size="md"
        label="Medium"
        placeholder="Medium select"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
      <Select
        size="lg"
        label="Large"
        placeholder="Large select"
        options={[
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ]}
      />
    </div>
  ),
};

export const WithChildren: Story = {
  render: () => (
    <Select label="Timezone" placeholder="Select timezone">
      <optgroup label="Americas">
        <option value="est">Eastern Time (ET)</option>
        <option value="cst">Central Time (CT)</option>
        <option value="mst">Mountain Time (MT)</option>
        <option value="pst">Pacific Time (PT)</option>
      </optgroup>
      <optgroup label="Europe">
        <option value="gmt">Greenwich Mean Time (GMT)</option>
        <option value="cet">Central European Time (CET)</option>
      </optgroup>
    </Select>
  ),
};

export const FullWidth: Story = {
  args: {
    label: 'Category',
    fullWidth: true,
    placeholder: 'Select a category',
  },
  decorators: [(Story) => <div style={{ width: 500 }}><Story /></div>],
};
