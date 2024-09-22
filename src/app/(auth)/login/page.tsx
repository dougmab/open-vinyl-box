'use client';
import React, {useContext} from 'react'

import {AuthContext, SignInCredentials} from '@/contexts/AuthContext'
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/Button";
import Link from "next/link";

const Login = () => {
  const {signIn} = useContext(AuthContext);

  const {
    register,
    handleSubmit,
  } = useForm<SignInCredentials>()

  const onSubmit: SubmitHandler<SignInCredentials> = async (data: SignInCredentials) => {
    await signIn(data);
  }

  return (
    <div className="container flex justify-center items-center w-[300px] lg:w-[400px] xl:w-[500px] min-h-[calc(100vh-230px)]">
      <div className="m-2 w-full">
        <h1 className="text-xl mb-8 font-bold uppercase">LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="text-lg">
          <input type="text" {...register('email')} placeholder="Email"
                 className="block mb-2 border-b border-b-gray-200 w-full"/>
          <input type="password" {...register('password')} placeholder="Password"
                 className="block mb-4 border-b border-b-gray-200 w-full"/>
          <Button primary={true}>
            Login
          </Button>
        </form>
        <div className="mt-2 text-gray-500 text-sm">
          Not registered yet? <Link href="/register" className="text-blue-600">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;
