import { StoryFn } from '@storybook/react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

export const ThemeDecorator = (theme: Theme) => (StoryToWrap: StoryFn) => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <StoryToWrap />
    </div>
  </ThemeProvider>
);
