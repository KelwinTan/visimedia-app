import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { node } from "prop-types";
import _axios from "shared/axios";

const CategoryContext = createContext({
  isMobile: false,
  isDesktop: false,
});

const CategoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const getAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await _axios.get("/categories");
      return data?.categories || [];
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CategoryContext.Provider value={{ loading, getAll }}>
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: node,
};

export default CategoryProvider;

export const useCategory = () => {
  return useContext(CategoryContext);
};
