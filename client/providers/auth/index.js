import { createContext, useContext } from "react";
import { bool, node } from "prop-types";

import { useCallback, useState } from "react";
import ClientError from "shared/error/transformError";
import axios from "shared/axios";

const AuthContext = createContext({
  isAuth: false,
  login: async () => {},
  register: async () => {},
  loading: false,
});

const AuthProvider = ({ children, isAuth: _isAuth }) => {
  const [isAuth, setIsAuth] = useState(_isAuth);

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

  return (
    <AuthContext.Provider value={{ isAuth, login, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: node,
  isAuth: bool,
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be using under AuthProvider");
  }
  return context;
};
