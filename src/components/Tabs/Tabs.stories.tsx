import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';

const meta = {
  title: 'Data Display/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'enclosed', 'pills'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <TabList>
          <Tab>Account</Tab>
          <Tab>Documents</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <h3>Account Settings</h3>
            <p>Manage your account information and preferences.</p>
          </TabPanel>
          <TabPanel>
            <h3>Documents</h3>
            <p>View and manage your uploaded documents.</p>
          </TabPanel>
          <TabPanel>
            <h3>Settings</h3>
            <p>Configure your application settings.</p>
          </TabPanel>
        </TabPanels>
      </>
    ),
  },
};

export const LineVariant: Story = {
  args: {
    variant: 'line',
    children: (
      <>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Analytics</Tab>
          <Tab>Reports</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Overview content</TabPanel>
          <TabPanel>Analytics content</TabPanel>
          <TabPanel>Reports content</TabPanel>
        </TabPanels>
      </>
    ),
  },
};

export const EnclosedVariant: Story = {
  args: {
    variant: 'enclosed',
    children: (
      <>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Analytics</Tab>
          <Tab>Reports</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Overview content with enclosed style</TabPanel>
          <TabPanel>Analytics content with enclosed style</TabPanel>
          <TabPanel>Reports content with enclosed style</TabPanel>
        </TabPanels>
      </>
    ),
  },
};

export const PillsVariant: Story = {
  args: {
    variant: 'pills',
    children: (
      <>
        <TabList>
          <Tab>All</Tab>
          <Tab>Active</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>All items</TabPanel>
          <TabPanel>Active items only</TabPanel>
          <TabPanel>Completed items only</TabPanel>
        </TabPanels>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Tabs size="sm" variant="enclosed">
        <TabList>
          <Tab>Small</Tab>
          <Tab>Tabs</Tab>
          <Tab>Example</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Small size tabs content</TabPanel>
          <TabPanel>Tab 2</TabPanel>
          <TabPanel>Tab 3</TabPanel>
        </TabPanels>
      </Tabs>

      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>Medium</Tab>
          <Tab>Tabs</Tab>
          <Tab>Example</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Medium size tabs content (default)</TabPanel>
          <TabPanel>Tab 2</TabPanel>
          <TabPanel>Tab 3</TabPanel>
        </TabPanels>
      </Tabs>

      <Tabs size="lg" variant="enclosed">
        <TabList>
          <Tab>Large</Tab>
          <Tab>Tabs</Tab>
          <Tab>Example</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Large size tabs content</TabPanel>
          <TabPanel>Tab 2</TabPanel>
          <TabPanel>Tab 3</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  ),
};

export const Fitted: Story = {
  args: {
    variant: 'enclosed',
    isFitted: true,
    style: { maxWidth: 500 },
    children: (
      <>
        <TabList>
          <Tab>Tab One</Tab>
          <Tab>Tab Two</Tab>
          <Tab>Tab Three</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First panel - tabs take equal width</TabPanel>
          <TabPanel>Second panel</TabPanel>
          <TabPanel>Third panel</TabPanel>
        </TabPanels>
      </>
    ),
  },
};

export const WithDisabledTab: Story = {
  args: {
    children: (
      <>
        <TabList>
          <Tab>Enabled</Tab>
          <Tab isDisabled>Disabled</Tab>
          <Tab>Also Enabled</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First tab content</TabPanel>
          <TabPanel>This panel cannot be accessed</TabPanel>
          <TabPanel>Third tab content</TabPanel>
        </TabPanels>
      </>
    ),
  },
};

export const DefaultIndex: Story = {
  args: {
    defaultIndex: 1,
    children: (
      <>
        <TabList>
          <Tab>First</Tab>
          <Tab>Second (Default)</Tab>
          <Tab>Third</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>First panel</TabPanel>
          <TabPanel>Second panel - selected by default</TabPanel>
          <TabPanel>Third panel</TabPanel>
        </TabPanels>
      </>
    ),
  },
};

export const Controlled: Story = {
  render: function ControlledTabs() {
    const [tabIndex, setTabIndex] = useState(0);

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--stoked-color-text-secondary)' }}>
          Current tab: {tabIndex}
        </p>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setTabIndex(0)}>Go to First</button>
          <button onClick={() => setTabIndex(1)}>Go to Second</button>
          <button onClick={() => setTabIndex(2)}>Go to Third</button>
        </div>
        <Tabs index={tabIndex} onChange={setTabIndex}>
          <TabList>
            <Tab>First</Tab>
            <Tab>Second</Tab>
            <Tab>Third</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>First tab panel</TabPanel>
            <TabPanel>Second tab panel</TabPanel>
            <TabPanel>Third tab panel</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Line (default)</h4>
        <Tabs variant="line">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Line variant content</TabPanel>
            <TabPanel>Tab 2</TabPanel>
            <TabPanel>Tab 3</TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Enclosed</h4>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Enclosed variant content</TabPanel>
            <TabPanel>Tab 2</TabPanel>
            <TabPanel>Tab 3</TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem' }}>Pills</h4>
        <Tabs variant="pills">
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Pills variant content</TabPanel>
            <TabPanel>Tab 2</TabPanel>
            <TabPanel>Tab 3</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
};
