import { useState, useEffect } from 'react';
import { signInAdmin, signOutAdmin, onAuthChange, resetAdminPassword } from '../firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const loggedIn = await signInAdmin(email, password);
      setUser(loggedIn);
      return loggedIn;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOutAdmin();
      setUser(null);
    } catch (err) {
      console.error('[useAuth] Logout error:', err);
    }
  };

  const requestPasswordReset = async (email) => {
    return await resetAdminPassword(email);
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    loading,
    error,
    login,
    logout,
    requestPasswordReset,
  };
}

