import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./auth-context";
import _axios from "../_axios";
import { node } from "prop-types";

const ProductContext = createContext(undefined);

export default function ProductProvider({ children }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const baseHeader = useMemo(
    () => ({
      Authorization: "Bearer " + token,
    }),
    [token]
  );

  const getAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await _axios.get("/products", { headers: baseHeader });
      setProducts(data.products);
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  }, [baseHeader]);

  const create = useCallback(
    async ({ name, description, sku, price, image, category_id, quantity }) => {
      setLoading(true);

      const formData = new FormData();
      Object.entries({
        name,
        description,
        sku,
        price,
        image,
        category_id,
        quantity,
      }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        const { data } = await _axios.post("/products", formData, {
          headers: baseHeader,
        });
        setProducts((b) => [...b, data.product]);
        return data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [baseHeader]
  );

  return (
    <ProductContext.Provider
      value={{
        loading,
        create,
        getAll,
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.defaultProps = {
  children: node.isRequired,
};

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be under ProductProvider");
  }
  return context;
}
