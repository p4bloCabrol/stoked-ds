import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from './AppShell';
import { Sidebar, SidebarItem, SidebarSection } from '../Sidebar';
import { Button } from '../Button';

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
);

const InventoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
);

const meta: Meta<typeof AppShell> = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <AppShell
        sidebar={
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            logo={<span>STOKED</span>}
            collapsedLogo={<span>S</span>}
          >
            <SidebarSection title="Menu">
              <SidebarItem icon={<DashboardIcon />} label="Dashboard" active />
              <SidebarItem icon={<InventoryIcon />} label="Inventory" />
              <SidebarItem icon={<SettingsIcon />} label="Settings" />
            </SidebarSection>
          </Sidebar>
        }
        header={
          <>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Dashboard Overview</h3>
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="solid" size="sm">Export</Button>
            </div>
          </>
        }
      >
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <h1 style={{ margin: 0 }}>Welcome back</h1>
          <p style={{ color: 'var(--stoked-color-text-secondary)', margin: 0 }}>
            This is the main content area of the AppShell layout.
          </p>
        </div>
      </AppShell>
    );
  },
};
