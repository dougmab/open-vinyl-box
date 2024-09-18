import React from 'react'
import {FiHeart} from "react-icons/fi";
import {BsGithub} from "react-icons/bs";

const Footer = () => {
  return (
    <div className="container pt-4">
      <div className="flex justify-center py-4 border-t border-gray-200">
        <div className="flex flex-col items-center justify-center gap-1">

          <p className="text-xs text-gray-500">
            Made with <FiHeart className="inline"/> by <a
            className="underline"
            href="https://github.com/dougmab"
            target="_blank"
            rel="noopener noreferrer">dougmab</a></p>

          <a
            className="text-lg text-gray-600"
            href="https://github.com/dougmab/open-vinyl-box"
            target="_blank"
            rel="noopener noreferrer">
            <BsGithub/>
          </a>

        </div>
      </div>
    </div>
  )
}

export default Footer
