import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { storage } from '../utils/storage';

/**
 * Frontend-only demo authentication (BRD §14: real auth is out of scope).
 * Passwords are never stored — any password of 6+ characters signs in. Replace login/register
 * with real API calls in Phase 2; components only use this context's interface.
 */
const AuthContext = createContext(null);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get('user', null));

  const persist = (u) => {
    setUser(u);
    if (u) storage.set('user', u);
    else storage.remove('user');
  };

  const login = useCallback(async ({ email }) => {
    await wait(700);
    const known = storage.get('accounts', []).find((a) => a.email === email.toLowerCase());
    const name = known?.name || email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const u = { name, email: email.toLowerCase(), phone: known?.phone || '' };
    persist(u);
    return u;
  }, []);

  const register = useCallback(async ({ name, email, phone }) => {
    await wait(800);
    const account = { name: name.trim(), email: email.toLowerCase(), phone };
    const accounts = storage.get('accounts', []).filter((a) => a.email !== account.email);
    storage.set('accounts', [...accounts, account]);
    persist(account);
    return account;
  }, []);

  const logout = useCallback(() => persist(null), []);

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, register, logout }), [user, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
