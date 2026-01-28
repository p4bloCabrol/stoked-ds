import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Card, CardHeader, CardBody, CardFooter, CardImage } from './Card';

describe('Card', () => {
  it('should render card with content', () => {
    render(
      <Card>
        <CardBody>Card content</CardBody>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should render as article element', () => {
    render(
      <Card>
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('should apply elevated variant by default', () => {
    render(
      <Card>
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(screen.getByRole('article')).toHaveAttribute('data-variant', 'elevated');
  });

  it('should apply outlined variant', () => {
    render(
      <Card variant="outlined">
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(screen.getByRole('article')).toHaveAttribute('data-variant', 'outlined');
  });

  it('should apply filled variant', () => {
    render(
      <Card variant="filled">
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(screen.getByRole('article')).toHaveAttribute('data-variant', 'filled');
  });

  it('should be clickable when isClickable is true', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Card isClickable onClick={onClick}>
        <CardBody>Clickable card</CardBody>
      </Card>
    );
    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('data-clickable', 'true');
    expect(card).toHaveAttribute('tabIndex', '0');
    await user.click(card);
    expect(onClick).toHaveBeenCalled();
  });

  it('should apply hoverable data attribute', () => {
    render(
      <Card isHoverable>
        <CardBody>Hoverable card</CardBody>
      </Card>
    );
    expect(screen.getByRole('article')).toHaveAttribute('data-hoverable', 'true');
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(
      <Card ref={ref}>
        <CardBody>Content</CardBody>
      </Card>
    );
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLElement));
  });
});

describe('CardHeader', () => {
  it('should render header content', () => {
    render(<CardHeader>Header Content</CardHeader>);
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('should render as header element', () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});

describe('CardBody', () => {
  it('should render body content', () => {
    render(<CardBody>Body Content</CardBody>);
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('should render footer content', () => {
    render(<CardFooter>Footer Content</CardFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('should render as footer element', () => {
    render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

describe('CardImage', () => {
  it('should render image with src and alt', () => {
    render(<CardImage src="test.jpg" alt="Test image" />);
    const img = screen.getByRole('img', { name: 'Test image' });
    expect(img).toHaveAttribute('src', 'test.jpg');
  });
});

describe('Card composition', () => {
  it('should render full card with all sections', () => {
    render(
      <Card>
        <CardImage src="image.jpg" alt="Card image" />
        <CardHeader>Card Title</CardHeader>
        <CardBody>Card body content</CardBody>
        <CardFooter>Card footer</CardFooter>
      </Card>
    );

    expect(screen.getByRole('img', { name: 'Card image' })).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card body content')).toBeInTheDocument();
    expect(screen.getByText('Card footer')).toBeInTheDocument();
  });
});
