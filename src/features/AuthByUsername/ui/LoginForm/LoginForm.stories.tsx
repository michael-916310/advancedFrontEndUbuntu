import type { Meta, StoryObj } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import LoginForm from './LoginForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'features/LoginForm',
    component: LoginForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'padded',
    },
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
Primary.decorators = [
    StoreDecorator({
        loginForm: { username: 'admin', password: '123', isLoading: false },
    }),
];

export const WithError: Story = {
    args: {},
};
WithError.decorators = [
    StoreDecorator({
        loginForm: {
            username: 'admin',
            password: '123',
            isLoading: false,
            error: 'error',
        },
    }),
];

export const Loading: Story = {
    args: {},
};
Loading.decorators = [
    StoreDecorator({
        loginForm: {
            isLoading: true,
        },
    }),
];
