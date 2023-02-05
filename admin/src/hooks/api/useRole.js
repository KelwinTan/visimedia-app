import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../context/auth-context";
import _axios from "../../_axios";

export default function useRole() {
  const { token } = useAuth();
  const [roles, setRoles] = useState([]);
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
      const { data } = await _axios.get("/roles", { headers: baseHeader });
      setRoles(data.roles || []);
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  }, [baseHeader]);

  const create = useCallback(
    async ({ name }) => {
      setLoading(true);
      try {
        const { data } = await _axios.post(
          "/roles",
          { name },
          { headers: baseHeader }
        );
        setRoles((r) => [...r, data.role]);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [baseHeader]
  );

  const remove = useCallback(
    async ({ id }) => {
      setLoading(true);
      try {
        const { data } = await _axios.delete("/roles/" + id, {
          headers: baseHeader,
        });
        console.log({ data });
        return true;
      } catch (error) {
        throw error;
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
    roles,
    remove,
  };
}
