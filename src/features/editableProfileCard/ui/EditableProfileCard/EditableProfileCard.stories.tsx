import type { Meta, StoryObj } from '@storybook/react';

import { EditableProfileCard } from './EditableProfileCard';

const meta = {
  title: 'features/editableProfileCard/EditableProfileCard',
  component: EditableProfileCard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof EditableProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: '',
  },
};
