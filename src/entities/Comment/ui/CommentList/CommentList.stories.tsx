import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from 'entities/Comment';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
} satisfies Meta<typeof CommentList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    comments: [{
      id: '1',
      text: 'comment 1',
      user: {
        id: '1',
        username: 'admin',
      },
    },
    {
      id: '2',
      text: 'comment 2',
      user: {
        id: '2',
        username: 'vasy',
      },
    }],
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    comments: [],
  },
};

export const Empty: Story = {
  args: {
    comments: [],
  },
};
