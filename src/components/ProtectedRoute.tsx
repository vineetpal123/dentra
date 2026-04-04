import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/login/selectors";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

interface UnprotectedRouteProps {
  element: React.ReactElement;
}

export const UnprotectedRoute = ({ element }: UnprotectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return !isAuthenticated ? element : <Navigate to="/" replace />;
};
