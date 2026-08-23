import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { api } from "@/services/api";
import { storeGet, storeSet, storeRemove } from "@/services/store/utils";

const KEY_USER = "mokp-user";
const KEY_RAT = "mokp-rat";
const REFRESH_INTERVAL = 1000 * 60 * 5; // 5 minutes

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storeGet(KEY_USER) || null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const setPlayer = useCallback((u) => {
    if (!u) {
      setUser(null);
      storeRemove(KEY_USER);
      return;
    }

    const payload = {
      ...u,
      lastUpdate: Date.now(),
    };

    setUser(payload);
    storeSet(KEY_USER, payload);
  }, []);

  const login = useCallback(
    async (data) => {
      const r = await api.login(data);
      if (r.ok) setPlayer(r.user);
      return r;
    },
    [setPlayer],
  );

  const logout = useCallback(async () => {
    await api.logout();
    setPlayer(null);
  }, [setPlayer]);

  const fetchUser = useCallback(
    async (signal) => {
      const token = storeGet(KEY_RAT);

      if (!token) {
        setPlayer(null);
        return null;
      }

      setIsLoadingAuth(true);

      try {
        const r = await api.get("/auth/me/", signal ? { signal } : {});

        if (r.status === 401) {
          logout();
          return null;
        }

        if (!r.ok) {
          throw new Error("Failed to fetch authenticated user");
        }

        setPlayer(r.user);

        return r.user;
      } catch (error) {
        if (error.name === "AbortError") return null;

        throw error;
      } finally {
        setIsLoadingAuth(false);
      }
    },
    [setPlayer, logout],
  );

  const value = useMemo(
    () => ({
      user,
      isAuth: !!user,
      isDev: !!user?.is_dev,
      isLoadingAuth,
      setPlayer,
      login,
      logout,
      fetchUser,
    }),
    [user, isLoadingAuth, setPlayer, login, logout, fetchUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
