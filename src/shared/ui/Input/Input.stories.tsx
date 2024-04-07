import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'shared/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: 'Type text',
    value: '123131',
  },
};
