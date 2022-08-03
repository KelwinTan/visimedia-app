import { node } from "prop-types";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import COOKIES from "../shared/cookies";
import revalidateAfter from "../shared/time/revalidateAfter";
import _axios from "../_axios";

const AuthContext = createContext({
  isAuth: false,
  user: {},
  token: "",
  login: async () => {},
  logout: async () => {},
});

export default function AuthProvider({ children }) {
  const [cookie, setCookie, removeCookie] = useCookies();

  const user = useMemo(() => {
    if (!cookie[COOKIES.AUTH]) return null;
    return JSON.parse(cookie[COOKIES.AUTH]);
  }, [cookie]);

  const token = useMemo(() => {
    return cookie[COOKIES.TOKEN] || "";
  }, [cookie]);

  const login = useCallback(
    async ({ email, password }) => {
      const { data } = await _axios.post("/login/admin", { email, password });
      if (!data) {
        throw new Error("please check email or password");
      }

      const token = data.access_token;
      const expires = data.expires_in * 1000;

      /**
       * get profile
       */
      const { data: profile } = await _axios.post("/profile", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const config = { expires: revalidateAfter(expires) };
      setCookie(COOKIES.TOKEN, token, config);
      setCookie(COOKIES.AUTH, JSON.stringify(profile), config);
    },
    [setCookie]
  );

  const logout = useCallback(async () => {
    await _axios.post("/logout", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    removeCookie(COOKIES.TOKEN);
    removeCookie(COOKIES.AUTH);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuth: !!user,
        login,
        logout,
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.defaultProps = {
  children: node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be under AuthProvider");
  }
  return context;
}
