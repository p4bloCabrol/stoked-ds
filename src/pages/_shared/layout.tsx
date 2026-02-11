import { useState, type ReactNode } from 'react';
import { AppShell } from '../../components/AppShell';
import { Sidebar, SidebarItem, SidebarSection } from '../../components/Sidebar';
import { Avatar } from '../../components/Avatar';
import {
  DashboardIcon,
  InventoryIcon,
  WarehouseIcon,
  ReportsIcon,
  SettingsIcon,
} from './icons';

type Page = 'dashboard' | 'inventory' | 'warehouses' | 'reports' | 'settings';

interface PageLayoutProps {
  activePage: Page;
  header?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ activePage, header, children }: PageLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppShell
      sidebar={
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          logo={<span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>STOKED INV</span>}
          collapsedLogo={<span style={{ fontWeight: 700, fontSize: '1.1rem' }}>S</span>}
          footer={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Avatar fallback="PC" size="sm" />
              {!collapsed && (
                <div style={{ lineHeight: 1.3 }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Pablo C.</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--stoked-color-text-secondary)' }}>Admin</div>
                </div>
              )}
            </div>
          }
        >
          <SidebarSection title="Main">
            <SidebarItem icon={<DashboardIcon />} label="Dashboard" active={activePage === 'dashboard'} />
            <SidebarItem icon={<InventoryIcon />} label="Inventory" active={activePage === 'inventory'} />
            <SidebarItem icon={<WarehouseIcon />} label="Warehouses" active={activePage === 'warehouses'} />
            <SidebarItem icon={<ReportsIcon />} label="Reports" active={activePage === 'reports'} />
          </SidebarSection>
          <SidebarSection title="System">
            <SidebarItem icon={<SettingsIcon />} label="Settings" active={activePage === 'settings'} />
          </SidebarSection>
        </Sidebar>
      }
      header={header}
    >
      {children}
    </AppShell>
  );
}
