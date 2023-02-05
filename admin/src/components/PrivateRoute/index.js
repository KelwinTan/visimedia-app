import { Redirect, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export default function PrivateRoute(props) {
  const location = useLocation();
  const { isAuth } = useAuth();
  if (!isAuth) {
    return <Redirect to={`/login?ld=${location.pathname}`} />;
  }
  return props.children;
}
