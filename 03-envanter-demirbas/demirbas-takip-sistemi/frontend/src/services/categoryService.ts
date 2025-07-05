import { apiService } from './api';
import { Category, CreateCategoryRequest } from '../types';

class CategoryService {
  async getCategories(): Promise<Category[]> {
    return await apiService.get<Category[]>('/categories');
  }

  async getCategory(id: number): Promise<Category> {
    return await apiService.get<Category>(`/categories/${id}`);
  }

  async createCategory(category: CreateCategoryRequest): Promise<Category> {
    return await apiService.post<Category>('/categories', category);
  }

  async updateCategory(id: number, category: CreateCategoryRequest): Promise<Category> {
    return await apiService.put<Category>(`/categories/${id}`, category);
  }

  async deleteCategory(id: number): Promise<void> {
    return await apiService.delete<void>(`/categories/${id}`);
  }
}

export const categoryService = new CategoryService(); 