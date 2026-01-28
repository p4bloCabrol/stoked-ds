import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Switch } from './Switch';

describe('Switch', () => {
  it('should render with label', () => {
    render(<Switch label="Enable feature" />);
    expect(screen.getByText('Enable feature')).toBeInTheDocument();
  });

  it('should render switch with correct role', () => {
    render(<Switch label="Test" />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('should have aria-checked false by default', () => {
    render(<Switch label="Test" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('should toggle when clicked', async () => {
    const user = userEvent.setup();
    render(<Switch label="Test" />);
    const switchEl = screen.getByRole('switch');
    expect(switchEl).toHaveAttribute('aria-checked', 'false');
    await user.click(switchEl);
    expect(switchEl).toHaveAttribute('aria-checked', 'true');
  });

  it('should call onCheckedChange when toggled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Test" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('should be disabled', () => {
    render(<Switch label="Test" disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('should not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Test" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('should render description', () => {
    render(<Switch label="Test" description="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('should have aria-describedby when description is present', () => {
    render(<Switch id="test" label="Test" description="Description" />);
    expect(screen.getByRole('switch')).toHaveAttribute(
      'aria-describedby',
      'test-description'
    );
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Switch ref={ref} label="Test" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it('should toggle with keyboard', async () => {
    const user = userEvent.setup();
    render(<Switch label="Test" />);
    const switchEl = screen.getByRole('switch');
    switchEl.focus();
    await user.keyboard(' ');
    expect(switchEl).toHaveAttribute('aria-checked', 'true');
  });

  it('should support controlled mode', async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    const { rerender } = render(
      <Switch label="Test" checked={false} onCheckedChange={onCheckedChange} />
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    await user.click(screen.getByRole('switch'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    // Value doesn't change until controlled value changes
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    rerender(<Switch label="Test" checked={true} onCheckedChange={onCheckedChange} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });
});
