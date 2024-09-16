import React from 'react'

const Navbar = () => {
    return (
        <div className="hidden lg:block">
            <div className="container">
                <div className="flex w-fit gap-10 mx-auto font-medium py-2 text-blackish">
                    <div className="navbar__link">HOME</div>
                    <div className="navbar__link">CATEGORIES</div>
                    <div className="navbar__link">POPULAR</div>
                    <div className="navbar__link">HOT OFFERS</div>
                </div>
            </div>
        </div>
    )
}
export default Navbar
