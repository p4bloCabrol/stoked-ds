import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './_shared/layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { categories, warehouses } from './_shared/data';

const meta: Meta = {
  title: 'Pages/Stock Entry',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function StockEntryPage() {
    const [submitted, setSubmitted] = useState(false);
    const [product, setProduct] = useState('');
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [warehouse, setWarehouse] = useState('');
    const [supplier, setSupplier] = useState('');
    const [reference, setReference] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    };

    const handleReset = () => {
      setProduct('');
      setSku('');
      setQuantity('');
      setCategory('');
      setWarehouse('');
      setSupplier('');
      setReference('');
      setNotes('');
      setSubmitted(false);
    };

    return (
      <PageLayout
        activePage="inventory"
        header={
          <Breadcrumb
            items={[
              { label: 'Home', href: '#' },
              { label: 'Inventory', href: '#' },
              { label: 'Stock Entry' },
            ]}
          />
        }
      >
        <div style={{ maxWidth: 640 }}>
          {submitted && (
            <div style={{ marginBottom: '1rem' }}>
              <Alert status="success" title="Stock entry registered">
                The stock entry has been successfully recorded. Reference: PO-2026-0146
              </Alert>
            </div>
          )}

          <Card>
            <CardHeader>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>New Stock Entry</h3>
            </CardHeader>
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input
                    label="Product Name"
                    placeholder="e.g. Industrial Bearing 6205"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                  />
                  <Input
                    label="SKU"
                    placeholder="e.g. BRG-6205-ZZ"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Input
                    label="Quantity"
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                  <Select
                    label="Category"
                    placeholder="Select category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={categories.map((c) => ({ value: c.toLowerCase(), label: c }))}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Select
                    label="Warehouse"
                    placeholder="Select warehouse"
                    value={warehouse}
                    onChange={(e) => setWarehouse(e.target.value)}
                    options={warehouses
                      .filter((w) => w.status !== 'maintenance')
                      .map((w) => ({ value: w.id, label: w.name }))}
                    required
                  />
                  <Input
                    label="Supplier"
                    placeholder="e.g. Acme Industrial"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                  />
                </div>

                <Input
                  label="Reference / PO Number"
                  placeholder="e.g. PO-2026-0146"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />

                <Input
                  label="Notes"
                  placeholder="Additional notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardBody>
            <CardFooter>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <Button variant="ghost" onClick={handleReset}>Clear</Button>
                <Button variant="solid" onClick={handleSubmit}>Register Entry</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </PageLayout>
    );
  },
};
