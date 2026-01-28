import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from './Accordion';

const TestAccordion = ({ allowMultiple = false, defaultIndex, onChange }: {
  allowMultiple?: boolean;
  defaultIndex?: number | number[];
  onChange?: (index: number | number[]) => void;
}) => (
  <Accordion allowMultiple={allowMultiple} defaultIndex={defaultIndex} onChange={onChange}>
    <AccordionItem>
      <AccordionButton>Section 1</AccordionButton>
      <AccordionPanel>Content 1</AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>Section 2</AccordionButton>
      <AccordionPanel>Content 2</AccordionPanel>
    </AccordionItem>
    <AccordionItem>
      <AccordionButton>Section 3</AccordionButton>
      <AccordionPanel>Content 3</AccordionPanel>
    </AccordionItem>
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

  it('should expand panel when button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    const button = screen.getByText('Section 1');
    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should collapse other panels when one is expanded (single mode)', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Section 1')).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByText('Section 2'));
    expect(screen.getByText('Section 1')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Section 2')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should allow multiple panels open when allowMultiple is true', async () => {
    const user = userEvent.setup();
    render(<TestAccordion allowMultiple />);

    await user.click(screen.getByText('Section 1'));
    await user.click(screen.getByText('Section 2'));

    expect(screen.getByText('Section 1')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Section 2')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should respect defaultIndex', () => {
    render(<TestAccordion defaultIndex={1} />);
    expect(screen.getByText('Section 2')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should respect multiple defaultIndex with allowMultiple', () => {
    render(<TestAccordion allowMultiple defaultIndex={[0, 2]} />);
    expect(screen.getByText('Section 1')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Section 2')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Section 3')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should call onChange when item is toggled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TestAccordion onChange={onChange} />);

    await user.click(screen.getByText('Section 1'));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('should have correct aria attributes', () => {
    render(<TestAccordion defaultIndex={0} />);
    const button = screen.getByText('Section 1');
    const panelId = button.getAttribute('aria-controls');
    const panel = document.getElementById(panelId!);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(panel).toHaveAttribute('role', 'region');
    expect(panel).toHaveAttribute('aria-labelledby', button.id);
  });
});

describe('AccordionItem with isDisabled', () => {
  it('should disable button when isDisabled is true', () => {
    render(
      <Accordion>
        <AccordionItem isDisabled>
          <AccordionButton>Disabled Section</AccordionButton>
          <AccordionPanel>Content</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText('Disabled Section')).toBeDisabled();
  });

  it('should not toggle when disabled item is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem isDisabled>
          <AccordionButton>Disabled Section</AccordionButton>
          <AccordionPanel>Content</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    const button = screen.getByText('Disabled Section');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Accordion keyboard navigation', () => {
  it('should toggle with Enter key', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    const button = screen.getByText('Section 1');
    button.focus();
    await user.keyboard('{Enter}');

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should toggle with Space key', async () => {
    const user = userEvent.setup();
    render(<TestAccordion />);

    const button = screen.getByText('Section 1');
    button.focus();
    await user.keyboard(' ');

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
