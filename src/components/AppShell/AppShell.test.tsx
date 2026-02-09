import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('should render children in main area', () => {
    render(<AppShell>Main Content</AppShell>);
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('should render sidebar', () => {
    render(<AppShell sidebar={<nav data-testid="sidebar">Nav</nav>}>Content</AppShell>);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('should render header', () => {
    render(<AppShell header={<span>Header Title</span>}>Content</AppShell>);
    expect(screen.getByText('Header Title')).toBeInTheDocument();
  });

  it('should render all sections together', () => {
    render(
      <AppShell
        sidebar={<div>Sidebar</div>}
        header={<div>Header</div>}
      >
        Main
      </AppShell>
    );
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
  });
});
