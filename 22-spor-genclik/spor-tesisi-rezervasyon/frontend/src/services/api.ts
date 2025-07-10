import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: RegisterRequest) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

// Facility API
export const facilityAPI = {
  getAll: async () => {
    const response = await api.get('/facility');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/facility/${id}`);
    return response.data;
  },
  create: async (facilityData: CreateFacilityRequest) => {
    const response = await api.post('/facility', facilityData);
    return response.data;
  },
  update: async (id: number, facilityData: CreateFacilityRequest) => {
    const response = await api.put(`/facility/${id}`, facilityData);
    return response.data;
  },
  delete: async (id: number) => {
    const response = await api.delete(`/facility/${id}`);
    return response.data;
  },
  getByType: async (typeId: number) => {
    const response = await api.get(`/facility/type/${typeId}`);
    return response.data;
  },
  getTypes: async () => {
    const response = await api.get('/facility/types');
    return response.data;
  },
  checkAvailability: async (id: number, startTime: Date, endTime: Date) => {
    const response = await api.get(`/facility/${id}/availability`, {
      params: { startTime, endTime },
    });
    return response.data;
  },
};

// Reservation API
export const reservationAPI = {
  getAll: async () => {
    const response = await api.get('/reservation');
    return response.data;
  },
  getById: async (id: number) => {
    const response = await api.get(`/reservation/${id}`);
    return response.data;
  },
  create: async (reservationData: CreateReservationRequest) => {
    const response = await api.post('/reservation', reservationData);
    return response.data;
  },
  update: async (id: number, reservationData: CreateReservationRequest) => {
    const response = await api.put(`/reservation/${id}`, reservationData);
    return response.data;
  },
  cancel: async (id: number) => {
    const response = await api.delete(`/reservation/${id}`);
    return response.data;
  },
  getMyReservations: async () => {
    const response = await api.get('/reservation/my-reservations');
    return response.data;
  },
  getByFacility: async (facilityId: number) => {
    const response = await api.get(`/reservation/facility/${facilityId}`);
    return response.data;
  },
  getByDateRange: async (startDate: Date, endDate: Date) => {
    const response = await api.get('/reservation/date-range', {
      params: { startDate, endDate },
    });
    return response.data;
  },
  checkAvailability: async (facilityId: number, startTime: Date, endTime: Date) => {
    const response = await api.get('/reservation/availability', {
      params: { facilityId, startTime, endTime },
    });
    return response.data;
  },
};

// User API
export const userAPI = {
  getAll: async () => {
    const response = await api.get('/user');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },
  updateProfile: async (userData: RegisterRequest) => {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },
  updateUser: async (id: string, userData: RegisterRequest) => {
    const response = await api.put(`/user/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  },
};

// Type definitions
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  identityNumber?: string;
  address?: string;
  dateOfBirth: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateFacilityRequest {
  name: string;
  description?: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  capacity: number;
  hourlyRate: number;
  facilityTypeId: number;
}

export interface CreateReservationRequest {
  facilityId: number;
  startTime: Date;
  endTime: Date;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  identityNumber?: string;
  address?: string;
  dateOfBirth?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Facility {
  id: number;
  name: string;
  description?: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  capacity: number;
  hourlyRate: number;
  facilityTypeId: number;
  facilityType?: FacilityType;
}

export interface FacilityType {
  id: number;
  name: string;
  description?: string;
}

export interface Reservation {
  id: number;
  facilityId: number;
  userId: string;
  startTime: Date;
  endTime: Date;
  notes?: string;
  status: string;
  facility?: Facility;
  user?: User;
}

export default api; 