import type { Preview } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { StyledDecorator } from '@/shared/config/storybook/StyledDecorator/StyledDecorator';
import { Theme } from '@/shared/const/theme';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorators';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        themes: {
            default: 'light',
            list: [
                { name: 'light', class: Theme.LIGHT, color: '#ffffff' },
                { name: 'dark', class: Theme.DARK, color: '#3b5998' },
                { name: 'orange', class: Theme.ORANGE, color: '#ffb005' },
            ],
        },
    },

    decorators: [
        StyledDecorator,
        ThemeDecorator(Theme.LIGHT),
        RouterDecorator,
        SuspenseDecorator,
        FeatureFlagsDecorator({}),
    ],
};

export default preview;
