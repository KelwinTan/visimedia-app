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

const BestProductContext = createContext(undefined);

export default function BestProductProvider({ children }) {
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
      const { data } = await _axios.get("/best-seller", {
        headers: baseHeader,
      });
      setProducts(data.best_sellers);
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  }, [baseHeader]);

  const create = useCallback(
    async ({ product_id }) => {
      setLoading(true);

      try {
        const { data } = await _axios.post(
          "/products/best-seller",
          { product_id },
          {
            headers: baseHeader,
          }
        );
        getAll();
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
        const { data } = await _axios.delete("/best-seller/" + id, {
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

  return (
    <BestProductContext.Provider
      value={{
        loading,
        create,
        getAll,
        products,
        remove,
      }}
    >
      {children}
    </BestProductContext.Provider>
  );
}

BestProductProvider.defaultProps = {
  children: node.isRequired,
};

export function useBestProduct() {
  const context = useContext(BestProductContext);
  if (context === undefined) {
    throw new Error("useBestProduct must be under BestProductProvider");
  }
  return context;
}
