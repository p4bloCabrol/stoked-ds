import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Add Item' },
  ];

  it('should render all items', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('should render links for items with href', () => {
    render(<Breadcrumb items={items} />);
    const homeLink = screen.getByText('Home');
    expect(homeLink.tagName).toBe('A');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('should render last item as current page', () => {
    render(<Breadcrumb items={items} />);
    const current = screen.getByText('Add Item');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('should render separators', () => {
    render(<Breadcrumb items={items} />);
    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });

  it('should support custom separator', () => {
    render(<Breadcrumb items={items} separator=">" />);
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(2);
  });

  it('should have navigation landmark', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });
});
