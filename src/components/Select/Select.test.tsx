import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

const options = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' },
];

describe('Select', () => {
  it('should render with default props', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render with label', () => {
    render(<Select label="Country" options={options} />);
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
  });

  it('should render placeholder', () => {
    render(<Select placeholder="Select one" options={options} />);
    expect(screen.getByText('Select one')).toBeInTheDocument();
  });

  it('should render all options', () => {
    render(<Select options={options} />);
    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  it('should show required indicator', () => {
    render(<Select label="Country" required options={options} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should show helper text', () => {
    render(<Select helperText="Select your country" options={options} />);
    expect(screen.getByText('Select your country')).toBeInTheDocument();
  });

  it('should show error and hide helper text', () => {
    render(<Select helperText="Helper" error="Error message" options={options} />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
  });

  it('should have aria-invalid when error is present', () => {
    render(<Select error="Error" options={options} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('should call onChange when selection changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await user.selectOptions(screen.getByRole('combobox'), 'opt2');
    expect(onChange).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    render(<Select disabled options={options} />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Select ref={ref} options={options} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSelectElement));
  });

  it('should render children instead of options', () => {
    render(
      <Select>
        <option value="a">Child A</option>
        <option value="b">Child B</option>
      </Select>
    );
    expect(screen.getByText('Child A')).toBeInTheDocument();
    expect(screen.getByText('Child B')).toBeInTheDocument();
  });

  it('should handle disabled options', () => {
    render(
      <Select
        options={[
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B', disabled: true },
        ]}
      />
    );
    const optionB = screen.getByText('B');
    expect(optionB).toHaveAttribute('disabled');
  });
});
