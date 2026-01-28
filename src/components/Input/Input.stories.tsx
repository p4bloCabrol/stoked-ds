import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
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
    placeholder: 'Enter text...',
    size: 'md',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 300 }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: 300 }}>
      <Input
        label="Search"
        placeholder="Search..."
        leftIcon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        }
      />
      <Input
        label="Email"
        placeholder="you@example.com"
        type="email"
        rightIcon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        }
      />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input spans the full width',
    fullWidth: true,
  },
  decorators: [(Story) => <div style={{ width: 500 }}><Story /></div>],
};

export const FormExample: Story = {
  name: 'Form Example',
  render: () => (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: 350 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <Input label="Full Name" placeholder="John Doe" required />
      <Input label="Email" type="email" placeholder="john@example.com" required />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
        required
      />
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        error="Passwords do not match"
      />
    </form>
  ),
};
