import React from 'react'

import {BsFacebook, BsInstagram, BsLinkedin, BsTwitterX} from 'react-icons/bs'

const HeaderTop = () => {
    return (
        <div className="border-b border-gray-200 hidden sm:block">
            <div className="container py-2">
                <div className="flex justify-between items-center">
                    <div className="hidden lg:flex gap-1">
                        <div className="header_top__icon_wrapper">
                            <BsFacebook/>
                        </div>
                        <div className="header_top__icon_wrapper">
                            <BsTwitterX/>
                        </div>
                        <div className="header_top__icon_wrapper">
                            <BsInstagram/>
                        </div>
                        <div className="header_top__icon_wrapper">
                            <BsLinkedin/>
                        </div>
                    </div>
                    <div className="text-gray-500 text-xs ">
                        <strong>FREE SHIPPING </strong>
                        THIS WEEK ORDER OVER - $15
                    </div>
                    <div className="flex gap-4">
                        <select name="currency" id="currency" className="text-gray-500 text-xs w-[70px] bg-white">
                            <option value="usd">USD $</option>
                            <option value="brl">BRL R$</option>
                        </select>
                        <select name="language" id="language" className="text-gray-500 text-xs w-[40px] bg-white">
                            <option value="en">EN</option>
                            <option value="pt">PT</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop
