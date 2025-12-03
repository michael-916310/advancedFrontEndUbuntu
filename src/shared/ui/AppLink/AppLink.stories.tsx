import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AppLink, AppLinkTheme } from './AppLink';
import { Theme } from '@/shared/const/theme';

const meta = {
  title: 'shared/AppLink',
  component: AppLink,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    to: '#',
  },
} satisfies Meta<typeof AppLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LightPrimary: Story = {
  args: {
    theme: AppLinkTheme.PRIMARY,
    children: 'primary link',
  },
};

export const LightSecondary: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
    children: 'secondary link',
  },
};

export const DarkPrimary: Story = {
  args: {
    theme: AppLinkTheme.PRIMARY,
    children: 'primary link',
  },
};
DarkPrimary.decorators = [ThemeDecorator(Theme.DARK)];

export const DarkSecondary: Story = {
  args: {
    theme: AppLinkTheme.SECONDARY,
    children: 'primary link',
  },
};
DarkSecondary.decorators = [ThemeDecorator(Theme.DARK)];
