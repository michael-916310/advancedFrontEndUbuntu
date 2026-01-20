import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/shared/ui/deprecated/Button/Button';
import { Dropdown } from './Dropdown';

const meta = {
    title: 'shared/Dropdown',
    component: Dropdown,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'padded',
    },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        trigger: <Button>Open</Button>,
        items: [
            {
                content: 'first',
            },
            {
                content: 'second',
            },
            {
                content: 'third',
            },
        ],
    },
};
