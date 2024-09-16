import React from 'react'
import {FiHeart, FiMenu} from "react-icons/fi";
import {HiOutlineShoppingCart} from "react-icons/hi2";
import {AiOutlineAppstore, AiOutlineHome} from "react-icons/ai";


const MobileNavbar = () => {
    return (
        <div className="lg:hidden fixed bottom-0 w-full bg-white left-1/2 -translate-x-1/2 max-w-[500px] px-8">
            <div className="flex justify-between text-xl py-2">
                <FiMenu/>

                <div className="relative">
                    <HiOutlineShoppingCart/>
                    <div className="icon__badge">0</div>
                </div>

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
