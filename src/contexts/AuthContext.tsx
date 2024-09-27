'use client';

import {createContext, useEffect, useState} from "react";
import api from "@/lib/api";
import {useRouter, useSearchParams} from "next/navigation";
import {deleteCookie, getCookie, setCookie} from "cookies-next";

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

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const searchParams = useSearchParams();

  // Recover user data from the token
  useEffect(() => {
    const token = getCookie('ovb.token');
    if (token) {
      api.get('/user/me').then(({data}) => {
        setUser(data.result);
      }).catch(() => {
        deleteCookie('ovb.token');
      });
    }
  }, []);

  const isAuthenticated = !!user;

  const signIn = async (credentials: SignInCredentials) => {
    const {data} = await api.post('/login', {
      ...credentials
    });

    setCookie('ovb.token', data.result.accessToken, {
      maxAge: data.result.expiresIn
    });

    api.defaults.headers['Authorization'] = `Bearer ${data.result.accessToken}`

    console.log("Vai setar o user")
    setUser(data.result.user);

    console.log("Vai dar redirect")

    router.push(searchParams.get('redirect') || "/");

    console.log("deu o redirect")

  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}

export type {SignInCredentials, User}
