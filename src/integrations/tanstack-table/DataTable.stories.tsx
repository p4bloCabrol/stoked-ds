import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import { Badge } from '../../components/Badge';

const meta = {
  title: 'Integrations/TanStack Table/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Data table powered by TanStack Table, rendered with stoked-ds Table components. Supports sorting, pagination, loading states, and empty states out of the box.',
      },
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  age: number;
}

const sampleData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active', age: 32 },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active', age: 28 },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'inactive', age: 45 },
  { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Editor', status: 'active', age: 37 },
  { id: 5, name: 'Eve Wilson', email: 'eve@example.com', role: 'Admin', status: 'active', age: 29 },
];

const basicColumns: ColumnDef<User, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
];

export const Basic: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
  },
};

export const Striped: Story = {
  args: {
    columns: basicColumns,
    data: sampleData,
    variant: 'striped',
  },
};

export const WithSorting: Story = {
  name: 'With Sorting',
  args: {
    columns: [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'role', header: 'Role' },
      { accessorKey: 'age', header: 'Age' },
    ] satisfies ColumnDef<User, unknown>[],
    data: sampleData,
    enableSorting: true,
  },
};

const manyUsers: User[] = Array.from({ length: 53 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'Editor', 'Viewer'][i % 3],
  status: i % 4 === 0 ? 'inactive' as const : 'active' as const,
  age: 20 + (i % 40),
}));

export const WithPagination: Story = {
  name: 'With Pagination',
  args: {
    columns: basicColumns,
    data: manyUsers,
    enablePagination: true,
    pageSize: 10,
  },
};

export const Loading: Story = {
  args: {
    columns: basicColumns,
    data: [],
    isLoading: true,
    loadingRows: 5,
  },
};

export const Empty: Story = {
  args: {
    columns: basicColumns,
    data: [],
    emptyMessage: 'No users found. Try adjusting your filters.',
  },
};

export const CustomCells: Story = {
  name: 'Custom Cell Rendering',
  render: () => {
    const columns: ColumnDef<User, unknown>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ getValue }) => {
          const role = getValue() as string;
          const color = role === 'Admin' ? 'primary' : role === 'Editor' ? 'warning' : 'default';
          return <Badge color={color} variant="subtle">{role}</Badge>;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          return (
            <Badge
              color={status === 'active' ? 'success' : 'default'}
              variant="subtle"
            >
              {status}
            </Badge>
          );
        },
      },
    ];

    return (
      <DataTable columns={columns} data={sampleData} enableSorting />
    );
  },
};

export const FullFeatured: Story = {
  name: 'Full Featured',
  render: function FullFeaturedStory() {
    const [sorting, setSorting] = useState<SortingState>([]);

    const columns: ColumnDef<User, unknown>[] = [
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ getValue }) => {
          const role = getValue() as string;
          const color = role === 'Admin' ? 'primary' : role === 'Editor' ? 'warning' : 'default';
          return <Badge color={color} variant="subtle">{role}</Badge>;
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = getValue() as string;
          return (
            <Badge
              color={status === 'active' ? 'success' : 'default'}
              variant="subtle"
            >
              {status}
            </Badge>
          );
        },
      },
      { accessorKey: 'age', header: 'Age' },
    ];

    return (
      <DataTable
        columns={columns}
        data={manyUsers}
        variant="striped"
        enableSorting
        sorting={sorting}
        onSortingChange={setSorting}
        enablePagination
        pageSize={10}
        caption="Team Members"
        onRowClick={(user) => alert(`Clicked: ${user.name}`)}
      />
    );
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    columns: basicColumns,
    data: sampleData,
    size: 'sm',
    enableSorting: true,
  },
};
