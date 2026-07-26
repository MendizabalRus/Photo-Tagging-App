// Packages
import { useState, useEffect, createContext, useContext } from 'react';

import * as auth from '../api/auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set user`s JWT inside  local storage.
  const logIn = async (credentials) => {
    setLoading(true);

    try {
      const result = await auth.logIn(credentials);

      localStorage.setItem('token', result.token);

      setUser(result.user);

      return result;
    } finally {
      setLoading(false);
    }
  };

  // Remove user's JWT from local storage.
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  // Load user's token and data.
  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        setLoading(false)
        return;
    }

    try {
        const user = await auth.user();
        setUser(user);
    } catch {
        localStorage.removeItem("token")
        setUser(null);
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line
    loadUser();
  }, [])

  return (
    <AuthContext.Provider
        value={{
            user,
            loading,
            logIn,
            logOut,
            loadUser,
        }}
    >
        {children}
    </AuthContext.Provider>
  )
};
// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);