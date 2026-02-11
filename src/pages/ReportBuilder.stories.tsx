import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './_shared/layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { Card, CardHeader, CardBody } from '../components/Card';
import { Select } from '../components/Select';
import { ButtonGroup } from '../components/ButtonGroup';
import { Button } from '../components/Button';
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '../components/Table';
import { Badge } from '../components/Badge';
import { Progress } from '../components/Progress';
import { products, warehouses, categories } from './_shared/data';
import { DownloadIcon } from './_shared/icons';

const meta: Meta = {
  title: 'Pages/Report Builder',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function ReportBuilderPage() {
    const [reportType, setReportType] = useState('stock');
    const [warehouseFilter, setWarehouseFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [dateRange, setDateRange] = useState('');

    const filtered = products.filter((p) => {
      if (warehouseFilter && p.warehouse !== warehouseFilter) return false;
      if (categoryFilter && p.category.toLowerCase() !== categoryFilter) return false;
      return true;
    });

    const totalValue = filtered.reduce((acc, p) => acc + p.stock * p.price, 0);
    const totalItems = filtered.reduce((acc, p) => acc + p.stock, 0);

    return (
      <PageLayout
        activePage="reports"
        header={
          <>
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Reports' }]} />
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="outline" size="sm">
                <DownloadIcon width={16} height={16} /> Export CSV
              </Button>
            </div>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Filters */}
          <Card>
            <CardHeader>
              <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>Report Filters</h4>
            </CardHeader>
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ButtonGroup
                  options={[
                    { label: 'Stock Level', value: 'stock' },
                    { label: 'Valuation', value: 'valuation' },
                    { label: 'Movement', value: 'movement' },
                  ]}
                  value={reportType}
                  onChange={setReportType}
                  size="sm"
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <Select
                    label="Date Range"
                    placeholder="All time"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    options={[
                      { value: '7d', label: 'Last 7 days' },
                      { value: '30d', label: 'Last 30 days' },
                      { value: '90d', label: 'Last 90 days' },
                      { value: '1y', label: 'Last year' },
                    ]}
                    size="sm"
                  />
                  <Select
                    label="Warehouse"
                    placeholder="All warehouses"
                    value={warehouseFilter}
                    onChange={(e) => setWarehouseFilter(e.target.value)}
                    options={warehouses.map((w) => ({ value: w.name, label: w.name }))}
                    size="sm"
                  />
                  <Select
                    label="Category"
                    placeholder="All categories"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    options={categories.map((c) => ({ value: c.toLowerCase(), label: c }))}
                    size="sm"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <Card>
              <CardBody>
                <div style={{ fontSize: '0.8125rem', color: 'var(--stoked-color-text-secondary)' }}>Items Found</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{filtered.length}</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div style={{ fontSize: '0.8125rem', color: 'var(--stoked-color-text-secondary)' }}>Total Units</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>{totalItems.toLocaleString()}</div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div style={{ fontSize: '0.8125rem', color: 'var(--stoked-color-text-secondary)' }}>Total Value</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.25rem' }}>
                  ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>
                {reportType === 'stock' ? 'Stock Level Report' : reportType === 'valuation' ? 'Valuation Report' : 'Movement Report'}
              </h4>
            </CardHeader>
            <CardBody style={{ padding: 0 }}>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Product</Th>
                      <Th>SKU</Th>
                      <Th isNumeric>Stock</Th>
                      <Th isNumeric>Min</Th>
                      <Th>Stock Level</Th>
                      {reportType === 'valuation' && <Th isNumeric>Value</Th>}
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filtered.map((p) => {
                      const level = p.minStock > 0 ? Math.min((p.stock / p.minStock) * 100, 100) : 100;
                      const color = p.status === 'out-of-stock' ? 'danger' : p.status === 'low-stock' ? 'warning' : 'primary';
                      return (
                        <Tr key={p.id} isHoverable>
                          <Td style={{ fontWeight: 500 }}>{p.name}</Td>
                          <Td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{p.sku}</Td>
                          <Td isNumeric>{p.stock.toLocaleString()}</Td>
                          <Td isNumeric>{p.minStock}</Td>
                          <Td style={{ minWidth: 120 }}>
                            <Progress value={level} max={100} size="sm" color={color} />
                          </Td>
                          {reportType === 'valuation' && (
                            <Td isNumeric>${(p.stock * p.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</Td>
                          )}
                          <Td>
                            <Badge
                              color={p.status === 'in-stock' ? 'success' : p.status === 'low-stock' ? 'warning' : 'danger'}
                              size="sm"
                            >
                              {p.status === 'in-stock' ? 'OK' : p.status === 'low-stock' ? 'Low' : 'Out'}
                            </Badge>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </div>
      </PageLayout>
    );
  },
};
