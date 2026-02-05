import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './Accordion';

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AccordionItem title="What is a design system?">
          A design system is a collection of reusable components, guided by clear standards,
          that can be assembled together to build any number of applications.
        </AccordionItem>
        <AccordionItem title="Why use a design system?">
          Design systems help teams build better products faster by making design and development
          more consistent, efficient, and scalable.
        </AccordionItem>
        <AccordionItem title="How do I get started?">
          Start by installing the package with npm or yarn, then import the components you need
          and follow the documentation for usage examples.
        </AccordionItem>
      </>
    ),
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultIndex: 0,
    children: (
      <>
        <AccordionItem title="Section 1 (Open by default)">
          This section is open by default because defaultIndex is set to 0.
        </AccordionItem>
        <AccordionItem title="Section 2">
          Click to expand this section.
        </AccordionItem>
        <AccordionItem title="Section 3">
          Click to expand this section.
        </AccordionItem>
      </>
    ),
  },
};

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    children: (
      <>
        <AccordionItem title="First Section">
          With allowMultiple enabled, you can have multiple sections open at the same time.
        </AccordionItem>
        <AccordionItem title="Second Section">
          Try opening this while the first section is still open.
        </AccordionItem>
        <AccordionItem title="Third Section">
          All three sections can be open simultaneously!
        </AccordionItem>
      </>
    ),
  },
};

export const WithDisabledItem: Story = {
  args: {
    children: (
      <>
        <AccordionItem title="Enabled Section">
          This section can be expanded and collapsed.
        </AccordionItem>
        <AccordionItem title="Disabled Section" disabled>
          This content cannot be accessed because the item is disabled.
        </AccordionItem>
        <AccordionItem title="Another Enabled Section">
          This section also works normally.
        </AccordionItem>
      </>
    ),
  },
};

export const FAQ: Story = {
  args: {
    children: (
      <>
        <AccordionItem title="How do I reset my password?">
          To reset your password, click on the "Forgot Password" link on the login page.
          Enter your email address and we'll send you instructions to reset your password.
        </AccordionItem>
        <AccordionItem title="What payment methods do you accept?">
          We accept all major credit cards (Visa, MasterCard, American Express),
          PayPal, and bank transfers. All payments are processed securely.
        </AccordionItem>
        <AccordionItem title="How can I contact support?">
          You can reach our support team via email at support@example.com,
          or use the live chat feature available on our website. We typically
          respond within 24 hours.
        </AccordionItem>
        <AccordionItem title="Is there a free trial available?">
          Yes! We offer a 14-day free trial with full access to all features.
          No credit card required to start your trial.
        </AccordionItem>
      </>
    ),
  },
};
