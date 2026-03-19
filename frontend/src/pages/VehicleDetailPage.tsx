import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { vehicleApi } from '../api/vehicleApi'
import type { Vehicle } from '../types/vehicle'
import VehicleGallery from '../components/VehicleGallery'
import MarketPriceComparison from '../components/MarketPriceComparison'

const fmt = (n: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(n)

const statusColors: Record<string, string> = {
  Available: 'bg-green-100 text-green-800',
  Sold: 'bg-red-100 text-red-800',
  Hold: 'bg-yellow-100 text-yellow-800',
}

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!id) return
    vehicleApi.getVehicle(id)
      .then(setVehicle)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="flex justify-center py-32"><div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" /></div>
  if (error || !vehicle) return <div className="text-center py-32 text-gray-500">Vehicle not found. <Link to="/inventory" className="text-yellow-600 underline">Back to Inventory</Link></div>

  const specs = [
    { label: 'Engine', value: vehicle.engine },
    { label: 'Horsepower', value: `${vehicle.horsePower} hp` },
    { label: 'Torque', value: `${vehicle.torque} Nm` },
    { label: 'Transmission', value: vehicle.transmission },
    { label: 'Fuel Type', value: vehicle.fuelType },
    { label: 'Mileage', value: `${vehicle.mileage.toLocaleString()} km` },
    { label: 'Color', value: vehicle.color },
    { label: 'Doors', value: String(vehicle.doors) },
    { label: 'Body Type', value: vehicle.bodyType },
    { label: 'Condition', value: vehicle.condition },
    { label: 'VIN', value: vehicle.vin },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/inventory" className="text-yellow-600 hover:text-yellow-800 font-medium mb-6 inline-flex items-center gap-1">
        ← Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
        <div>
          <VehicleGallery images={vehicle.images} make={vehicle.make} model={vehicle.model} />
        </div>

        <div>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[vehicle.status]}`}>
              {vehicle.status}
            </span>
          </div>

          <p className="text-4xl font-extrabold text-yellow-500 mt-3">{fmt(vehicle.price)}</p>

          <div className="mt-6">
            <MarketPriceComparison price={vehicle.price} marketPrice={vehicle.marketPrice} />
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>
          </div>

          <div className="mt-6 bg-slate-900 rounded-xl p-5 text-white">
            <h3 className="font-semibold text-yellow-400 mb-3">Contact Our Salesman</h3>
            <p className="font-bold text-lg">Mthobisi Sihlezana</p>
            <p className="text-gray-300">063 273 0003</p>
            <p className="text-gray-400 text-sm mt-2">Auto Alpina Auctions (Pty) Ltd</p>
            <p className="text-gray-400 text-sm">22 2nd Avenue Springs, Johannesburg</p>
            <div className="mt-3 flex gap-2 flex-wrap">
              <a href="tel:0632730003" className="bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors text-sm">
                📞 Call Now
              </a>
              <a href="tel:0112197114" className="bg-slate-700 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors text-sm">
                011 219 7114
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Specs & Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Specifications</h2>
          <div className="bg-white rounded-xl shadow divide-y divide-gray-100">
            {specs.map(s => (
              <div key={s.label} className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-500">{s.label}</span>
                <span className="font-medium text-gray-900">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
          <div className="bg-white rounded-xl shadow p-4">
            <ul className="space-y-2">
              {vehicle.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-green-500 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
