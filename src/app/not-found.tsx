import React from 'react'

const NotFound = () => {
  return (
    <div className="container">
      <div className="grid place-items-center p-4 h-[calc(100vh-270px)]">
        <div className="text-gray-500 text-2xl text-center">
          <h2 className="text-4xl font-bold">404</h2>
          Page not found <br/>
          <span className="italic">:(</span>
        </div>
      </div>
    </div>
  )
}
export default NotFound
