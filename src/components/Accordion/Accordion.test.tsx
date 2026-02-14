import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Accordion, AccordionItem } from './Accordion';

const TestAccordion = ({
  allowMultiple = false,
  defaultIndex,
}: {
  allowMultiple?: boolean;
  defaultIndex?: number | number[];
}) => (
  <Accordion allowMultiple={allowMultiple} defaultIndex={defaultIndex}>
    <AccordionItem title="Section 1">Content 1</AccordionItem>
    <AccordionItem title="Section 2">Content 2</AccordionItem>
    <AccordionItem title="Section 3">Content 3</AccordionItem>
  </Accordion>
);

describe('Accordion', () => {
  it('should render accordion items', () => {
    render(<TestAccordion />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('should have all panels collapsed by default', () => {
    render(<TestAccordion />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('should expand panel when header is clicked', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    const header = screen.getByText('Section 1').closest('[role="button"]')!;
    await user.click(header);

    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('should collapse other panels when one is expanded (single mode)', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    const header1 = screen.getByText('Section 1').closest('[role="button"]')!;
    const header2 = screen.getByText('Section 2').closest('[role="button"]')!;

    await user.click(header1);
    expect(header1).toHaveAttribute('aria-expanded', 'true');

    await user.click(header2);
    expect(header1).toHaveAttribute('aria-expanded', 'false');
    expect(header2).toHaveAttribute('aria-expanded', 'true');
  });

  it('should allow multiple panels open when allowMultiple is true', async () => {
    const user = userEvent.setup();
    render(<TestAccordion allowMultiple />);

    const header1 = screen.getByText('Section 1').closest('[role="button"]')!;
    const header2 = screen.getByText('Section 2').closest('[role="button"]')!;

    await user.click(header1);
    await user.click(header2);

    expect(header1).toHaveAttribute('aria-expanded', 'true');
    expect(header2).toHaveAttribute('aria-expanded', 'true');
  });

  it('should respect defaultIndex', () => {
    render(<TestAccordion defaultIndex={1} />);
    const header = screen.getByText('Section 2').closest('[role="button"]')!;
    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('should respect multiple defaultIndex with allowMultiple', () => {
    render(<TestAccordion allowMultiple defaultIndex={[0, 2]} />);
    const header1 = screen.getByText('Section 1').closest('[role="button"]')!;
    const header2 = screen.getByText('Section 2').closest('[role="button"]')!;
    const header3 = screen.getByText('Section 3').closest('[role="button"]')!;

    expect(header1).toHaveAttribute('aria-expanded', 'true');
    expect(header2).toHaveAttribute('aria-expanded', 'false');
    expect(header3).toHaveAttribute('aria-expanded', 'true');
  });

  it('should have correct aria attributes', () => {
    render(<TestAccordion defaultIndex={0} />);
    const header = screen.getByText('Section 1').closest('[role="button"]')!;
    const panelId = header.getAttribute('aria-controls');
    const panel = document.getElementById(panelId!);

    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(panel).toHaveAttribute('role', 'region');
    expect(panel).toHaveAttribute('aria-labelledby', header.id);
  });
});

describe('AccordionItem with disabled', () => {
  it('should have aria-disabled when disabled is true', () => {
    render(
      <Accordion>
        <AccordionItem title="Disabled Section" disabled>
          Content
        </AccordionItem>
      </Accordion>
    );

    const header = screen.getByText('Disabled Section').closest('[role="button"]')!;
    expect(header).toHaveAttribute('aria-disabled', 'true');
  });

  it('should not toggle when disabled item is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem title="Disabled Section" disabled>
          Content
        </AccordionItem>
      </Accordion>
    );

    const header = screen.getByText('Disabled Section').closest('[role="button"]')!;
    await user.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Accordion keyboard navigation', () => {
  it('should toggle with Enter key', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    const header = screen.getByText('Section 1').closest('[role="button"]') as HTMLElement;
    header.focus();
    await user.keyboard('{Enter}');

    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('should toggle with Space key', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    const header = screen.getByText('Section 1').closest('[role="button"]') as HTMLElement;
    header.focus();
    await user.keyboard(' ');

    expect(header).toHaveAttribute('aria-expanded', 'true');
  });
});
