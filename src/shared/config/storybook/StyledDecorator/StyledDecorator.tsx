import '@/app/styles/index.scss';
import { StoryFn } from '@storybook/react';

export const StyledDecorator = (StoryToWrap: StoryFn) => <StoryToWrap />;
