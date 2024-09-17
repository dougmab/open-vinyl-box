import React from 'react'
import Image from "next/image";

interface SlideProps {
    id: number,
    img: string,
    title: string,
    mainTitle: string,
    price: string
    contentSide?: "left" | "right"
}

const Slide = (props: SlideProps) => {

    const alignLeft = "text-left left-[10px] md:left-[60px]"
    const alignRight = "text-right right-[10px] md:right-[60px]"

    return (
        <div className="overflow-hidden outline-none border-none relative"
        style={{textShadow: "#0a0a0a 1px 0 10px"}}>
            <div className={`absolute ${props.contentSide == "right" ? alignRight : alignLeft} max-w-[250px] sm:max-w-[350px] top-1/2 -translate-y-1/2 space-y-2 lg:space-y-4 p-4 sm:p-0 rounded-lg bg-transparent sm:rounded-none z-10`}>
                <h3 className="text-burgundy text-[20px] lg:text-xl font-bold">{props.title}</h3>
                <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-5">{props.mainTitle}</h2>

                <h3 className="text-xl text-gray-50 font-bold">
                    starting at <strong className="text-xl md-text-[24px] lg:text-[30px]">{props.price}</strong>.00
                </h3>
                <button className="bg-white text-[14px] md:text-[16px] rounded-lg p-2 px-4 inline-block hover:bg-burgundy-dark hover:text-white mt-4">Shop Now</button>
            </div>
            <div className="relative overflow-hidden w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] bg-gray-600">
                <Image
                    src={props.img}
                    alt=""
                    fill
                    className="object-cover contain-layout"
                    style={{filter: 'grayscale(100%) contrast(125%) brightness(90%)'}}
                />
            </div>
        </div>
    )
}

export default Slide
export type {SlideProps}
