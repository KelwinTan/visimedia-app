import { useCallback, useMemo } from "react";
import { useAuth } from "../context/auth-context";
import _axios from "../_axios";

export default function useRole() {
  const { token } = useAuth();

  const baseHeader = useMemo(
    () => ({
      Authorization: "Bearer " + token,
    }),
    [token]
  );

  const get = useCallback(async () => {
    try {
      const { data } = await _axios.get("/roles", { headers: baseHeader });
      return data;
    } catch (error) {
      return [];
    }
  }, []);

  return {
    get,
  };
}
