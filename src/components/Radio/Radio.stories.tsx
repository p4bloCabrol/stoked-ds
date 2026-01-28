import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'option1',
    label: 'Option 1',
    name: 'demo',
  },
};

export const WithDescription: Story = {
  args: {
    value: 'option1',
    label: 'Standard shipping',
    description: 'Arrives in 5-7 business days',
    name: 'shipping',
  },
};

export const Disabled: Story = {
  args: {
    value: 'option1',
    label: 'Disabled option',
    name: 'demo',
    disabled: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio value="sm" label="Small radio" name="size-demo" size="sm" />
      <Radio value="md" label="Medium radio" name="size-demo" size="md" />
      <Radio value="lg" label="Large radio" name="size-demo" size="lg" />
    </div>
  ),
};

export const GroupVertical: Story = {
  name: 'Radio Group (Vertical)',
  render: () => (
    <RadioGroup name="plan" defaultValue="pro">
      <Radio value="free" label="Free" description="Get started with basic features" />
      <Radio value="pro" label="Pro" description="Best for professionals" />
      <Radio value="enterprise" label="Enterprise" description="For large teams and organizations" />
    </RadioGroup>
  ),
};

export const GroupHorizontal: Story = {
  name: 'Radio Group (Horizontal)',
  render: () => (
    <RadioGroup name="color" defaultValue="blue" orientation="horizontal">
      <Radio value="red" label="Red" />
      <Radio value="green" label="Green" />
      <Radio value="blue" label="Blue" />
      <Radio value="yellow" label="Yellow" />
    </RadioGroup>
  ),
};

export const ShippingExample: Story = {
  name: 'Shipping Options Example',
  render: () => (
    <div style={{ width: 350 }}>
      <div
        style={{
          fontSize: 'var(--stoked-text-sm)',
          fontWeight: 'var(--stoked-font-semibold)',
          color: 'var(--stoked-color-text-secondary)',
          marginBottom: 'var(--stoked-spacing-3)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        Shipping Method
      </div>
      <RadioGroup name="shipping" defaultValue="standard">
        <Radio
          value="standard"
          label="Standard"
          description="Free - Arrives in 5-7 business days"
        />
        <Radio
          value="express"
          label="Express"
          description="$9.99 - Arrives in 2-3 business days"
        />
        <Radio
          value="overnight"
          label="Overnight"
          description="$24.99 - Arrives tomorrow"
        />
      </RadioGroup>
    </div>
  ),
};
