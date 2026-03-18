import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import type { StepItem } from './Stepper.types';

const processSteps: StepItem[] = [
  {
    id: 'init',
    label: 'Initialization',
    description: 'Completed 12:40 PM',
  },
  {
    id: 'validation',
    label: 'Validation',
    description: 'Verified (102 Nodes)',
  },
  {
    id: 'deployment',
    label: 'Deployment',
    description: 'In Progress...',
  },
  {
    id: 'audit',
    label: 'Final Audit',
    description: 'Scheduled',
  },
];

const meta = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    activeStep: { control: { type: 'range', min: 0, max: 3, step: 1 } },
    clickable: { control: 'boolean' },
  },
  args: {
    steps: processSteps,
    activeStep: 2,
    orientation: 'horizontal',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 700, padding: '2rem 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllCompleted: Story = {
  args: {
    activeStep: 4,
  },
};

export const FirstStep: Story = {
  args: {
    activeStep: 0,
  },
};

export const WithError: Story = {
  args: {
    steps: [
      { id: 'upload', label: 'Upload', description: 'Completed' },
      { id: 'validate', label: 'Validate', description: 'Failed', status: 'error' },
      { id: 'deploy', label: 'Deploy', description: 'Blocked' },
      { id: 'verify', label: 'Verify', description: 'Pending' },
    ],
    activeStep: 1,
  },
};

export const Clickable: Story = {
  render: () => {
    const [active, setActive] = useState(2);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Stepper
          steps={processSteps}
          activeStep={active}
          clickable
          onChange={setActive}
        />
        <p style={{ fontSize: '0.75rem', color: 'var(--stoked-color-text-secondary)' }}>
          Active step: {active} ({processSteps[active]?.label})
        </p>
      </div>
    );
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    activeStep: 2,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--stoked-color-text-muted)', marginBottom: '1rem' }}>Small</p>
        <Stepper steps={processSteps} activeStep={2} size="sm" />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--stoked-color-text-muted)', marginBottom: '1rem' }}>Medium (default)</p>
        <Stepper steps={processSteps} activeStep={2} size="md" />
      </div>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--stoked-color-text-muted)', marginBottom: '1rem' }}>Large</p>
        <Stepper steps={processSteps} activeStep={2} size="lg" />
      </div>
    </div>
  ),
};

export const FiveSteps: Story = {
  args: {
    steps: [
      { id: 'cart', label: 'Cart', description: '3 items' },
      { id: 'shipping', label: 'Shipping', description: 'Express' },
      { id: 'payment', label: 'Payment', description: 'Card ending 4242' },
      { id: 'review', label: 'Review', description: 'Confirm order' },
      { id: 'done', label: 'Done', description: 'Order placed' },
    ],
    activeStep: 3,
  },
};
