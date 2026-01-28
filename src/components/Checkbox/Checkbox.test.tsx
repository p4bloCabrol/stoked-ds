import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('should render with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('should render checkbox input', () => {
    render(<Checkbox label="Test" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should be checkable', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Test" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should call onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Test" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    render(<Checkbox label="Test" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('should render description', () => {
    render(<Checkbox label="Test" description="This is a description" />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('should have aria-describedby when description is present', () => {
    render(<Checkbox id="test" label="Test" description="Description" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-describedby',
      'test-description'
    );
  });

  it('should have aria-invalid when error is true', () => {
    render(<Checkbox label="Test" error />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Checkbox ref={ref} label="Test" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
  });

  it('should set indeterminate state', () => {
    render(<Checkbox label="Test" indeterminate />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('should apply size data attribute', () => {
    render(<Checkbox label="Test" size="lg" />);
    const wrapper = screen.getByRole('checkbox').closest('[data-size]');
    expect(wrapper).toHaveAttribute('data-size', 'lg');
  });
});
