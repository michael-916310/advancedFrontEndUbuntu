import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
  title: 'shared/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Clear: Story = {
  args: {},
};

export const OutlineDark: Story = {
  args: {},
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
