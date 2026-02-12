import { API_BASE_URL } from "@/config";

const API_BASE = `${API_BASE_URL}/api/fleet`;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
  };
};

const getJsonHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export interface Truck {
  _id: string;
  name: string;
  chassisNo: string;
  rcNo: string;
  dlNo: string;
  vehicleType?: 'mini_truck' | 'pickup' | 'light_truck' | 'medium_truck' | 'heavy_truck' | 'trailer' | 'container';
  capacity?: string;
  manufacturer?: string;
  model?: string;
  year?: number;
  color?: string;
  insuranceNo?: string;
  insuranceExpiry?: string;
  permitNo?: string;
  permitExpiry?: string;
  fitnessExpiry?: string;
  photos: string[];
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  approvedBy?: { _id: string; businessName: string };
  approvedAt?: string;
  createdBy: { _id: string; businessName: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface Driver {
  _id: string;
  fullName: string;
  mobile: string;
  dlNo: string;
  aadhaar: string;
  photo?: string;
  status: 'active' | 'inactive';
  createdBy: { _id: string; businessName: string; email: string };
  createdAt: string;
}

export interface TruckFormData {
  name: string;
  chassisNo: string;
  rcNo: string;
  dlNo: string;
  vehicleType?: string;
  capacity?: string;
  manufacturer?: string;
  model?: string;
  year?: string;
  color?: string;
  insuranceNo?: string;
  insuranceExpiry?: string;
  permitNo?: string;
  permitExpiry?: string;
  fitnessExpiry?: string;
  photos: File[];
}

export interface DriverFormData {
  fullName: string;
  mobile: string;
  dlNo: string;
  aadhaar: string;
  photo?: File;
}



export const fleetApi = {
  // Trucks
  async addTruck(data: TruckFormData): Promise<{ success: boolean; message: string; truck: Truck }> {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('chassisNo', data.chassisNo);
    formData.append('rcNo', data.rcNo);
    formData.append('dlNo', data.dlNo);
    // New metadata fields
    if (data.vehicleType) formData.append('vehicleType', data.vehicleType);
    if (data.capacity) formData.append('capacity', data.capacity);
    if (data.manufacturer) formData.append('manufacturer', data.manufacturer);
    if (data.model) formData.append('model', data.model);
    if (data.year) formData.append('year', data.year);
    if (data.color) formData.append('color', data.color);
    if (data.insuranceNo) formData.append('insuranceNo', data.insuranceNo);
    if (data.insuranceExpiry) formData.append('insuranceExpiry', data.insuranceExpiry);
    if (data.permitNo) formData.append('permitNo', data.permitNo);
    if (data.permitExpiry) formData.append('permitExpiry', data.permitExpiry);
    if (data.fitnessExpiry) formData.append('fitnessExpiry', data.fitnessExpiry);
    // Photos
    data.photos.forEach(photo => {
      formData.append('photos', photo);
    });

    const response = await fetch(`${API_BASE}/trucks`, {
      method: 'POST',
      headers: getHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add truck');
    }

    return response.json();
  },

  async getTrucks(status?: string): Promise<{ trucks: Truck[] }> {
    try {
      const url = status && status !== 'all'
        ? `${API_BASE}/trucks?status=${status}`
        : `${API_BASE}/trucks`;

      const response = await fetch(url, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch trucks');
      }

      const data = await response.json();

      // Safeguard: Filter by user role for real data too if backend doesn't
      try {
        const userStr = localStorage.getItem('user');
        if (userStr && data.trucks) {
          const user = JSON.parse(userStr);
          if (user.role === 'shipment_partner') {
            // Only show trucks created by this partner
            // Check if CreatedBy is populated object or just ID
            data.trucks = data.trucks.filter((t: any) => {
              const creatorId = typeof t.createdBy === 'object' ? t.createdBy?._id : t.createdBy;
              return creatorId === user._id || creatorId === user.id;
            });
          }
        }
      } catch (e) {
        console.error("Error filtering trucks", e);
      }

      return data?.trucks ? data : { trucks: [] };
    } catch (error) {
      return { trucks: [] };
    }
  },

  async approveTruck(id: string): Promise<{ success: boolean; message: string; truck: Truck }> {
    const response = await fetch(`${API_BASE}/trucks/${id}/approve`, {
      method: 'POST',
      headers: getJsonHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to approve truck');
    }

    return response.json();
  },

  async rejectTruck(id: string, reason: string): Promise<{ success: boolean; message: string; truck: Truck }> {
    const response = await fetch(`${API_BASE}/trucks/${id}/reject`, {
      method: 'POST',
      headers: getJsonHeaders(),
      body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to reject truck');
    }

    return response.json();
  },

  async deleteTruck(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE}/trucks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete truck');
    }

    return response.json();
  },

  // Drivers
  async addDriver(data: DriverFormData): Promise<{ success: boolean; message: string; driver: Driver }> {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('mobile', data.mobile);
    formData.append('dlNo', data.dlNo);
    formData.append('aadhaar', data.aadhaar);
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    const response = await fetch(`${API_BASE}/drivers`, {
      method: 'POST',
      headers: getHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add driver');
    }

    return response.json();
  },

  async getDrivers(): Promise<{ drivers: Driver[] }> {
    try {
      const response = await fetch(`${API_BASE}/drivers`, {
        headers: getHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch drivers');
      }

      const data = await response.json();

      // Safeguard: Filter by user role for real data too if backend doesn't
      try {
        const userStr = localStorage.getItem('user');
        if (userStr && data.drivers) {
          const user = JSON.parse(userStr);
          if (user.role === 'shipment_partner') {
            // Only show drivers created by this partner
            data.drivers = data.drivers.filter((d: any) => {
              const creatorId = typeof d.createdBy === 'object' ? d.createdBy?._id : d.createdBy;
              return creatorId === user._id || creatorId === user.id;
            });
          }
        }
      } catch (e) {
        console.error("Error filtering drivers", e);
      }

      return data?.drivers ? data : { drivers: [] };
    } catch (error) {
      return { drivers: [] };
    }
  },

  async deleteDriver(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE}/drivers/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete driver');
    }

    return response.json();
  },
};
