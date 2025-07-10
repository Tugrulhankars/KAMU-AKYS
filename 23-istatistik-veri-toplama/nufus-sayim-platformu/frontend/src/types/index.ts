// User & Auth Types
export interface User {
  id: number;
  username: string;
  role: 'Admin' | 'Görevli' | 'Gözlemci';
  createdAt: string;
  isActive: boolean;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: 'Admin' | 'Görevli' | 'Gözlemci';
  expiresAt: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  role: 'Admin' | 'Görevli' | 'Gözlemci';
}

// Census Data Types
export interface City {
  id: number;
  name: string;
  createdAt: string;
  createdByUsername?: string;
  districtCount: number;
}

export interface CreateCity {
  name: string;
}

export interface District {
  id: number;
  name: string;
  cityId: number;
  cityName: string;
  createdAt: string;
  createdByUsername?: string;
  householdCount: number;
}

export interface CreateDistrict {
  name: string;
  cityId: number;
}

export interface Household {
  id: number;
  address: string;
  districtId: number;
  districtName: string;
  cityName: string;
  createdAt: string;
  updatedAt?: string;
  createdByUsername: string;
  updatedByUsername?: string;
  notes?: string;
  isActive: boolean;
  personCount: number;
  people: Person[];
}

export interface CreateHousehold {
  address: string;
  districtId: number;
  notes?: string;
}

export interface UpdateHousehold {
  address: string;
  districtId: number;
  notes?: string;
  isActive: boolean;
}

export interface Person {
  id: number;
  name: string;
  surname: string;
  fullName: string;
  birthDate: string;
  gender: string;
  age: number;
  householdId: number;
  nationalId?: string;
  phoneNumber?: string;
  email?: string;
  occupation?: string;
  maritalStatus?: string;
  educationLevel?: string;
  createdAt: string;
  updatedAt?: string;
  createdByUsername: string;
  updatedByUsername?: string;
  isActive: boolean;
  householdAddress: string;
  districtName: string;
  cityName: string;
}

export interface CreatePerson {
  name: string;
  surname: string;
  birthDate: string;
  gender: string;
  householdId: number;
  nationalId?: string;
  phoneNumber?: string;
  email?: string;
  occupation?: string;
  maritalStatus?: string;
  educationLevel?: string;
}

export interface UpdatePerson {
  name: string;
  surname: string;
  birthDate: string;
  gender: string;
  householdId: number;
  nationalId?: string;
  phoneNumber?: string;
  email?: string;
  occupation?: string;
  maritalStatus?: string;
  educationLevel?: string;
  isActive: boolean;
}

// Statistics Types
export interface Statistics {
  totalCities: number;
  totalDistricts: number;
  totalHouseholds: number;
  totalPeople: number;
  totalUsers: number;
  activeHouseholds: number;
  activePeople: number;
  peopleByGender: Record<string, number>;
  peopleByAgeGroup: Record<string, number>;
  householdsByCity: Record<string, number>;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isOfficer: boolean;
  isViewer: boolean;
}

// API Types
export interface ApiError {
  message: string;
  status?: number;
}

// Form Types
export interface PersonSearchParams {
  name?: string;
  surname?: string;
  nationalId?: string;
  phoneNumber?: string;
}

export interface PeopleFilters {
  householdId?: number;
  districtId?: number;
  cityId?: number;
  gender?: string;
  minAge?: number;
  maxAge?: number;
  includeInactive?: boolean;
}

export interface HouseholdFilters {
  districtId?: number;
  cityId?: number;
  includeInactive?: boolean;
}

// Constants
export const ROLES = {
  ADMIN: 'Admin' as const,
  OFFICER: 'Görevli' as const,
  VIEWER: 'Gözlemci' as const,
};

export const GENDERS = {
  MALE: 'Erkek' as const,
  FEMALE: 'Kadın' as const,
};

export const MARITAL_STATUS = {
  SINGLE: 'Bekar' as const,
  MARRIED: 'Evli' as const,
  DIVORCED: 'Boşanmış' as const,
  WIDOWED: 'Dul' as const,
};

export const EDUCATION_LEVELS = {
  PRIMARY: 'İlkokul' as const,
  SECONDARY: 'Ortaokul' as const,
  HIGH_SCHOOL: 'Lise' as const,
  ASSOCIATE: 'Önlisans' as const,
  BACHELOR: 'Lisans' as const,
  MASTER: 'Yüksek Lisans' as const,
  PHD: 'Doktora' as const,
}; 