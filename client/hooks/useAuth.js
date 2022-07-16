import { useCallback, useState } from "react";
import ClientError from "shared/error/transformError";
import axios from "shared/axios";
import authConstant from "constants/auth";
import { canUseDOM } from "utils/dom";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(() =>
    canUseDOM() ? !!localStorage.getItem(authConstant.TOKEN) : false
  );

  const [loading, setLoading] = useState(false);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/login", { email, password });
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async ({ name, email, phone, password, password_confirmation }) => {
      setLoading(true);
      try {
        const { data } = await axios.post("/register", {
          name,
          email,
          phone,
          password,
          password_confirmation,
        });
        if (data.errors) {
          throw new ClientError(data.errors);
        }
        return data;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    isAuth,
    loading,
    login,
    register,
  };
}
