import { screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import { componentRender } from '@/shared/lib/tests';
import { AppRouter } from './AppRouter';
import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { UserRole } from '@/entities/User';

import '@testing-library/jest-dom';

const originalResizeObserver = global.ResizeObserver;

describe('app/router/AppRouter', () => {
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

  test('Страница рендерится', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout(),
    });

    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  test('Страница не найдена', async () => {
    componentRender(<AppRouter />, {
      route: '/sdsdss',
    });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('Редирект не авторизованного пользователя на главную', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('Доступ к закрытой странице для авторизованного пользователя', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: { _mounted: true, authData: { id: '', username: '' } },
      },
    });

    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });

  test('Доступ запрещен (отсутствует роль)', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: { _mounted: true, authData: { id: '', username: '' } },
      },
    });

    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });

  test('Доступ разрешен (присутствую роль)', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: { _mounted: true, authData: { id: '', username: '', roles: [UserRole.ADMIN] } },
      },
    });

    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});
