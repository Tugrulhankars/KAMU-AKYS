import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User, 
  Camp, 
  Participant, 
  Activity, 
  Registration,
  CreateCampRequest,
  UpdateCampRequest,
  CreateParticipantRequest,
  UpdateParticipantRequest,
  CreateActivityRequest,
  UpdateActivityRequest,
  CreateRegistrationRequest,
  UpdateRegistrationRequest,
  CampStatistics,
  RegistrationStatistics,
  PaginatedResponse
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - token ekleme
    this.api.interceptors.request.use(
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
    this.api.interceptors.response.use(
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
  }

  // Auth Services
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login', data);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/register', data);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/auth/me');
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.api.post('/auth/change-password', { currentPassword, newPassword });
  }

  async logout(): Promise<void> {
    await this.api.post('/auth/logout');
  }

  // User Services
  async getUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await this.api.get('/user');
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get(`/user/${id}`);
    return response.data;
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    const response: AxiosResponse<User> = await this.api.post('/user', data);
    return response.data;
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response: AxiosResponse<User> = await this.api.put(`/user/${id}`, data);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.api.delete(`/user/${id}`);
  }

  async activateUser(id: string): Promise<void> {
    await this.api.post(`/user/${id}/activate`);
  }

  async deactivateUser(id: string): Promise<void> {
    await this.api.post(`/user/${id}/deactivate`);
  }

  // Camp Services
  async getCamps(): Promise<Camp[]> {
    const response: AxiosResponse<Camp[]> = await this.api.get('/camp');
    return response.data;
  }

  async getActiveCamps(): Promise<Camp[]> {
    const response: AxiosResponse<Camp[]> = await this.api.get('/camp/active');
    return response.data;
  }

  async getUpcomingCamps(): Promise<Camp[]> {
    const response: AxiosResponse<Camp[]> = await this.api.get('/camp/upcoming');
    return response.data;
  }

  async getOngoingCamps(): Promise<Camp[]> {
    const response: AxiosResponse<Camp[]> = await this.api.get('/camp/ongoing');
    return response.data;
  }

  async getCampById(id: number): Promise<Camp> {
    const response: AxiosResponse<Camp> = await this.api.get(`/camp/${id}`);
    return response.data;
  }

  async createCamp(data: CreateCampRequest): Promise<Camp> {
    const response: AxiosResponse<Camp> = await this.api.post('/camp', data);
    return response.data;
  }

  async updateCamp(id: number, data: UpdateCampRequest): Promise<Camp> {
    const response: AxiosResponse<Camp> = await this.api.put(`/camp/${id}`, data);
    return response.data;
  }

  async deleteCamp(id: number): Promise<void> {
    await this.api.delete(`/camp/${id}`);
  }

  async activateCamp(id: number): Promise<void> {
    await this.api.post(`/camp/${id}/activate`);
  }

  async deactivateCamp(id: number): Promise<void> {
    await this.api.post(`/camp/${id}/deactivate`);
  }

  async getCampStatistics(): Promise<CampStatistics> {
    const response: AxiosResponse<CampStatistics> = await this.api.get('/camp/statistics');
    return response.data;
  }

  async uploadCampPhoto(id: number, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response: AxiosResponse<{ photoPath: string }> = await this.api.post(`/camp/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.photoPath;
  }

  async uploadCampBrochure(id: number, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response: AxiosResponse<{ brochurePath: string }> = await this.api.post(`/camp/${id}/brochure`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.brochurePath;
  }

  // Participant Services
  async getParticipants(): Promise<Participant[]> {
    const response: AxiosResponse<Participant[]> = await this.api.get('/participant');
    return response.data;
  }

  async getParticipantById(id: number): Promise<Participant> {
    const response: AxiosResponse<Participant> = await this.api.get(`/participant/${id}`);
    return response.data;
  }

  async createParticipant(data: CreateParticipantRequest): Promise<Participant> {
    const response: AxiosResponse<Participant> = await this.api.post('/participant', data);
    return response.data;
  }

  async updateParticipant(id: number, data: UpdateParticipantRequest): Promise<Participant> {
    const response: AxiosResponse<Participant> = await this.api.put(`/participant/${id}`, data);
    return response.data;
  }

  async deleteParticipant(id: number): Promise<void> {
    await this.api.delete(`/participant/${id}`);
  }

  async searchParticipants(searchTerm: string): Promise<Participant[]> {
    const response: AxiosResponse<Participant[]> = await this.api.get(`/participant/search?q=${searchTerm}`);
    return response.data;
  }

  // Activity Services
  async getActivities(): Promise<Activity[]> {
    const response: AxiosResponse<Activity[]> = await this.api.get('/activity');
    return response.data;
  }

  async getActivityById(id: number): Promise<Activity> {
    const response: AxiosResponse<Activity> = await this.api.get(`/activity/${id}`);
    return response.data;
  }

  async createActivity(data: CreateActivityRequest): Promise<Activity> {
    const response: AxiosResponse<Activity> = await this.api.post('/activity', data);
    return response.data;
  }

  async updateActivity(id: number, data: UpdateActivityRequest): Promise<Activity> {
    const response: AxiosResponse<Activity> = await this.api.put(`/activity/${id}`, data);
    return response.data;
  }

  async deleteActivity(id: number): Promise<void> {
    await this.api.delete(`/activity/${id}`);
  }

  // Registration Services
  async getRegistrations(): Promise<Registration[]> {
    const response: AxiosResponse<Registration[]> = await this.api.get('/registration');
    return response.data;
  }

  async getRegistrationById(id: number): Promise<Registration> {
    const response: AxiosResponse<Registration> = await this.api.get(`/registration/${id}`);
    return response.data;
  }

  async createRegistration(data: CreateRegistrationRequest): Promise<Registration> {
    const response: AxiosResponse<Registration> = await this.api.post('/registration', data);
    return response.data;
  }

  async updateRegistration(id: number, data: UpdateRegistrationRequest): Promise<Registration> {
    const response: AxiosResponse<Registration> = await this.api.put(`/registration/${id}`, data);
    return response.data;
  }

  async deleteRegistration(id: number): Promise<void> {
    await this.api.delete(`/registration/${id}`);
  }

  async cancelRegistration(id: number, reason: string): Promise<void> {
    await this.api.post(`/registration/${id}/cancel`, { reason });
  }

  async checkInRegistration(id: number, data: any): Promise<void> {
    await this.api.post(`/registration/${id}/checkin`, data);
  }

  async checkOutRegistration(id: number, data: any): Promise<void> {
    await this.api.post(`/registration/${id}/checkout`, data);
  }

  async getRegistrationStatistics(): Promise<RegistrationStatistics> {
    const response: AxiosResponse<RegistrationStatistics> = await this.api.get('/registration/statistics');
    return response.data;
  }

  // File Upload Service
  async uploadFile(file: File, folder: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response: AxiosResponse<{ filePath: string }> = await this.api.post(`/file/upload/${folder}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.filePath;
  }

  // Download Service
  async downloadFile(filePath: string): Promise<Blob> {
    const response: AxiosResponse<Blob> = await this.api.get(`/file/download?path=${filePath}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export const apiService = new ApiService(); 