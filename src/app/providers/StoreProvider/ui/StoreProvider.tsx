import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from 'app/providers/StoreProvider/config/store';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';

interface StoreProvideProps {
  children?: ReactNode;
  initialState?: Partial<StateSchema>;
}

const StoreProvider = ({ children, initialState }: StoreProvideProps) => {
  const store = createReduxStore(initialState as StateSchema);

  return <Provider store={store}>{children}</Provider>;
};

export { StoreProvider };
