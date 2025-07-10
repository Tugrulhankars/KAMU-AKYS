import axios, { AxiosResponse } from 'axios';
import type {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
  City,
  CreateCity,
  District,
  CreateDistrict,
  Household,
  UpdateHousehold,
  Person,
  UpdatePerson,
  Statistics,
  PersonSearchParams,
  PeopleFilters,
  HouseholdFilters,
  CreateHousehold,
  CreatePerson,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7149';

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-user');
      window.location.href = '/Login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data: LoginData): Promise<AxiosResponse<{ success: boolean; token: string; user: User; message?: string }>> =>
    api.post('/Auth/login', data),

  register: (data: RegisterData): Promise<AxiosResponse<{ success: boolean; token: string; user: User; message?: string }>> =>
    api.post('/Auth/register', data),

  getCurrentUser: (): Promise<AxiosResponse<User>> =>
    api.get('/Auth/me'),
};

// Cities API
export const citiesAPI = {
  getAll: (): Promise<AxiosResponse<City[]>> =>
    api.get('/Cities'),

  getById: (id: number): Promise<AxiosResponse<City>> =>
    api.get(`/Cities/${id}`),

  create: (data: CreateCity): Promise<AxiosResponse<City>> =>
    api.post('/Cities', data),

  update: (id: number, data: CreateCity): Promise<AxiosResponse<City>> =>
    api.put(`/Cities/${id}`, data),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/Cities/${id}`),
};

// Districts API
export const districtsAPI = {
  getAll: (): Promise<AxiosResponse<District[]>> =>
    api.get('/Districts'),

  getById: (id: number): Promise<AxiosResponse<District>> =>
    api.get(`/Districts/${id}`),

  getByCityId: (cityId: number): Promise<AxiosResponse<District[]>> =>
    api.get(`/Districts/city/${cityId}`),

  create: (data: Omit<District, 'id'>): Promise<AxiosResponse<District>> =>
    api.post('/Districts', data),

  update: (id: number, data: Omit<District, 'id'>): Promise<AxiosResponse<District>> =>
    api.put(`/Districts/${id}`, data),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/Districts/${id}`),
};

// Households API
export const householdsAPI = {
  getAll: (page = 1, pageSize = 10, search?: string): Promise<AxiosResponse<{ items: Household[]; totalCount: number; pageCount: number }>> =>
    api.get('/Households', { params: { page, pageSize, search } }),

  getById: (id: number): Promise<AxiosResponse<Household>> =>
    api.get(`/Households/${id}`),

  getByDistrictId: (districtId: number): Promise<AxiosResponse<Household[]>> =>
    api.get(`/Households/district/${districtId}`),

  create: (data: CreateHousehold): Promise<AxiosResponse<Household>> =>
    api.post('/Households', data),

  update: (id: number, data: CreateHousehold): Promise<AxiosResponse<Household>> =>
    api.put(`/Households/${id}`, data),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/Households/${id}`),
};

// People API
export const peopleAPI = {
  getAll: (page = 1, pageSize = 10, search?: string): Promise<AxiosResponse<{ items: Person[]; totalCount: number; pageCount: number }>> =>
    api.get('/People', { params: { page, pageSize, search } }),

  getById: (id: number): Promise<AxiosResponse<Person>> =>
    api.get(`/People/${id}`),

  getByHouseholdId: (householdId: number): Promise<AxiosResponse<Person[]>> =>
    api.get(`/People/household/${householdId}`),

  create: (data: CreatePerson): Promise<AxiosResponse<Person>> =>
    api.post('/People', data),

  update: (id: number, data: CreatePerson): Promise<AxiosResponse<Person>> =>
    api.put(`/People/${id}`, data),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/People/${id}`),
};

// Statistics API
export const statisticsAPI = {
  getOverall: (): Promise<AxiosResponse<{
    totalPeople: number
    totalHouseholds: number
    totalCities: number
    totalDistricts: number
    avgPeoplePerHousehold: number
  }>> =>
    api.get('/Statistics/overall'),

  getDemographics: (): Promise<AxiosResponse<{
    ageGroups: Array<{ ageGroup: string; count: number }>
    genderDistribution: Array<{ gender: string; count: number }>
    cityDistribution: Array<{ cityName: string; count: number }>
    districtDistribution: Array<{ districtName: string; count: number }>
  }>> =>
    api.get('/Statistics/demographics'),

  getGrowthStats: (): Promise<AxiosResponse<{
    monthlyGrowth: Array<{ month: string; people: number; households: number }>
    dailyStats: Array<{ date: string; newPeople: number; newHouseholds: number }>
  }>> =>
    api.get('/Statistics/growth'),

  // Yeni istatistik endpoint'leri
  getGenel: (): Promise<AxiosResponse<{
    toplamNufus: number
    toplamHanehalkı: number
    toplamSehir: number
    toplamIlce: number
  }>> =>
    api.get('/Statistics/genel'),

  getSehirDagilimi: (): Promise<AxiosResponse<Array<{
    sehirAdi: string
    nufusSayisi: number
    hanehalkiSayisi: number
  }>>> =>
    api.get('/Statistics/sehir-dagilimi'),

  getYasDagilimi: (): Promise<AxiosResponse<Array<{
    yasAraligi: string
    kisiSayisi: number
  }>>> =>
    api.get('/Statistics/yas-dagilimi'),

  getCinsiyetDagilimi: (): Promise<AxiosResponse<Array<{
    cinsiyet: string
    kisiSayisi: number
  }>>> =>
    api.get('/Statistics/cinsiyet-dagilimi'),

  // Dışa aktarma fonksiyonları
  exportToCsv: (type: 'genel' | 'sehir' | 'yas' | 'cinsiyet'): Promise<AxiosResponse<Blob>> =>
    api.get(`/Statistics/export/csv?type=${type}`, { responseType: 'blob' }),

  exportToJson: (type: 'genel' | 'sehir' | 'yas' | 'cinsiyet'): Promise<AxiosResponse<Blob>> =>
    api.get(`/Statistics/export/json?type=${type}`, { responseType: 'blob' }),

  exportToReport: (): Promise<AxiosResponse<Blob>> =>
    api.get('/Statistics/export/rapor', { responseType: 'blob' }),
};

export default api; 