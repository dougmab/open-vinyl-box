import React from 'react'

import Logo from "../../../public/images/logo.svg"
import {BsSearch} from "react-icons/bs";
import {BiUser} from "react-icons/bi";
import {FiHeart} from "react-icons/fi";
import {HiOutlineShoppingCart} from "react-icons/hi2";

const HeaderMain = () => {
    return (
        <div className="border-b border-gray-200 py-2">
            <div className="container flex flex-col sm:flex-row justify-between items-center">
                <div>
                    <Logo width={80} height={80} />
                </div>
                <div className="w-full sm:w-80 md:w-3/4 relative">
                    <input className="border-gray-200 border p-2 px-4 rounded-lg w-full" type="text" placeholder="Enter any record name..."/>
                    <BsSearch className="absolute right-0 top-0 mr-3 mt-3 text-gray-400" size={20}/>
                </div>
                <div className="hidden lg:flex text-gray-500 text-2xl gap-4">
                    <BiUser/>
                    <div className="relative">
                        <FiHeart/>
                        <div className="icon__badge">0</div>
                    </div>
                    <div className="relative">
                        <HiOutlineShoppingCart/>
                        <div className="icon__badge">0</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeaderMain
