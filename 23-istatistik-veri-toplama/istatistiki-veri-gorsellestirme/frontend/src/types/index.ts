export interface User {
  id: number;
  username: string;
  role: 'Admin' | 'User';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: 'Admin' | 'User';
  expiresAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Dataset {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
  createdByUsername: string;
  dataPointsCount: number;
  stars: number;
  author: string;
  downloads: number;
  members: number;
  data: Array<{ year: number; country: string; population: number }>;
  FileUrl?: string;
}

export interface CreateDataset {
  name: string;
  description: string;
  isPublic: boolean;
}

export interface DataPoint {
  id: number;
  key: string;
  value: number;
  date: string;
  category?: string;
}

export interface CreateDataPoint {
  key: string;
  value: number;
  date: string;
  category?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
} 