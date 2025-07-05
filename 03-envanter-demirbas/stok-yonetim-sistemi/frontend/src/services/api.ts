/// <reference types="vite/client" />

import axios, { AxiosResponse } from 'axios';
import {
  ApiResponse,
  PagedResult,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  Product,
  CreateProduct,
  UpdateProduct,
  ProductFilter,
  Category,
  CreateCategory,
  UpdateCategory,
  StockTransaction,
  CreateStockTransaction,
  BarcodeTransaction,
  StockTransactionFilter,
  DashboardStats,
  ChangePasswordRequest,
  UpdateStockRequest,
  TransactionSummary,
  CategoryDistribution,
  MonthlyTransaction
} from '../types';

// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:64672/api';

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function for API responses
const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> => {
  return response.data;
};

// Auth API
export const authApi = {
  login: async (credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/Auth/login', credentials);
    return handleResponse(response);
  },

  register: async (userData: RegisterRequest): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>('/Auth/register', userData);
    return handleResponse(response);
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>('/Users/current');
    return handleResponse(response);
  },

  changePassword: async (passwordData: ChangePasswordRequest): Promise<ApiResponse<boolean>> => {
    const response = await api.put<ApiResponse<boolean>>('/Users/change-password', passwordData);
    return handleResponse(response);
  },

  updateProfile: async (profileData: { firstName: string; lastName: string; email: string }): Promise<ApiResponse<User>> => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (!user || !user.id) throw new Error('Kullanıcı bulunamadı');
    const response = await api.put<ApiResponse<User>>(`/Users/${user.id}`, {
      ...profileData,
      role: user.role,
      isActive: user.isActive,
    });
    return handleResponse(response);
  },
};

// Products API
export const productsApi = {
  getProducts: async (filter: ProductFilter): Promise<ApiResponse<PagedResult<Product>>> => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    const response = await api.get<ApiResponse<PagedResult<Product>>>(`/Products?${params}`);
    return handleResponse(response);
  },

  getProduct: async (id: number): Promise<ApiResponse<Product>> => {
    const response = await api.get<ApiResponse<Product>>(`/Products/${id}`);
    return handleResponse(response);
  },

  createProduct: async (productData: CreateProduct): Promise<ApiResponse<Product>> => {
    const response = await api.post<ApiResponse<Product>>('/Products', productData);
    return handleResponse(response);
  },

  updateProduct: async (id: number, productData: UpdateProduct): Promise<ApiResponse<Product>> => {
    const response = await api.put<ApiResponse<Product>>(`/Products/${id}`, productData);
    return handleResponse(response);
  },

  deleteProduct: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await api.delete<ApiResponse<boolean>>(`/Products/${id}`);
    return handleResponse(response);
  },

  getCriticalStockProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get<ApiResponse<Product[]>>('/Products/critical-stock');
    return handleResponse(response);
  },

  updateStock: async (id: number, stockData: UpdateStockRequest): Promise<ApiResponse<Product>> => {
    const response = await api.post<ApiResponse<Product>>(`/Products/${id}/update-stock`, stockData);
    return handleResponse(response);
  },
};

// Categories API
export const categoriesApi = {
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get<ApiResponse<Category[]>>('/Categories');
    return handleResponse(response);
  },

  getActiveCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get<ApiResponse<Category[]>>('/Categories/active');
    return handleResponse(response);
  },

  getCategory: async (id: number): Promise<ApiResponse<Category>> => {
    const response = await api.get<ApiResponse<Category>>(`/Categories/${id}`);
    return handleResponse(response);
  },

  createCategory: async (categoryData: CreateCategory): Promise<ApiResponse<Category>> => {
    const response = await api.post<ApiResponse<Category>>('/Categories', categoryData);
    return handleResponse(response);
  },

  updateCategory: async (id: number, categoryData: UpdateCategory): Promise<ApiResponse<Category>> => {
    const response = await api.put<ApiResponse<Category>>(`/Categories/${id}`, categoryData);
    return handleResponse(response);
  },

  deleteCategory: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await api.delete<ApiResponse<boolean>>(`/Categories/${id}`);
    return handleResponse(response);
  },
};

// Stock Transactions API
export const stockTransactionsApi = {
  getStockTransactions: async (filter: StockTransactionFilter): Promise<ApiResponse<PagedResult<StockTransaction>>> => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString());
      }
    });
    const response = await api.get<ApiResponse<PagedResult<StockTransaction>>>(`/Stocktransactions?${params}`);
    return handleResponse(response);
  },

  getStockTransaction: async (id: number): Promise<ApiResponse<StockTransaction>> => {
    const response = await api.get<ApiResponse<StockTransaction>>(`/Stocktransactions/${id}`);
    return handleResponse(response);
  },

  createStockTransaction: async (transactionData: CreateStockTransaction): Promise<ApiResponse<StockTransaction>> => {
    const response = await api.post<ApiResponse<StockTransaction>>('/Stocktransactions', transactionData);
    return handleResponse(response);
  },

  createBarcodeTransaction: async (transactionData: BarcodeTransaction): Promise<ApiResponse<StockTransaction>> => {
    const response = await api.post<ApiResponse<StockTransaction>>('/Stocktransactions/barcode', transactionData);
    return handleResponse(response);
  },

  getProductTransactions: async (productId: number): Promise<ApiResponse<StockTransaction[]>> => {
    const response = await api.get<ApiResponse<StockTransaction[]>>(`/Stocktransactions/product/${productId}`);
    return handleResponse(response);
  },

  getTransactionSummary: async (): Promise<ApiResponse<TransactionSummary>> => {
    const response = await api.get<ApiResponse<TransactionSummary>>('/Stocktransactions/summary');
    return handleResponse(response);
  },
};

// Users API
export const usersApi = {
  getUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get<ApiResponse<User[]>>('/Users');
    return handleResponse(response);
  },

  getUser: async (id: number): Promise<ApiResponse<User>> => {
    const response = await api.get<ApiResponse<User>>(`/Users/${id}`);
    return handleResponse(response);
  },

  createUser: async (userData: RegisterRequest): Promise<ApiResponse<User>> => {
    const response = await api.post<ApiResponse<User>>('/Users', userData);
    return handleResponse(response);
  },

  updateUser: async (id: number, userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put<ApiResponse<User>>(`/Users/${id}`, userData);
    return handleResponse(response);
  },

  deleteUser: async (id: number): Promise<ApiResponse<boolean>> => {
    const response = await api.delete<ApiResponse<boolean>>(`/Users/${id}`);
    return handleResponse(response);
  },

  getUserStatistics: async (): Promise<ApiResponse<object>> => {
    const response = await api.get<ApiResponse<object>>('/Users/statistics');
    return handleResponse(response);
  },
};

// Dashboard API
export const dashboardApi = {
  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const response = await api.get<ApiResponse<DashboardStats>>('/Dashboard/stats');
    return handleResponse(response);
  },

  getMonthlyTransactions: async (): Promise<ApiResponse<MonthlyTransaction[]>> => {
    const response = await api.get<ApiResponse<MonthlyTransaction[]>>('/Dashboard/monthly-transactions');
    return handleResponse(response);
  },

  getCategoryDistribution: async (): Promise<ApiResponse<CategoryDistribution[]>> => {
    const response = await api.get<ApiResponse<CategoryDistribution[]>>('/Dashboard/category-distribution');
    return handleResponse(response);
  },

  getLowStockAlerts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get<ApiResponse<Product[]>>('/Dashboard/low-stock-alerts');
    return handleResponse(response);
  },

  getRecentActivities: async (count: number = 20): Promise<ApiResponse<StockTransaction[]>> => {
    const response = await api.get<ApiResponse<StockTransaction[]>>(`/Dashboard/recent-activities?count=${count}`);
    return handleResponse(response);
  },
};

export default api; 