import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
    title: 'shared/Select',
    component: Select,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Primary label',
        options: [
            {
                value: 'v-1',
                content: 'content 1',
            },
            {
                value: 'v-2',
                content: 'content 2',
            },
            {
                value: 'v-3',
                content: 'content 3',
            },
        ],
    },
};
