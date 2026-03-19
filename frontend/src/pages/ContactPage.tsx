import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', vehicleInterest: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          {/* Company Card */}
          <div className="bg-slate-900 text-white rounded-xl p-6">
            <h2 className="text-yellow-400 font-bold text-xl mb-4">Auto Alpina Auctions (Pty) Ltd</h2>
            <p className="text-gray-300 flex gap-2 mb-2"><span>📍</span>22 2nd Avenue Springs, Johannesburg</p>
            <p className="text-gray-300 flex gap-2 mb-1"><span>📞</span>011 219 7114</p>
            <p className="text-gray-300 flex gap-2"><span>📞</span>087 510 4114</p>
          </div>

          {/* Salesman Card */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h2 className="font-bold text-gray-900 text-lg mb-3">Our Salesman</h2>
            <p className="text-2xl font-bold text-gray-900">Mthobisi Sihlezana</p>
            <p className="text-yellow-600 font-semibold mt-1">063 273 0003</p>
            <a href="tel:0632730003" className="mt-3 inline-block bg-slate-900 text-yellow-400 font-semibold px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm">
              📞 Call Mthobisi
            </a>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-100 rounded-xl p-6 text-center">
            <p className="text-3xl mb-2">📍</p>
            <p className="font-semibold text-gray-800">22 2nd Avenue Springs</p>
            <p className="text-gray-600">Johannesburg, South Africa</p>
            <p className="text-sm text-gray-500 mt-2">East Rand, Ekurhuleni</p>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-gray-900 mb-3">Business Hours</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Monday - Friday</span><span className="font-medium">8:00 AM - 5:30 PM</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Saturday</span><span className="font-medium">8:00 AM - 2:00 PM</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Sunday</span><span className="font-medium text-red-500">Closed</span></div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
          {submitted ? (
            <div className="text-center py-10">
              <p className="text-5xl mb-4">✅</p>
              <p className="text-xl font-bold text-green-700">Message Sent!</p>
              <p className="text-gray-500 mt-2">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle of Interest</label>
                <input type="text" placeholder="e.g. 2020 Toyota Hilux" value={form.vehicleInterest} onChange={e => setForm({ ...form, vehicleInterest: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <button type="submit" className="w-full bg-slate-900 text-yellow-400 font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
