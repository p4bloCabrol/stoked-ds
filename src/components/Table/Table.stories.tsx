import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFoot,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from './Table';
import { Badge } from '../Badge';

const meta = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'striped'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active' },
];

export const Default: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>
                <Badge color={row.status === 'Active' ? 'success' : 'default'}>
                  {row.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};

export const Striped: Story = {
  render: () => (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sampleData.map((row) => (
            <Tr key={row.id}>
              <Td>{row.name}</Td>
              <Td>{row.email}</Td>
              <Td>{row.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Small</h4>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr><Td>John Doe</Td><Td>john@example.com</Td></Tr>
              <Tr><Td>Jane Smith</Td><Td>jane@example.com</Td></Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Medium (default)</h4>
        <TableContainer>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr><Td>John Doe</Td><Td>john@example.com</Td></Tr>
              <Tr><Td>Jane Smith</Td><Td>jane@example.com</Td></Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Large</h4>
        <TableContainer>
          <Table size="lg">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr><Td>John Doe</Td><Td>john@example.com</Td></Tr>
              <Tr><Td>Jane Smith</Td><Td>jane@example.com</Td></Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  ),
};

export const WithNumericData: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th isNumeric>Quantity</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Widget A</Td>
            <Td isNumeric>10</Td>
            <Td isNumeric>$25.00</Td>
            <Td isNumeric>$250.00</Td>
          </Tr>
          <Tr>
            <Td>Widget B</Td>
            <Td isNumeric>5</Td>
            <Td isNumeric>$45.00</Td>
            <Td isNumeric>$225.00</Td>
          </Tr>
          <Tr>
            <Td>Widget C</Td>
            <Td isNumeric>20</Td>
            <Td isNumeric>$12.00</Td>
            <Td isNumeric>$240.00</Td>
          </Tr>
        </Tbody>
        <TableFoot>
          <Tr>
            <Td>Total</Td>
            <Td isNumeric>35</Td>
            <Td isNumeric>-</Td>
            <Td isNumeric>$715.00</Td>
          </Tr>
        </TableFoot>
      </Table>
    </TableContainer>
  ),
};

export const Sortable: Story = {
  render: function SortableTable() {
    const [sortConfig, setSortConfig] = useState<{
      key: string;
      direction: 'asc' | 'desc';
    } | null>({ key: 'name', direction: 'asc' });

    const sortedData = [...sampleData].sort((a, b) => {
      if (!sortConfig) return 0;
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    const handleSort = (key: string) => {
      setSortConfig((current) => {
        if (current?.key === key) {
          return {
            key,
            direction: current.direction === 'asc' ? 'desc' : 'asc',
          };
        }
        return { key, direction: 'asc' };
      });
    };

    const getSortDirection = (key: string) => {
      if (sortConfig?.key !== key) return null;
      return sortConfig.direction;
    };

    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th
                isSortable
                sortDirection={getSortDirection('name')}
                onSort={() => handleSort('name')}
              >
                Name
              </Th>
              <Th
                isSortable
                sortDirection={getSortDirection('email')}
                onSort={() => handleSort('email')}
              >
                Email
              </Th>
              <Th
                isSortable
                sortDirection={getSortDirection('role')}
                onSort={() => handleSort('role')}
              >
                Role
              </Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((row) => (
              <Tr key={row.id}>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.role}</Td>
                <Td>
                  <Badge color={row.status === 'Active' ? 'success' : 'default'}>
                    {row.status}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  },
};

export const HoverableRows: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sampleData.map((row) => (
            <Tr key={row.id} isHoverable>
              <Td>{row.name}</Td>
              <Td>{row.email}</Td>
              <Td>{row.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ),
};

export const SelectableRows: Story = {
  render: function SelectableTable() {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelection = (id: number) => {
      setSelectedIds((current) =>
        current.includes(id)
          ? current.filter((i) => i !== id)
          : [...current, id]
      );
    };

    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th style={{ width: 40 }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length === sampleData.length}
                  onChange={() =>
                    setSelectedIds(
                      selectedIds.length === sampleData.length
                        ? []
                        : sampleData.map((d) => d.id)
                    )
                  }
                />
              </Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sampleData.map((row) => (
              <Tr
                key={row.id}
                isSelected={selectedIds.includes(row.id)}
                isHoverable
              >
                <Td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleSelection(row.id)}
                  />
                </Td>
                <Td>{row.name}</Td>
                <Td>{row.email}</Td>
                <Td>{row.role}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  },
};

export const WithCaption: Story = {
  render: () => (
    <TableContainer>
      <Table>
        <TableCaption placement="top">User Directory - Q4 2024</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sampleData.slice(0, 3).map((row) => (
            <Tr key={row.id}>
              <Td>{row.name}</Td>
              <Td>{row.email}</Td>
              <Td>{row.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  ),
};

export const ShorthandSyntax: Story = {
  render: () => (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>John Doe</Td>
            <Td>john@example.com</Td>
          </Tr>
          <Tr>
            <Td>Jane Smith</Td>
            <Td>jane@example.com</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  ),
};
