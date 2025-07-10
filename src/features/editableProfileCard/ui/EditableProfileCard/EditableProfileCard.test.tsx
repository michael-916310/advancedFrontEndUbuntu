import { componentRender } from 'shared/lib/tests';
import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 465,
  currency: Currency.USD,
  country: Country.Kazakhstan,
  city: 'Moscow',
  username: 'admin123',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
      isLoading: false,
    },
    user: {
      authData: { id: '1', username: 'admin' },
      _mounted: true,
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

const originalResizeObserver = global.ResizeObserver;

describe('feature/EditableProfileCard', () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      // eslint-disable-next-line class-methods-use-this
      observe() {
      }

      // eslint-disable-next-line class-methods-use-this
      unobserve() {
      }

      // eslint-disable-next-line class-methods-use-this
      disconnect() {
      }
    };
  });

  afterAll(() => {
    global.ResizeObserver = originalResizeObserver;
  });

  test('readonly mode', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(screen.getByTestId('ProfilePageCardHeader.EditButton'));

    expect(screen.getByTestId('ProfilePageCardHeader.CancelButton')).toBeInTheDocument();
  });

  test('При отмене значения обнуляются', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(screen.getByTestId('ProfilePageCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

    await userEvent.click(screen.getByTestId('ProfilePageCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
  });

  test('Должна появиться ошибка', async () => {
    componentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(screen.getByTestId('ProfilePageCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

    await userEvent.click(screen.getByTestId('ProfilePageCardHeader.SaveButton'));

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  });

  test('Запрос на сервер', async () => {
    const mockPutReq = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(mockPutReq).toHaveBeenCalled();
  });
});
