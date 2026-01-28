import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';

const meta = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnOverlayClick: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    isCentered: { control: 'boolean' },
  },
  args: {
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
    showCloseButton: true,
    isCentered: false,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader>
            <h2>Modal Title</h2>
          </ModalHeader>
          <ModalBody>
            <p>This is the modal body content. You can put any content here.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" color="neutral" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;

    return (
      <>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {sizes.map((size) => (
            <Button key={size} variant="outline" onClick={() => setOpenSize(size)}>
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
        {sizes.map((size) => (
          <Modal
            key={size}
            isOpen={openSize === size}
            onClose={() => setOpenSize(null)}
            size={size}
          >
            <ModalHeader>
              <h2>{size.toUpperCase()} Modal</h2>
            </ModalHeader>
            <ModalBody>
              <p>This is a {size} sized modal.</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </ModalFooter>
          </Modal>
        ))}
      </>
    );
  },
};

export const Centered: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Centered Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
          <ModalHeader>
            <h2>Centered Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p>This modal is vertically centered on the screen.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  name: 'Form Example',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Add New Item</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <ModalHeader>
            <h2>Add New Item</h2>
          </ModalHeader>
          <ModalBody>
            <form
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stoked-spacing-4)' }}
              onSubmit={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              <Input label="Item Name" placeholder="Enter item name" required />
              <Input label="SKU" placeholder="Enter SKU" />
              <Input label="Quantity" type="number" placeholder="0" />
              <Input label="Price" type="number" placeholder="0.00" />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" color="neutral" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Item</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const DeleteConfirmation: Story = {
  name: 'Delete Confirmation',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button color="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm" isCentered>
          <ModalHeader>
            <h2>Delete Item</h2>
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" color="neutral" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Long Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <ModalHeader>
            <h2>Terms of Service</h2>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stoked-spacing-4)' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" color="neutral" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCloseButton={false}
          closeOnOverlayClick={false}
        >
          <ModalHeader>
            <h2>Important Notice</h2>
          </ModalHeader>
          <ModalBody>
            <p>You must acknowledge this message to continue.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>I Understand</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
