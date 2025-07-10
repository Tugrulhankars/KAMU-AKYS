import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistance, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

// CSS class birleştirme
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Tarih formatlama
export function formatDate(date: string | Date, formatStr: string = 'dd.MM.yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: tr });
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'dd.MM.yyyy HH:mm');
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true, locale: tr });
}

// Para formatlama
export function formatCurrency(amount: number, currency: string = 'TRY'): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Durum renkleri
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'confirmed':
    case 'completed':
    case 'paid':
      return 'text-success-600 bg-success-50 border-success-200';
    case 'pending':
    case 'scheduled':
      return 'text-warning-600 bg-warning-50 border-warning-200';
    case 'cancelled':
    case 'failed':
    case 'inactive':
      return 'text-danger-600 bg-danger-50 border-danger-200';
    case 'ongoing':
    case 'in_transit':
      return 'text-primary-600 bg-primary-50 border-primary-200';
    default:
      return 'text-secondary-600 bg-secondary-50 border-secondary-200';
  }
}

export function getStatusBadgeColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
    case 'confirmed':
    case 'completed':
    case 'paid':
      return 'bg-success-100 text-success-800';
    case 'pending':
    case 'scheduled':
      return 'bg-warning-100 text-warning-800';
    case 'cancelled':
    case 'failed':
    case 'inactive':
      return 'bg-danger-100 text-danger-800';
    case 'ongoing':
    case 'in_transit':
      return 'bg-primary-100 text-primary-800';
    default:
      return 'bg-secondary-100 text-secondary-800';
  }
}

// Durum metinleri
export function getStatusText(status: string): string {
  const statusMap: Record<string, string> = {
    active: 'Aktif',
    inactive: 'Pasif',
    pending: 'Beklemede',
    confirmed: 'Onaylandı',
    cancelled: 'İptal Edildi',
    completed: 'Tamamlandı',
    ongoing: 'Devam Ediyor',
    scheduled: 'Planlandı',
    paid: 'Ödendi',
    failed: 'Başarısız',
    in_transit: 'Yolda',
    arrived: 'Varıldı',
    checked_in: 'Giriş Yapıldı',
    checked_out: 'Çıkış Yapıldı',
  };
  return statusMap[status.toLowerCase()] || status;
}

// Zorluk seviyesi
export function getDifficultyText(difficulty: string): string {
  const difficultyMap: Record<string, string> = {
    beginner: 'Başlangıç',
    intermediate: 'Orta',
    advanced: 'İleri',
  };
  return difficultyMap[difficulty.toLowerCase()] || difficulty;
}

// Cinsiyet
export function getGenderText(gender: string): string {
  const genderMap: Record<string, string> = {
    male: 'Erkek',
    female: 'Kadın',
    other: 'Diğer',
  };
  return genderMap[gender.toLowerCase()] || gender;
}

// Kullanıcı tipi
export function getUserTypeText(userType: string): string {
  const userTypeMap: Record<string, string> = {
    admin: 'Yönetici',
    staff: 'Personel',
    participant: 'Katılımcı',
    parent: 'Veli',
  };
  return userTypeMap[userType.toLowerCase()] || userType;
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

// TC Kimlik numarası formatlama
export function formatIdentityNumber(identityNumber: string): string {
  if (identityNumber.length === 11) {
    return identityNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1 $2 $3 $4');
  }
  return identityNumber;
}

// E-posta gizleme
export function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) return email;
  const maskedLocal = localPart.charAt(0) + '*'.repeat(localPart.length - 2) + localPart.charAt(localPart.length - 1);
  return `${maskedLocal}@${domain}`;
}

// Metin kısaltma
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Sayı formatlama
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('tr-TR').format(num);
}

// Yüzde formatlama
export function formatPercentage(value: number, total: number): string {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
}

// Renk tonu oluşturma
export function generateColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

// Local storage yardımcıları
export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore errors
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore errors
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch {
      // Ignore errors
    }
  },
};

// Debounce fonksiyonu
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle fonksiyonu
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// UUID oluşturma
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Dosya uzantısı kontrolü
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function isImageFile(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  return imageExtensions.includes(getFileExtension(filename).toLowerCase());
}

export function isPdfFile(filename: string): boolean {
  return getFileExtension(filename).toLowerCase() === 'pdf';
}

// Tarih aralığı hesaplama
export function getDaysBetween(startDate: string | Date, endDate: string | Date): number {
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Yaş hesaplama
export function calculateAge(birthDate: string | Date): number {
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
} 