import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../context/auth-context";
import _axios from "../../_axios";

export default function useOrder() {
  const { token } = useAuth();

  const [order, setOrder] = useState([]);
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
      const { data } = await _axios.get("/order-details", {
        headers: baseHeader,
      });
      setOrder(data.data.order_details || []);
    } catch (error) {
      return [];
    } finally {
      setLoading(false);
    }
  }, [baseHeader]);

  const verify = useCallback(
    async (id) => {
      try {
        const { data } = await _axios.post(
          `order-details/verify/${id}`,
          {
            order_verified: true,
          },
          {
            headers: baseHeader,
          }
        );
        return data.order_details;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [baseHeader]
  );

  return {
    loading,
    getAll,
    order,
    verify,
  };
}
