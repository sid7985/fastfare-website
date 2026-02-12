import { API_BASE_URL } from "@/config";

const API_BASE = `${API_BASE_URL}/api/reports`;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Empty defaults for when API returns no data
const EMPTY_KPIS: KPIData = {
  totalTrucks: 0,
  activeTrucks: 0,
  pendingTrucks: 0,
  rejectedTrucks: 0,
  totalDrivers: 0,
  activeDrivers: 0,
  inactiveDrivers: 0,
  trucksInPeriod: 0,
  driversInPeriod: 0,
};

const EMPTY_ANALYTICS: AnalyticsData = { byStatus: [], overTime: [] };
const EMPTY_PAGINATION: PaginationInfo = { total: 0, page: 1, limit: 10, pages: 0 };

export interface KPIData {
  totalTrucks: number;
  activeTrucks: number;
  pendingTrucks: number;
  rejectedTrucks: number;
  totalDrivers: number;
  activeDrivers: number;
  inactiveDrivers: number;
  trucksInPeriod: number;
  driversInPeriod: number;
}

export interface ChartDataPoint {
  status?: string;
  date?: string;
  count: number;
}

export interface AnalyticsData {
  byStatus: ChartDataPoint[];
  overTime: ChartDataPoint[];
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface TruckTableData {
  _id: string;
  name: string;
  chassisNo: string;
  rcNo: string;
  dlNo: string;
  status: string;
  createdAt: string;
  createdBy?: { businessName: string; email: string };
  rejectionReason?: string;
}

export interface DriverTableData {
  _id: string;
  fullName: string;
  mobile: string;
  dlNo: string;
  aadhaar: string;
  status: string;
  createdAt: string;
  createdBy?: { businessName: string; email: string };
}

export interface ExportData {
  [key: string]: string | number;
}

export interface ReportsFilters {
  dateRange?: string;
  truckStatus?: string;
  driverStatus?: string;
}

export const reportsApi = {
  // Get KPI data
  async getKPIs(filters: ReportsFilters = {}): Promise<{ kpis: KPIData }> {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);

      const url = `${API_BASE}/kpis${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url, { headers: getHeaders() });

      if (!response.ok) {
        throw new Error('Failed to fetch KPIs');
      }
      const data = await response.json();
      return data?.kpis ? data : { kpis: EMPTY_KPIS };
    } catch (error) {
      return { kpis: EMPTY_KPIS };
    }
  },

  // Get trucks analytics
  async getTrucksAnalytics(filters: ReportsFilters = {}): Promise<AnalyticsData> {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);

      const url = `${API_BASE}/trucks/analytics${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url, { headers: getHeaders() });

      if (!response.ok) {
        throw new Error('Failed to fetch trucks analytics');
      }
      const data = await response.json();
      return data?.byStatus ? data : EMPTY_ANALYTICS;
    } catch (error) {
      return EMPTY_ANALYTICS;
    }
  },

  // Get drivers analytics
  async getDriversAnalytics(filters: ReportsFilters = {}): Promise<AnalyticsData> {
    try {
      const params = new URLSearchParams();
      if (filters.dateRange) params.append('dateRange', filters.dateRange);

      const url = `${API_BASE}/drivers/analytics${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url, { headers: getHeaders() });

      if (!response.ok) {
        throw new Error('Failed to fetch drivers analytics');
      }
      const data = await response.json();
      return data?.byStatus ? data : EMPTY_ANALYTICS;
    } catch (error) {
      return EMPTY_ANALYTICS;
    }
  },

  // Get trucks table data with pagination
  async getTrucksTable(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<{ trucks: TruckTableData[]; pagination: PaginationInfo }> {
    try {
      const urlParams = new URLSearchParams();
      if (params.page) urlParams.append('page', params.page.toString());
      if (params.limit) urlParams.append('limit', params.limit.toString());
      if (params.search) urlParams.append('search', params.search);
      if (params.status) urlParams.append('status', params.status);
      if (params.sortBy) urlParams.append('sortBy', params.sortBy);
      if (params.sortOrder) urlParams.append('sortOrder', params.sortOrder);

      const url = `${API_BASE}/trucks/table${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
      const response = await fetch(url, { headers: getHeaders() });

      if (!response.ok) {
        throw new Error('Failed to fetch trucks table data');
      }
      const data = await response.json();
      return data?.trucks ? data : { trucks: [], pagination: EMPTY_PAGINATION };
    } catch (error) {
      return { trucks: [], pagination: EMPTY_PAGINATION };
    }
  },

  // Get drivers table data with pagination
  async getDriversTable(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<{ drivers: DriverTableData[]; pagination: PaginationInfo }> {
    try {
      const urlParams = new URLSearchParams();
      if (params.page) urlParams.append('page', params.page.toString());
      if (params.limit) urlParams.append('limit', params.limit.toString());
      if (params.search) urlParams.append('search', params.search);
      if (params.status) urlParams.append('status', params.status);
      if (params.sortBy) urlParams.append('sortBy', params.sortBy);
      if (params.sortOrder) urlParams.append('sortOrder', params.sortOrder);

      const url = `${API_BASE}/drivers/table${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
      const response = await fetch(url, { headers: getHeaders() });

      if (!response.ok) {
        throw new Error('Failed to fetch drivers table data');
      }
      const data = await response.json();
      return data?.drivers ? data : { drivers: [], pagination: EMPTY_PAGINATION };
    } catch (error) {
      return { drivers: [], pagination: EMPTY_PAGINATION };
    }
  },

  // Export trucks data
  async exportTrucks(status?: string): Promise<{ data: ExportData[] }> {
    try {
      const params = new URLSearchParams();
      if (status && status !== 'all') params.append('status', status);

      const url = `${API_BASE}/trucks/export${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url, { headers: getHeaders() });

      if (!response.ok) {
        throw new Error('Failed to export trucks data');
      }
      return response.json();
    } catch (error) {
      return { data: [] };
    }
  },

  // Export drivers data
  async exportDrivers(status?: string): Promise<{ data: ExportData[] }> {
    try {
      const params = new URLSearchParams();
      if (status && status !== 'all') params.append('status', status);

      const url = `${API_BASE}/drivers/export${params.toString() ? '?' + params.toString() : ''}`;
      const response = await fetch(url, { headers: getHeaders() });

      if (!response.ok) {
        throw new Error('Failed to export drivers data');
      }
      return response.json();
    } catch (error) {
      return { data: [] };
    }
  },
};

