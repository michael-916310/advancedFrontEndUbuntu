import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Loader } from './Loader';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'shared/Loader',
  component: Loader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Clear: Story = {
  args: {},
};

export const OutlineDark: Story = {
  args: {},
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
