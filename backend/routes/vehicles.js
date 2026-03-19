const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

// Load vehicles data on startup
const dataPath = path.join(__dirname, '../data/vehicles.json');
let vehicles = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// GET /vehicles/makes - must be BEFORE /:id
router.get('/vehicles/makes', (req, res) => {
  const makes = [...new Set(vehicles.map(v => v.make))].sort();
  res.json(makes);
});

// GET /stats
router.get('/stats', (req, res) => {
  const available = vehicles.filter(v => v.status === 'Available');
  const sold = vehicles.filter(v => v.status === 'Sold');
  const hold = vehicles.filter(v => v.status === 'Hold');
  const totalValue = available.reduce((sum, v) => sum + v.price, 0);
  res.json({
    total: vehicles.length,
    available: available.length,
    sold: sold.length,
    hold: hold.length,
    totalValue
  });
});

// GET /vehicles
router.get('/vehicles', (req, res) => {
  let result = [...vehicles];
  const { search, make, model, year, yearFrom, yearTo, minPrice, maxPrice, minMileage, maxMileage, bodyType, transmission, fuelType, condition, color, doors, status, page = 1, limit = 12, sort } = req.query;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(v => v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.description.toLowerCase().includes(q));
  }
  if (make) result = result.filter(v => v.make.toLowerCase() === make.toLowerCase());
  if (model) result = result.filter(v => v.model.toLowerCase().includes(model.toLowerCase()));
  if (year) result = result.filter(v => v.year === parseInt(year));
  if (yearFrom) result = result.filter(v => v.year >= parseInt(yearFrom));
  if (yearTo) result = result.filter(v => v.year <= parseInt(yearTo));
  if (minPrice) result = result.filter(v => v.price >= parseInt(minPrice));
  if (maxPrice) result = result.filter(v => v.price <= parseInt(maxPrice));
  if (minMileage) result = result.filter(v => v.mileage >= parseInt(minMileage));
  if (maxMileage) result = result.filter(v => v.mileage <= parseInt(maxMileage));
  if (bodyType) { const types = bodyType.split(','); result = result.filter(v => types.includes(v.bodyType)); }
  if (transmission) { const trans = transmission.split(','); result = result.filter(v => trans.includes(v.transmission)); }
  if (fuelType) { const fuels = fuelType.split(','); result = result.filter(v => fuels.includes(v.fuelType)); }
  if (condition) { const conds = condition.split(','); result = result.filter(v => conds.includes(v.condition)); }
  if (color) { const colors = color.split(','); result = result.filter(v => colors.includes(v.color)); }
  if (doors) { const d = doors.split(',').map(Number); result = result.filter(v => d.includes(v.doors)); }
  if (status) result = result.filter(v => v.status === status);

  const total = result.length;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const totalPages = Math.ceil(total / limitNum);
  const start = (pageNum - 1) * limitNum;
  const paginated = result.slice(start, start + limitNum);

  res.json({ vehicles: paginated, total, page: pageNum, limit: limitNum, totalPages });
});

// GET /vehicles/:id
router.get('/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
  res.json(vehicle);
});

// POST /vehicles
router.post('/vehicles', (req, res) => {
  const vehicle = { id: uuidv4(), ...req.body };
  vehicles.push(vehicle);
  res.status(201).json(vehicle);
});

// PUT /vehicles/:id
router.put('/vehicles/:id', (req, res) => {
  const idx = vehicles.findIndex(v => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Vehicle not found' });
  vehicles[idx] = { ...vehicles[idx], ...req.body, id: req.params.id };
  res.json(vehicles[idx]);
});

// DELETE /vehicles/:id
router.delete('/vehicles/:id', (req, res) => {
  const idx = vehicles.findIndex(v => v.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Vehicle not found' });
  vehicles.splice(idx, 1);
  res.status(204).send();
});

module.exports = router;
