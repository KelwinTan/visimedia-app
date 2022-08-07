import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export default function PublicRoute(props) {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return props.children;
}
