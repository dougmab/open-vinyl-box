import React from 'react'
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <div className="inline px-4 border border-gray-200 rounded-xl w-[250px]">
      <div className="max-w-[300px] h-auto aspect-square">
        <Skeleton width={218} height={218} />
      </div>

      <div className="space-y-2 py-2">
        <h2><Skeleton/></h2>
        <div className="flex gap-1 text-[20px] text-yellow-600">
          <Skeleton width={100} height={20}/>
        </div>
        <div className="font-bold">
          <Skeleton/>
        </div>
      </div>
    </div>
  )
}
export default SkeletonCard
