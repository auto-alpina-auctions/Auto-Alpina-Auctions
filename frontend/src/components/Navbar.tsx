import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/inventory', label: 'Inventory' },
    { to: '/contact', label: 'Contact' },
    { to: '/admin', label: 'Admin' },
  ]

  return (
    <nav className="bg-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-yellow-400 font-extrabold text-xl tracking-wider">AUTO ALPINA AUCTIONS</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors pb-1 ${
                  location.pathname === link.to
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-300 hover:text-yellow-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            className="md:hidden text-gray-300 hover:text-yellow-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-slate-800 px-4 pb-4 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium ${
                location.pathname === link.to ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
