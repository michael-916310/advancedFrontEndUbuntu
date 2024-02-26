import type { Meta, StoryObj } from '@storybook/react';
import { Button, ThemeButton } from './Button';
import 'app/styles/index.scss';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Clear: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.CLEAR,
  },
};
export const Outline: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
  },
};

export const OutlineDark: Story = {
  args: {
    children: 'Text',
    theme: ThemeButton.OUTLINE,
  },
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Primary: Story = {
  args: {
    children: 'Text',
  },
};
