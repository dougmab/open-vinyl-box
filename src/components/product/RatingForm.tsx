'use client';

import React, {useContext, useEffect, useRef, useState} from 'react'
import Button from "@/components/Button";
import {FaRegStar, FaStar} from "react-icons/fa6";
import api from "@/lib/api";
import {AuthContext} from "@/contexts/AuthContext";
import {RatingProps} from "@/components/product/RatingSection";
import {useRouter} from "next/navigation";

export const RatingForm = ({ productId }: { productId: number}) => {
  const [selectedStars, setSelectedStars] = useState(5);
  const [comment, setComment] = useState("");
  const [isPosted, setPosted] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();

  const commentRef = useRef<HTMLTextAreaElement>(null)

  const commentLimit = 400;

  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) return;
      api.get(`/product/${productId}/rating/${user?.id}`)
        .then(response => {
          const { result }: { result: RatingProps } = response.data;
          setComment(result.comment);
          setSelectedStars(result.rating)
          setPosted(true)
          setLoading(false);
        })
        .catch(() => setLoading(false))

  }, [isAuthenticated]);

  const handleStarSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStars(parseInt(e.target.value));
  }

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // if (e.target.value.length > commentLimit) return;
    if (commentRef.current) {
      commentRef.current.style.height = "auto";
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
    setComment(e.target.value);
  }

  const handleSubmit = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    if (isPosted) {
      await api.put(`/product/${productId}/rating`, {
        value: selectedStars,
        comment
      })
    } else {
      await api.post(`/product/${productId}/rating`, {
        value: selectedStars,
        comment
      })
      setPosted(true)
    }
    router.refresh();
    setLoading(false)
  }

  return (
    <div className={`p-2 py-4 my-2 rounded-lg border border-gray-400 ${isLoading ? "opacity-40" : ""}`}>
      <strong className="font-bold">Rate this product</strong>
      <div className="mt-4">
        <div className="flex gap-2">
          <StarOption value={1} selectedStars={selectedStars} handleChange={handleStarSelection}/>
          <StarOption value={2} selectedStars={selectedStars} handleChange={handleStarSelection}/>
          <StarOption value={3} selectedStars={selectedStars} handleChange={handleStarSelection}/>
          <StarOption value={4} selectedStars={selectedStars} handleChange={handleStarSelection}/>
          <StarOption value={5} selectedStars={selectedStars} handleChange={handleStarSelection}/>
          <span className="text-burgundy font-bold">{selectedStars}</span>
        </div>
        <textarea ref={commentRef} className="w-full p-1 mt-2 rounded-lg border border-gray-400 min-h-[56px] overflow-y-hidden resize-none" placeholder="Write your opinion..." value={comment} onInput={handleComment} />
        <span className={(commentLimit - comment.length) < 0 ? "text-red-600" : "text-gray-500"}>{commentLimit - comment.length}</span>
        <Button className="w-full py-2 mt-2 text-white bg-burgundy" disabled={isLoading} onClick={handleSubmit}>{isPosted ? "Update" : "Submit"}</Button>
      </div>
    </div>
  )
}

const StarOption = ({value, selectedStars, handleChange}: { value: number, selectedStars: number, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <label className="text-xl">
      <input type="radio" value={value} checked={selectedStars === value} onChange={handleChange} className="hidden"/>
      {selectedStars >= value ? <FaStar className="text-burgundy cursor-pointer"/> : <FaRegStar className="text-burgundy cursor-pointer"/>}
    </label>
  )
}