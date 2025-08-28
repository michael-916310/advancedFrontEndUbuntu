import type { Meta, StoryObj } from '@storybook/react';
import { ListBox } from './ListBox';

const meta = {
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        border: '1px dashed #ccc',
      }}
      >
        <Story />
      </div>
    ),
  ],
  title: 'shared/ListBox',
  component: ListBox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof ListBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      { content: 'long content 1', value: 'long content 1' },
      { content: 'long content 2', value: 'long content 2' },
    ],
    value: '123',
  },
};

export const TopStart: Story = {
  args: {
    direction: 'top start',
    items: [
      { content: 'long content 1', value: 'long content 1' },
      { content: 'long content 2', value: 'long content 2' },
    ],
    value: '123',
  },
};

export const TopEnd: Story = {
  args: {
    direction: 'top end',
    items: [
      { content: 'long content 1', value: 'long content 1' },
      { content: 'long content 2', value: 'long content 2' },
    ],
    value: '123',
  },
};

export const BottomStart: Story = {
  args: {
    direction: 'bottom start',
    items: [
      { content: 'long content 1', value: 'long content 1' },
      { content: 'long content 2', value: 'long content 2' },
    ],
    value: '123',
  },
};

export const BottomEnd: Story = {
  args: {
    direction: 'bottom end',
    items: [
      { content: 'long content 1', value: 'long content 1' },
      { content: 'long content 2', value: 'long content 2' },
    ],
    value: '123',
  },
};
