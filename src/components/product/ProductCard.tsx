import React from 'react'
import Image from "next/image";
import Link from "next/link";
import generateRating from "@/lib/generateRating";
import PriceDisplay from "@/components/product/PriceDisplay";

type CategoryProps = {
  id: number;
  name: string;
}

interface ProductProps {
  id: number;
  name: string;
  price: number;
  averageRating: number;
  discount?: {
    percentage: number;
    durationInMinutes: number;
    endsAt: string
  };
  imgUrl: string;
  categories: string[];
  rating: number;
}

const ProductCard = (props: ProductProps) => {
  return (
    <div className="px-4 border border-gray-200 rounded-xl max-w-[600px]">
      <div>
        <Image
          className="w-[300px] h-auto aspect-square"
          src={props.imgUrl}
          alt={props.name}
          width={300}
          height={300}
        />

        <div className="space-y-2 py-2 ">
          <Link href="/product/[id]" as={`/product/${props.id}`}>
            <h2 className="text-burgundy-dark font-medium uppercase">{props.name}</h2>
          </Link>
          <div className="flex items-end gap-1 text-[20px] text-yellow-600">
            {generateRating(props.averageRating)} <span
            className="text-xs text-yellow-700 font-bold">{props.averageRating}</span>
          </div>
          <div className="font-bold">
            <PriceDisplay price={props.price} discount={props.discount}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
export type {ProductProps, CategoryProps}
