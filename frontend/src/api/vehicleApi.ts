import axios from 'axios';
import type { Vehicle, VehicleFilters, PaginatedVehicles, VehicleStats } from '../types/vehicle';

const api = axios.create({
  baseURL: '/api',
});

export const vehicleApi = {
  getVehicles: async (filters: VehicleFilters = {}, page = 1, limit = 12): Promise<PaginatedVehicles> => {
    const params: Record<string, string | number> = { page, limit };
    if (filters.search) params.search = filters.search;
    if (filters.make) params.make = filters.make;
    if (filters.model) params.model = filters.model;
    if (filters.yearFrom) params.yearFrom = filters.yearFrom;
    if (filters.yearTo) params.yearTo = filters.yearTo;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.minMileage) params.minMileage = filters.minMileage;
    if (filters.maxMileage) params.maxMileage = filters.maxMileage;
    if (filters.bodyType?.length) params.bodyType = filters.bodyType.join(',');
    if (filters.transmission?.length) params.transmission = filters.transmission.join(',');
    if (filters.fuelType?.length) params.fuelType = filters.fuelType.join(',');
    if (filters.condition?.length) params.condition = filters.condition.join(',');
    if (filters.color?.length) params.color = filters.color.join(',');
    if (filters.doors?.length) params.doors = filters.doors.join(',');
    if (filters.status) params.status = filters.status;
    const { data } = await api.get('/vehicles', { params });
    return data;
  },

  getVehicle: async (id: string): Promise<Vehicle> => {
    const { data } = await api.get(`/vehicles/${id}`);
    return data;
  },

  getMakes: async (): Promise<string[]> => {
    const { data } = await api.get('/vehicles/makes');
    return data;
  },

  getStats: async (): Promise<VehicleStats> => {
    const { data } = await api.get('/stats');
    return data;
  },

  createVehicle: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    const { data } = await api.post('/vehicles', vehicle);
    return data;
  },

  updateVehicle: async (id: string, vehicle: Partial<Vehicle>): Promise<Vehicle> => {
    const { data } = await api.put(`/vehicles/${id}`, vehicle);
    return data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await api.delete(`/vehicles/${id}`);
  },
};
