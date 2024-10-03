import React from 'react'

const PriceDisplay = ({price, discount}: {
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

  return discount ?
    (
      <div className="flex items-end gap-4">
        <div>
          <strong className="text-xs text-burgundy">{discount.percentage}$ OFF</strong>
          <div className="text-sm">
                                            <span
                                              className="text-lg">${integersNormalizedPrice}</span>.{normalizedDecimalDigits}
          </div>
        </div>
        <div>
          <del
            className="font-medium text-sm text-gray-400">${price.toFixed(2)}</del>
        </div>
      </div>
    ) : (
      <div className="text-sm">
        <span className="text-lg">${integersNormalizedPrice}</span>.{normalizedDecimalDigits}
      </div>
    )
}
export default PriceDisplay
