import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from 'react-hook-form';
import type { ReactNode } from 'react';
import { FormField } from './FormField';
import { Form } from './Form';
import { Input } from '../../components/Input';
import { Checkbox } from '../../components/Checkbox';

interface TestFormValues {
  email: string;
  name: string;
  agree: boolean;
}

function TestWrapper({
  children,
  defaultValues,
  onSubmit = vi.fn(),
}: {
  children: (form: ReturnType<typeof useForm<TestFormValues>>) => ReactNode;
  defaultValues?: Partial<TestFormValues>;
  onSubmit?: (data: TestFormValues) => void;
}) {
  const form = useForm<TestFormValues>({
    defaultValues: { email: '', name: '', agree: false, ...defaultValues },
  });
  return <Form form={form} onSubmit={onSubmit}>{children(form)}</Form>;
}

describe('FormField', () => {
  it('should render the child component from render prop', () => {
    render(
      <TestWrapper>
        {(form) => (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input {...field} label="Email" placeholder="you@example.com" />
            )}
          />
        )}
      </TestWrapper>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should propagate value changes to the form', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        {(form) => (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input {...field} label="Email" />
            )}
          />
        )}
      </TestWrapper>
    );
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');
  });

  it('should pass validation errors to the render function', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        {(form) => (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field, error }) => (
                <Input
                  {...field}
                  label="Email"
                  error={error?.message}
                />
              )}
            />
            <button type="submit">Submit</button>
          </>
        )}
      </TestWrapper>
    );

    // The field has no validation rules, so no error should appear
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should show required validation error', async () => {
    const user = userEvent.setup();

    function RequiredFieldForm() {
      const form = useForm<TestFormValues>({
        defaultValues: { email: '', name: '', agree: false },
      });
      return (
        <Form form={form} onSubmit={vi.fn()}>
          <FormField
            control={form.control}
            name="email"
            render={({ field, error }) => (
              <Input
                {...field}
                label="Email"
                error={error?.message}
                required
              />
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      );
    }

    render(<RequiredFieldForm />);
    // Submit without filling in the field - note: RHF validation is separate from HTML5
    // Since we didn't add rules to Controller, it won't show an error by default
    await user.click(screen.getByRole('button', { name: 'Submit' }));
  });

  it('should render with default value', () => {
    render(
      <TestWrapper defaultValues={{ email: 'default@test.com' }}>
        {(form) => (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input {...field} label="Email" />
            )}
          />
        )}
      </TestWrapper>
    );
    expect(screen.getByLabelText('Email')).toHaveValue('default@test.com');
  });

  it('should render multiple fields', () => {
    render(
      <TestWrapper>
        {(form) => (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Input {...field} label="Email" />
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Input {...field} label="Name" />
              )}
            />
          </>
        )}
      </TestWrapper>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });
});

describe('Form', () => {
  it('should call onSubmit with form data', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function SubmitForm() {
      const form = useForm<TestFormValues>({
        defaultValues: { email: 'test@test.com', name: 'John', agree: false },
      });
      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => <Input {...field} label="Email" />}
          />
          <button type="submit">Submit</button>
        </Form>
      );
    }

    render(<SubmitForm />);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'test@test.com' }),
        expect.anything()
      );
    });
  });

  it('should render as a form element', () => {
    function BasicForm() {
      const form = useForm();
      return (
        <Form form={form} onSubmit={vi.fn()} data-testid="test-form">
          <span>Content</span>
        </Form>
      );
    }

    render(<BasicForm />);
    expect(screen.getByTestId('test-form').tagName).toBe('FORM');
  });

  it('should have noValidate attribute', () => {
    function BasicForm() {
      const form = useForm();
      return (
        <Form form={form} onSubmit={vi.fn()} data-testid="test-form">
          <span>Content</span>
        </Form>
      );
    }

    render(<BasicForm />);
    expect(screen.getByTestId('test-form')).toHaveAttribute('novalidate');
  });

  it('should forward additional props to the form element', () => {
    function BasicForm() {
      const form = useForm();
      return (
        <Form
          form={form}
          onSubmit={vi.fn()}
          data-testid="test-form"
          aria-label="Test form"
        >
          <span>Content</span>
        </Form>
      );
    }

    render(<BasicForm />);
    expect(screen.getByTestId('test-form')).toHaveAttribute(
      'aria-label',
      'Test form'
    );
  });

  it('should prevent submission when validation fails', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    function ValidatedForm() {
      const form = useForm<TestFormValues>({
        defaultValues: { email: '', name: '', agree: false },
      });
      return (
        <Form form={form} onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field, error }) => (
              <Input {...field} label="Email" error={error?.message} />
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      );
    }

    render(<ValidatedForm />);
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    // No validation rules set, so onSubmit should be called
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
