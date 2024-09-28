import React from 'react'
import {CategoryProps} from "@/components/product/ProductCard";
import Image from "next/image";
import generateRating from "@/lib/generateRating";
import Button from "@/components/Button";
import {notFound} from "next/navigation";
import PriceBigDisplay from "@/components/product/PriceBigDisplay";
import {getApiClient} from "@/lib/api";
import {cookies} from "next/headers";
import {RatingSection} from "@/components/product/RatingSection";

interface RatingStatistics {
  totalRatings: string
  totalStars: number
  averageRating: number
  fiveStars: number
  fourStars: number
  threeStars: number
  twoStars: number
  oneStar: number
}

interface ProductDetails {
  id: number
  "name": string;
  price: number,
  imgUrl: string,
  createdAt: string
  discount?: {
    percentage: number;
    durationInMinutes: number;
    endsAt: string
  };
  ratingStatistics: RatingStatistics,
  categories: CategoryProps[]
}

const getProduct = async (id: number) => {
  try {
    // console.log(cookies().get("ovb.token"))
    const apiResponse = await getApiClient(cookies).get("/product/" + id,);
    return apiResponse.data.result;
  } catch (error) {
    console.log(error)
    notFound()
  }
}

const Page = async ({params}: { params: { id: number } }) => {
  const product: ProductDetails = await getProduct(params.id);

  return (
    <div className="container">
      <div className="flex justify-center p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3">
          <div>
            <Image
              className="w-[500px] h-auto aspect-square"
              src={product.imgUrl}
              alt={product.name}
              width={400}
              height={400}
            />
          </div>
          <div className="w-full h-full">
            <h2 className="text-4xl font-bold">{product.name}</h2>
            <div className="flex gap-1 text-xl text-burgundy">
              {generateRating(product.ratingStatistics.averageRating)}
              <span className="text-lg font-bold text-burgundy-dark">{product.ratingStatistics.averageRating}</span>
            </div>
            <div className="text-gray-500 text-sm mb-8">
              {product.ratingStatistics.totalRatings} ratings
            </div>
            <PriceBigDisplay price={product.price} discount={product.discount}/>
            <div className="flex gap-2 items-center mt-4">
              <Button className="w-full"
                      primary={true}>
                Add to Cart
              </Button>
              <label htmlFor="quantity" className=" flex items-center gap-2 w-1/4">Quantity:
                <input id="quantity" type="number" defaultValue={1} className="w-10"/>
              </label>
            </div>
            <h3 className="text-sm font-light text-gray-500 mt-4">Sold by <span
              className="text-blue-600">(placeholder)</span></h3>
          </div>
        </div>
      </div>

      <RatingSection productId={product.id} statistics={product.ratingStatistics}/>
    </div>
  )
}
export default Page
export type {RatingStatistics}
