import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { Navbar } from './Navbar';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'widgets/Navbar',
  component: Navbar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
Light.decorators = [StoreDecorator({})];

export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const AuthNavBar: Story = {
  args: {},
};
AuthNavBar.decorators = [
  StoreDecorator({
    user: {
      authData: {},
    },
  }),
];
