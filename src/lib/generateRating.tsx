import {FaStarHalfAlt} from "react-icons/fa";
import {FaRegStar, FaStar} from "react-icons/fa6";
import React from "react";

const generateRating = (rating: number) => {
  rating = Math.round(rating * 2) / 2;
  const ratingResult = []
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

export default generateRating;