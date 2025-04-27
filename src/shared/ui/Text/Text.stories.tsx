import { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

const meta = {
  title: 'shared/Text',
  component: Text,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'title lorem ipsum',
    text: 'text lorem ipsum',
  },
};

export const Error: Story = {
  args: {
    title: 'title lorem ipsum',
    text: 'text lorem ipsum',
    theme: TextTheme.ERROR,
  },
};

export const OnlyTitle: Story = {
  args: {
    title: 'title lorem ipsum',
  },
};

export const OnlyText: Story = {
  args: {
    text: 'text lorem ipsum',
  },
};

export const PrimaryDark: Story = {
  args: {
    title: 'title lorem ipsum',
    text: 'text lorem ipsum',
  },
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark: Story = {
  args: {
    title: 'title lorem ipsum',
  },
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark: Story = {
  args: {
    text: 'text lorem ipsum',
  },
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL: Story = {
  args: {
    title: 'title lorem ipsum',
    text: 'text lorem ipsum',
    size: TextSize.L,
  },
};

export const SizeM: Story = {
  args: {
    title: 'title lorem ipsum',
    text: 'text lorem ipsum',
    size: TextSize.M,
  },
};

export const SizeS: Story = {
  args: {
    title: 'title lorem ipsum',
    text: 'text lorem ipsum',
    size: TextSize.S,
  },
};
