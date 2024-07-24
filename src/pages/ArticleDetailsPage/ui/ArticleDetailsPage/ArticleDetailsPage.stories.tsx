import type { Meta, StoryObj } from '@storybook/react';
import ArticleDetailsPage from './ArticleDetailsPage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'shared/ArticleDetailsPage',
  component: ArticleDetailsPage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
} satisfies Meta<typeof ArticleDetailsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {},
};
