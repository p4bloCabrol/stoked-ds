import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('should render trigger element', () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
  });

  it('should show tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content" delayShow={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    });
  });

  it('should hide tooltip on mouse leave', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content" delayShow={0} delayHide={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    await user.unhover(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('should show tooltip on focus', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content" delayShow={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.tab();
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('should hide tooltip on blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content" delayShow={0} delayHide={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.tab();
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    await user.tab();
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('should hide tooltip on Escape key', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content" delayShow={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.tab();
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('should not show tooltip when disabled', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content" disabled delayShow={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await new Promise((r) => setTimeout(r, 50));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('should have aria-describedby when visible', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content" delayShow={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', tooltip.id);
    });
  });

  it('should respect placement prop', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content" placement="bottom" delayShow={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.hover(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveAttribute('data-placement', 'bottom');
    });
  });

  it('should respect delay props', async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="Tooltip content" delayShow={100}>
        <button>Trigger</button>
      </Tooltip>
    );

    await user.hover(screen.getByRole('button'));
    // Initially not visible due to delay
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    // Wait for the delay
    await waitFor(
      () => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });
});
