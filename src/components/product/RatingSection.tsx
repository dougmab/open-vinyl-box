'use client';

import React, {useContext, useEffect, useState} from 'react'
import api from "@/lib/api";
import {RatingItem} from "@/components/product/RatingItem";
import Button from "@/components/Button";
import {ThreeDots} from "react-loader-spinner";
import {RatingStatistics} from "@/app/product/[id]/page";
import generateRating from "@/lib/generateRating";
import {FaStar} from "react-icons/fa6";
import {RatingForm} from "@/components/product/RatingForm";
import {AuthContext} from "@/contexts/AuthContext";

type SortParams = { value: string, order?: "ASC" | "DESC" };

interface RatingProps {
  userId: number
  firstName: string
  lastName: string
  rating: number
  comment: string
  createdAt: string
}

interface CurrentPageInfo {
  size: number
  number: number
  totalElements: number
  totalPages: number
}

const getNextRatingsChunk = async (id: number, page: number, sort?: SortParams) => {
  const response = await api.get(`/product/${id}/rating?size=5&page=${page}${sort ? "&sort=" + sort.value + (sort.order ? "," + sort.order : "") : ""}`);
  return response.data.result;
}

export const RatingSection = ({productId, statistics}: { productId: number, statistics: RatingStatistics }) => {
  const [selectSort, setSelectSort] = useState<string>('new')
  const [sort, setSort] = useState<SortParams>({value: 'createdAt', order: 'DESC'});

  const [ratings, setRatings] = useState<RatingProps[]>([] as RatingProps[]);
  const [pageInfo, setPageInfo] = useState<CurrentPageInfo | null>(null)
  const [isLoading, setLoading] = useState(true);

  const {isAuthenticated, user} = useContext(AuthContext);

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const possiblesSorts: { [key: string]: SortParams } = {
      new: {value: 'createdAt', order: 'DESC'},
      old: {value: 'createdAt', order: 'ASC'},
      negative: {value: 'ratingValue', order: 'ASC'},
      positive: {value: 'ratingValue', order: 'DESC'}
    }

    // Reset the ratings and the page info
    setPageInfo(null)
    setRatings([])

    setSelectSort(e.target.value)
    setSort(possiblesSorts[e.target.value])
  }

  const addRatings = async () => {
    if (!isAuthenticated) return;
    setLoading(true)
    const pageNumber = pageInfo ? pageInfo.number : -1;
    const response = await getNextRatingsChunk(productId, pageNumber + 1, sort);
    setRatings([...ratings, ...response.content.filter((rating: RatingProps) => rating.userId !== user?.id)]);
    setPageInfo(response.page);
    setLoading(false);
  }

  useEffect(() => {
    addRatings().catch(console.error);
  }, [sort, isAuthenticated]);

  return (
    <section className="container p-4 border-t border-t-gray-200">
      <div className="grid place-items-center grid-cols-1 lg:grid-cols-[3fr_7fr] gap-4">
        <div className="h-full">
          <div className="flex gap-2">
            <span className="text-5xl font-bold text-burgundy">{statistics.averageRating}</span>
            <div className="">
              <div className="flex text-xl text-burgundy">{generateRating(statistics.averageRating)}</div>
              <div className="text-lg font-light text-gray-600">{statistics.totalRatings} ratings</div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mt-2">Ratings distribution</h4>
            <div className="flex gap-4 justify-center">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-700">{statistics.fiveStars} </span>
                <span className="text-center text-sm text-gray-500"><FaStar/> 5</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-700">{statistics.fourStars}</span>
                <span className="text-center text-sm text-gray-500"><FaStar/> 4</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-700">{statistics.threeStars}</span>
                <span className="text-center text-sm text-gray-500"><FaStar/> 3</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-700">{statistics.twoStars}</span>
                <span className="text-center text-sm text-gray-500"><FaStar/> 2</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-700">{statistics.oneStar}</span>
                <span className="text-center text-sm text-gray-500"><FaStar/> 1</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold">Featured opinions</h4>
            <select name="sort" className="bg-gray-200 rounded-xl p-1 text-sm font-light" value={selectSort}
                    onChange={handleSorting}>
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
              <option value="positive">Greatest</option>
              <option value="negative">Lowest</option>
            </select>
          </div>
          <div>
            <RatingForm productId={productId}/>
            {ratings.map((rating) => (
              <RatingItem rating={rating} key={rating.userId}/>
            ))}
            {isLoading &&
              <div className="flex justify-center"><ThreeDots visible={true} height={40} width={40} color="#8b0000"/>
              </div>}
          </div>
          {pageInfo && pageInfo.number < pageInfo.totalPages - 1 && !isLoading &&
            <Button onClick={addRatings} className="w-full py-2 mt-4 text-gray-600">Load more?</Button>}
        </div>
      </div>
    </section>
  )
}

export type {RatingProps};