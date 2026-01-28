import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products, features, and more.',
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const Error: Story = {
  args: {
    label: 'You must accept the terms',
    error: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
};

export const CheckboxGroup: Story = {
  name: 'Checkbox Group',
  render: () => (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend
        style={{
          fontSize: 'var(--stoked-text-sm)',
          fontWeight: 'var(--stoked-font-semibold)',
          color: 'var(--stoked-color-text-secondary)',
          marginBottom: 'var(--stoked-spacing-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Notifications
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Checkbox label="Email notifications" defaultChecked />
        <Checkbox label="SMS notifications" />
        <Checkbox label="Push notifications" defaultChecked />
        <Checkbox label="In-app notifications" />
      </div>
    </fieldset>
  ),
};
