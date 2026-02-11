import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './_shared/layout';
import { Card, CardHeader, CardBody } from '../components/Card';
import { Skeleton } from '../components/Skeleton';
import { Spinner } from '../components/Spinner';

const meta: Meta = {
  title: 'Pages/Loading States',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const DashboardSkeleton: Story = {
  name: 'Dashboard Skeleton',
  render: () => (
    <PageLayout
      activePage="dashboard"
      header={
        <>
          <Skeleton width={180} height={20} />
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
            <Skeleton width={200} height={32} variant="rectangular" />
            <Skeleton width={90} height={32} variant="rectangular" />
          </div>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Stat Card Skeletons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardBody>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Skeleton width={40} height={40} variant="circular" />
                  <div style={{ flex: 1 }}>
                    <Skeleton width="60%" height={14} />
                    <div style={{ marginTop: '0.5rem' }}>
                      <Skeleton width="40%" height={24} />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Table Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton width={140} height={18} />
          </CardHeader>
          <CardBody>
            {/* Header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} height={14} />
              ))}
            </div>
            {/* Data rows */}
            {Array.from({ length: 5 }).map((_, row) => (
              <div
                key={row}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr',
                  gap: '1rem',
                  padding: '0.75rem 0',
                  borderTop: '1px solid var(--stoked-color-border)',
                }}
              >
                <Skeleton height={14} />
                <Skeleton height={14} width="80%" />
                <Skeleton height={14} width="50%" />
                <Skeleton height={14} width="60%" />
                <Skeleton height={20} width={60} variant="rectangular" />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Quick Action Skeletons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardBody>
                <Skeleton width="50%" height={18} />
                <div style={{ marginTop: '0.5rem' }}>
                  <Skeleton lines={2} />
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Skeleton width={100} height={32} variant="rectangular" />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  ),
};

export const TableLoading: Story = {
  name: 'Table with Spinner',
  render: () => (
    <PageLayout
      activePage="inventory"
      header={
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>Inventory</h3>
      }
    >
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>Loading inventory data...</h4>
          </div>
        </CardHeader>
        <CardBody>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', gap: '1rem' }}>
            <Spinner size="lg" />
            <p style={{ margin: 0, color: 'var(--stoked-color-text-secondary)', fontSize: '0.875rem' }}>
              Fetching inventory records...
            </p>
          </div>
        </CardBody>
      </Card>
    </PageLayout>
  ),
};

export const FormSkeleton: Story = {
  name: 'Form Skeleton',
  render: () => (
    <PageLayout
      activePage="inventory"
      header={
        <Skeleton width={240} height={18} />
      }
    >
      <div style={{ maxWidth: 640 }}>
        <Card>
          <CardHeader>
            <Skeleton width={160} height={18} />
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <Skeleton width={80} height={14} />
                  <div style={{ marginTop: '0.5rem' }}><Skeleton height={36} variant="rectangular" /></div>
                </div>
                <div>
                  <Skeleton width={60} height={14} />
                  <div style={{ marginTop: '0.5rem' }}><Skeleton height={36} variant="rectangular" /></div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <Skeleton width={70} height={14} />
                  <div style={{ marginTop: '0.5rem' }}><Skeleton height={36} variant="rectangular" /></div>
                </div>
                <div>
                  <Skeleton width={90} height={14} />
                  <div style={{ marginTop: '0.5rem' }}><Skeleton height={36} variant="rectangular" /></div>
                </div>
              </div>
              <div>
                <Skeleton width={110} height={14} />
                <div style={{ marginTop: '0.5rem' }}><Skeleton height={36} variant="rectangular" /></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <Skeleton width={80} height={36} variant="rectangular" />
                <Skeleton width={120} height={36} variant="rectangular" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </PageLayout>
  ),
};
