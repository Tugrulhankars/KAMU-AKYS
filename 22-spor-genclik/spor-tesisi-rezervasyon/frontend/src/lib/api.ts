import axios from 'axios';
import { 
  User, 
  Facility, 
  FacilityType, 
  Reservation, 
  LoginRequest, 
  RegisterRequest, 
  CreateReservationRequest, 
  CreateFacilityRequest,
  AuthResponse 
} from '@/types';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - JWT token ekleme
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

// Response interceptor - Hata yönetimi
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
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<{ message: string }> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  updateProfile: async (data: RegisterRequest): Promise<{ message: string }> => {
    const response = await api.put('/user/profile', data);
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/user');
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await api.get(`/user/${id}`);
    return response.data;
  },

  updateUser: async (id: string, data: RegisterRequest): Promise<{ message: string }> => {
    const response = await api.put(`/user/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  },
};

// Facility API
export const facilityAPI = {
  getAllFacilities: async (): Promise<Facility[]> => {
    const response = await api.get('/facility');
    return response.data;
  },

  getFacilityById: async (id: number): Promise<Facility> => {
    const response = await api.get(`/facility/${id}`);
    return response.data;
  },

  createFacility: async (data: CreateFacilityRequest): Promise<Facility> => {
    const response = await api.post('/facility', data);
    return response.data;
  },

  updateFacility: async (id: number, data: CreateFacilityRequest): Promise<{ message: string }> => {
    const response = await api.put(`/facility/${id}`, data);
    return response.data;
  },

  deleteFacility: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/facility/${id}`);
    return response.data;
  },

  getFacilitiesByType: async (typeId: number): Promise<Facility[]> => {
    const response = await api.get(`/facility/type/${typeId}`);
    return response.data;
  },

  getAllFacilityTypes: async (): Promise<FacilityType[]> => {
    const response = await api.get('/facility/types');
    return response.data;
  },

  checkAvailability: async (id: number, startTime: string, endTime: string): Promise<{ isAvailable: boolean }> => {
    const response = await api.get(`/facility/${id}/availability`, {
      params: { startTime, endTime }
    });
    return response.data;
  },
};

// Reservation API
export const reservationAPI = {
  getAllReservations: async (): Promise<Reservation[]> => {
    const response = await api.get('/reservation');
    return response.data;
  },

  getReservationById: async (id: number): Promise<Reservation> => {
    const response = await api.get(`/reservation/${id}`);
    return response.data;
  },

  createReservation: async (data: CreateReservationRequest): Promise<Reservation> => {
    const response = await api.post('/reservation', data);
    return response.data;
  },

  updateReservation: async (id: number, data: CreateReservationRequest): Promise<{ message: string }> => {
    const response = await api.put(`/reservation/${id}`, data);
    return response.data;
  },

  cancelReservation: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/reservation/${id}`);
    return response.data;
  },

  getMyReservations: async (): Promise<Reservation[]> => {
    const response = await api.get('/reservation/my-reservations');
    return response.data;
  },

  getReservationsByFacility: async (facilityId: number): Promise<Reservation[]> => {
    const response = await api.get(`/reservation/facility/${facilityId}`);
    return response.data;
  },

  getReservationsByDateRange: async (startDate: string, endDate: string): Promise<Reservation[]> => {
    const response = await api.get('/reservation/date-range', {
      params: { startDate, endDate }
    });
    return response.data;
  },

  checkTimeSlotAvailability: async (facilityId: number, startTime: string, endTime: string): Promise<{ isAvailable: boolean }> => {
    const response = await api.get('/reservation/availability', {
      params: { facilityId, startTime, endTime }
    });
    return response.data;
  },
};

export default api; 