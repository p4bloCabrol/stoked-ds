import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('should render with default props', () => {
    render(<Progress />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should have correct aria attributes', () => {
    render(<Progress value={50} max={100} label="Upload progress" />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '50');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
    expect(progress).toHaveAttribute('aria-label', 'Upload progress');
    expect(progress).toHaveAttribute('aria-valuetext', '50%');
  });

  it('should show value when showValue is true', () => {
    render(<Progress value={75} showValue />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should not show value when indeterminate', () => {
    render(<Progress value={50} showValue indeterminate />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  it('should clamp value between 0 and max', () => {
    const { rerender } = render(<Progress value={150} max={100} label="test" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', '100%');

    rerender(<Progress value={-50} max={100} label="test" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', '0%');
  });

  it('should render with different sizes', () => {
    const { rerender } = render(<Progress size="sm" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-size', 'sm');

    rerender(<Progress size="lg" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('data-size', 'lg');
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Progress ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('should not have aria-valuenow when indeterminate', () => {
    render(<Progress indeterminate />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  });
});
