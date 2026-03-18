import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { vehicleApi } from '../api/vehicleApi'
import type { Vehicle, VehicleStats } from '../types/vehicle'
import VehicleCard from '../components/VehicleCard'

export default function HomePage() {
  const [stats, setStats] = useState<VehicleStats | null>(null)
  const [featured, setFeatured] = useState<Vehicle[]>([])

  useEffect(() => {
    vehicleApi.getStats().then(setStats).catch(console.error)
    vehicleApi.getVehicles({ status: 'Available' }, 1, 6).then(r => setFeatured(r.vehicles)).catch(console.error)
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400 tracking-tight mb-4">
            AUTO ALPINA AUCTIONS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-3">Auto Alpina Auctions (Pty) Ltd</p>
          <p className="text-2xl md:text-3xl font-semibold text-white mb-8">Driving Your Dream Forward</p>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Browse our extensive inventory of quality used vehicles at competitive prices in Johannesburg.
          </p>
          <Link
            to="/inventory"
            className="inline-block bg-yellow-400 text-slate-900 font-bold text-lg px-10 py-4 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg"
          >
            Browse Inventory
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      {stats && (
        <section className="bg-slate-800 text-white py-8">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-4">
            <div>
              <p className="text-3xl font-extrabold text-yellow-400">{stats.total}</p>
              <p className="text-gray-400 text-sm mt-1">Total Vehicles</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-yellow-400">{stats.available}</p>
              <p className="text-gray-400 text-sm mt-1">Available Now</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-yellow-400">{stats.sold}</p>
              <p className="text-gray-400 text-sm mt-1">Vehicles Sold</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-yellow-400">
                {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', notation: 'compact', maximumFractionDigits: 1 }).format(stats.totalValue)}
              </p>
              <p className="text-gray-400 text-sm mt-1">Inventory Value</p>
            </div>
          </div>
        </section>
      )}

      {/* Featured Vehicles */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Vehicles</h2>
          <p className="text-gray-500 mt-2">Explore our top available vehicles</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(v => <VehicleCard key={v.id} vehicle={v} />)}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/inventory"
            className="inline-block bg-slate-900 text-yellow-400 font-bold px-8 py-3 rounded-xl hover:bg-slate-700 transition-colors"
          >
            View All Inventory
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✅', title: 'Quality Assured', desc: 'Every vehicle is thoroughly inspected before listing.' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing well below market average.' },
              { icon: '🤝', title: 'Expert Service', desc: 'Our experienced team guides you every step of the way.' },
              { icon: '📋', title: 'Full History', desc: 'Transparent vehicle history on every listing.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Us Today</h2>
        <p className="text-gray-600 mb-2">📍 22 2nd Avenue Springs, Johannesburg</p>
        <p className="text-gray-600 mb-2">📞 011 219 7114 | 087 510 4114</p>
        <p className="text-gray-600">👤 Salesman: Mthobisi Sihlezana — 063 273 0003</p>
      </section>
    </div>
  )
}
