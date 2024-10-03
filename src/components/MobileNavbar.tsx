'use client';

import React, {useContext} from 'react'
import {FiHeart, FiLogIn, FiMenu} from "react-icons/fi";
import {HiOutlineShoppingCart} from "react-icons/hi2";
import {AiOutlineAppstore, AiOutlineHome} from "react-icons/ai";
import {AuthContext} from "@/contexts/AuthContext";
import Link from "next/link";

const MobileNavbar = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="box-border lg:hidden fixed bottom-0 w-full bg-white left-1/2 -translate-x-1/2 max-w-[500px] px-8 z-40">
            <div className="flex justify-between text-xl py-2">
                {isAuthenticated ? (
                  <>
                      <FiMenu/>

                      <div className="relative">
                          <HiOutlineShoppingCart/>
                          <div className="icon__badge">0</div>
                      </div>

                  </>
                ) : (
                  <>
                      <Link href='/login'>
                          <FiLogIn/>
                      </Link>
                      <Link href='/register'>
                      </Link>
                  </>
                )}

                <AiOutlineHome/>

                <div className="relative">
                    <FiHeart/>
                    <div className="icon__badge">0</div>
                </div>

                <AiOutlineAppstore/>
            </div>
        </div>
    )
}
export default MobileNavbar
