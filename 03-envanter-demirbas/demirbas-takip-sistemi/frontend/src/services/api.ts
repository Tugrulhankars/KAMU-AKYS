import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'https://localhost:55165/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - token ekle
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
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Unauthorized - logout
          localStorage.removeItem('token');
          window.location.href = '/login';
          toast.error('Oturum süreniz doldu. Lütfen tekrar giriş yapın.');
        } else if (error.response?.status === 403) {
          toast.error('Bu işlem için yetkiniz bulunmuyor.');
        } else if (error.response?.status >= 500) {
          toast.error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
        
        return Promise.reject(error);
      }
    );
  }

  // GET request
  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.api.get<T>(url, { params });
    return response.data;
  }

  // POST request
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.post<T>(url, data);
    return response.data;
  }

  // PUT request
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.put<T>(url, data);
    return response.data;
  }

  // DELETE request
  async delete<T>(url: string): Promise<T> {
    const response = await this.api.delete<T>(url);
    return response.data;
  }

  // PATCH request
  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.api.patch<T>(url, data);
    return response.data;
  }
}

export const apiService = new ApiService(); 