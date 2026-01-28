import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from './Accordion';

const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AccordionItem>
          <AccordionButton>What is a design system?</AccordionButton>
          <AccordionPanel>
            A design system is a collection of reusable components, guided by clear standards,
            that can be assembled together to build any number of applications.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Why use a design system?</AccordionButton>
          <AccordionPanel>
            Design systems help teams build better products faster by making design and development
            more consistent, efficient, and scalable.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>How do I get started?</AccordionButton>
          <AccordionPanel>
            Start by installing the package with npm or yarn, then import the components you need
            and follow the documentation for usage examples.
          </AccordionPanel>
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
        <AccordionItem>
          <AccordionButton>Section 1 (Open by default)</AccordionButton>
          <AccordionPanel>
            This section is open by default because defaultIndex is set to 0.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Section 2</AccordionButton>
          <AccordionPanel>
            Click to expand this section.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Section 3</AccordionButton>
          <AccordionPanel>
            Click to expand this section.
          </AccordionPanel>
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
        <AccordionItem>
          <AccordionButton>First Section</AccordionButton>
          <AccordionPanel>
            With allowMultiple enabled, you can have multiple sections open at the same time.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Second Section</AccordionButton>
          <AccordionPanel>
            Try opening this while the first section is still open.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Third Section</AccordionButton>
          <AccordionPanel>
            All three sections can be open simultaneously!
          </AccordionPanel>
        </AccordionItem>
      </>
    ),
  },
};

export const MultipleDefaultOpen: Story = {
  args: {
    allowMultiple: true,
    defaultIndex: [0, 2],
    children: (
      <>
        <AccordionItem>
          <AccordionButton>First Section (Open)</AccordionButton>
          <AccordionPanel>
            This section is open by default.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Second Section (Closed)</AccordionButton>
          <AccordionPanel>
            This section is closed by default.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Third Section (Open)</AccordionButton>
          <AccordionPanel>
            This section is also open by default.
          </AccordionPanel>
        </AccordionItem>
      </>
    ),
  },
};

export const WithDisabledItem: Story = {
  args: {
    children: (
      <>
        <AccordionItem>
          <AccordionButton>Enabled Section</AccordionButton>
          <AccordionPanel>
            This section can be expanded and collapsed.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem isDisabled>
          <AccordionButton>Disabled Section</AccordionButton>
          <AccordionPanel>
            This content cannot be accessed because the item is disabled.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Another Enabled Section</AccordionButton>
          <AccordionPanel>
            This section also works normally.
          </AccordionPanel>
        </AccordionItem>
      </>
    ),
  },
};

export const Controlled: Story = {
  render: function ControlledAccordion() {
    const [openIndex, setOpenIndex] = useState<number | number[]>(0);

    return (
      <div>
        <p style={{ marginBottom: '1rem', color: 'var(--stoked-color-text-secondary)' }}>
          Currently open: {JSON.stringify(openIndex)}
        </p>
        <Accordion index={openIndex} onChange={setOpenIndex}>
          <AccordionItem>
            <AccordionButton>Controlled Section 1</AccordionButton>
            <AccordionPanel>
              The accordion state is controlled by the parent component.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>Controlled Section 2</AccordionButton>
            <AccordionPanel>
              Click to see the onChange callback in action.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>Controlled Section 3</AccordionButton>
            <AccordionPanel>
              The parent component decides which section is open.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    );
  },
};

export const FAQ: Story = {
  args: {
    children: (
      <>
        <AccordionItem>
          <AccordionButton>How do I reset my password?</AccordionButton>
          <AccordionPanel>
            To reset your password, click on the "Forgot Password" link on the login page.
            Enter your email address and we'll send you instructions to reset your password.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>What payment methods do you accept?</AccordionButton>
          <AccordionPanel>
            We accept all major credit cards (Visa, MasterCard, American Express),
            PayPal, and bank transfers. All payments are processed securely.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>How can I contact support?</AccordionButton>
          <AccordionPanel>
            You can reach our support team via email at support@example.com,
            or use the live chat feature available on our website. We typically
            respond within 24 hours.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>Is there a free trial available?</AccordionButton>
          <AccordionPanel>
            Yes! We offer a 14-day free trial with full access to all features.
            No credit card required to start your trial.
          </AccordionPanel>
        </AccordionItem>
      </>
    ),
  },
};
