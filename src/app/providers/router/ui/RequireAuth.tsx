import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';

import { RoutePath } from '@/shared/const/router';

interface Props {
  children: JSX.Element;
  roles?: UserRole[];
}

export function RequireAuth({ children, roles }: Props) {
  const auth = useSelector(getUserAuthData);
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasRoles = useMemo(() => {
    if (!roles) {
      return true;
    }
    return roles.some((role) => {
      return userRoles?.includes(role);
    });
  }, [roles, userRoles]);

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  if (!hasRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
  }

  return children;
}
