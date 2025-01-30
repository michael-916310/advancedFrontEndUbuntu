import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Tabs } from './Tabs';

const meta = {
  title: 'shared/Tabs',
  component: Tabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    tabs: [{
      value: 'tab 1',
      content: 'tab 1',
    },
    {
      value: 'tab 2',
      content: 'tab 2',
    },
    {
      value: 'tab 3',
      content: 'tab 3',
    },
    ],
    value: 'tab 1',
    onTabClick: action('onTabClick'),
  },
};
