'use client';

import React, {useContext} from 'react'
import {AuthContext} from "@/contexts/AuthContext";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "@/components/Button";
import api from "@/lib/api";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatedPassword: string
}

const Page = () => {
  const {signIn} = useContext(AuthContext);
  const redirect = useSearchParams().get('redirect');

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm<CreateUser>()

  const onSubmit: SubmitHandler<CreateUser> = async ({
                                                       firstName,
                                                       lastName,
                                                       email,
                                                       password
                                                     }: CreateUser) => {
    const {data} = await api.post('/user', {
      firstName, lastName, email, password
    })

    console.log(data)
    if (!data.success) {
      return;
    }

    await signIn({
      email, password
    });
  }

  const password = watch('password');

  return (
    <div
      className="container flex justify-center items-center w-[300px] lg:w-[400px] xl:w-[500px] min-h-[calc(100vh-230px)]">
      <div className="m-2 w-full">
        <h1 className="text-xl font-bold uppercase">REGISTER</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="text-lg">

          <div className="grid mt-8 grid-cols-2 gap-1">
            <div className="w-full">
              <input type="text" {...register('firstName', {
                required: "First name is required"
              })} placeholder="First Name"
                     className="inline-block w-full border-b border-b-gray-200"/>
              <span>{errors.firstName?.message}</span>
            </div>
            <div className="w-full">
              <input type="text" {...register('lastName', {
                required: "Last Name is required"
              })} placeholder="Last Name"
                     className="block w-full border-b border-b-gray-200"/>
              <span>{errors.lastName?.message}</span>
            </div>
          </div>

          <input type="email" {...register('email', {
            required: "Email is required",
            pattern: {
              value: /[^a-zA-Z0-9]/,
              message: "Email is invalid"
            }
          })} placeholder="Email"
                 className="block w-full mt-2 border-b border-b-gray-200"/>
          <span>{errors.email?.message}</span>

          <input type="password" {...register('password', {
            required: "Password is required",
            validate: {
              hasUpperCase: (value) =>
                /[A-Z]/.test(value) || 'Must contain at least one uppercase letter',
              hasLowerCase: (value) =>
                /[a-z]/.test(value) || 'Must contain at least one lowercase letter',
              hasNumber: (value) =>
                /\d/.test(value) || 'Must contain at least one number',
              hasSpecialChar: (value) =>
                /[^a-zA-Z0-9]/.test(value) || 'Must contain at least one special character',
            },
          })} placeholder="Password"
                 className="block w-full mt-2 border-b border-b-gray-200"/>
          <span>{errors.password?.message}</span>
          <input type="password" {...register('repeatedPassword', {
            required: "Please repeat the password",
            validate: (value) => value === password || 'Passwords do not match'
          })} placeholder="Repeat Password"
                 className="block w-full mt-2 border-b border-b-gray-200"/>
          <span>{errors.repeatedPassword?.message}</span>

          <Button primary={true} className="mt-4">
            Register
          </Button>
        </form>
        <div className="mt-2 text-gray-500 text-sm">
          Already registered? <Link href={`/login${redirect ? '?redirect=' + encodeURIComponent(redirect) : ''}`}
                                    className="text-blue-600">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
export default Page
