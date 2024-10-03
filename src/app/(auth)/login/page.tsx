import React, {Suspense} from 'react'
import Login from "@/app/(auth)/login/Login";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

// had to wrap my login and register client components into a side component, because the client wouldn't redirect first try to another server component
const Page = async ({searchParams}: { searchParams: { [key: string]: string | undefined } }) => {
  if (cookies().get("ovb.token"))
    redirect(searchParams.redirect || "/");

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Login/>
    </Suspense>
  )
}

export default Page;
