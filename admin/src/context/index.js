import { node } from "prop-types";
import { CookiesProvider } from "react-cookie";
import AuthProvider from "./auth-context";

export default function ContextProvider({ children }) {
  return (
    <CookiesProvider>
      <AuthProvider>{children}</AuthProvider>
    </CookiesProvider>
  );
}

ContextProvider.defaultProps = {
  children: node.isRequired,
};
