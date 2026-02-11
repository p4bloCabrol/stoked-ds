import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: ColumnDef<User, unknown>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'age', header: 'Age' },
];

const data: User[] = [
  { id: 1, name: 'Alice', email: 'alice@test.com', age: 30 },
  { id: 2, name: 'Bob', email: 'bob@test.com', age: 25 },
  { id: 3, name: 'Charlie', email: 'charlie@test.com', age: 35 },
];

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders data rows', () => {
    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('bob@test.com')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(
      <DataTable columns={columns} data={[]} emptyMessage="No users found." />
    );

    expect(screen.getByText('No users found.')).toBeInTheDocument();
  });

  it('shows loading skeleton', () => {
    const { container } = render(
      <DataTable columns={columns} data={[]} isLoading loadingRows={3} />
    );

    const skeletons = container.querySelectorAll('[data-variant="text"]');
    expect(skeletons.length).toBe(9); // 3 rows × 3 columns
  });

  it('sorts columns when sorting is enabled', async () => {
    const user = userEvent.setup();

    render(<DataTable columns={columns} data={data} enableSorting />);

    const nameHeader = screen.getByText('Name');
    const sortButton = nameHeader.closest('button');
    expect(sortButton).toBeTruthy();

    await user.click(sortButton!);

    const rows = screen.getAllByRole('row');
    // Row 0 is header, rows 1-3 are data
    expect(rows[1]).toHaveTextContent('Alice');
    expect(rows[2]).toHaveTextContent('Bob');
    expect(rows[3]).toHaveTextContent('Charlie');
  });

  it('paginates data when enabled', () => {
    const manyUsers: User[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@test.com`,
      age: 20 + i,
    }));

    render(
      <DataTable
        columns={columns}
        data={manyUsers}
        enablePagination
        pageSize={10}
      />
    );

    // Should show first 10 rows
    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 10')).toBeInTheDocument();
    expect(screen.queryByText('User 11')).not.toBeInTheDocument();

    // Should show row count
    expect(screen.getByText('25 rows')).toBeInTheDocument();
  });

  it('navigates between pages', async () => {
    const user = userEvent.setup();

    const manyUsers: User[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@test.com`,
      age: 20 + i,
    }));

    render(
      <DataTable
        columns={columns}
        data={manyUsers}
        enablePagination
        pageSize={10}
      />
    );

    const page2Button = screen.getByLabelText('Page 2');
    await user.click(page2Button);

    expect(screen.getByText('User 11')).toBeInTheDocument();
    expect(screen.getByText('User 20')).toBeInTheDocument();
    expect(screen.queryByText('User 1')).not.toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<DataTable columns={columns} data={data} onRowClick={onClick} />);

    await user.click(screen.getByText('Alice'));

    expect(onClick).toHaveBeenCalledWith(data[0]);
  });

  it('applies variant and size props', () => {
    const { container } = render(
      <DataTable columns={columns} data={data} variant="striped" size="sm" />
    );

    const table = container.querySelector('table');
    expect(table).toHaveAttribute('data-variant', 'striped');
    expect(table).toHaveAttribute('data-size', 'sm');
  });

  it('renders caption when provided', () => {
    render(<DataTable columns={columns} data={data} caption="User List" />);

    expect(screen.getByText('User List')).toBeInTheDocument();
  });

  it('hides pagination footer when loading', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        enablePagination
        isLoading
      />
    );

    expect(screen.queryByLabelText('Pagination')).not.toBeInTheDocument();
  });

  it('shows singular row text for single row', () => {
    render(
      <DataTable
        columns={columns}
        data={[data[0]]}
        enablePagination
      />
    );

    expect(screen.getByText('1 row')).toBeInTheDocument();
  });
});
