import { StoryFn } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenseDecorator = (StoryToWrap: StoryFn) => (
  <Suspense fallback="loading...">
    <StoryToWrap />
  </Suspense>
);
