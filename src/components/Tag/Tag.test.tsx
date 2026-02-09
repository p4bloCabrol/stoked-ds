import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('should render children', () => {
    render(<Tag>Active</Tag>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('should apply color and variant', () => {
    const { container } = render(<Tag color="success" variant="outline">OK</Tag>);
    const tag = container.firstChild as HTMLElement;
    expect(tag).toHaveAttribute('data-color', 'success');
    expect(tag).toHaveAttribute('data-variant', 'outline');
  });

  it('should apply size', () => {
    const { container } = render(<Tag size="lg">Big</Tag>);
    const tag = container.firstChild as HTMLElement;
    expect(tag).toHaveAttribute('data-size', 'lg');
  });

  it('should render remove button when removable', () => {
    render(<Tag removable>Remove me</Tag>);
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('should call onRemove when remove button is clicked', () => {
    const onRemove = vi.fn();
    render(<Tag removable onRemove={onRemove}>Remove me</Tag>);
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('should not render remove button when not removable', () => {
    render(<Tag>Static</Tag>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render icon', () => {
    render(<Tag icon={<span data-testid="icon">*</span>}>With icon</Tag>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
