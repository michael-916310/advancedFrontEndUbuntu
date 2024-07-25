import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetails } from './ArticleDetails';

const meta = {
  title: 'entities/ArticleDetails',
  component: ArticleDetails,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ArticleDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    id: '1',
  },
};
