'use client';
import React, {useContext} from 'react'

import {AuthContext, SignInCredentials} from '@/contexts/AuthContext'
import {SubmitHandler, useForm} from "react-hook-form";

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
  } = useForm<SignInCredentials>()

  const onSubmit: SubmitHandler<SignInCredentials> = async (data: SignInCredentials) => {
      await signIn(data);
    // TODO display failed authentication error message to the user
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('email')} placeholder="Email"/>
        <input type="password" {...register('password')} placeholder="Password"/>
        <button>Login</button>
      </form>
    </div>
  )
}
export default Login;
