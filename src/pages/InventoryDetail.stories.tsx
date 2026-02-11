import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './_shared/layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { Badge } from '../components/Badge';
import { Tag } from '../components/Tag';
import { Button } from '../components/Button';
import { StatCard } from '../components/StatCard';
import { Card, CardHeader, CardBody } from '../components/Card';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../components/Tabs';
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '../components/Table';
import { products, stockMovements } from './_shared/data';
import { PackageIcon, TrendUpIcon, WarehouseIcon, EditIcon } from './_shared/icons';

const meta: Meta = {
  title: 'Pages/Inventory Detail',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const item = products[0];

const movementBadge: Record<string, { color: 'success' | 'danger' | 'info' | 'warning'; label: string }> = {
  entry: { color: 'success', label: 'Entry' },
  exit: { color: 'danger', label: 'Exit' },
  transfer: { color: 'info', label: 'Transfer' },
  adjustment: { color: 'warning', label: 'Adjustment' },
};

export const Default: Story = {
  render: function InventoryDetailPage() {
    const [activeTab, setActiveTab] = useState(0);

    return (
      <PageLayout
        activePage="inventory"
        header={
          <>
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Inventory', href: '#' },
                { label: item.name },
              ]}
            />
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <Button variant="outline" size="sm">
                <EditIcon width={16} height={16} /> Edit
              </Button>
              <Button variant="solid" size="sm">Add Stock</Button>
            </div>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Product Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{item.name}</h2>
            <Badge color="success">In Stock</Badge>
            <Tag size="sm" variant="outline" color="neutral">{item.category}</Tag>
            <span style={{ color: 'var(--stoked-color-text-secondary)', fontSize: '0.8125rem', fontFamily: 'monospace' }}>
              {item.sku}
            </span>
          </div>

          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <StatCard
              icon={<PackageIcon />}
              label="Current Stock"
              value={item.stock.toLocaleString()}
              trend="+500 this week"
              trendDirection="up"
              status="success"
            />
            <StatCard
              icon={<TrendUpIcon />}
              label="Avg. Monthly Usage"
              value="320"
              trend="+8.2%"
              trendDirection="up"
              status="default"
            />
            <StatCard
              icon={<WarehouseIcon />}
              label="Locations"
              value="2"
              trend="A, C"
              trendDirection="neutral"
              status="default"
            />
          </div>

          {/* Tabs */}
          <Card>
            <CardBody style={{ padding: 0 }}>
              <Tabs index={activeTab} onChange={setActiveTab}>
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Stock History</Tab>
                  <Tab>Locations</Tab>
                </TabList>
                <TabPanels>
                  {/* Overview */}
                  <TabPanel>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 1rem', fontSize: '0.875rem', fontWeight: 600 }}>Details</h4>
                        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.5rem 1rem', fontSize: '0.875rem' }}>
                          <dt style={{ color: 'var(--stoked-color-text-secondary)' }}>SKU</dt>
                          <dd style={{ margin: 0, fontFamily: 'monospace' }}>{item.sku}</dd>
                          <dt style={{ color: 'var(--stoked-color-text-secondary)' }}>Category</dt>
                          <dd style={{ margin: 0 }}>{item.category}</dd>
                          <dt style={{ color: 'var(--stoked-color-text-secondary)' }}>Unit Price</dt>
                          <dd style={{ margin: 0 }}>${item.price.toFixed(2)}</dd>
                          <dt style={{ color: 'var(--stoked-color-text-secondary)' }}>Min Stock</dt>
                          <dd style={{ margin: 0 }}>{item.minStock}</dd>
                          <dt style={{ color: 'var(--stoked-color-text-secondary)' }}>Last Updated</dt>
                          <dd style={{ margin: 0 }}>{item.lastUpdated}</dd>
                        </dl>
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 1rem', fontSize: '0.875rem', fontWeight: 600 }}>Inventory Value</h4>
                        <div style={{ fontSize: '2rem', fontWeight: 700 }}>
                          ${(item.stock * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                        <p style={{ color: 'var(--stoked-color-text-secondary)', fontSize: '0.8125rem', margin: '0.25rem 0 0' }}>
                          {item.stock.toLocaleString()} units x ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </TabPanel>

                  {/* Stock History */}
                  <TabPanel>
                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>Date</Th>
                            <Th>Type</Th>
                            <Th isNumeric>Quantity</Th>
                            <Th>Warehouse</Th>
                            <Th>Reference</Th>
                            <Th>User</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {stockMovements.map((mov) => {
                            const badge = movementBadge[mov.type];
                            return (
                              <Tr key={mov.id} isHoverable>
                                <Td>{mov.date}</Td>
                                <Td>
                                  <Badge color={badge.color} size="sm">{badge.label}</Badge>
                                </Td>
                                <Td isNumeric style={{ color: mov.quantity > 0 ? 'var(--stoked-color-success)' : 'var(--stoked-color-danger)' }}>
                                  {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                                </Td>
                                <Td>{mov.warehouse}</Td>
                                <Td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{mov.reference}</Td>
                                <Td>{mov.user}</Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>

                  {/* Locations */}
                  <TabPanel>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem' }}>
                      <Card variant="outline">
                        <CardBody>
                          <h4 style={{ margin: '0 0 0.5rem' }}>Warehouse A</h4>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--stoked-color-text-secondary)' }}>
                            Buenos Aires, AR
                          </p>
                          <div style={{ margin: '0.75rem 0 0', fontSize: '1.25rem', fontWeight: 600 }}>
                            1,000 units
                          </div>
                        </CardBody>
                      </Card>
                      <Card variant="outline">
                        <CardBody>
                          <h4 style={{ margin: '0 0 0.5rem' }}>Warehouse C</h4>
                          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--stoked-color-text-secondary)' }}>
                            Cordoba, AR
                          </p>
                          <div style={{ margin: '0.75rem 0 0', fontSize: '1.25rem', fontWeight: 600 }}>
                            250 units
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </PageLayout>
    );
  },
};
