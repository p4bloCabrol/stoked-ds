import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Sidebar, SidebarItem, SidebarSection } from './Sidebar';

describe('Sidebar', () => {
  it('should render with children', () => {
    render(
      <Sidebar data-testid="sidebar">
        <SidebarItem label="Dashboard" />
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should render logo', () => {
    render(<Sidebar logo={<span>STOKED</span>} />);
    expect(screen.getByText('STOKED')).toBeInTheDocument();
  });

  it('should render collapsed state', () => {
    render(<Sidebar data-testid="sidebar" collapsed />);
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-collapsed');
  });

  it('should call onToggle when toggle button is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<Sidebar onToggle={onToggle} />);
    await user.click(screen.getByLabelText('Collapse sidebar'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should render footer', () => {
    render(<Sidebar footer={<span>User Profile</span>} />);
    expect(screen.getByText('User Profile')).toBeInTheDocument();
  });
});

describe('SidebarItem', () => {
  it('should render with label', () => {
    render(<SidebarItem label="Inventory" />);
    expect(screen.getByText('Inventory')).toBeInTheDocument();
  });

  it('should render active state', () => {
    render(<SidebarItem label="Dashboard" active data-testid="item" />);
    expect(screen.getByTestId('item')).toHaveAttribute('data-active');
  });

  it('should render with icon', () => {
    render(<SidebarItem label="Reports" icon={<span data-testid="icon">R</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should call onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SidebarItem label="Settings" onClick={onClick} />);
    await user.click(screen.getByText('Settings'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('SidebarSection', () => {
  it('should render with title', () => {
    render(
      <SidebarSection title="Navigation">
        <SidebarItem label="Home" />
      </SidebarSection>
    );
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
