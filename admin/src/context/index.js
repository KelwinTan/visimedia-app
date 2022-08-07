import { node } from "prop-types";
import { CookiesProvider } from "react-cookie";
import AuthProvider from "./auth-context";
import BannerProvider from "./banner-context";

export default function ContextProvider({ children }) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <BannerProvider>{children}</BannerProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

ContextProvider.defaultProps = {
  children: node.isRequired,
};
