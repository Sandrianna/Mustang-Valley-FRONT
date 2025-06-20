import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { LoginState } from '../interfaces';

export function ProtectedAdminRoute({ children, role }: { children: JSX.Element, role?: string }) {
  const { user } = useSelector((state: LoginState) => state.login);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}