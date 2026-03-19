import { Link } from 'react-router-dom'
import type { Vehicle } from '../types/vehicle'

interface Props {
  vehicle: Vehicle
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(price)

const conditionColors: Record<string, string> = {
  New: 'bg-green-100 text-green-800',
  'Certified Pre-Owned': 'bg-blue-100 text-blue-800',
  Used: 'bg-gray-100 text-gray-700',
}

const statusColors: Record<string, string> = {
  Available: 'bg-green-500 text-white',
  Sold: 'bg-red-500 text-white',
  Hold: 'bg-yellow-500 text-white',
}

export default function VehicleCard({ vehicle }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="w-full h-48 object-cover"
        />
        <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${statusColors[vehicle.status]}`}>
          {vehicle.status}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg leading-tight">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-2xl font-extrabold text-yellow-500 mt-1">{formatPrice(vehicle.price)}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-sm text-gray-600">
          <span>🛣 {vehicle.mileage.toLocaleString()} km</span>
          <span>⚙️ {vehicle.transmission}</span>
          <span>⛽ {vehicle.fuelType}</span>
          <span>🚗 {vehicle.bodyType}</span>
        </div>
        <div className="mt-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${conditionColors[vehicle.condition]}`}>
            {vehicle.condition}
          </span>
        </div>
        <div className="mt-4 flex-1 flex items-end">
          <Link
            to={`/vehicles/${vehicle.id}`}
            className="w-full text-center bg-slate-900 text-yellow-400 font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
