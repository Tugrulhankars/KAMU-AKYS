import { apiService } from './api';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../types';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return await apiService.post<LoginResponse>('/Auth/login', credentials);
  }

  async register(userData: RegisterRequest): Promise<void> {
    return await apiService.post<void>('/Auth/register', userData);
  }

  async getCurrentUser(): Promise<User> {
    // Token'dan user ID'sini çıkar ve user bilgilerini getir
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.nameid || payload.sub;
      
      if (!userId) {
        throw new Error('Token geçersiz');
      }

      return await apiService.get<User>(`/users/${userId}`);
    } catch (error) {
      throw new Error('Token çözümlenemedi');
    }
  }

  async refreshToken(): Promise<string> {
    // Refresh token implementasyonu (isteğe bağlı)
    throw new Error('Refresh token henüz implement edilmedi');
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < exp;
    } catch {
      return false;
    }
  }

  getTokenExpiry(): Date | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService(); 