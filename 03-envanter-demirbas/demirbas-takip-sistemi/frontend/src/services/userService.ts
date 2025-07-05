import { apiService } from './api';
import { User, UserRole } from '../types';

class UserService {
  async getUsers(): Promise<User[]> {
    return await apiService.get<User[]>('/users');
  }

  async getUser(id: number): Promise<User> {
    return await apiService.get<User>(`/users/${id}`);
  }

  async activateUser(id: number): Promise<void> {
    return await apiService.put<void>(`/users/${id}/activate`);
  }

  async deactivateUser(id: number): Promise<void> {
    return await apiService.put<void>(`/users/${id}/deactivate`);
  }

  async deleteUser(id: number): Promise<void> {
    return await apiService.delete<void>(`/users/${id}`);
  }

  getRoleText(role: UserRole): string {
    switch (role) {
      case UserRole.Admin:
        return 'Yönetici';
      case UserRole.Personel:
        return 'Personel';
      default:
        return 'Bilinmiyor';
    }
  }

  getRoleColor(role: UserRole): string {
    switch (role) {
      case UserRole.Admin:
        return 'text-purple-600 bg-purple-100';
      case UserRole.Personel:
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }
}

export const userService = new UserService(); 