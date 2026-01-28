import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('should render with default props', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should have accessible label', () => {
    render(<Spinner label="Loading data" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading data');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByRole('status')).toHaveAttribute('data-size', 'sm');

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveAttribute('data-size', 'lg');
  });

  it('should render with different colors', () => {
    const { rerender } = render(<Spinner color="primary" />);
    expect(screen.getByRole('status')).toHaveAttribute('data-color', 'primary');

    rerender(<Spinner color="white" />);
    expect(screen.getByRole('status')).toHaveAttribute('data-color', 'white');
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Spinner ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it('should accept additional className', () => {
    render(<Spinner className="custom-spinner" />);
    expect(screen.getByRole('status')).toHaveClass('custom-spinner');
  });

  it('should have screen reader text', () => {
    render(<Spinner label="Please wait" />);
    expect(screen.getByText('Please wait')).toBeInTheDocument();
  });
});
