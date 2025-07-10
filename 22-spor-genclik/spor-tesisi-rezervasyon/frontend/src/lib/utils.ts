import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getReservationStatusText(status: number): string {
  switch (status) {
    case 0:
      return 'Beklemede';
    case 1:
      return 'Onaylandı';
    case 2:
      return 'İptal Edildi';
    case 3:
      return 'Tamamlandı';
    case 4:
      return 'Gelmedi';
    default:
      return 'Bilinmiyor';
  }
}

export function getReservationStatusColor(status: number): string {
  switch (status) {
    case 0:
      return 'bg-yellow-100 text-yellow-800';
    case 1:
      return 'bg-green-100 text-green-800';
    case 2:
      return 'bg-red-100 text-red-800';
    case 3:
      return 'bg-blue-100 text-blue-800';
    case 4:
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getDayOfWeekText(day: number): string {
  const days = [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi'
  ];
  return days[day] || 'Bilinmiyor';
}

export function getFacilityTypeIcon(typeName: string): string {
  const icons: Record<string, string> = {
    'Futbol Sahası': '⚽',
    'Basketbol Sahası': '🏀',
    'Tenis Kortu': '🎾',
    'Voleybol Sahası': '🏐',
    'Yüzme Havuzu': '🏊',
    'Spor Salonu': '🏋️',
    'Koşu Pisti': '🏃',
    'Fitness Merkezi': '💪'
  };
  return icons[typeName] || '🏟️';
}

export function calculateDuration(startTime: string, endTime: string): number {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Saat cinsinden
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}

export function getCurrentUser(): any {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
} 