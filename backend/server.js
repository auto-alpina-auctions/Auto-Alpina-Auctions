const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const vehicleRoutes = require('./routes/vehicles');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', vehicleRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Auto Alpina Auctions API', version: '1.0.0' });
});

app.listen(PORT, () => {
  console.log(`Auto Alpina Auctions API running on port ${PORT}`);
});

module.exports = app;
