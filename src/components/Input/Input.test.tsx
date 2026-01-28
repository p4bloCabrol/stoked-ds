import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('should render with default props', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should show required indicator', () => {
    render(<Input label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should show helper text', () => {
    render(<Input helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('should show error message and hide helper text', () => {
    render(<Input helperText="Helper" error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
  });

  it('should have aria-invalid when error is present', () => {
    render(<Input error="Error" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should have aria-describedby for helper text', () => {
    render(<Input id="test-input" helperText="Helper" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-helper');
  });

  it('should have aria-describedby for error', () => {
    render(<Input id="test-input" error="Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });

  it('should call onChange when value changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'test');
    expect(onChange).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('should render left icon', () => {
    render(<Input leftIcon={<span data-testid="left-icon">L</span>} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('should render right icon', () => {
    render(<Input rightIcon={<span data-testid="right-icon">R</span>} />);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('should apply size data attribute', () => {
    render(<Input size="lg" />);
    const wrapper = screen.getByRole('textbox').closest('[data-size]');
    expect(wrapper).toHaveAttribute('data-size', 'lg');
  });

  it('should use provided id', () => {
    render(<Input id="custom-id" label="Test" />);
    expect(screen.getByLabelText('Test')).toHaveAttribute('id', 'custom-id');
  });
});
