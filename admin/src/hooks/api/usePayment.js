import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../context/auth-context";
import _axios from "../../_axios";

export default function usePayment() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const baseHeader = useMemo(
    () => ({
      Authorization: "Bearer " + token,
    }),
    [token]
  );

  const updateStatus = useCallback(
    async (paymentId, statusId) => {
      setLoading(true);
      try {
        const { data } = await _axios.post(
          `payment-details/update-status/${paymentId}`,
          { status_id: statusId },
          {
            headers: baseHeader,
          }
        );
        return data.payment_detail;
      } catch (error) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    [baseHeader]
  );

  const getDetail = useCallback(
    async (paymentId) => {
      setLoading(true);
      try {
        const { data } = await _axios.get(`payment-details/${paymentId}`, {
          headers: baseHeader,
        });
        return data.paymentDetail;
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
    getDetail,
    updateStatus,
  };
}
