import axios, { AxiosError } from 'axios';
import { AuthResponse, LoginData, RegisterData, Dataset, CreateDataset, DataPoint, CreateDataPoint, ApiError } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'https://localhost:43787/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: ((error.response?.data as any)?.message) || error.message || 'Bir hata oluştu',
      status: error.response?.status,
    };
    
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-user');
      window.location.href = '/Login';
    }
    
    return Promise.reject(apiError);
  }
);

// Auth API
export const authAPI = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/Auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/Auth/register', data);
    return response.data;
  },
};

// Dataset API
export const datasetAPI = {
  getAll: async (): Promise<Dataset[]> => {
    const response = await api.get('/Datasets');
    return response.data;
  },

  getById: async (id: number): Promise<Dataset> => {
    const response = await api.get(`/Datasets/${id}`);
    return response.data;
  },

  create: async (data: CreateDataset): Promise<Dataset> => {
    const response = await api.post('/Datasets', data);
    return response.data;
  },

  getData: async (
    id: number,
    params?: {
      startDate?: string;
      endDate?: string;
      category?: string;
    }
  ): Promise<DataPoint[]> => {
    const response = await api.get(`/Datasets/${id}/data`, { params });
    return response.data;
  },

  addDataPoint: async (id: number, data: CreateDataPoint): Promise<DataPoint> => {
    const response = await api.post(`/Datasets/${id}/data`, data);
    return response.data;
  },

  update: async (id: number, data: CreateDataset): Promise<Dataset> => {
    const response = await api.put(`/Datasets/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/Datasets/${id}`);
  },

  updateDataPoint: async (datasetId: number, dataPointId: number, data: CreateDataPoint): Promise<DataPoint> => {
    const response = await api.put(`/Datasets/${datasetId}/data/${dataPointId}`, data);
    return response.data;
  },

  deleteDataPoint: async (datasetId: number, dataPointId: number): Promise<void> => {
    await api.delete(`/Datasets/${datasetId}/data/${dataPointId}`);
  },

  upload: async (data: { name: string; description: string; isPublic: boolean; file: File }): Promise<any> => {
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Description', data.description);
    formData.append('IsPublic', String(data.isPublic));
    formData.append('file', data.file);
    const response = await api.post('/Datasets/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export const userAPI = {
  getUserCount: async (): Promise<number> => {
    const response = await api.get('/Auth/count');
    return response.data;
  },
};

export default api; 