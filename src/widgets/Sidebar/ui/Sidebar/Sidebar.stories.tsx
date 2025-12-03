import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Sidebar } from './Sidebar';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'widgets/Sidebar',
  component: Sidebar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
Light.decorators = [
  StoreDecorator({
    user: { authData: {} },
  }),
];

export const Dark: Story = {
  args: {},
};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    user: { authData: {} },
  }),
];

export const NoAuth: Story = {
  args: {},
};
NoAuth.decorators = [
  StoreDecorator({}),
];
