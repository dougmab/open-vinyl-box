'use client';

import {createContext, useContext, useState} from "react";
import {setCookie} from "nookies";
import api from "@/lib/api";
import {Router} from "next/router";
import {useRouter} from "next/navigation";

interface SignInCredentials {
  email: string,
  password: string
}

interface AuthContext {
  user: User | null
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>
}

// TODO define User interface
interface User {

}

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const router = useRouter();
  const [ user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const signIn = async (credentials: SignInCredentials) => {
    const { status, data } = await api.post('/login', {
      ...credentials
    });

    setCookie(undefined, 'ovb.token', data.result.accessToken, {
      maxAge: data.result.expiresIn
    });

    api.defaults.headers['Authorization'] = `Bearer ${data.result.accessToken}`

    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export type { SignInCredentials, User }
