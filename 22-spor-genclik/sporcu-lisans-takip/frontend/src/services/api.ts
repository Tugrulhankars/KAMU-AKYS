import axios from 'axios';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  CreateAthleteRequest,
  UpdateAthleteRequest,
  AthleteDto,
  AthleteListDto,
  CreateLicenseRequest,
  UpdateLicenseRequest,
  LicenseRenewalRequest,
  LicenseDto,
  LicenseListDto,
  LicenseStatisticsDto,
  CreateSportRequest,
  UpdateSportRequest,
  SportDto,
  SportListDto,
  CreateClubRequest,
  UpdateClubRequest,
  ClubDto,
  ClubListDto,
  UserDto
} from '../types';

const API_BASE_URL = '/api';

// Axios instance
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

// Response interceptor - Token yenileme ve hata yönetimi
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
  login: (data: LoginRequest): Promise<AuthResponse> =>
    api.post('/auth/login', data).then(res => res.data),
  
  register: (data: RegisterRequest): Promise<AuthResponse> =>
    api.post('/auth/register', data).then(res => res.data),
  
  changePassword: (data: { currentPassword: string; newPassword: string }): Promise<void> =>
    api.post('/auth/change-password', data).then(res => res.data),
};

// User API
export const userAPI = {
  getAll: (): Promise<UserDto[]> =>
    api.get('/user').then(res => res.data),
  
  getById: (id: string): Promise<UserDto> =>
    api.get(`/user/${id}`).then(res => res.data),
  
  getByEmail: (email: string): Promise<UserDto> =>
    api.get(`/user/email/${email}`).then(res => res.data),
  
  update: (id: string, data: UserDto): Promise<void> =>
    api.put(`/user/${id}`, data).then(res => res.data),
  
  deactivate: (id: string): Promise<void> =>
    api.post(`/user/${id}/deactivate`).then(res => res.data),
  
  activate: (id: string): Promise<void> =>
    api.post(`/user/${id}/activate`).then(res => res.data),
  
  changePassword: (data: { currentPassword: string; newPassword: string }): Promise<void> =>
    api.post('/user/change-password', data).then(res => res.data),
};

// Athlete API
export const athleteAPI = {
  getAll: (): Promise<AthleteListDto[]> =>
    api.get('/athlete').then(res => res.data),
  
  getById: (id: number): Promise<AthleteDto> =>
    api.get(`/athlete/${id}`).then(res => res.data),
  
  getByIdentityNumber: (identityNumber: string): Promise<AthleteDto> =>
    api.get(`/athlete/identity/${identityNumber}`).then(res => res.data),
  
  getByClub: (clubId: number): Promise<AthleteListDto[]> =>
    api.get(`/athlete/club/${clubId}`).then(res => res.data),
  
  search: (term: string): Promise<AthleteListDto[]> =>
    api.get(`/athlete/search?term=${term}`).then(res => res.data),
  
  create: (data: CreateAthleteRequest): Promise<AthleteDto> =>
    api.post('/athlete', data).then(res => res.data),
  
  update: (id: number, data: UpdateAthleteRequest): Promise<AthleteDto> =>
    api.put(`/athlete/${id}`, data).then(res => res.data),
  
  delete: (id: number): Promise<void> =>
    api.delete(`/athlete/${id}`).then(res => res.data),
  
  deactivate: (id: number): Promise<void> =>
    api.post(`/athlete/${id}/deactivate`).then(res => res.data),
  
  activate: (id: number): Promise<void> =>
    api.post(`/athlete/${id}/activate`).then(res => res.data),
  
  uploadPhoto: (id: number, file: File): Promise<{ photoPath: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/athlete/${id}/photo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },
};

// License API
export const licenseAPI = {
  getAll: (): Promise<LicenseListDto[]> =>
    api.get('/license').then(res => res.data),
  
  getById: (id: number): Promise<LicenseDto> =>
    api.get(`/license/${id}`).then(res => res.data),
  
  getByNumber: (licenseNumber: string): Promise<LicenseDto> =>
    api.get(`/license/number/${licenseNumber}`).then(res => res.data),
  
  getByAthlete: (athleteId: number): Promise<LicenseListDto[]> =>
    api.get(`/license/athlete/${athleteId}`).then(res => res.data),
  
  getBySport: (sportId: number): Promise<LicenseListDto[]> =>
    api.get(`/license/sport/${sportId}`).then(res => res.data),
  
  getExpired: (): Promise<LicenseListDto[]> =>
    api.get('/license/expired').then(res => res.data),
  
  getExpiringSoon: (): Promise<LicenseListDto[]> =>
    api.get('/license/expiring-soon').then(res => res.data),
  
  getStatistics: (): Promise<LicenseStatisticsDto> =>
    api.get('/license/statistics').then(res => res.data),
  
  create: (data: CreateLicenseRequest): Promise<LicenseDto> =>
    api.post('/license', data).then(res => res.data),
  
  update: (id: number, data: UpdateLicenseRequest): Promise<LicenseDto> =>
    api.put(`/license/${id}`, data).then(res => res.data),
  
  renew: (data: LicenseRenewalRequest): Promise<LicenseDto> =>
    api.post('/license/renew', data).then(res => res.data),
  
  suspend: (id: number, reason: string): Promise<void> =>
    api.post(`/license/${id}/suspend`, { reason }).then(res => res.data),
  
  cancel: (id: number, reason: string): Promise<void> =>
    api.post(`/license/${id}/cancel`, { reason }).then(res => res.data),
  
  delete: (id: number): Promise<void> =>
    api.delete(`/license/${id}`).then(res => res.data),
  
  downloadPdf: (id: number): Promise<Blob> =>
    api.get(`/license/${id}/pdf`, { responseType: 'blob' }).then(res => res.data),
  
  getQrCode: (id: number): Promise<{ qrCode: string }> =>
    api.get(`/license/${id}/qr-code`).then(res => res.data),
};

// Sport API
export const sportAPI = {
  getAll: (): Promise<SportListDto[]> =>
    api.get('/sport').then(res => res.data),
  
  getById: (id: number): Promise<SportDto> =>
    api.get(`/sport/${id}`).then(res => res.data),
  
  create: (data: CreateSportRequest): Promise<SportDto> =>
    api.post('/sport', data).then(res => res.data),
  
  update: (id: number, data: UpdateSportRequest): Promise<SportDto> =>
    api.put(`/sport/${id}`, data).then(res => res.data),
  
  delete: (id: number): Promise<void> =>
    api.delete(`/sport/${id}`).then(res => res.data),
  
  deactivate: (id: number): Promise<void> =>
    api.post(`/sport/${id}/deactivate`).then(res => res.data),
  
  activate: (id: number): Promise<void> =>
    api.post(`/sport/${id}/activate`).then(res => res.data),
  
  uploadIcon: (id: number, file: File): Promise<{ iconPath: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/sport/${id}/icon`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },
};

// Club API
export const clubAPI = {
  getAll: (): Promise<ClubListDto[]> =>
    api.get('/club').then(res => res.data),
  
  getById: (id: number): Promise<ClubDto> =>
    api.get(`/club/${id}`).then(res => res.data),
  
  search: (term: string): Promise<ClubListDto[]> =>
    api.get(`/club/search?term=${term}`).then(res => res.data),
  
  create: (data: CreateClubRequest): Promise<ClubDto> =>
    api.post('/club', data).then(res => res.data),
  
  update: (id: number, data: UpdateClubRequest): Promise<ClubDto> =>
    api.put(`/club/${id}`, data).then(res => res.data),
  
  delete: (id: number): Promise<void> =>
    api.delete(`/club/${id}`).then(res => res.data),
  
  deactivate: (id: number): Promise<void> =>
    api.post(`/club/${id}/deactivate`).then(res => res.data),
  
  activate: (id: number): Promise<void> =>
    api.post(`/club/${id}/activate`).then(res => res.data),
  
  uploadLogo: (id: number, file: File): Promise<{ logoPath: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/club/${id}/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },
};

export default api; 