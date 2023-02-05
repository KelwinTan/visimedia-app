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
    async ({
      name,
      description,
      sku,
      price,
      image,
      category_id,
      variant_values,
    }) => {
      setLoading(true);

      const formData = new FormData();
      Object.entries({
        name,
        description,
        sku,
        price,
        image,
        category_id,
        variant_values,
      }).forEach(([key, value]) => {
        if (typeof value !== "undefined") {
          if (Array.isArray(value)) {
            value.forEach((v, idx) => {
              formData.append(`${key}[${idx}]`, JSON.stringify(v));
            });
          } else {
            formData.append(key, value);
          }
        }
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

  const update = useCallback(
    async ({
      name,
      description,
      sku,
      price,
      image,
      category_id,
      tokopedia_link,
      shopee_link,
      id,
      variant_values = [],
    }) => {
      setLoading(true);

      const formData = new FormData();
      Object.entries({
        name,
        description,
        sku,
        price,
        image,
        category_id,
        tokopedia_link,
        shopee_link,
        variant_values,
      }).forEach(([key, value]) => {
        if (typeof value !== "undefined") {
          if (Array.isArray(value)) {
            value.forEach((v, idx) => {
              formData.append(`${key}[${idx}]`, JSON.stringify(v));
            });
          } else {
            formData.append(key, value);
          }
        }
      });

      try {
        const { data } = await _axios.post(`/products/${id}/update`, formData, {
          headers: baseHeader,
        });
        setProducts((b) => {
          const newData = [...b];
          const updateIdx = newData.findIndex((d) => d.id === id);
          newData[updateIdx] = data.product;
          return newData;
        });
        return data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [baseHeader]
  );

  const remove = useCallback(
    async (id) => {
      setLoading(true);

      try {
        const { data } = await _axios.delete("/products/" + id, {
          headers: baseHeader,
        });
        setProducts((b) => {
          const delIdx = b.findIndex((d) => d.id === id);
          return [...b.slice(0, delIdx), ...b.slice(delIdx + 1)];
        });
        return data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [baseHeader]
  );

  const getDetail = useCallback(
    async (id) => {
      setLoading(true);

      try {
        const { data } = await _axios.get("/products/" + id, {
          headers: baseHeader,
        });
        return data.product;
      } catch (error) {
        return {};
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
        remove,
        getDetail,
        update,
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
