export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: 'Used' | 'New' | 'Certified Pre-Owned';
  bodyType: 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Truck' | 'Van';
  transmission: 'Manual' | 'Automatic' | 'CVT';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  color: string;
  doors: 2 | 4 | 5;
  description: string;
  features: string[];
  images: string[];
  status: 'Available' | 'Sold' | 'Hold';
  marketPrice: number;
  vin: string;
  engine: string;
  horsePower: number;
  torque: number;
}

export interface VehicleFilters {
  search?: string;
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  bodyType?: string[];
  transmission?: string[];
  fuelType?: string[];
  condition?: string[];
  color?: string[];
  doors?: number[];
  status?: string;
}

export interface PaginatedVehicles {
  vehicles: Vehicle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface VehicleStats {
  total: number;
  available: number;
  sold: number;
  hold: number;
  totalValue: number;
}
