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

const VariantContext = createContext(undefined);

export default function VariantProvider({ children }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState([]);

  const baseHeader = useMemo(
    () => ({
      Authorization: "Bearer " + token,
    }),
    [token]
  );

  const getAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await _axios.get("/variants", { headers: baseHeader });
      setVariants(data.variants);
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  }, [baseHeader]);

  const getDetail = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const { data } = await _axios.get("/variants/" + id, {
          headers: baseHeader,
        });
        return data.variant;
      } catch (error) {
        return [];
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
        const { data } = await _axios.delete("/variants/" + id, {
          headers: baseHeader,
        });
        setVariants((b) => {
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

  const create = useCallback(
    async ({ name }) => {
      setLoading(true);

      try {
        const { data } = await _axios.post(
          "/variants/create",
          { variant: name },
          {
            headers: baseHeader,
          }
        );
        setVariants((b) => [...b, data.variant]);
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
    async ({ id, name }) => {
      setLoading(true);

      try {
        const { data } = await _axios.post(
          `/variants/${id}/update`,
          { variant: name },
          {
            headers: baseHeader,
          }
        );
        setVariants((b) => [...b, data.variant]);
        return data;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [baseHeader]
  );

  const createWithDetails = useCallback(
    async ({ price, product_id, product_variant_name, variant_values }) => {
      setLoading(true);

      try {
        const { data } = await _axios.post(
          "/product-variants/create/with-details",
          {
            price: Number(price),
            product_id,
            product_variant_name: product_variant_name?.trim(),
            variant_values,
          },
          {
            headers: baseHeader,
          }
        );
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
    <VariantContext.Provider
      value={{
        loading,
        create,
        getAll,
        remove,
        update,
        variants,
        getDetail,
        createWithDetails,
      }}
    >
      {children}
    </VariantContext.Provider>
  );
}

VariantProvider.defaultProps = {
  children: node.isRequired,
};

export function useVariant() {
  const context = useContext(VariantContext);
  if (context === undefined) {
    throw new Error("useVariant must be under VariantProvider");
  }
  return context;
}
