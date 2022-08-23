import { node } from "prop-types";
import { CookiesProvider } from "react-cookie";
import AuthProvider from "./auth-context";
import BannerProvider from "./banner-context";
import CategoryProvider from "./category-context";
import ProductProvider from "./product-context";

export default function ContextProvider({ children }) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <BannerProvider>
          <CategoryProvider>
            <ProductProvider>{children}</ProductProvider>
          </CategoryProvider>
        </BannerProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

ContextProvider.defaultProps = {
  children: node.isRequired,
};
