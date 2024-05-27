import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { profileReducer } from 'entities/Profile';
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { DeepPartial } from 'app/types/types';

const defaultAsyncReducers: DeepPartial<ReducerList> = {
  loginForm: loginReducer,
  profile: profileReducer,
};

// eslint-disable-next-line max-len
export const StoreDecorator = (state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducerList>) => (StoryToWrap: StoryFn) => (
  <StoreProvider
    initialState={state as StateSchema}
    asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
  >
    <StoryToWrap />
  </StoreProvider>
);
