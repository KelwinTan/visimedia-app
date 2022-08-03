import { useCallback, useMemo } from "react";
import { useAuth } from "../context/auth-context";
import _axios from "../_axios";

export default function useBanner() {
  const { token } = useAuth();

  const baseHeader = useMemo(
    () => ({
      Authorization: "Bearer " + token,
    }),
    [token]
  );

  const getAll = useCallback(async () => {
    try {
      const { data } = await _axios.get("/banners", { headers: baseHeader });
      return data.banners;
    } catch (error) {
      return [];
    }
  }, []);

  const getDetail = useCallback(async (id) => {
    try {
      const { data } = await _axios.get("/banners/" + id, {
        headers: baseHeader,
      });
      return data.banner;
    } catch (error) {
      return [];
    }
  }, []);

  const remove = useCallback(async (id) => {
    try {
      const { data } = await _axios.delete("/banners/" + id, {
        headers: baseHeader,
      });
      return data.message === "Banner successfully deleted";
    } catch (error) {
      return [];
    }
  }, []);

  const create = useCallback(async ({ name, image }) => {
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
    }
  }, []);

  return {
    getAll,
    create,
    getDetail,
    remove,
  };
}
