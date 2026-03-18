import { useEffect, useState, useCallback } from 'react'
import { vehicleApi } from '../api/vehicleApi'
import type { VehicleFilters, PaginatedVehicles } from '../types/vehicle'
import VehicleCard from '../components/VehicleCard'
import SearchBar from '../components/SearchBar'
import FilterPanel from '../components/FilterPanel'
import Pagination from '../components/Pagination'

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc'

export default function InventoryPage() {
  const [data, setData] = useState<PaginatedVehicles | null>(null)
  const [filters, setFilters] = useState<VehicleFilters>({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortOption>('year-desc')
  const [makes, setMakes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    vehicleApi.getMakes().then(setMakes).catch(console.error)
  }, [])

  const fetchVehicles = useCallback(async () => {
    setLoading(true)
    try {
      const result = await vehicleApi.getVehicles({ ...filters, search: search || undefined }, page, 12)
      const sorted = [...result.vehicles].sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price
        if (sort === 'price-desc') return b.price - a.price
        if (sort === 'year-desc') return b.year - a.year
        if (sort === 'mileage-asc') return a.mileage - b.mileage
        return 0
      })
      setData({ ...result, vehicles: sorted })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [filters, search, page, sort])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  const handleSearch = () => {
    setPage(1)
    fetchVehicles()
  }

  const handleFilterChange = (newFilters: VehicleFilters) => {
    setFilters(newFilters)
    setPage(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Inventory</h1>

      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />
      </div>

      <div className="flex gap-4 items-center mb-6 flex-wrap">
        <button
          className="md:hidden bg-slate-900 text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort:</label>
          <select
            value={sort}
            onChange={e => { setSort(e.target.value as SortOption); setPage(1) }}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm"
          >
            <option value="year-desc">Year: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="mileage-asc">Mileage: Lowest</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        <aside className={`w-64 shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <FilterPanel filters={filters} onChange={handleFilterChange} makes={makes} />
        </aside>

        <div className="flex-1 min-w-0">
          {data && (
            <p className="text-sm text-gray-500 mb-4">
              Showing {data.vehicles.length} of {data.total} vehicles
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : data?.vehicles.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-5xl mb-4">🚗</p>
              <p className="text-xl font-semibold">No vehicles found</p>
              <p className="mt-2">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {data?.vehicles.map(v => <VehicleCard key={v.id} vehicle={v} />)}
            </div>
          )}

          {data && (
            <Pagination page={page} totalPages={data.totalPages} onPageChange={setPage} />
          )}
        </div>
      </div>
    </div>
  )
}
