import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter, CardImage } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';

const meta = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>Card Title</CardHeader>
        <CardBody>
          <p>This is the card body content. You can put any content here.</p>
        </CardBody>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>Elevated Card</CardHeader>
        <CardBody>
          <p>This card has a shadow elevation effect.</p>
        </CardBody>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardHeader>Outlined Card</CardHeader>
        <CardBody>
          <p>This card has a border instead of shadow.</p>
        </CardBody>
      </>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <>
        <CardHeader>Filled Card</CardHeader>
        <CardBody>
          <p>This card has a filled background.</p>
        </CardBody>
      </>
    ),
  },
};

export const WithImage: Story = {
  args: {
    variant: 'elevated',
    style: { maxWidth: 320 },
    children: (
      <>
        <CardImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
          alt="Mountain landscape"
        />
        <CardBody>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Beautiful Landscape</h3>
          <p style={{ margin: 0, color: 'var(--stoked-color-text-secondary)' }}>
            Discover amazing views from around the world.
          </p>
        </CardBody>
        <CardFooter>
          <Button size="sm" variant="outline">
            Learn More
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    variant: 'elevated',
    isHoverable: true,
    style: { maxWidth: 320 },
    children: (
      <>
        <CardBody>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Hover Me</h3>
          <p style={{ margin: 0, color: 'var(--stoked-color-text-secondary)' }}>
            This card has hover effects enabled.
          </p>
        </CardBody>
      </>
    ),
  },
};

export const Clickable: Story = {
  args: {
    variant: 'elevated',
    isClickable: true,
    onClick: () => alert('Card clicked!'),
    style: { maxWidth: 320 },
    children: (
      <>
        <CardBody>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Click Me</h3>
          <p style={{ margin: 0, color: 'var(--stoked-color-text-secondary)' }}>
            This card is clickable and focusable.
          </p>
        </CardBody>
      </>
    ),
  },
};

export const ProfileCard: Story = {
  args: {
    variant: 'elevated',
    style: { maxWidth: 320 },
    children: (
      <>
        <CardHeader>
          <Avatar fallback="John Doe" size="lg" />
          <div>
            <h3 style={{ margin: 0 }}>John Doe</h3>
            <p style={{ margin: 0, color: 'var(--stoked-color-text-secondary)', fontSize: '0.875rem' }}>
              Software Engineer
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0 }}>
            Building great products with React and TypeScript. Open source enthusiast.
          </p>
        </CardBody>
        <CardFooter style={{ justifyContent: 'space-between' }}>
          <Badge color="success">Available</Badge>
          <Button size="sm" variant="outline">
            Message
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const ProductCard: Story = {
  args: {
    variant: 'outlined',
    style: { maxWidth: 280 },
    children: (
      <>
        <CardImage
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
          alt="Watch product"
        />
        <CardBody>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ margin: '0 0 0.25rem 0', color: 'var(--stoked-color-text-secondary)', fontSize: '0.75rem' }}>
                ACCESSORIES
              </p>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Premium Watch</h3>
            </div>
            <Badge>New</Badge>
          </div>
          <p style={{ margin: '0 0 1rem 0', fontWeight: 600, fontSize: '1.25rem' }}>
            $299.00
          </p>
          <Button fullWidth>Add to Cart</Button>
        </CardBody>
      </>
    ),
  },
};

export const BodyOnly: Story = {
  args: {
    variant: 'outlined',
    children: (
      <CardBody>
        <p style={{ margin: 0 }}>A simple card with only body content.</p>
      </CardBody>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Card variant="elevated" style={{ width: 200 }}>
        <CardBody>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Elevated</h4>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>With shadow</p>
        </CardBody>
      </Card>
      <Card variant="outlined" style={{ width: 200 }}>
        <CardBody>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Outlined</h4>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>With border</p>
        </CardBody>
      </Card>
      <Card variant="filled" style={{ width: 200 }}>
        <CardBody>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Filled</h4>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>With background</p>
        </CardBody>
      </Card>
    </div>
  ),
};
