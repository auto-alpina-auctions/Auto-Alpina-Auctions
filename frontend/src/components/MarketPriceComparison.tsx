interface Props {
  price: number
  marketPrice: number
}

const fmt = (n: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(n)

export default function MarketPriceComparison({ price, marketPrice }: Props) {
  const diff = ((marketPrice - price) / marketPrice) * 100
  const below = diff > 0
  const pct = Math.abs(diff).toFixed(1)

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-3">Market Price Comparison</h4>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs text-gray-500">Our Price</p>
          <p className="text-xl font-extrabold text-yellow-500">{fmt(price)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Market Average</p>
          <p className="text-xl font-bold text-gray-700">{fmt(marketPrice)}</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full ${below ? 'bg-green-500' : 'bg-red-500'}`}
          style={{ width: `${Math.min(100, 100 - diff)}%` }}
        />
      </div>
      <p className={`text-sm font-semibold ${below ? 'text-green-600' : 'text-red-600'}`}>
        {below ? `✓ ${pct}% below market average` : `${pct}% above market average`}
      </p>
    </div>
  )
}
