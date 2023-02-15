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

const CategoryContext = createContext(undefined);

export default function CategoryProvider({ children }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const baseHeader = useMemo(
    () => ({
      Authorization: "Bearer " + token,
    }),
    [token]
  );

  const getAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await _axios.get("/categories", { headers: baseHeader });
      setCategories(data.categories);
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
        const { data } = await _axios.get("/categories/" + id, {
          headers: baseHeader,
        });
        return data.category;
      } catch (error) {
        return {};
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
        const { data } = await _axios.delete("/categories/" + id, {
          headers: baseHeader,
        });
        setCategories((b) => {
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
    async ({ name, description }) => {
      setLoading(true);

      try {
        const { data } = await _axios.post(
          "/categories",
          { name, description },
          {
            headers: baseHeader,
          }
        );
        setCategories((b) => [...b, data.category]);
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
    <CategoryContext.Provider
      value={{
        loading,
        create,
        getAll,
        getDetail,
        remove,
        categories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

CategoryProvider.defaultProps = {
  children: node.isRequired,
};

export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("useCategory must be under CategoryProvider");
  }
  return context;
}
