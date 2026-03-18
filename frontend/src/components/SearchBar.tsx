interface Props {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

export default function SearchBar({ value, onChange, onSearch }: Props) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSearch()}
          placeholder="Search by make, model..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
        />
      </div>
      <button
        onClick={onSearch}
        className="bg-slate-900 text-yellow-400 font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-700 transition-colors"
      >
        Search
      </button>
    </div>
  )
}
