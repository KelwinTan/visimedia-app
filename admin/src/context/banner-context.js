import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useAuth } from "../context/auth-context";
import _axios from "../_axios";
import { node } from "prop-types";

const BannerContext = createContext(undefined);

export default function BannerProvider({ children }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  const baseHeader = useMemo(
    () => ({
      Authorization: "Bearer " + token,
    }),
    [token]
  );

  const getAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await _axios.get("/banners", { headers: baseHeader });
      setBanners(data.banners);
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
        const { data } = await _axios.get("/banners/" + id, {
          headers: baseHeader,
        });
        return data.banner;
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
        const { data } = await _axios.delete("/banners/" + id, {
          headers: baseHeader,
        });
        setBanners((b) => {
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
    async ({ name, image }) => {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      try {
        const { data } = await _axios.post("/banners", formData, {
          headers: baseHeader,
        });
        setBanners((b) => [...b, data.banner]);
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
    async ({ id, name, image }) => {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      try {
        const { data } = await _axios.post(
          "/banners/" + id + "/update",
          formData,
          {
            headers: baseHeader,
          }
        );
        setBanners((b) => {
          const newData = [...b];
          const updateIdx = newData.findIndex((d) => d.id === id);
          newData[updateIdx] = data.banner;
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

  return (
    <BannerContext.Provider
      value={{
        loading,
        create,
        getAll,
        getDetail,
        remove,
        update,
        banners,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
}

BannerProvider.defaultProps = {
  children: node.isRequired,
};

export function useBanner() {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error("useBanner must be under BannerProvider");
  }
  return context;
}
