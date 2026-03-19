import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import InventoryPage from './pages/InventoryPage'
import VehicleDetailPage from './pages/VehicleDetailPage'
import AdminPage from './pages/AdminPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
