import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
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

describe('Table', () => {
  it('should render a table', () => {
    render(
      <Table>
        <Thead>
          <Tr>
            <Th>Header</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Cell</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should render table header and body', () => {
    render(
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>John</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('should apply variant data attribute', () => {
    render(
      <Table variant="striped">
        <Tbody>
          <Tr>
            <Td>Cell</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByRole('table')).toHaveAttribute('data-variant', 'striped');
  });

  it('should apply size data attribute', () => {
    render(
      <Table size="lg">
        <Tbody>
          <Tr>
            <Td>Cell</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByRole('table')).toHaveAttribute('data-size', 'lg');
  });
});

describe('TableContainer', () => {
  it('should render container with table', () => {
    render(
      <TableContainer data-testid="container">
        <Table>
          <Tbody>
            <Tr>
              <Td>Cell</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );

    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});

describe('TableRow', () => {
  it('should apply selected data attribute', () => {
    render(
      <Table>
        <Tbody>
          <Tr isSelected data-testid="row">
            <Td>Cell</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByTestId('row')).toHaveAttribute('data-selected', 'true');
  });

  it('should apply hoverable data attribute', () => {
    render(
      <Table>
        <Tbody>
          <Tr isHoverable data-testid="row">
            <Td>Cell</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByTestId('row')).toHaveAttribute('data-hoverable', 'true');
  });
});

describe('TableHeaderCell', () => {
  it('should apply numeric data attribute', () => {
    render(
      <Table>
        <Thead>
          <Tr>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
      </Table>
    );

    expect(screen.getByText('Amount')).toHaveAttribute('data-numeric', 'true');
  });

  it('should render sortable header', () => {
    const onSort = vi.fn();
    render(
      <Table>
        <Thead>
          <Tr>
            <Th isSortable onSort={onSort}>
              Name
            </Th>
          </Tr>
        </Thead>
      </Table>
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should call onSort when clicked', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(
      <Table>
        <Thead>
          <Tr>
            <Th isSortable onSort={onSort}>
              Name
            </Th>
          </Tr>
        </Thead>
      </Table>
    );

    await user.click(screen.getByRole('button'));
    expect(onSort).toHaveBeenCalled();
  });

  it('should show ascending sort indicator', () => {
    render(
      <Table>
        <Thead>
          <Tr>
            <Th isSortable sortDirection="asc">
              Name
            </Th>
          </Tr>
        </Thead>
      </Table>
    );

    expect(screen.getByRole('button')).toHaveAttribute('aria-sort', 'ascending');
  });

  it('should show descending sort indicator', () => {
    render(
      <Table>
        <Thead>
          <Tr>
            <Th isSortable sortDirection="desc">
              Name
            </Th>
          </Tr>
        </Thead>
      </Table>
    );

    expect(screen.getByRole('button')).toHaveAttribute('aria-sort', 'descending');
  });
});

describe('TableCell', () => {
  it('should apply numeric data attribute', () => {
    render(
      <Table>
        <Tbody>
          <Tr>
            <Td isNumeric>100</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByText('100')).toHaveAttribute('data-numeric', 'true');
  });
});

describe('TableCaption', () => {
  it('should render caption', () => {
    render(
      <Table>
        <TableCaption>Table caption</TableCaption>
        <Tbody>
          <Tr>
            <Td>Cell</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByText('Table caption')).toBeInTheDocument();
  });

  it('should apply placement data attribute', () => {
    render(
      <Table>
        <TableCaption placement="top" data-testid="caption">
          Caption
        </TableCaption>
        <Tbody>
          <Tr>
            <Td>Cell</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByTestId('caption')).toHaveAttribute('data-placement', 'top');
  });
});

describe('TableFoot', () => {
  it('should render table footer', () => {
    render(
      <Table>
        <Tbody>
          <Tr>
            <Td>Cell</Td>
          </Tr>
        </Tbody>
        <TableFoot>
          <Tr>
            <Td>Footer</Td>
          </Tr>
        </TableFoot>
      </Table>
    );

    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});

describe('Shorthand aliases', () => {
  it('should work with shorthand component names', () => {
    render(
      <Table>
        <Thead>
          <Tr>
            <Th>Header</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Cell</Td>
          </Tr>
        </Tbody>
      </Table>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Cell')).toBeInTheDocument();
  });
});
