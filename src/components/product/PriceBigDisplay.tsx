import React from "react";

const PriceBigDisplay = ({price, discount}: {
  price: number,
  discount?: {
    percentage: number;
    durationInMinutes: number;
    endsAt: string
  };
}) => {
  const normalizedPrice = discount ? (price * ((100 - discount.percentage) / 100)) : price;
  const integersNormalizedPrice = Math.floor(normalizedPrice);
  const normalizedDecimalDigits = (normalizedPrice % 1).toFixed(2).substring(2);
  return (
    <div className="text-2xl font-light">
      {discount ?
        (
          <>
            <strong className="text-xl text-burgundy place-items-center">{discount.percentage}$ OFF</strong>
            <div className="flex items-baseline gap-2">
              <div className="flex items-start">
                <span className="text-5xl">${integersNormalizedPrice}</span>.{normalizedDecimalDigits}
              </div>
              <div className="flex items-start text-gray-500 text-sm">
                <span className="text-2xl"><del>${Math.floor(price)}</del></span>
                <del>.{(price % 1).toFixed(2).substring(2)}</del>
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="text-4xl">${integersNormalizedPrice}</span>.{normalizedDecimalDigits}
          </>
        )}
    </div>
  )
}

export default PriceBigDisplay;
