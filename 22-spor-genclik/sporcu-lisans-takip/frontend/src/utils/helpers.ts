import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

// Tailwind CSS class'larını birleştirme
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Tarih formatlama
export function formatDate(date: string | Date, formatStr: string = 'dd.MM.yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: tr });
}

// Tarih ve saat formatlama
export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'dd.MM.yyyy HH:mm');
}

// Yaş hesaplama
export function calculateAge(birthDate: string | Date): number {
  const today = new Date();
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

// Dosya boyutu formatlama
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Telefon numarası formatlama
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + ' ' + match[3];
  }
  return phone;
}

// TC Kimlik numarası doğrulama
export function validateIdentityNumber(identityNumber: string): boolean {
  if (!/^\d{11}$/.test(identityNumber)) return false;
  
  const digits = identityNumber.split('').map(Number);
  
  // İlk 10 hanenin toplamı
  let sum1 = 0;
  for (let i = 0; i < 9; i++) {
    sum1 += digits[i];
  }
  
  // 10. hane kontrolü
  const digit10 = (sum1 * 7) % 10;
  if (digits[9] !== digit10) return false;
  
  // İlk 11 hanenin toplamı
  let sum2 = 0;
  for (let i = 0; i < 10; i++) {
    sum2 += digits[i];
  }
  
  // 11. hane kontrolü
  const digit11 = sum2 % 10;
  if (digits[10] !== digit11) return false;
  
  return true;
}

// E-posta doğrulama
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Şifre güçlülük kontrolü
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Şifre en az 8 karakter olmalıdır');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('En az bir büyük harf içermelidir');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('En az bir küçük harf içermelidir');
  }
  
  if (!/\d/.test(password)) {
    errors.push('En az bir rakam içermelidir');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('En az bir özel karakter içermelidir');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Durum badge rengi
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'aktif':
      return 'bg-green-100 text-green-800';
    case 'inactive':
    case 'pasif':
      return 'bg-gray-100 text-gray-800';
    case 'suspended':
    case 'askıya alındı':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
    case 'iptal edildi':
      return 'bg-red-100 text-red-800';
    case 'expired':
    case 'süresi doldu':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

// Lisans durumu kontrolü
export function isLicenseExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}

export function isLicenseExpiringSoon(expiryDate: string, days: number = 30): boolean {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= days && diffDays > 0;
}

// Dosya türü kontrolü
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf';
}

// Dosya yükleme için kabul edilen türler
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const ACCEPTED_FILE_TYPES = [...ACCEPTED_IMAGE_TYPES, 'application/pdf'];

// Maksimum dosya boyutu (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// Dosya yükleme doğrulama
export function validateFile(file: File): {
  isValid: boolean;
  error?: string;
} {
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'Dosya boyutu 10MB\'dan büyük olamaz'
    };
  }
  
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Sadece JPEG, PNG, WebP ve PDF dosyaları kabul edilir'
    };
  }
  
  return { isValid: true };
} 