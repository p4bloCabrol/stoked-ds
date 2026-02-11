import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './_shared/layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { Card, CardHeader, CardBody } from '../components/Card';
import { Progress } from '../components/Progress';
import { Badge } from '../components/Badge';
import { Tag } from '../components/Tag';
import { Button } from '../components/Button';
import { warehouses } from './_shared/data';
import { PlusIcon } from './_shared/icons';

const meta: Meta = {
  title: 'Pages/Warehouse Overview',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const statusConfig: Record<string, { color: 'success' | 'warning' | 'danger'; label: string }> = {
  active: { color: 'success', label: 'Active' },
  full: { color: 'warning', label: 'Full' },
  maintenance: { color: 'danger', label: 'Maintenance' },
};

export const Default: Story = {
  render: function WarehousePage() {
    return (
      <PageLayout
        activePage="warehouses"
        header={
          <>
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Warehouses' }]} />
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="solid" size="sm">
                <PlusIcon width={16} height={16} /> Add Warehouse
              </Button>
            </div>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Summary */}
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
            <span><strong>{warehouses.length}</strong> total warehouses</span>
            <span style={{ color: 'var(--stoked-color-text-secondary)' }}>|</span>
            <span><strong>{warehouses.filter((w) => w.status === 'active').length}</strong> active</span>
            <span style={{ color: 'var(--stoked-color-text-secondary)' }}>|</span>
            <span><strong>{warehouses.reduce((acc, w) => acc + w.items, 0).toLocaleString()}</strong> total items</span>
          </div>

          {/* Warehouse Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {warehouses.map((wh) => {
              const pct = Math.round((wh.used / wh.capacity) * 100);
              const config = statusConfig[wh.status];
              const progressColor = pct >= 90 ? 'danger' : pct >= 70 ? 'warning' : 'primary';

              return (
                <Card key={wh.id} hoverable>
                  <CardHeader>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <h4 style={{ margin: 0 }}>{wh.name}</h4>
                      <Badge color={config.color} size="sm">{config.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p style={{ margin: '0 0 1rem', color: 'var(--stoked-color-text-secondary)', fontSize: '0.875rem' }}>
                      {wh.location}
                    </p>

                    {/* Capacity */}
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', marginBottom: '0.375rem' }}>
                        <span>Capacity</span>
                        <span style={{ fontWeight: 500 }}>{pct}%</span>
                      </div>
                      <Progress
                        value={wh.used}
                        max={wh.capacity}
                        size="sm"
                        color={progressColor}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--stoked-color-text-secondary)', marginTop: '0.25rem' }}>
                        <span>{wh.used.toLocaleString()} used</span>
                        <span>{wh.capacity.toLocaleString()} total</span>
                      </div>
                    </div>

                    {/* Footer info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Tag size="sm" color="neutral" variant="outline">
                        {wh.items.toLocaleString()} items
                      </Tag>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </PageLayout>
    );
  },
};
