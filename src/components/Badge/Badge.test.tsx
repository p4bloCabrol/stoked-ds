import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Badge } from './Badge';

describe('Badge', () => {
  it('should render with default props', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('data-variant', 'solid');
    expect(badge).toHaveAttribute('data-color', 'primary');
    expect(badge).toHaveAttribute('data-size', 'md');
  });

  it('should render with custom variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    expect(screen.getByText('Outline Badge')).toHaveAttribute('data-variant', 'outline');
  });

  it('should render with custom color', () => {
    render(<Badge color="success">Success Badge</Badge>);
    expect(screen.getByText('Success Badge')).toHaveAttribute('data-color', 'success');
  });

  it('should render with custom size', () => {
    render(<Badge size="lg">Large Badge</Badge>);
    expect(screen.getByText('Large Badge')).toHaveAttribute('data-size', 'lg');
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Badge ref={ref}>Ref Badge</Badge>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it('should accept additional className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    expect(screen.getByText('Custom Badge')).toHaveClass('custom-class');
  });

  it('should pass through additional props', () => {
    render(<Badge data-testid="badge-test">Props Badge</Badge>);
    expect(screen.getByTestId('badge-test')).toBeInTheDocument();
  });
});
