import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './_shared/layout';
import { StatCard } from '../components/StatCard';
import { Card, CardHeader, CardBody } from '../components/Card';
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '../components/Table';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { SearchInput } from '../components/SearchInput';
import { recentActivity } from './_shared/data';
import {
  PackageIcon,
  AlertTriangleIcon,
  WarehouseIcon,
  ShoppingCartIcon,
  DownloadIcon,
} from './_shared/icons';

const meta: Meta = {
  title: 'Pages/Dashboard Overview',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const activityBadgeColor: Record<string, 'success' | 'danger' | 'info' | 'warning'> = {
  entry: 'success',
  exit: 'danger',
  transfer: 'info',
  adjustment: 'warning',
};

export const Default: Story = {
  render: function DashboardPage() {
    const [search, setSearch] = useState('');

    return (
      <PageLayout
        activePage="dashboard"
        header={
          <>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Dashboard Overview</h3>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <SearchInput
                placeholder="Search..."
                size="sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline" size="sm">
                <DownloadIcon width={16} height={16} /> Export
              </Button>
            </div>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <StatCard
              icon={<PackageIcon />}
              label="Total Items"
              value="12,450"
              trend="+2.4%"
              trendDirection="up"
              status="success"
            />
            <StatCard
              icon={<AlertTriangleIcon />}
              label="Low Stock"
              value="23"
              trend="+5"
              trendDirection="up"
              status="warning"
            />
            <StatCard
              icon={<WarehouseIcon />}
              label="Warehouses"
              value="4"
              trend="1 maintenance"
              trendDirection="neutral"
              status="default"
            />
            <StatCard
              icon={<ShoppingCartIcon />}
              label="Orders Today"
              value="18"
              trend="-12%"
              trendDirection="down"
              status="danger"
            />
          </div>

          {/* Recent Activity Table */}
          <Card>
            <CardHeader>
              <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>Recent Activity</h4>
            </CardHeader>
            <CardBody style={{ padding: 0 }}>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Action</Th>
                      <Th>Product</Th>
                      <Th isNumeric>Qty</Th>
                      <Th>User</Th>
                      <Th>Time</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {recentActivity.map((entry) => (
                      <Tr key={entry.id} isHoverable>
                        <Td>
                          <Badge color={activityBadgeColor[entry.type]} size="sm">
                            {entry.action}
                          </Badge>
                        </Td>
                        <Td>{entry.product}</Td>
                        <Td isNumeric>
                          {entry.quantity > 0 ? `+${entry.quantity}` : entry.quantity}
                        </Td>
                        <Td>{entry.user}</Td>
                        <Td style={{ color: 'var(--stoked-color-text-secondary)' }}>{entry.timestamp}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <Card hoverable>
              <CardBody>
                <h4 style={{ margin: '0 0 0.5rem' }}>New Stock Entry</h4>
                <p style={{ margin: '0 0 1rem', color: 'var(--stoked-color-text-secondary)', fontSize: '0.875rem' }}>
                  Register incoming inventory from suppliers
                </p>
                <Button variant="solid" size="sm">Create Entry</Button>
              </CardBody>
            </Card>
            <Card hoverable>
              <CardBody>
                <h4 style={{ margin: '0 0 0.5rem' }}>Generate Report</h4>
                <p style={{ margin: '0 0 1rem', color: 'var(--stoked-color-text-secondary)', fontSize: '0.875rem' }}>
                  Build custom inventory reports and analytics
                </p>
                <Button variant="outline" size="sm">Build Report</Button>
              </CardBody>
            </Card>
            <Card hoverable>
              <CardBody>
                <h4 style={{ margin: '0 0 0.5rem' }}>Stock Transfer</h4>
                <p style={{ margin: '0 0 1rem', color: 'var(--stoked-color-text-secondary)', fontSize: '0.875rem' }}>
                  Move items between warehouses
                </p>
                <Button variant="outline" size="sm">Transfer Items</Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </PageLayout>
    );
  },
};
