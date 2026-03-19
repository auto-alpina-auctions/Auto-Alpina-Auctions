import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-yellow-400 font-extrabold text-lg tracking-wider mb-4">AUTO ALPINA AUCTIONS</h3>
            <p className="text-sm">Your trusted used car dealer in Johannesburg. Quality vehicles at competitive prices.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <p className="text-sm">22 2nd Avenue Springs, Johannesburg</p>
            <p className="text-sm mt-1">011 219 7114</p>
            <p className="text-sm">087 510 4114</p>
            <p className="text-sm mt-2 text-yellow-400 font-medium">Salesman: Mthobisi Sihlezana</p>
            <p className="text-sm">063 273 0003</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link to="/inventory" className="hover:text-yellow-400 transition-colors">Inventory</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-yellow-400 transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Auto Alpina Auctions (Pty) Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
