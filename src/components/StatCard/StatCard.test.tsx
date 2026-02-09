import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('should render label and value', () => {
    render(<StatCard label="Total Items" value="12,450" />);
    expect(screen.getByText('Total Items')).toBeInTheDocument();
    expect(screen.getByText('12,450')).toBeInTheDocument();
  });

  it('should render icon', () => {
    render(<StatCard label="Items" value="100" icon={<span data-testid="icon">I</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render trend', () => {
    render(<StatCard label="Items" value="100" trend="+2.4%" trendDirection="up" />);
    expect(screen.getByText(/\+2\.4%/)).toBeInTheDocument();
  });

  it('should apply status to icon', () => {
    render(<StatCard label="Alert" value="5" icon="!" status="danger" data-testid="card" />);
    const icon = screen.getByText('!').closest('span');
    expect(icon).toHaveAttribute('data-status', 'danger');
  });

  it('should accept numeric value', () => {
    render(<StatCard label="Count" value={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
