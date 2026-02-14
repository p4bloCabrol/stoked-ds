import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('should render with default props', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute('data-variant', 'text');
  });

  it('should render with different variants', () => {
    const { rerender } = render(<Skeleton data-testid="skeleton" variant="circular" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-variant', 'circular');

    rerender(<Skeleton data-testid="skeleton" variant="rectangular" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-variant', 'rectangular');

    rerender(<Skeleton data-testid="skeleton" variant="rounded" />);
    expect(screen.getByTestId('skeleton')).toHaveAttribute('data-variant', 'rounded');
  });

  it('should render with different animations', () => {
    // Animation is handled by CSS keyframes, so we just verify the component renders
    const { rerender } = render(<Skeleton data-testid="skeleton" animation="wave" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();

    rerender(<Skeleton data-testid="skeleton" animation="none" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();

    rerender(<Skeleton data-testid="skeleton" animation="pulse" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('should apply custom width and height', () => {
    render(<Skeleton data-testid="skeleton" width={200} height={100} />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({ width: '200px', height: '100px' });
  });

  it('should apply string width and height', () => {
    render(<Skeleton data-testid="skeleton" width="50%" height="2rem" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveStyle({ width: '50%', height: '2rem' });
  });

  it('should render multiple lines for text variant', () => {
    render(<Skeleton data-testid="skeleton" variant="text" lines={3} />);
    const wrapper = screen.getByTestId('skeleton');
    const lines = wrapper.querySelectorAll('[data-variant="text"]');
    expect(lines).toHaveLength(3);
  });

  it('should make last line shorter when multiple lines', () => {
    render(<Skeleton data-testid="skeleton" variant="text" lines={3} />);
    const wrapper = screen.getByTestId('skeleton');
    const lines = wrapper.querySelectorAll('[data-variant="text"]');
    const lastLine = lines[lines.length - 1];
    expect(lastLine).toHaveStyle({ width: '80%' });
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Skeleton ref={ref} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('should accept additional className', () => {
    render(<Skeleton data-testid="skeleton" className="custom-skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-skeleton');
  });
});
