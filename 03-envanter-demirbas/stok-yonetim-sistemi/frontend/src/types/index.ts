// User Types
export enum UserRole {
  Admin = 1,
  DepoGorevlisi = 2,
  IncelemeYetkilisi = 3
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresAt: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

// Product Types
export enum ProductType {
  SarfMalzeme = 1,
  Demirbas = 2
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  barcode?: string;
  type: ProductType;
  categoryId: number;
  categoryName: string;
  unitPrice?: number;
  unit?: string;
  currentStock: number;
  minStockLevel: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  isCriticalStock: boolean;
}

export interface CreateProduct {
  name: string;
  description?: string;
  barcode?: string;
  type: ProductType;
  categoryId: number;
  unitPrice?: number;
  unit?: string;
  currentStock: number;
  minStockLevel: number;
}

export interface UpdateProduct {
  name: string;
  description?: string;
  barcode?: string;
  type: ProductType;
  categoryId: number;
  unitPrice?: number;
  unit?: string;
  minStockLevel: number;
  isActive: boolean;
}

export interface ProductFilter {
  search?: string;
  categoryId?: number;
  type?: ProductType;
  isActive?: boolean;
  isCriticalStock?: boolean;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDir?: string;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  productCount: number;
}

export interface CreateCategory {
  name: string;
  description?: string;
}

export interface UpdateCategory {
  name: string;
  description?: string;
  isActive: boolean;
}

// Stock Transaction Types
export enum TransactionType {
  Giriş = 1,
  Çıkış = 2
}

export interface StockTransaction {
  id: number;
  productId: number;
  productName: string;
  productBarcode?: string;
  userId: number;
  userName: string;
  type: TransactionType;
  quantity: number;
  unitPrice?: number;
  description?: string;
  reference?: string;
  transactionDate: string;
  stockBefore: number;
  stockAfter: number;
}

export interface CreateStockTransaction {
  productId: number;
  type: TransactionType;
  quantity: number;
  unitPrice?: number;
  description?: string;
  reference?: string;
}

export interface BarcodeTransaction {
  barcode: string;
  type: TransactionType;
  quantity: number;
  unitPrice?: number;
  description?: string;
  reference?: string;
}

export interface StockTransactionFilter {
  productId?: number;
  userId?: number;
  type?: TransactionType;
  startDate?: string;
  endDate?: string;
  search?: string;
  page: number;
  pageSize: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Dashboard Types
export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  criticalStockCount: number;
  totalUsers: number;
  todayTransactions: number;
  weeklyTransactionsIn: number;
  weeklyTransactionsOut: number;
  criticalStockProducts: Product[];
  recentTransactions: StockTransaction[];
}

// Form Types
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateStockRequest {
  quantity: number;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Component Props Types
export interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

// Table and Form Types
export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'number' | 'date';
  required?: boolean;
  options?: { value: any; label: string }[];
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | undefined;
  };
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Navigation Types
export interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  allowedRoles?: UserRole[];
}

// Filter and Search Types
export interface SearchFilters {
  query: string;
  category?: string;
  status?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Statistics Types
export interface TransactionSummary {
  todayTransactions: number;
  weekTransactions: number;
  monthTransactions: number;
  todayIncoming: number;
  todayOutgoing: number;
  weekIncoming: number;
  weekOutgoing: number;
}

export interface CategoryDistribution {
  categoryName: string;
  productCount: number;
  totalStock: number;
  criticalStockCount: number;
}

export interface MonthlyTransaction {
  month: string;
  monthName: string;
  incoming: number;
  outgoing: number;
  net: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
} 