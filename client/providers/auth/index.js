import { createContext, useContext } from 'react';
import { bool, node } from 'prop-types';

import { useCallback, useState } from 'react';
import ClientError from 'shared/error/transformError';
import axios from 'shared/axios';

const AuthContext = createContext({
  isAuth: false,
  login: async () => {},
  register: async () => {},
  loading: false
});

const AuthProvider = ({ children, user: _user, token: _token }) => {
  const [isAuth, setIsAuth] = useState(!!_user);

  const [loading, setLoading] = useState(false);
  const [user, _setUser] = useState(_user ? JSON.parse(_user) : {});

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/login', { email, password });
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProfile = useCallback(async token => {
    try {
      const { data } = await axios.post('/profile', null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    } finally {
    }
  }, []);

  const register = useCallback(async values => {
    setLoading(true);
    try {
      const { data } = await axios.post('/register', values);
      if (data.errors) {
        throw new ClientError(data.errors);
      }
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const setUser = useCallback(_user => {
    _setUser(_user);
    setIsAuth(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, login, getProfile, register, loading, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: node,
  isAuth: bool
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be using under AuthProvider');
  }
  return context;
};
