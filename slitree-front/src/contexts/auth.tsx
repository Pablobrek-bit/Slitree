"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "@/api";
import { SignInParams, signIn } from "@/services/signIn";
import { SignUpParams, signUp } from "@/services/signUp";
import { getUserByToken } from "@/services/getUserByToken";
import { useRouter } from "next/navigation";
import { UserRegisterError } from "@/errors/UserRegisterError";
import { InvalidCredentialError } from "@/errors/InvalidCredentialsError";
import { UserType } from "@/@types/User";

type SignInType = ({ email, password }: SignInParams) => Promise<void>;
type SignUpType = ({ email, password, name }: SignUpParams) => Promise<void>;

export const LOCAL_STORAGE_KEY = "@SliTree:token";

export type AuthContextType = {
  user: UserType | null;
  handleSignIn: SignInType;
  handleSignUp: SignUpType;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const { push } = useRouter();

  const [user, setUser] = useState<UserType | null>(null);

  const handleSignIn = useCallback(
    async ({ email, password }: SignInParams) => {
      try {
        const data = await signIn({ email, password });

        const { user, token } = data;
        setUser(user);

        localStorage.setItem(LOCAL_STORAGE_KEY, token);

        api.defaults.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        throw new InvalidCredentialError();
      }
    },
    [],
  );

  const handleSignUp = useCallback(
    async ({ email, password, name }: SignUpParams) => {
      try {
        await signUp({ email, password, name });
      } catch {
        throw new UserRegisterError();
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    push("/sign-in");
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    delete api.defaults.headers.Authorization;
  }, [push]);

  const retrieveUserByToken = useCallback(async () => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (token) {
      try {
        const user = await getUserByToken(token);
        setUser(user);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        push("/posts");
      } catch (error) {
        signOut();
      }
    }
  }, [push, signOut]);

  useEffect(() => {
    retrieveUserByToken();
  }, [retrieveUserByToken]);

  const value = useMemo(
    () => ({ user, handleSignIn, handleSignUp, signOut }),
    [user, handleSignIn, handleSignUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
