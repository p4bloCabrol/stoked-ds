import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'solid', 'outline', 'left-accent'],
    },
    dismissible: { control: 'boolean' },
  },
  args: {
    status: 'info',
    variant: 'subtle',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

export const Statuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert status="info" title="Info">
        This is an info alert - check it out!
      </Alert>
      <Alert status="success" title="Success">
        Your changes have been saved successfully.
      </Alert>
      <Alert status="warning" title="Warning">
        Your session is about to expire.
      </Alert>
      <Alert status="error" title="Error">
        There was an error processing your request.
      </Alert>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Alert variant="subtle" status="success" title="Subtle">
        Subtle variant with light background.
      </Alert>
      <Alert variant="solid" status="success" title="Solid">
        Solid variant with full color background.
      </Alert>
      <Alert variant="outline" status="success" title="Outline">
        Outline variant with border only.
      </Alert>
      <Alert variant="left-accent" status="success" title="Left Accent">
        Left accent variant with colored border.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  args: {
    status: 'info',
    title: 'Dismissible Alert',
    children: 'Click the X button to dismiss this alert.',
    dismissible: true,
    onDismiss: () => alert('Dismissed!'),
  },
};

export const WithoutTitle: Story = {
  args: {
    status: 'warning',
    children: 'This alert has no title, just a description.',
  },
};

export const TitleOnly: Story = {
  args: {
    status: 'success',
    title: 'Operation completed successfully!',
  },
};

export const AllCombinations: Story = {
  name: 'All Combinations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {(['subtle', 'solid', 'outline', 'left-accent'] as const).map((variant) => (
        <div key={variant}>
          <div
            style={{
              fontSize: 'var(--stoked-text-sm)',
              color: 'var(--stoked-color-text-muted)',
              marginBottom: 'var(--stoked-spacing-2)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {variant}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(['info', 'success', 'warning', 'error'] as const).map((status) => (
              <Alert key={status} variant={variant} status={status} title={`${status} alert`}>
                This is a {status} alert with {variant} variant.
              </Alert>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    status: 'info',
    variant: 'left-accent',
    title: 'Terms of Service Updated',
    children:
      'We have updated our terms of service. Please review the changes carefully. The new terms will be effective starting from January 1st, 2026. If you have any questions, please contact our support team.',
    dismissible: true,
  },
};
