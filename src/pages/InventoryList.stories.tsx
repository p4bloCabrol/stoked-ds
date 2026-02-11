import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './_shared/layout';
import { SearchInput } from '../components/SearchInput';
import { ButtonGroup } from '../components/ButtonGroup';
import { Button } from '../components/Button';
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '../components/Table';
import { Badge } from '../components/Badge';
import { Tag } from '../components/Tag';
import { Pagination } from '../components/Pagination';
import { Breadcrumb } from '../components/Breadcrumb';
import { Checkbox } from '../components/Checkbox';
import { products } from './_shared/data';
import { PlusIcon } from './_shared/icons';

const meta: Meta = {
  title: 'Pages/Inventory List',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const statusBadge: Record<string, { color: 'success' | 'warning' | 'danger'; label: string }> = {
  'in-stock': { color: 'success', label: 'In Stock' },
  'low-stock': { color: 'warning', label: 'Low Stock' },
  'out-of-stock': { color: 'danger', label: 'Out of Stock' },
};

export const Default: Story = {
  render: function InventoryListPage() {
    const [search, setSearch] = useState('');
    const [view, setView] = useState('list');
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    );

    const pageSize = 5;
    const totalPages = Math.ceil(filtered.length / pageSize);
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    const toggleSelect = (id: string) => {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    };

    const allSelected = paginated.length > 0 && paginated.every((p) => selectedIds.includes(p.id));

    return (
      <PageLayout
        activePage="inventory"
        header={
          <>
            <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Inventory' }]} />
            <div style={{ marginLeft: 'auto' }}>
              <Button variant="solid" size="sm">
                <PlusIcon width={16} height={16} /> Add Item
              </Button>
            </div>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <SearchInput
              placeholder="Search by name or SKU..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{ minWidth: 260 }}
            />
            <ButtonGroup
              options={[
                { label: 'List', value: 'list' },
                { label: 'Grid', value: 'grid' },
              ]}
              value={view}
              onChange={setView}
              size="sm"
            />
            {selectedIds.length > 0 && (
              <span style={{ fontSize: '0.8125rem', color: 'var(--stoked-color-text-secondary)' }}>
                {selectedIds.length} selected
              </span>
            )}
          </div>

          {/* Table */}
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th style={{ width: 40 }}>
                    <Checkbox
                      checked={allSelected}
                      onChange={() =>
                        setSelectedIds(allSelected ? [] : paginated.map((p) => p.id))
                      }
                    />
                  </Th>
                  <Th>Product</Th>
                  <Th>SKU</Th>
                  <Th>Category</Th>
                  <Th isNumeric>Stock</Th>
                  <Th isNumeric>Price</Th>
                  <Th>Status</Th>
                  <Th>Warehouse</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginated.map((product) => {
                  const badge = statusBadge[product.status];
                  return (
                    <Tr
                      key={product.id}
                      isHoverable
                      isSelected={selectedIds.includes(product.id)}
                    >
                      <Td>
                        <Checkbox
                          checked={selectedIds.includes(product.id)}
                          onChange={() => toggleSelect(product.id)}
                        />
                      </Td>
                      <Td style={{ fontWeight: 500 }}>{product.name}</Td>
                      <Td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{product.sku}</Td>
                      <Td>
                        <Tag size="sm" variant="outline" color="neutral">{product.category}</Tag>
                      </Td>
                      <Td isNumeric>{product.stock.toLocaleString()}</Td>
                      <Td isNumeric>${product.price.toFixed(2)}</Td>
                      <Td>
                        <Badge color={badge.color} size="sm">{badge.label}</Badge>
                      </Td>
                      <Td style={{ color: 'var(--stoked-color-text-secondary)' }}>{product.warehouse}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--stoked-color-text-secondary)' }}>
              Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length} items
            </span>
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>
      </PageLayout>
    );
  },
};
