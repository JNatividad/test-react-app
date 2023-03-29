import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  redirectTo = "/",
  children,
}) => {
  if (!localStorage.getItem('token')) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};
