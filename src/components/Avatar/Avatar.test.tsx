import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('should render with image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Test User" />);
    // The Avatar component renders a span with role="img" containing an img element
    // Both the span (aria-label) and img (alt) have accessible names, so use getAllByRole
    const avatars = screen.getAllByRole('img', { name: 'Test User' });
    const avatar = avatars[0]; // The span wrapper
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('aria-label', 'Test User');
    expect(avatar.querySelector('img')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  it('should render fallback initials when no src', () => {
    render(<Avatar fallback="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should render default icon when no src or fallback', () => {
    render(<Avatar alt="User" />);
    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();
  });

  it('should show fallback when image fails to load', () => {
    render(<Avatar src="invalid.jpg" fallback="John Doe" />);
    const img = screen.getByRole('img').querySelector('img');
    if (img) {
      fireEvent.error(img);
    }
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should call onError when image fails to load', () => {
    const onError = vi.fn();
    render(<Avatar src="invalid.jpg" fallback="JD" onError={onError} />);
    const img = screen.getByRole('img').querySelector('img');
    if (img) {
      fireEvent.error(img);
    }
    expect(onError).toHaveBeenCalled();
  });

  it('should render with correct size', () => {
    render(<Avatar size="lg" fallback="AB" />);
    expect(screen.getByRole('img')).toHaveAttribute('data-size', 'lg');
  });

  it('should render status indicator', () => {
    render(<Avatar fallback="AB" status="online" />);
    expect(screen.getByLabelText('online')).toBeInTheDocument();
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Avatar ref={ref} fallback="AB" />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it('should truncate initials to 2 characters', () => {
    render(<Avatar fallback="John Michael Doe" />);
    expect(screen.getByText('JM')).toBeInTheDocument();
  });
});
