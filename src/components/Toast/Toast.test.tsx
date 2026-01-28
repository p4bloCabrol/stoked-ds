import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider } from './ToastProvider';
import { useToast } from './ToastContext';

// Test component that uses the toast hook
function TestComponent() {
  const toastApi = useToast();

  return (
    <div>
      <button
        onClick={() =>
          toastApi.toast({
            title: 'Test Toast',
            description: 'Test description',
            status: 'success',
          })
        }
      >
        Show Toast
      </button>
      <button onClick={toastApi.removeAllToasts}>Clear All</button>
    </div>
  );
}

describe('Toast', () => {
  it('should throw error when useToast is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useToast must be used within a ToastProvider');

    consoleError.mockRestore();
  });

  it('should show toast when triggered', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Show Toast' }));

    await waitFor(() => {
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });
  });

  it('should close toast when close button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Show Toast' }));

    await waitFor(() => {
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: 'Close notification' }));

    await waitFor(() => {
      expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
    });
  });

  it('should clear all toasts', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Show multiple toasts
    await user.click(screen.getByRole('button', { name: 'Show Toast' }));
    await user.click(screen.getByRole('button', { name: 'Show Toast' }));

    await waitFor(() => {
      expect(screen.getAllByText('Test Toast')).toHaveLength(2);
    });

    await user.click(screen.getByRole('button', { name: 'Clear All' }));

    await waitFor(() => {
      expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
    });
  });

  it('should respect maxToasts limit', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider maxToasts={2}>
        <TestComponent />
      </ToastProvider>
    );

    // Show 3 toasts
    await user.click(screen.getByRole('button', { name: 'Show Toast' }));
    await user.click(screen.getByRole('button', { name: 'Show Toast' }));
    await user.click(screen.getByRole('button', { name: 'Show Toast' }));

    await waitFor(() => {
      // Should only show 2
      expect(screen.getAllByText('Test Toast')).toHaveLength(2);
    });
  });

  it('should have correct aria attributes', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Show Toast' }));

    await waitFor(() => {
      const toast = screen.getByRole('alert');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });
  });
});
