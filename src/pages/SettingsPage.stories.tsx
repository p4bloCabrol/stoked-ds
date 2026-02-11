import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './_shared/layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../components/Tabs';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Switch } from '../components/Switch';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '../components/Table';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';

const meta: Meta = {
  title: 'Pages/Settings',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function SettingsPageStory() {
    const [activeTab, setActiveTab] = useState(0);
    const [saved, setSaved] = useState(false);
    const [companyName, setCompanyName] = useState('Stoked Industries');
    const [timezone, setTimezone] = useState('america-buenos_aires');
    const [currency, setCurrency] = useState('ars');
    const [lowStockThreshold, setLowStockThreshold] = useState('10');
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [lowStockAlerts, setLowStockAlerts] = useState(true);
    const [dailyReport, setDailyReport] = useState(false);
    const [auditLog, setAuditLog] = useState(true);

    const handleSave = () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    };

    const users = [
      { name: 'Pablo C.', email: 'pablo@stoked.com', role: 'Admin', status: 'Active' },
      { name: 'Carlos M.', email: 'carlos@stoked.com', role: 'Manager', status: 'Active' },
      { name: 'Maria L.', email: 'maria@stoked.com', role: 'Operator', status: 'Active' },
      { name: 'Ana G.', email: 'ana@stoked.com', role: 'Operator', status: 'Inactive' },
    ];

    return (
      <PageLayout
        activePage="settings"
        header={
          <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Settings' }]} />
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {saved && (
            <Alert status="success" title="Settings saved">
              Your changes have been saved successfully.
            </Alert>
          )}

          <Tabs index={activeTab} onChange={setActiveTab}>
            <TabList>
              <Tab>General</Tab>
              <Tab>Notifications</Tab>
              <Tab>Users</Tab>
            </TabList>
            <TabPanels>
              {/* General */}
              <TabPanel>
                <Card>
                  <CardHeader>
                    <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>General Settings</h4>
                  </CardHeader>
                  <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 480 }}>
                      <Input
                        label="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <Select
                        label="Timezone"
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        options={[
                          { value: 'america-buenos_aires', label: 'America/Buenos Aires (UTC-3)' },
                          { value: 'america-sao_paulo', label: 'America/Sao Paulo (UTC-3)' },
                          { value: 'america-new_york', label: 'America/New York (UTC-5)' },
                          { value: 'europe-london', label: 'Europe/London (UTC+0)' },
                        ]}
                      />
                      <Select
                        label="Currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        options={[
                          { value: 'ars', label: 'ARS - Argentine Peso' },
                          { value: 'usd', label: 'USD - US Dollar' },
                          { value: 'eur', label: 'EUR - Euro' },
                          { value: 'brl', label: 'BRL - Brazilian Real' },
                        ]}
                      />
                      <Input
                        label="Low Stock Threshold (%)"
                        type="number"
                        value={lowStockThreshold}
                        onChange={(e) => setLowStockThreshold(e.target.value)}
                        helperText="Products below this % of min stock will be flagged"
                      />
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button variant="solid" onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabPanel>

              {/* Notifications */}
              <TabPanel>
                <Card>
                  <CardHeader>
                    <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>Notification Preferences</h4>
                  </CardHeader>
                  <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 480 }}>
                      <Switch
                        label="Email Notifications"
                        description="Receive email notifications for important events"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                      <Switch
                        label="Low Stock Alerts"
                        description="Get notified when items fall below minimum stock"
                        checked={lowStockAlerts}
                        onCheckedChange={setLowStockAlerts}
                      />
                      <Switch
                        label="Daily Report"
                        description="Receive a daily summary of inventory changes"
                        checked={dailyReport}
                        onCheckedChange={setDailyReport}
                      />
                      <Switch
                        label="Audit Log"
                        description="Track all user actions and system events"
                        checked={auditLog}
                        onCheckedChange={setAuditLog}
                      />
                    </div>
                  </CardBody>
                  <CardFooter>
                    <Button variant="solid" onClick={handleSave}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabPanel>

              {/* Users */}
              <TabPanel>
                <Card>
                  <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600 }}>Team Members</h4>
                      <Button variant="outline" size="sm">Invite User</Button>
                    </div>
                  </CardHeader>
                  <CardBody style={{ padding: 0 }}>
                    <TableContainer>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th>User</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Status</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {users.map((user) => (
                            <Tr key={user.email} isHoverable>
                              <Td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <Avatar fallback={user.name.split(' ').map((n) => n[0]).join('')} size="sm" />
                                  <span style={{ fontWeight: 500 }}>{user.name}</span>
                                </div>
                              </Td>
                              <Td style={{ color: 'var(--stoked-color-text-secondary)' }}>{user.email}</Td>
                              <Td>{user.role}</Td>
                              <Td>
                                <Badge color={user.status === 'Active' ? 'success' : 'default'} size="sm">
                                  {user.status}
                                </Badge>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </PageLayout>
    );
  },
};
