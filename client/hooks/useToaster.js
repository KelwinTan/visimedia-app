import { useCallback } from "react";
import toast from "react-hot-toast";

export default function useToaster() {
  const error = useCallback((msg) => {
    toast.error(msg);
  }, []);

  const success = useCallback((msg) => {
    toast.success(msg);
  }, []);

  return {
    error,
    success,
  };
}
