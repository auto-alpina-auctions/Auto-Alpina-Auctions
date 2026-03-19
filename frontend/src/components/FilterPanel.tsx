import { useState } from 'react'
import type { VehicleFilters } from '../types/vehicle'

interface Props {
  filters: VehicleFilters
  onChange: (filters: VehicleFilters) => void
  makes: string[]
}

export default function FilterPanel({ filters, onChange, makes }: Props) {
  const [openSections, setOpenSections] = useState<string[]>(['year', 'make', 'price', 'bodyType'])

  const toggleSection = (s: string) =>
    setOpenSections(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const isOpen = (s: string) => openSections.includes(s)

  const toggleArrayFilter = (key: keyof VehicleFilters, value: string | number) => {
    const current = (filters[key] as (string | number)[]) ?? []
    const updated = current.includes(value as never)
      ? current.filter(v => v !== value)
      : [...current, value]
    onChange({ ...filters, [key]: updated })
  }

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex justify-between items-center text-left font-semibold text-gray-800 mb-2"
      >
        <span>{title}</span>
        <span>{isOpen(id) ? '▲' : '▼'}</span>
      </button>
      {isOpen(id) && <div className="mt-2">{children}</div>}
    </div>
  )

  const CheckItem = ({ label, checked, onChange: onChg }: { label: string; checked: boolean; onChange: () => void }) => (
    <label className="flex items-center gap-2 py-1 cursor-pointer text-sm text-gray-700 hover:text-gray-900">
      <input type="checkbox" checked={checked} onChange={onChg} className="accent-yellow-400 w-4 h-4" />
      {label}
    </label>
  )

  const years = Array.from({ length: 15 }, (_, i) => 2024 - i)

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-900">Filters</h2>
        <button
          onClick={() => onChange({})}
          className="text-sm text-yellow-600 hover:text-yellow-800 font-medium"
        >
          Reset All
        </button>
      </div>

      <Section id="year" title="Year Range">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">From</label>
            <select
              value={filters.yearFrom ?? ''}
              onChange={e => onChange({ ...filters, yearFrom: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
            >
              <option value="">Any</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500">To</label>
            <select
              value={filters.yearTo ?? ''}
              onChange={e => onChange({ ...filters, yearTo: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
            >
              <option value="">Any</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </Section>

      <Section id="make" title="Make">
        <select
          value={filters.make ?? ''}
          onChange={e => onChange({ ...filters, make: e.target.value || undefined })}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
        >
          <option value="">All Makes</option>
          {makes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </Section>

      <Section id="price" title="Price Range (ZAR)">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">Min</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice ?? ''}
              onChange={e => onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Max</label>
            <input
              type="number"
              placeholder="Any"
              value={filters.maxPrice ?? ''}
              onChange={e => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
            />
          </div>
        </div>
      </Section>

      <Section id="mileage" title="Mileage (km)">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-500">Min</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minMileage ?? ''}
              onChange={e => onChange({ ...filters, minMileage: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Max</label>
            <input
              type="number"
              placeholder="Any"
              value={filters.maxMileage ?? ''}
              onChange={e => onChange({ ...filters, maxMileage: e.target.value ? Number(e.target.value) : undefined })}
              className="w-full mt-1 border border-gray-300 rounded px-2 py-1.5 text-sm"
            />
          </div>
        </div>
      </Section>

      <Section id="bodyType" title="Body Type">
        {['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van'].map(bt => (
          <CheckItem
            key={bt}
            label={bt}
            checked={(filters.bodyType ?? []).includes(bt)}
            onChange={() => toggleArrayFilter('bodyType', bt)}
          />
        ))}
      </Section>

      <Section id="transmission" title="Transmission">
        {['Manual', 'Automatic', 'CVT'].map(t => (
          <CheckItem
            key={t}
            label={t}
            checked={(filters.transmission ?? []).includes(t)}
            onChange={() => toggleArrayFilter('transmission', t)}
          />
        ))}
      </Section>

      <Section id="fuelType" title="Fuel Type">
        {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map(f => (
          <CheckItem
            key={f}
            label={f}
            checked={(filters.fuelType ?? []).includes(f)}
            onChange={() => toggleArrayFilter('fuelType', f)}
          />
        ))}
      </Section>

      <Section id="condition" title="Condition">
        {['New', 'Used', 'Certified Pre-Owned'].map(c => (
          <CheckItem
            key={c}
            label={c}
            checked={(filters.condition ?? []).includes(c)}
            onChange={() => toggleArrayFilter('condition', c)}
          />
        ))}
      </Section>

      <Section id="doors" title="Doors">
        {[2, 4, 5].map(d => (
          <CheckItem
            key={d}
            label={`${d} doors`}
            checked={(filters.doors ?? []).includes(d)}
            onChange={() => toggleArrayFilter('doors', d)}
          />
        ))}
      </Section>
    </div>
  )
}
