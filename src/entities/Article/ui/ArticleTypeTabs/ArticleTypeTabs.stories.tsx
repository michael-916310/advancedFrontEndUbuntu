import type { Meta, StoryObj } from '@storybook/react';
import { ArticleTypeTabs } from './ArticleTypeTabs';
import { ArticleType } from '../../model/consts/consts';

const meta = {
  title: 'entities/Article/ArticleTypeTabs',
  component: ArticleTypeTabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof ArticleTypeTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    value: ArticleType.IT,
  },
};
