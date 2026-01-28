import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAttribute('data-variant', 'solid');
    expect(button).toHaveAttribute('data-size', 'md');
    expect(button).toHaveAttribute('data-color', 'primary');
  });

  it('should render as submit button when type is submit', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('should apply variant data attribute', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-variant', 'outline');
  });

  it('should apply color data attribute', () => {
    render(<Button color="danger">Danger</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-color', 'danger');
  });

  it('should apply size data attribute', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-size', 'lg');
  });

  it('should call onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('should not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Click me
      </Button>
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should show aria-busy when loading', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('should be focusable via tab', async () => {
    const user = userEvent.setup();
    render(<Button>Focus me</Button>);
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement));
  });

  it('should render left icon', () => {
    render(
      <Button leftIcon={<span data-testid="left-icon">L</span>}>With Icon</Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('should render right icon', () => {
    render(
      <Button rightIcon={<span data-testid="right-icon">R</span>}>With Icon</Button>
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('should not render icons when loading', () => {
    render(
      <Button
        loading
        leftIcon={<span data-testid="left-icon">L</span>}
        rightIcon={<span data-testid="right-icon">R</span>}
      >
        Loading
      </Button>
    );
    expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
  });

  it('should apply fullWidth data attribute', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-full-width', 'true');
  });

  it('should accept additional className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
