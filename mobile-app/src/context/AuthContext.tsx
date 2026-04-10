import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

import { login } from "../services/api/auth";
import { clearSession, getSession, saveSession } from "../services/storage/auth-storage";
import { registerUnauthorizedHandler, setAccessToken } from "../services/api/client";
import { AuthSession, LoginPayload, User } from "../types/api";

type AuthContextValue = {
  isLoading: boolean;
  token: string | null;
  user: User | null;
  signIn: (payload: LoginPayload) => Promise<AuthSession>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    let mounted = true;

    async function bootstrap() {
      const stored = await getSession();
      if (mounted && stored) {
        setSession(stored);
        setAccessToken(stored.token);
      }
      if (mounted) {
        setIsLoading(false);
      }
    }

    bootstrap();
    registerUnauthorizedHandler(() => {
      void handleSignOut();
    });

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSignOut() {
    setAccessToken(null);
    setSession(null);
    await clearSession();
  }

  async function handleSignIn(payload: LoginPayload) {
    const response = await login(payload);
    const nextSession = { token: response.token, user: response.user };
    setAccessToken(response.token);
    setSession(nextSession);
    await saveSession(nextSession);
    return nextSession;
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading,
      token: session?.token ?? null,
      user: session?.user ?? null,
      signIn: handleSignIn,
      signOut: handleSignOut,
    }),
    [isLoading, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
