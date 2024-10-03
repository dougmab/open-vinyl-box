'use client';
import React, {useContext} from 'react'

import Logo from "../../public/images/logo.svg"
import {BsSearch} from "react-icons/bs";
import {BiUser} from "react-icons/bi";
import {FiHeart, FiLogIn} from "react-icons/fi";
import {HiOutlineShoppingCart} from "react-icons/hi2";
import {AuthContext} from "@/contexts/AuthContext";
import Link from "next/link";
import Button from "@/components/Button";

const HeaderMain = () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <div className="border-b border-gray-200 py-2">
      <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <Link href="/">
            <Logo width={80} height={80}/>
          </Link>
        </div>
        <div className="w-full sm:w-80 md:w-3/4 relative">
          <input className="border-gray-200 border p-2 px-4 rounded-lg w-full" type="text"
                 placeholder="Enter any record name..."/>
          <BsSearch className="absolute right-0 top-0 mr-3 mt-3 text-gray-400" size={20}/>
        </div>
        <div className="hidden lg:flex text-gray-500 text-2xl gap-4">

          {isAuthenticated ? (
            <>
              <BiUser/>
              <div className="relative">
                <FiHeart/>
                <div className="icon__badge">0</div>
              </div>
              <div className="relative">
                <HiOutlineShoppingCart/>
                <div className="icon__badge">0</div>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button primary={true}>
                  <FiLogIn/>
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button>
                  Register
                </Button>
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
export default HeaderMain
