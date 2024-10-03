import React, {Suspense} from 'react'
import {redirect} from "next/navigation";
import Register from "@/app/(auth)/register/Register";
import {cookies} from "next/headers";


const Page = async ({searchParams}: { searchParams: { [key: string]: string | undefined } }) => {
  if (cookies().get("ovb.token"))
    redirect(searchParams.redirect || "/");

  return (
    <Suspense>
      <Register/>
    </Suspense>
  )
}

export default Page
