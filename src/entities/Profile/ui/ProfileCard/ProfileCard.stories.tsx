import type { Meta, StoryObj } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/Avatar.jpg';
import { ProfileCard } from './ProfileCard';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'entity/ProfileCard',
    component: ProfileCard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'padded',
    },
} satisfies Meta<typeof ProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const args = {
    data: {
        username: 'michael buranov',
        age: 23,
        country: Country.Russia,
        currency: Currency.RUB,
        city: 'Soshi',
        avatar: AvatarImg,
        first: 'michael',
        lastname: 'buranov',
    },
};

export const Primary: Story = {
    args,
};

export const PrimaryRedesigned: Story = {
    args,
};
PrimaryRedesigned.decorators = [NewDesignDecorator];

export const withError: Story = {
    args: {
        error: 'error',
    },
};

export const withLoading: Story = {
    args: {
        isLoading: true,
    },
};
