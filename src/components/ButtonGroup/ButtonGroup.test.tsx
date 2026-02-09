import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ButtonGroup } from './ButtonGroup';

const options = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

describe('ButtonGroup', () => {
  it('should render all options', () => {
    render(<ButtonGroup options={options} value="high" onChange={() => {}} />);
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('should mark selected option as pressed', () => {
    render(<ButtonGroup options={options} value="medium" onChange={() => {}} />);
    expect(screen.getByText('Medium')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('High')).toHaveAttribute('aria-pressed', 'false');
  });

  it('should call onChange when clicking an option', () => {
    const onChange = vi.fn();
    render(<ButtonGroup options={options} value="high" onChange={onChange} />);
    fireEvent.click(screen.getByText('Low'));
    expect(onChange).toHaveBeenCalledWith('low');
  });

  it('should apply size', () => {
    const { container } = render(
      <ButtonGroup options={options} value="high" onChange={() => {}} size="lg" />
    );
    expect(container.firstChild).toHaveAttribute('data-size', 'lg');
  });

  it('should have group role', () => {
    render(<ButtonGroup options={options} value="high" onChange={() => {}} />);
    expect(screen.getByRole('group')).toBeInTheDocument();
  });
});
