import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';
import { Roles } from '~/interfaces/auth';

export default function withRole<T>(roles: Roles[]) {
  return function (Component: React.ComponentType<T>) {
    return function WrappedComponent(props: T & React.HTMLAttributes<T>) {
      const { user, isAuthenticated } = useAuth();

      if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
      } else if (user?.role && roles.includes(user.role)) {
        return <Component {...props} />;
      }
      return <Navigate to='/unauthorized' replace />;
    };
  };
}
