import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarItem, SidebarSection } from './Sidebar';

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </svg>
);

const InventoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const ReportsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: 500, display: 'flex' }}>
        <Story />
        <div style={{ flex: 1, padding: '2rem' }}>
          <h2>Main Content Area</h2>
          <p style={{ color: 'var(--stoked-color-text-secondary)' }}>
            The sidebar sits alongside this content.
          </p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <Sidebar
      logo={<span>STOKED</span>}
    >
      <SidebarSection>
        <SidebarItem icon={<DashboardIcon />} label="Dashboard" active />
        <SidebarItem icon={<InventoryIcon />} label="Inventory" />
        <SidebarItem icon={<ReportsIcon />} label="Reports" />
        <SidebarItem icon={<SettingsIcon />} label="Settings" />
      </SidebarSection>
    </Sidebar>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Sidebar
      collapsed
      logo={<span>S</span>}
    >
      <SidebarSection>
        <SidebarItem icon={<DashboardIcon />} label="Dashboard" active />
        <SidebarItem icon={<InventoryIcon />} label="Inventory" />
        <SidebarItem icon={<ReportsIcon />} label="Reports" />
        <SidebarItem icon={<SettingsIcon />} label="Settings" />
      </SidebarSection>
    </Sidebar>
  ),
};

export const Collapsible: Story = {
  name: 'Collapsible (Interactive)',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        logo={<span>STOKED</span>}
        collapsedLogo={<span>S</span>}
        footer={
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              backgroundColor: 'var(--stoked-color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '0.75rem', fontWeight: 600,
            }}>
              JD
            </div>
            {!collapsed && (
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>John Doe</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--stoked-color-text-muted)' }}>Main Warehouse</div>
              </div>
            )}
          </div>
        }
      >
        <SidebarSection title="Main">
          <SidebarItem icon={<DashboardIcon />} label="Dashboard" active />
          <SidebarItem icon={<InventoryIcon />} label="Inventory" />
          <SidebarItem icon={<ReportsIcon />} label="Reports" />
        </SidebarSection>
        <SidebarSection title="System">
          <SidebarItem icon={<SettingsIcon />} label="Settings" />
        </SidebarSection>
      </Sidebar>
    );
  },
};
