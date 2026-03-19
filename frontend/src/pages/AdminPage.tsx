import { useEffect, useState } from 'react'
import { vehicleApi } from '../api/vehicleApi'
import type { Vehicle, VehicleStats } from '../types/vehicle'

const fmt = (n: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(n)

type VehicleFormData = {
  make: string
  model: string
  year: number
  price: number
  mileage: number
  condition: Vehicle['condition']
  bodyType: Vehicle['bodyType']
  transmission: Vehicle['transmission']
  fuelType: Vehicle['fuelType']
  color: string
  doors: string
  description: string
  featuresText: string
  imagesText: string
  status: Vehicle['status']
  marketPrice: number
  vin: string
  engine: string
  horsePower: number
  torque: number
}

const defaultForm: VehicleFormData = {
  make: '', model: '', year: 2024, price: 0, mileage: 0,
  condition: 'Used', bodyType: 'Sedan', transmission: 'Manual', fuelType: 'Petrol',
  color: '', doors: '4', description: '', featuresText: '', imagesText: '',
  status: 'Available', marketPrice: 0, vin: '', engine: '', horsePower: 0, torque: 0
}

export default function AdminPage() {
  const [stats, setStats] = useState<VehicleStats | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<VehicleFormData>(defaultForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const refresh = async () => {
    setLoading(true)
    try {
      const [statsData, vData] = await Promise.all([
        vehicleApi.getStats(),
        vehicleApi.getVehicles({}, 1, 100)
      ])
      setStats(statsData)
      setVehicles(vData.vehicles)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  const openAdd = () => { setForm(defaultForm); setEditingId(null); setShowForm(true) }

  const openEdit = (v: Vehicle) => {
    setForm({
      make: v.make,
      model: v.model,
      year: v.year,
      price: v.price,
      mileage: v.mileage,
      condition: v.condition,
      bodyType: v.bodyType,
      transmission: v.transmission,
      fuelType: v.fuelType,
      color: v.color,
      doors: String(v.doors),
      description: v.description,
      featuresText: v.features.join(', '),
      imagesText: v.images.join(', '),
      status: v.status,
      marketPrice: v.marketPrice,
      vin: v.vin,
      engine: v.engine,
      horsePower: v.horsePower,
      torque: v.torque,
    })
    setEditingId(v.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const vehicle: Omit<Vehicle, 'id'> = {
      make: form.make,
      model: form.model,
      year: form.year,
      price: form.price,
      mileage: form.mileage,
      condition: form.condition,
      bodyType: form.bodyType,
      transmission: form.transmission,
      fuelType: form.fuelType,
      color: form.color,
      doors: Number(form.doors) as 2 | 4 | 5,
      description: form.description,
      features: form.featuresText.split(',').map(s => s.trim()).filter(Boolean),
      images: form.imagesText.split(',').map(s => s.trim()).filter(Boolean),
      status: form.status,
      marketPrice: form.marketPrice,
      vin: form.vin,
      engine: form.engine,
      horsePower: form.horsePower,
      torque: form.torque,
    }
    if (editingId) {
      await vehicleApi.updateVehicle(editingId, vehicle)
    } else {
      await vehicleApi.createVehicle(vehicle)
    }
    setShowForm(false)
    refresh()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await vehicleApi.deleteVehicle(deleteId)
    setDeleteId(null)
    refresh()
  }

  const handleStatusChange = async (id: string, status: Vehicle['status']) => {
    await vehicleApi.updateVehicle(id, { status })
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, status } : v))
  }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  )

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button onClick={openAdd} className="bg-yellow-400 text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-yellow-300 transition-colors">
          + Add Vehicle
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'bg-slate-900 text-white' },
            { label: 'Available', value: stats.available, color: 'bg-green-600 text-white' },
            { label: 'Sold', value: stats.sold, color: 'bg-red-600 text-white' },
            { label: 'Hold', value: stats.hold, color: 'bg-yellow-500 text-white' },
            { label: 'Inventory Value', value: fmt(stats.totalValue), color: 'bg-blue-600 text-white' },
          ].map(c => (
            <div key={c.label} className={`${c.color} rounded-xl p-4 text-center`}>
              <p className="text-2xl font-extrabold">{c.value}</p>
              <p className="text-sm opacity-90 mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Vehicles Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Mileage</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-10 text-gray-400">Loading...</td></tr>
            ) : vehicles.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img src={v.images[0]} alt="" className="w-16 h-12 object-cover rounded" />
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold">{v.year} {v.make} {v.model}</p>
                  <p className="text-gray-500">{v.bodyType} · {v.transmission}</p>
                </td>
                <td className="px-4 py-3 font-semibold text-yellow-600">{fmt(v.price)}</td>
                <td className="px-4 py-3">{v.mileage.toLocaleString()} km</td>
                <td className="px-4 py-3">
                  <select
                    value={v.status}
                    onChange={e => handleStatusChange(v.id, e.target.value as Vehicle['status'])}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option>Available</option>
                    <option>Sold</option>
                    <option>Hold</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(v)} className="bg-slate-900 text-yellow-400 px-3 py-1.5 rounded text-xs font-medium hover:bg-slate-700">Edit</button>
                    <button onClick={() => setDeleteId(v.id)} className="bg-red-100 text-red-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-red-200">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-xl">{editingId ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Make"><input required className={inputCls} value={form.make} onChange={e => setForm({...form, make: e.target.value})} /></Field>
              <Field label="Model"><input required className={inputCls} value={form.model} onChange={e => setForm({...form, model: e.target.value})} /></Field>
              <Field label="Year"><input required type="number" className={inputCls} value={form.year} onChange={e => setForm({...form, year: Number(e.target.value)})} /></Field>
              <Field label="Price (ZAR)"><input required type="number" className={inputCls} value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} /></Field>
              <Field label="Market Price (ZAR)"><input required type="number" className={inputCls} value={form.marketPrice} onChange={e => setForm({...form, marketPrice: Number(e.target.value)})} /></Field>
              <Field label="Mileage (km)"><input required type="number" className={inputCls} value={form.mileage} onChange={e => setForm({...form, mileage: Number(e.target.value)})} /></Field>
              <Field label="Color"><input required className={inputCls} value={form.color} onChange={e => setForm({...form, color: e.target.value})} /></Field>
              <Field label="VIN"><input required className={inputCls} value={form.vin} onChange={e => setForm({...form, vin: e.target.value})} /></Field>
              <Field label="Engine"><input required className={inputCls} value={form.engine} onChange={e => setForm({...form, engine: e.target.value})} /></Field>
              <Field label="Horsepower"><input required type="number" className={inputCls} value={form.horsePower} onChange={e => setForm({...form, horsePower: Number(e.target.value)})} /></Field>
              <Field label="Torque (Nm)"><input required type="number" className={inputCls} value={form.torque} onChange={e => setForm({...form, torque: Number(e.target.value)})} /></Field>
              <Field label="Doors">
                <select className={inputCls} value={form.doors} onChange={e => setForm({...form, doors: e.target.value})}>
                  <option value="2">2</option><option value="4">4</option><option value="5">5</option>
                </select>
              </Field>
              <Field label="Body Type">
                <select className={inputCls} value={form.bodyType} onChange={e => setForm({...form, bodyType: e.target.value as Vehicle['bodyType']})}>
                  {['Sedan','SUV','Hatchback','Coupe','Truck','Van'].map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Transmission">
                <select className={inputCls} value={form.transmission} onChange={e => setForm({...form, transmission: e.target.value as Vehicle['transmission']})}>
                  {['Manual','Automatic','CVT'].map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Fuel Type">
                <select className={inputCls} value={form.fuelType} onChange={e => setForm({...form, fuelType: e.target.value as Vehicle['fuelType']})}>
                  {['Petrol','Diesel','Hybrid','Electric'].map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Condition">
                <select className={inputCls} value={form.condition} onChange={e => setForm({...form, condition: e.target.value as Vehicle['condition']})}>
                  {['New','Used','Certified Pre-Owned'].map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Status">
                <select className={inputCls} value={form.status} onChange={e => setForm({...form, status: e.target.value as Vehicle['status']})}>
                  {['Available','Sold','Hold'].map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Description">
                  <textarea required rows={3} className={inputCls} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Features (comma-separated)">
                  <input className={inputCls} value={form.featuresText} onChange={e => setForm({...form, featuresText: e.target.value})} placeholder="Reverse Camera, Bluetooth, Leather Seats" />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Image URLs (comma-separated)">
                  <input className={inputCls} value={form.imagesText} onChange={e => setForm({...form, imagesText: e.target.value})} placeholder="https://..." />
                </Field>
              </div>
              <div className="md:col-span-2 flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-900 text-yellow-400 font-bold rounded-lg hover:bg-slate-700">
                  {editingId ? 'Update Vehicle' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="font-bold text-lg mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this vehicle? This cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
