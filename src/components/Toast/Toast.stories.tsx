import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from './ToastProvider';
import { useToast } from './ToastContext';
import { Button } from '../Button';

const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button
          onClick={() =>
            toast({
              title: 'Info',
              description: 'This is an informational message.',
              status: 'info',
            })
          }
        >
          Info Toast
        </Button>
        <Button
          color="success"
          variant="outline"
          onClick={() =>
            toast({
              title: 'Success!',
              description: 'Your changes have been saved.',
              status: 'success',
            })
          }
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: 'Warning',
              description: 'Your session is about to expire.',
              status: 'warning',
            })
          }
        >
          Warning Toast
        </Button>
        <Button
          color="danger"
          variant="outline"
          onClick={() =>
            toast({
              title: 'Error',
              description: 'Something went wrong. Please try again.',
              status: 'error',
            })
          }
        >
          Error Toast
        </Button>
      </div>
    </div>
  );
};

const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const TitleOnly: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() =>
          toast({
            title: 'Item saved successfully!',
            status: 'success',
          })
        }
      >
        Show Toast
      </Button>
    );
  },
};

export const DescriptionOnly: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() =>
          toast({
            description: 'Your preferences have been updated.',
            status: 'info',
          })
        }
      >
        Show Toast
      </Button>
    );
  },
};

export const NonClosable: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <Button
        onClick={() =>
          toast({
            title: 'Processing...',
            description: 'Please wait while we process your request.',
            status: 'info',
            isClosable: false,
            duration: 3000,
          })
        }
      >
        Show Non-closable Toast
      </Button>
    );
  },
};

export const CustomDuration: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: 'Quick toast',
              description: 'Disappears in 2 seconds',
              duration: 2000,
            })
          }
        >
          2s Duration
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: 'Persistent toast',
              description: 'Stays for 10 seconds',
              duration: 10000,
            })
          }
        >
          10s Duration
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: 'Permanent toast',
              description: 'Must be manually closed',
              duration: 0,
            })
          }
        >
          No Auto-dismiss
        </Button>
      </div>
    );
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const { toast, removeAllToasts } = useToast();
    return (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          onClick={() => {
            toast({ title: 'First toast', status: 'info' });
            setTimeout(
              () => toast({ title: 'Second toast', status: 'success' }),
              200
            );
            setTimeout(
              () => toast({ title: 'Third toast', status: 'warning' }),
              400
            );
          }}
        >
          Show Multiple Toasts
        </Button>
        <Button variant="outline" color="danger" onClick={removeAllToasts}>
          Clear All
        </Button>
      </div>
    );
  },
};

// For position demo, we need separate providers
const PositionDemo = ({ position }: { position: string }) => {
  return (
    <ToastProvider position={position as any}>
      <PositionDemoInner />
    </ToastProvider>
  );
};

const PositionDemoInner = () => {
  const { toast } = useToast();
  return (
    <Button
      onClick={() =>
        toast({
          title: 'Positioned Toast',
          description: 'Check the position!',
          status: 'success',
        })
      }
    >
      Show Toast
    </Button>
  );
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <PositionDemo position="top-left" />
      <PositionDemo position="top" />
      <PositionDemo position="top-right" />
      <PositionDemo position="bottom-left" />
      <PositionDemo position="bottom" />
      <PositionDemo position="bottom-right" />
    </div>
  ),
  decorators: [], // Remove the default decorator
};
