import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import { FormField } from './FormField';
import { Form } from './Form';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Checkbox } from '../../components/Checkbox';
import { Switch } from '../../components/Switch';
import { Button } from '../../components/Button';

const meta = {
  title: 'Integrations/React Hook Form/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Adapter that connects React Hook Form with stoked-ds form controls. Uses RHF Controller under the hood to manage field state and validation.',
      },
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm: Story = {
  name: 'Login Form',
  render: function LoginFormStory() {
    const form = useForm<LoginFormValues>({
      defaultValues: { email: '', password: '' },
    });

    const onSubmit = (data: LoginFormValues) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <Form form={form} onSubmit={onSubmit} style={{ width: 350 }}>
        <FormField
          control={form.control}
          name="email"
          render={({ field, error }) => (
            <Input
              {...field}
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={error?.message}
              required
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, error }) => (
            <Input
              {...field}
              label="Password"
              type="password"
              placeholder="Enter password"
              helperText="Must be at least 8 characters"
              error={error?.message}
              required
            />
          )}
        />
        <Button type="submit" fullWidth>
          Sign In
        </Button>
      </Form>
    );
  },
};

interface ValidationFormValues {
  username: string;
  email: string;
  age: string;
}

export const WithValidation: Story = {
  name: 'With Validation',
  render: function ValidationStory() {
    const form = useForm<ValidationFormValues>({
      defaultValues: { username: '', email: '', age: '' },
      mode: 'onBlur',
    });

    const onSubmit = (data: ValidationFormValues) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <Form form={form} onSubmit={onSubmit} style={{ width: 350 }}>
        <FormField
          control={form.control}
          name="username"
          render={({ field, error }) => (
            <Input
              {...field}
              label="Username"
              placeholder="johndoe"
              error={error?.message}
              required
            />
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, error }) => (
            <Input
              {...field}
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={error?.message}
              required
            />
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field, error }) => (
            <Input
              {...field}
              label="Age"
              type="number"
              placeholder="25"
              error={error?.message}
            />
          )}
        />
        <Button type="submit" fullWidth>
          Register
        </Button>
      </Form>
    );
  },
};

interface AllControlsValues {
  name: string;
  country: string;
  newsletter: boolean;
  darkMode: boolean;
}

export const AllControlTypes: Story = {
  name: 'All Control Types',
  render: function AllControlsStory() {
    const form = useForm<AllControlsValues>({
      defaultValues: {
        name: '',
        country: '',
        newsletter: false,
        darkMode: true,
      },
    });

    const onSubmit = (data: AllControlsValues) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <Form form={form} onSubmit={onSubmit} style={{ width: 350 }}>
        <FormField
          control={form.control}
          name="name"
          render={({ field, error }) => (
            <Input
              {...field}
              label="Full Name"
              placeholder="John Doe"
              error={error?.message}
            />
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field, error: _error }) => (
            <Select
              {...field}
              label="Country"
              placeholder="Select a country"
              options={[
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
                { value: 'au', label: 'Australia' },
              ]}
            />
          )}
        />
        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <Checkbox
              label="Subscribe to newsletter"
              description="Receive weekly updates"
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
        <FormField
          control={form.control}
          name="darkMode"
          render={({ field }) => (
            <Switch
              label="Dark mode"
              description="Use dark theme"
              checked={field.value}
              onCheckedChange={field.onChange}
              ref={field.ref}
            />
          )}
        />
        <Button type="submit" fullWidth>
          Save Settings
        </Button>
      </Form>
    );
  },
};

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

export const PrefilledForm: Story = {
  name: 'Prefilled Form',
  render: function PrefilledStory() {
    const form = useForm<ProfileFormValues>({
      defaultValues: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        bio: 'Software developer',
      },
    });

    const onSubmit = (data: ProfileFormValues) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <Form form={form} onSubmit={onSubmit} style={{ width: 350 }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field, error }) => (
              <Input {...field} label="First Name" error={error?.message} />
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field, error }) => (
              <Input {...field} label="Last Name" error={error?.message} />
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field, error }) => (
            <Input
              {...field}
              label="Email"
              type="email"
              error={error?.message}
            />
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field, error }) => (
            <Input {...field} label="Bio" error={error?.message} />
          )}
        />
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button type="button" variant="outline" fullWidth onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" fullWidth>
            Update Profile
          </Button>
        </div>
      </Form>
    );
  },
};
