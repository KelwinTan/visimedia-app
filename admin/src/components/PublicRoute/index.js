import { Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export default function PublicRoute(props) {
  const { isAuth } = useAuth();
  if (isAuth) {
    return <Redirect to="/" />;
  }
  return props.children;
}
