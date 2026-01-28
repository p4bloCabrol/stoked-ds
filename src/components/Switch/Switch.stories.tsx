import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Dark mode',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Airplane mode',
    description: 'Disable all wireless connections',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
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

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch" />
      <Switch size="lg" label="Large switch" />
    </div>
  ),
};

export const SwitchGroup: Story = {
  name: 'Settings Example',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: 350 }}>
      <Switch
        label="Email notifications"
        description="Receive email updates about your account"
        defaultChecked
      />
      <Switch
        label="Push notifications"
        description="Receive push notifications on your device"
        defaultChecked
      />
      <Switch
        label="Marketing emails"
        description="Receive emails about new features and offers"
      />
      <Switch
        label="Analytics"
        description="Allow us to collect anonymous usage data"
        defaultChecked
      />
    </div>
  ),
};
