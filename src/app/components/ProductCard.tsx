import React from 'react'
import Image from "next/image";
import {FaRegStar, FaStar} from "react-icons/fa6";
import {FaStarHalfAlt} from "react-icons/fa";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    discount?: number;
    image: string;
    categories: string[];
    rating: number;
}

const ProductCard = (props: ProductProps) => {

    const generateRating = (rating: number) => {
        rating = Math.round(rating * 2) / 2;
        let ratingResult = []
        for (let i = 0; i < 5; i++) {
            if (i < rating && rating < i + 1) {
                ratingResult.push(<FaStarHalfAlt key={i}/>);
                continue
            }
            if (i < rating) {
                ratingResult.push(<FaStar key={i}/>);
                continue
            }
            ratingResult.push(<FaRegStar key={i}/>);
        }

        return ratingResult;
    }

    const normalizedPrice = props.discount ? (props.price * ((100 - props.discount) / 100)) : props.price;
    const normalizedDecimalDigits = (normalizedPrice % 1).toFixed(2).substring(2)

    return (
        <div className="px-4 border border-gray-200 rounded-xl max-w-[600px]">
            <div>
                <Image
                    className="w-[300px] h-auto aspect-square"
                    src={props.image}
                    alt={props.name}
                    width={300}
                    height={300}
                />

                <div className="space-y-2 py-2 ">
                    <h2 className="text-burgundy-dark font-medium uppercase">{props.name}</h2>
                    <div className="flex gap-1 text-[20px] text-yellow-600">
                        {generateRating(props.rating)}
                    </div>
                    <div className="font-bold">
                        {props.discount ?
                            (
                                <div className="flex items-end gap-4">
                                    <div>
                                        <strong className="text-xs text-burgundy">{props.discount}$ OFF</strong>
                                        <div className="text-sm">
                                            <span
                                                className="text-lg">${normalizedPrice}</span>.{normalizedDecimalDigits}
                                        </div>
                                    </div>
                                    <div>
                                        <del
                                            className="font-medium text-sm text-gray-400">${props.price.toFixed(2)}</del>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm">
                                    <span className="text-lg">${normalizedPrice}</span>.{normalizedDecimalDigits}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
export type {ProductProps}
