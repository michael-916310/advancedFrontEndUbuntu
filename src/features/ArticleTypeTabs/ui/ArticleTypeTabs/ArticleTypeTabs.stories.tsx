import type { Meta, StoryObj } from '@storybook/react';

import { ArticleTypeTabs } from './ArticleTypeTabs';
import { ArticleType } from '@/entities/Article';

const meta = {
  title: 'features/ArticleTypeTabs',
  component: ArticleTypeTabs,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ArticleTypeTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: ArticleType.IT,
  },
};
