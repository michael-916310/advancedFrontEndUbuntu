import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ProfilePage from 'pages/ProfilePage/ui/ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import AvatarImg from 'shared/assets/tests/Avatar.jpg';

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProfilePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {},
};
Light.decorators = [StoreDecorator({
  profile: {
    form: {
      username: 'michael buranov',
      age: 23,
      country: Country.Russia,
      currency: Currency.RUB,
      city: 'Soshi',
      avatar: AvatarImg,
      first: 'michael',
      lastname: 'buranov',
    },
  },
})];

export const Dark: Story = {
  args: {},
};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      username: 'michael buranov',
      age: 23,
      country: Country.Russia,
      currency: Currency.RUB,
      city: 'Soshi',
      avatar: AvatarImg,
      first: 'michael',
      lastname: 'buranov',
    },
  },
})];
