import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryToWrap: StoryFn) => (
  <StoreProvider initialState={state as StateSchema}>
    <StoryToWrap />
  </StoreProvider>
);
