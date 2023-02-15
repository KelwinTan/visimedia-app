import { node } from "prop-types";
import { CookiesProvider } from "react-cookie";
import AuthProvider from "./auth-context";
import BannerProvider from "./banner-context";
import BestProductProvider from "./best-product-context";
import CategoryProvider from "./category-context";
import ProductProvider from "./product-context";
import VariantProvider from "./variant-context";

export default function ContextProvider({ children }) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <BannerProvider>
          <CategoryProvider>
            <ProductProvider>
              <VariantProvider>
                <BestProductProvider>{children}</BestProductProvider>
              </VariantProvider>
            </ProductProvider>
          </CategoryProvider>
        </BannerProvider>
      </AuthProvider>
    </CookiesProvider>
  );
}

ContextProvider.defaultProps = {
  children: node.isRequired,
};
