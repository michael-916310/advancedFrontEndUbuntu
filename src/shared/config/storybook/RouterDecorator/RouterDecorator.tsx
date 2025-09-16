import '@/app/styles/index.scss';
import { StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryToWrap: StoryFn) => (
  <BrowserRouter>
    <StoryToWrap />
  </BrowserRouter>
);
