import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../context/auth-context";
import _axios from "../../_axios";

export default function useBanner() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

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
      return data.banners;
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
        return data.message === "Banner successfully deleted";
      } catch (error) {
        return [];
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
        return data;
      } catch (error) {
        return {};
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
        const { data } = await _axios.post("/banners/" + id, formData, {
          headers: baseHeader,
        });
        return data;
      } catch (error) {
        return {};
      } finally {
        setLoading(false);
      }
    },
    [baseHeader]
  );

  return {
    loading,
    getAll,
    create,
    getDetail,
    remove,
    update,
  };
}
