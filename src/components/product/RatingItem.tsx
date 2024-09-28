import React from 'react'
import {RatingProps} from "@/components/product/RatingSection";
import generateRating from "@/lib/generateRating";
import {format} from "date-fns";

export const RatingItem = ({rating: {userId, firstName, lastName, rating: value, comment, createdAt}}: {
  rating: RatingProps
}) => {
  return (
    <div className="border-b border-b-gray-400 p-2 py-4">
      <div className="flex gap-2 items-center justify-between text-sm mb-4">
        <div className="flex gap-2 items-center">
          <h4 className="font-bold">{firstName} {lastName}</h4>
          <div className="flex gap-1 text-xs items-start text-burgundy">
            {generateRating(value)}
            {value}
          </div>
        </div>
        <span className="text-gray-500 font-light">{format(new Date(createdAt), 'MM/dd/yyyy HH:mm')}</span>
      </div>
      <p>{comment}</p>
    </div>
  )
}
