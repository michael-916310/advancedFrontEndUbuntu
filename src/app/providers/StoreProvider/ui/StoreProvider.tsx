import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';

import { DeepPartial } from '@/app/types/types';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../../StoreProvider/config/store';

interface StoreProvideProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

const StoreProvider = ({
  children,
  initialState,
  asyncReducers,
}: StoreProvideProps) => {
  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
  );

  return <Provider store={store}>{children}</Provider>;
};

export { StoreProvider };
