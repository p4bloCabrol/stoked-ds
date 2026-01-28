import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';

const TestTabs = ({
  defaultIndex,
  onChange,
  variant = 'line',
}: {
  defaultIndex?: number;
  onChange?: (index: number) => void;
  variant?: 'line' | 'enclosed' | 'pills';
}) => (
  <Tabs defaultIndex={defaultIndex} onChange={onChange} variant={variant}>
    <TabList>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Panel 1</TabPanel>
      <TabPanel>Panel 2</TabPanel>
      <TabPanel>Panel 3</TabPanel>
    </TabPanels>
  </Tabs>
);

describe('Tabs', () => {
  it('should render tabs', () => {
    render(<TestTabs />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('should select first tab by default', () => {
    render(<TestTabs />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('should show first panel by default', () => {
    render(<TestTabs />);
    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    expect(screen.queryByText('Panel 2')).not.toBeInTheDocument();
  });

  it('should switch tabs on click', async () => {
    const user = userEvent.setup();
    render(<TestTabs />);

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));

    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
  });

  it('should respect defaultIndex', () => {
    render(<TestTabs defaultIndex={1} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
  });

  it('should call onChange when tab changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TestTabs onChange={onChange} />);

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should have correct aria attributes', () => {
    render(<TestTabs />);
    const tab = screen.getByRole('tab', { name: 'Tab 1' });
    const panelId = tab.getAttribute('aria-controls');
    const panel = screen.getByRole('tabpanel');

    expect(panel).toHaveAttribute('id', panelId);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
  });

  it('should apply variant data attribute', () => {
    render(<TestTabs variant="enclosed" />);
    expect(screen.getByRole('tablist')).toHaveAttribute('data-variant', 'enclosed');
  });
});

describe('Tab keyboard navigation', () => {
  it('should navigate with ArrowRight', async () => {
    const user = userEvent.setup();
    render(<TestTabs />);

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    firstTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
  });

  it('should navigate with ArrowLeft', async () => {
    const user = userEvent.setup();
    render(<TestTabs defaultIndex={1} />);

    const secondTab = screen.getByRole('tab', { name: 'Tab 2' });
    secondTab.focus();
    await user.keyboard('{ArrowLeft}');

    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
  });

  it('should wrap around with ArrowRight', async () => {
    const user = userEvent.setup();
    render(<TestTabs defaultIndex={2} />);

    const lastTab = screen.getByRole('tab', { name: 'Tab 3' });
    lastTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
  });

  it('should go to first tab with Home', async () => {
    const user = userEvent.setup();
    render(<TestTabs defaultIndex={2} />);

    const lastTab = screen.getByRole('tab', { name: 'Tab 3' });
    lastTab.focus();
    await user.keyboard('{Home}');

    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
  });

  it('should go to last tab with End', async () => {
    const user = userEvent.setup();
    render(<TestTabs />);

    const firstTab = screen.getByRole('tab', { name: 'Tab 1' });
    firstTab.focus();
    await user.keyboard('{End}');

    expect(screen.getByRole('tab', { name: 'Tab 3' })).toHaveFocus();
  });
});

describe('Disabled tabs', () => {
  it('should render disabled tab', () => {
    render(
      <Tabs>
        <TabList>
          <Tab>Enabled</Tab>
          <Tab isDisabled>Disabled</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByRole('tab', { name: 'Disabled' })).toBeDisabled();
  });

  it('should not select disabled tab on click', async () => {
    const user = userEvent.setup();
    render(
      <Tabs>
        <TabList>
          <Tab>Enabled</Tab>
          <Tab isDisabled>Disabled</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    );

    await user.click(screen.getByRole('tab', { name: 'Disabled' }));
    expect(screen.getByRole('tab', { name: 'Enabled' })).toHaveAttribute('aria-selected', 'true');
  });
});

describe('Fitted tabs', () => {
  it('should apply fitted data attribute', () => {
    render(
      <Tabs isFitted>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toHaveAttribute('data-fitted', 'true');
  });
});
