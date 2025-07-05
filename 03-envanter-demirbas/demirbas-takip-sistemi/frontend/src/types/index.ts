export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  department: string;
  phoneNumber: string;
  role: UserRole;
  isActive: boolean;
  createdDate: string;
}

export enum UserRole {
  Admin = 1,
  Personel = 2
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  expiresAt: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  department: string;
  phoneNumber: string;
  role: UserRole;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  code: string;
  createdDate: string;
  assetCount: number;
}

export interface CreateCategoryRequest {
  name: string;
  description: string;
  code: string;
}

export interface Asset {
  id: number;
  name: string;
  description: string;
  assetCode: string;
  serialNumber: string;
  brand: string;
  model: string;
  purchasePrice: number;
  purchaseDate: string;
  status: AssetStatus;
  location: string;
  notes: string;
  categoryId: number;
  category?: Category;
  currentAssignedUser?: User;
  createdDate: string;
}

export enum AssetStatus {
  Available = 1,
  Assigned = 2,
  Maintenance = 3,
  Damaged = 4,
  Disposed = 5
}

export interface CreateAssetRequest {
  name: string;
  description: string;
  assetCode: string;
  serialNumber: string;
  brand: string;
  model: string;
  purchasePrice: number;
  purchaseDate: string;
  location: string;
  notes: string;
  categoryId: number;
}

export interface Assignment {
  id: number;
  type: AssignmentType;
  assignmentDate: string;
  returnDate?: string;
  notes: string;
  condition: string;
  assetId: number;
  asset?: Asset;
  userId: number;
  user?: User;
  assignedByUserId: number;
  assignedByUser?: User;
}

export enum AssignmentType {
  Assignment = 1,
  Return = 2
}

export interface CreateAssignmentRequest {
  type: AssignmentType;
  assignmentDate: string;
  returnDate?: string;
  notes: string;
  condition: string;
  assetId: number;
  userId: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
} 