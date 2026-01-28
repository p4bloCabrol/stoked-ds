import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

describe('Modal', () => {
  it('should not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render header, body, and footer', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <ModalHeader>Header</ModalHeader>
        <ModalBody>Body</ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </Modal>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    await user.click(screen.getByRole('button', { name: 'Close modal' }));
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    // Focus the modal first, then press Escape
    const dialog = screen.getByRole('dialog');
    dialog.focus();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  it('should not call onClose on Escape when closeOnEsc is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEsc={false}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should not show close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} showCloseButton={false}>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.queryByRole('button', { name: 'Close modal' })).not.toBeInTheDocument();
  });

  it('should have correct aria attributes', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        aria-label="Test modal"
      >
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Test modal');
  });

  it('should apply size data attribute', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} size="lg">
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('data-size', 'lg');
  });

  it('should apply centered data attribute to overlay', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} isCentered>
        <ModalBody>Content</ModalBody>
      </Modal>
    );
    const overlay = screen.getByRole('dialog').parentElement;
    expect(overlay).toHaveAttribute('data-centered', 'true');
  });
});
