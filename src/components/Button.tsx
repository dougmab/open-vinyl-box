import React from 'react'

const Button = ({primary, disabled, className, onClick, children}: {
  primary?: boolean,
  disabled?: boolean,
  children: React.ReactNode | string,
  className?: string,
  onClick?: () => void
}) => {
  return (
    <button
      className={`flex gap-2 justify-center items-center p-2 px-4 text-sm rounded-lg ${primary ? 'bg-burgundy hover:bg-burgundy-dark text-white' : 'border border-gray-500'} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
export default Button
