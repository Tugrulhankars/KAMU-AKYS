// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  identityNumber?: string;
  userType: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDto;
}

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  identityNumber?: string;
  userType: string;
  profilePhotoPath?: string;
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

// Athlete Types
export interface CreateAthleteRequest {
  firstName: string;
  lastName: string;
  identityNumber: string;
  dateOfBirth: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  gender: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  height: number;
  weight: number;
  clubId?: number;
}

export interface UpdateAthleteRequest {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  height: number;
  weight: number;
  clubId?: number;
  isActive: boolean;
}

export interface AthleteDto {
  id: number;
  firstName: string;
  lastName: string;
  identityNumber: string;
  dateOfBirth: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  gender: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  height: number;
  weight: number;
  photoPath?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  clubId?: number;
  clubName?: string;
  fullName: string;
  age: number;
  licenseCount: number;
}

export interface AthleteListDto {
  id: number;
  fullName: string;
  identityNumber: string;
  age: number;
  clubName?: string;
  phoneNumber?: string;
  isActive: boolean;
  licenseCount: number;
}

// License Types
export interface CreateLicenseRequest {
  athleteId: number;
  sportId: number;
  licenseTypeId: number;
  licenseCategoryId: number;
  notes?: string;
}

export interface UpdateLicenseRequest {
  notes?: string;
  status: string;
}

export interface LicenseRenewalRequest {
  licenseId: number;
  notes?: string;
}

export interface LicenseDto {
  id: number;
  licenseNumber: string;
  athleteId: number;
  athleteName: string;
  athleteIdentityNumber: string;
  sportId: number;
  sportName: string;
  licenseTypeId: number;
  licenseTypeName: string;
  licenseCategoryId: number;
  licenseCategoryName: string;
  issueDate: string;
  expiryDate: string;
  renewalDate?: string;
  status: string;
  notes?: string;
  qrCodePath?: string;
  pdfPath?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  issuedBy?: string;
  isExpired: boolean;
  isExpiringSoon: boolean;
  daysUntilExpiry: number;
}

export interface LicenseListDto {
  id: number;
  licenseNumber: string;
  athleteName: string;
  sportName: string;
  licenseTypeName: string;
  licenseCategoryName: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  isExpired: boolean;
  isExpiringSoon: boolean;
  daysUntilExpiry: number;
}

export interface LicenseStatisticsDto {
  totalLicenses: number;
  activeLicenses: number;
  expiredLicenses: number;
  expiringSoonLicenses: number;
  suspendedLicenses: number;
  cancelledLicenses: number;
}

// Sport Types
export interface CreateSportRequest {
  name: string;
  description?: string;
  iconPath?: string;
}

export interface UpdateSportRequest {
  name: string;
  description?: string;
  iconPath?: string;
  isActive: boolean;
}

export interface SportDto {
  id: number;
  name: string;
  description?: string;
  iconPath?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  licenseCount: number;
}

export interface SportListDto {
  id: number;
  name: string;
  description?: string;
  iconPath?: string;
  isActive: boolean;
  licenseCount: number;
}

// Club Types
export interface CreateClubRequest {
  name: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  logoPath?: string;
}

export interface UpdateClubRequest {
  name: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  logoPath?: string;
  isActive: boolean;
}

export interface ClubDto {
  id: number;
  name: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  logoPath?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  athleteCount: number;
}

export interface ClubListDto {
  id: number;
  name: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  isActive: boolean;
  athleteCount: number;
} 