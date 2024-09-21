'use client';

import {createContext, useContext, useEffect, useState} from "react";
import {destroyCookie, parseCookies, setCookie} from "nookies";
import api from "@/lib/api";
import {Router} from "next/router";
import {useRouter} from "next/navigation";
import {parseCookie} from "next/dist/compiled/@edge-runtime/cookies";

interface SignInCredentials {
  email: string,
  password: string
}


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContext {
  user: User | null
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>
}

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const router = useRouter();
  const [ user, setUser] = useState<User | null>(null);

  // Recover user data from the token
  useEffect(() => {
    const { 'ovb-token': token } = parseCookies();
    if (token) {
      api.get('/user/me').then(({ data }) => {
        setUser(data.result);
      }).catch(() => {
       destroyCookie(undefined, 'ovb.token');
      });
    }
  }, []);

  const isAuthenticated = !!user;

  const signIn = async (credentials: SignInCredentials) => {
    const { status, data } = await api.post('/login', {
      ...credentials
    });

    setCookie(undefined, 'ovb.token', data.result.accessToken, {
      maxAge: data.result.expiresIn
    });

    api.defaults.headers['Authorization'] = `Bearer ${data.result.accessToken}`

    setUser(data.result.user);

    router.back();
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export type { SignInCredentials, User }
