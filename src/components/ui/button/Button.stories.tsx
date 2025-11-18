import { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

// Define the metadata for the story
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Story category
  component: Button,
  tags: ['autodocs'], // Enable automatic documentation
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button.',
    },
    asChild: {
      control: 'boolean',
      description: 'Whether the button should render as a child component (e.g., Slot).',
    },
  },
};

export default meta;

// Define the story types
type Story = StoryObj<typeof Button>;

// Default Button Story
export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
    size: 'default',
  },
};

// Destructive Button Story
export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
    size: 'default',
  },
};

// Outline Button Story
export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    size: 'default',
  },
};

// Secondary Button Story
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'default',
  },
};

// Ghost Button Story
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'default',
  },
};

// Link Button Story
export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
    size: 'default',
  },
};

// Icon Button Story
export const Icon: Story = {
  args: {
    children: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),
    variant: 'default',
    size: 'icon',
  },
};

// Disabled Button Story
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'default',
    size: 'default',
    disabled: true,
  },
};

// As Child Button Story
export const AsChild: Story = {
  args: {
    children: 'As Child Button',
    variant: 'default',
    size: 'default',
    asChild: true,
  },
  render: args => (
    <Button {...args}>
      <a href="#">As Child Button</a>
    </Button>
  ),
};
