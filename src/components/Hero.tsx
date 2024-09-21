'use client';

import React from 'react'
import Slider, {Settings} from "react-slick";
import Slide, {SlideProps} from "@/components/Slide";

const Hero = () => {

    const settings: Settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        lazyLoad: 'ondemand',
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const slideData: SlideProps[] = [
        {
            id: 0,
            img: "/images/slide_1.jpg",
            title: "Trending Records",
            mainTitle: "NEW ARRIVALS",
            price: "$20",
            contentSide: "left"
        },
        {
            id: 1,
            img: "/images/slide_2.jpg",
            title: "Best Record Players",
            mainTitle: "LISTEN WITH THE BEST QUALITY",
            price: "$350",
            contentSide: "right"
        },
        {
            id: 2,
            img: "/images/slide_3.jpg",
            title: "Sale Offer",
            mainTitle: "THE LOWEST PRICES",
            price: "$15",
            contentSide: "left"
        },
    ]

    return (
        <div className="box-border max-w-full">
            <div className="container pt-6 lg:pt-0">
                <Slider {...settings}>
                    {slideData.map(item => {
                        return <Slide {...item} key={item.id}/>
                    })}
                </Slider>
            </div>
        </div>
    )
}

export default Hero
