# Auto Alpina Auctions (Pty) Ltd

A full-featured used car dealer website for Auto Alpina Auctions, located at 22 2nd Avenue Springs, Johannesburg.

## Company Details
- **Phone**: 011 219 7114 / 087 510 4114
- **Salesman**: Mthobisi Sihlezana — 063 273 0003
- **Address**: 22 2nd Avenue Springs, Johannesburg

## Features

- 🔍 **Search & Listing** — Browse all vehicles with thumbnail cards, search by name/model, pagination
- 🎛️ **Advanced Filtering** — Filter by year, make, model, price, mileage, body type, transmission, fuel type, condition, color, doors
- 📄 **Vehicle Detail Pages** — Full specs, image gallery, market price comparison, contact salesman
- 📊 **Market Price Tool** — Compare asking price vs. market average with visual indicator
- 🛠️ **Admin Dashboard** — Add/edit/delete vehicles, manage status, view inventory analytics
- 📞 **Contact Page** — Company info, salesman profiles, contact form, map

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Data | JSON seed data (25+ vehicles) |

## Project Structure

```
Auto-Alpina-Auctions/
├── frontend/          # React + TypeScript + Vite app
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route pages
│   │   ├── api/          # API layer
│   │   └── types/        # TypeScript interfaces
│   └── vite.config.ts
├── backend/           # Node.js + Express API
│   ├── routes/        # API route handlers
│   ├── data/          # Seed vehicle data (vehicles.json)
│   └── server.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Backend Setup
```bash
cd backend
npm install
npm start       # Runs on http://localhost:5000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev     # Runs on http://localhost:5173
```

### API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/vehicles | List vehicles (supports filtering & pagination) |
| GET | /api/vehicles/:id | Get single vehicle |
| POST | /api/vehicles | Add new vehicle |
| PUT | /api/vehicles/:id | Update vehicle |
| DELETE | /api/vehicles/:id | Delete vehicle |
| GET | /api/vehicles/makes | List all makes |
| GET | /api/stats | Inventory statistics |

### Query Parameters for GET /api/vehicles
- `search` — Search by make/model
- `make`, `model` — Filter by make/model
- `yearFrom`, `yearTo` — Year range
- `priceMin`, `priceMax` — Price range (ZAR)
- `mileageMin`, `mileageMax` — Mileage range
- `bodyType`, `transmission`, `fuelType` — Feature filters
- `condition`, `color`, `doors` — Additional filters
- `status` — Available/Sold/Hold
- `page`, `limit` — Pagination
- `sortBy`, `sortOrder` — Sorting
