export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  identityNumber?: string;
  address?: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Facility {
  id: number;
  name: string;
  description?: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  capacity: number;
  hourlyRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  facilityTypeId: number;
  facilityType: FacilityType;
  schedules: FacilitySchedule[];
}

export interface FacilityType {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface FacilitySchedule {
  id: number;
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  facilityId: number;
}

export interface Reservation {
  id: number;
  startTime: string;
  endTime: string;
  status: ReservationStatus;
  notes?: string;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
  facilityId: number;
  userId: string;
  facility: Facility;
  user: User;
}

export enum ReservationStatus {
  Pending = 0,
  Confirmed = 1,
  Cancelled = 2,
  Completed = 3,
  NoShow = 4
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  identityNumber?: string;
  address?: string;
  dateOfBirth: string;
}

export interface CreateReservationRequest {
  facilityId: number;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface CreateFacilityRequest {
  name: string;
  description?: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  capacity: number;
  hourlyRate: number;
  facilityTypeId: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
} 