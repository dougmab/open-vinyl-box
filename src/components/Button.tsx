import React from 'react'

const Button = ({primary, className, children}: {
  primary?: boolean,
  children: React.ReactNode | string,
  className?: string,
}) => {
  return (
    <button
      className={`flex gap-2 items-center p-2 px-4 text-sm rounded-lg ${primary ? 'bg-burgundy hover:bg-burgundy-dark text-white' : 'border border-gray-200'} ${className}`}>
      {children}
    </button>
  )
}
export default Button
