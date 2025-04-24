import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'shared/Flex',
  component: Flex,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    direction: 'row',
    children: (
      <>
        <div>1 row</div>
        <div>2 row</div>
      </>
    ),
  },
};

export const Row: Story = {
  args: {
    direction: 'row',
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
};

export const RowGap4: Story = {
  args: {
    direction: 'row',
    gap: '4',
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
};

export const RowGap8: Story = {
  args: {
    direction: 'row',
    gap: '8',
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
};

export const RowGap16: Story = {
  args: {
    direction: 'row',
    gap: '16',
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
};

export const RowGap32: Story = {
  args: {
    direction: 'row',
    gap: '32',
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
};

export const ColumnGap8: Story = {
  args: {
    direction: 'column',
    gap: '8',
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
};

export const ColumnGap16: Story = {
  args: {
    direction: 'column',
    gap: '16',
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
};

export const ColumnAlignEnd: Story = {
  args: {
    direction: 'column',
    align: 'end',
    children: (
      <>
        <div>1</div>
        <div>2</div>
      </>
    ),
  },
};
