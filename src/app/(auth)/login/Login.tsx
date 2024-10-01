'use client'

import React, {Suspense, useContext, useEffect, useState} from "react";
import {AuthContext, SignInCredentials} from "@/contexts/AuthContext";
import {useRouter, useSearchParams} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import Button from "@/components/Button";
import Link from "next/link";

const Login = () => {
  const {signIn} = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false)
  const router = useRouter();
  const redirect = useSearchParams().get('redirect');

  const {
    register,
    handleSubmit,
  } = useForm<SignInCredentials>()

  useEffect(() => {
    if (redirect)
      router.prefetch(redirect)
  }, [router]);

  const onSubmit: SubmitHandler<SignInCredentials> = async (data: SignInCredentials) => {
    setLoading(true)
    try {
      await signIn(data);
      router.refresh();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.status === 401) {
          console.error("Invalid credentials")
        }
      }
    }
    setLoading(false)
  }

  return (
    <div
      className="container flex justify-center items-center w-[300px] lg:w-[400px] xl:w-[500px] min-h-[calc(100vh-230px)]">
      <div className="m-2 w-full">
        <h1 className="text-xl mb-8 font-bold uppercase">LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="text-lg">
          <input type="text" {...register('email')} placeholder="Email"
                 className="block mb-2 border-b border-b-gray-200 w-full"/>
          <input type="password" {...register('password')} placeholder="Password"
                 className="block mb-4 border-b border-b-gray-200 w-full"/>
          <Button primary={true} disabled={isLoading} className={isLoading ? "opacity-45" : ""}>
            Login
          </Button>
        </form>
        <Suspense>
          <div className="mt-2 text-gray-500 text-sm">
            Not registered yet? <Link href={`/register${redirect ? '?redirect=' + encodeURIComponent(redirect) : ''}`}
                                      className="text-blue-600">Sign up</Link>
          </div>
        </Suspense>
      </div>
    </div>
  )
}

export default Login;