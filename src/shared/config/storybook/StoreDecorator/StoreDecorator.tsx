import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { DeepPartial } from 'shared/types';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

const defaultAsyncReducers: DeepPartial<ReducersMapObject<StateSchema>> = {
  loginForm: loginReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryToWrap: StoryFn) => (
  <StoreProvider
    initialState={state as StateSchema}
    asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
  >
    <StoryToWrap />
  </StoreProvider>
);
