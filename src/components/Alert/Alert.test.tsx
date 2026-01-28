import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('should render with default props', () => {
    render(<Alert>Test message</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should render title', () => {
    render(<Alert title="Alert Title">Message</Alert>);
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
  });

  it('should render with different statuses', () => {
    const { rerender } = render(<Alert status="success">Message</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-status', 'success');

    rerender(<Alert status="error">Message</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-status', 'error');

    rerender(<Alert status="warning">Message</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-status', 'warning');
  });

  it('should render with different variants', () => {
    const { rerender } = render(<Alert variant="solid">Message</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'solid');

    rerender(<Alert variant="outline">Message</Alert>);
    expect(screen.getByRole('alert')).toHaveAttribute('data-variant', 'outline');
  });

  it('should show dismiss button when dismissible', () => {
    render(<Alert dismissible>Message</Alert>);
    expect(screen.getByRole('button', { name: 'Dismiss alert' })).toBeInTheDocument();
  });

  it('should not show dismiss button by default', () => {
    render(<Alert>Message</Alert>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should call onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Message</Alert>);
    await user.click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should render custom icon', () => {
    render(
      <Alert icon={<span data-testid="custom-icon">!</span>}>Message</Alert>
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Alert ref={ref}>Message</Alert>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('should accept additional className', () => {
    render(<Alert className="custom-alert">Message</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-alert');
  });
});
