import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { RequireAuth } from 'app/providers/router/ui/RequireAuth';

// function AppRouter() {
const AppRouter = memo(() => {
  // const isAuth = useSelector(getUserAuthData);
  //
  // const routes = useMemo(() => Object.values(routeConfig).filter((item) => {
  //   if (item.authOnly && !isAuth) {
  //     return false;
  //   }
  //   return true;
  // }), [isAuth]);

  const renderWithWrapper = useCallback((route: AppRouteProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        <div className="page-wrapper">
          {route.element}
        </div>
      </Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
      />
    );
  }, []);

  return (
    <Routes>
      {Object.values(routeConfig).map(renderWithWrapper)}
      {/* {routes.map(({ element, path }) => ( */}
      {/*  <Route */}
      {/*    key={path} */}
      {/*    path={path} */}
      {/*    element={( */}
      {/*      <Suspense fallback={<PageLoader />}> */}
      {/*        <div className="page-wrapper"> */}
      {/*          {element} */}
      {/*        </div> */}
      {/*      </Suspense> */}
      {/*              )} */}
      {/*  /> */}
      {/* ))} */}
    </Routes>

  );
});

export { AppRouter };
