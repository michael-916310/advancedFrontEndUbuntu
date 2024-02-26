import { StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryToWrap: StoryFn) => (
  <div className={`app ${theme}`}>
    <StoryToWrap />
  </div>
);
