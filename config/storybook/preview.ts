import type { Preview } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { StyledDecorator } from '@/shared/config/storybook/StyledDecorator/StyledDecorator';
import { Theme } from '@/shared/const/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    StyledDecorator,
    ThemeDecorator(Theme.LIGHT),
    RouterDecorator,
    SuspenseDecorator,
  ],
};

export default preview;
