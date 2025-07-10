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
  user: User;
}

// User Types
export interface User {
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
  department?: string;
  position?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  schoolName?: string;
  grade?: string;
  studentId?: string;
  teacherName?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  notes?: string;
  updatedAt?: string;
  updatedBy?: string;
  fullName: string;
  age?: number;
  registrationCount: number;
  hasActiveRegistration: boolean;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  identityNumber?: string;
  userType: string;
  department?: string;
  position?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  schoolName?: string;
  grade?: string;
  studentId?: string;
  teacherName?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  notes?: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  identityNumber?: string;
  userType: string;
  department?: string;
  position?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  schoolName?: string;
  grade?: string;
  studentId?: string;
  teacherName?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  notes?: string;
  isActive: boolean;
}

// Camp Types
export interface Camp {
  id: number;
  name: string;
  description: string;
  location: string;
  locationId: number;
  locationName: string;
  categoryId: number;
  categoryName: string;
  startDate: string;
  endDate: string;
  capacity: number;
  minAge: number;
  maxAge: number;
  price: number;
  currency: string;
  status: string;
  difficulty: string;
  requirements: string;
  equipment: string;
  accommodation: string;
  meals: string;
  transportation: string;
  insurance: string;
  photoPath: string;
  brochurePath: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  duration: number;
  registeredCount: number;
  availableSpots: number;
  isFull: boolean;
  isUpcoming: boolean;
  isOngoing: boolean;
  isCompleted: boolean;
  isRegistrationOpen: boolean;
  activities: Activity[];
  schedules: CampSchedule[];
  mealPlans: MealPlan[];
  transportations: Transportation[];
}

export interface CreateCampRequest {
  name: string;
  description: string;
  locationId: number;
  categoryId: number;
  startDate: string;
  endDate: string;
  capacity: number;
  minAge: number;
  maxAge: number;
  price: number;
  currency: string;
  difficulty: string;
  requirements: string;
  equipment: string;
  accommodation: string;
  meals: string;
  transportation: string;
  insurance: string;
  activityIds: number[];
}

export interface UpdateCampRequest {
  name: string;
  description: string;
  locationId: number;
  categoryId: number;
  startDate: string;
  endDate: string;
  capacity: number;
  minAge: number;
  maxAge: number;
  price: number;
  currency: string;
  status: string;
  difficulty: string;
  requirements: string;
  equipment: string;
  accommodation: string;
  meals: string;
  transportation: string;
  insurance: string;
  isActive: boolean;
  activityIds: number[];
}

// Participant Types
export interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  identityNumber: string;
  dateOfBirth: string;
  gender: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  photoPath?: string;
  parentConsentPath?: string;
  healthReportPath?: string;
  schoolName?: string;
  grade?: string;
  studentId?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  teacherName?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  fullName: string;
  age: number;
  registrationCount: number;
  hasActiveRegistration: boolean;
  registrations: Registration[];
  emergencyContacts: EmergencyContact[];
  healthRecord?: HealthRecord;
}

export interface CreateParticipantRequest {
  firstName: string;
  lastName: string;
  identityNumber: string;
  dateOfBirth: string;
  gender: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  schoolName?: string;
  grade?: string;
  studentId?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  teacherName?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  notes?: string;
}

export interface UpdateParticipantRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  schoolName?: string;
  grade?: string;
  studentId?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  teacherName?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  notes?: string;
  isActive: boolean;
}

// Activity Types
export interface Activity {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  duration: number;
  maxParticipants: number;
  minParticipants: number;
  difficulty: string;
  requirements: string;
  equipment: string;
  location: string;
  instructor: string;
  photoPath?: string;
  videoPath?: string;
  documentPath?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  durationText: string;
  participantCount: number;
  isAvailable: boolean;
  availableSpots: number;
}

export interface CreateActivityRequest {
  name: string;
  description: string;
  categoryId: number;
  duration: number;
  maxParticipants: number;
  minParticipants: number;
  difficulty: string;
  requirements: string;
  equipment: string;
  location: string;
  instructor: string;
  notes?: string;
}

export interface UpdateActivityRequest {
  name: string;
  description: string;
  categoryId: number;
  duration: number;
  maxParticipants: number;
  minParticipants: number;
  difficulty: string;
  requirements: string;
  equipment: string;
  location: string;
  instructor: string;
  notes?: string;
  isActive: boolean;
}

// Registration Types
export interface Registration {
  id: number;
  registrationNumber: string;
  campId: number;
  campName: string;
  participantId: number;
  participantName: string;
  registeredById: string;
  registeredByName: string;
  registrationDate: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  transactionId?: string;
  paymentDate?: string;
  notes?: string;
  cancellationReason?: string;
  cancellationDate?: string;
  cancelledBy?: string;
  specialRequirements?: string;
  dietaryRestrictions?: string;
  medicalNotes?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  parentConsentReceived: boolean;
  healthReportReceived: boolean;
  paymentReceived: boolean;
  checkInDate?: string;
  checkOutDate?: string;
  checkInBy?: string;
  checkOutBy?: string;
  roomNumber?: string;
  groupAssignment?: string;
  counselorName?: string;
  counselorPhone?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  isConfirmed: boolean;
  isCancelled: boolean;
  isCompleted: boolean;
  isPending: boolean;
  isPaid: boolean;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  isActive: boolean;
  daysUntilCamp: number;
  isUpcoming: boolean;
  isOngoing: boolean;
  canCancel: boolean;
  requiresPayment: boolean;
  isFullyDocumented: boolean;
  payments: Payment[];
}

export interface CreateRegistrationRequest {
  campId: number;
  participantId: number;
  specialRequirements?: string;
  dietaryRestrictions?: string;
  medicalNotes?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  notes?: string;
}

export interface UpdateRegistrationRequest {
  status: string;
  notes?: string;
  specialRequirements?: string;
  dietaryRestrictions?: string;
  medicalNotes?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  roomNumber?: string;
  groupAssignment?: string;
  counselorName?: string;
  counselorPhone?: string;
}

// Additional Types
export interface CampLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  description: string;
  facilities: string;
  photoPath?: string;
  mapCoordinates?: string;
  capacity: number;
  accommodationType: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  medicalFacility?: string;
  medicalPhone?: string;
  securityContact?: string;
  securityPhone?: string;
  transportationInfo?: string;
  parkingInfo?: string;
  wifiInfo?: string;
  electricityInfo?: string;
  waterInfo?: string;
  sanitationInfo?: string;
  kitchenInfo?: string;
  diningInfo?: string;
  recreationInfo?: string;
  safetyInfo?: string;
  rules?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  fullAddress: string;
  contactInfo: string;
  emergencyInfo: string;
  hasMedicalFacility: boolean;
  hasSecurity: boolean;
  hasWiFi: boolean;
  hasParking: boolean;
}

export interface CampCategory {
  id: number;
  name: string;
  description: string;
  iconPath?: string;
  color?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  campCount: number;
  activeCampCount: number;
}

export interface ActivityCategory {
  id: number;
  name: string;
  description: string;
  iconPath?: string;
  color?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  activityCount: number;
  activeActivityCount: number;
}

export interface EmergencyContact {
  id: number;
  participantId: number;
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
  address?: string;
  workPhone?: string;
  workAddress?: string;
  isPrimary: boolean;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  fullContactInfo: string;
  hasWorkInfo: boolean;
  hasEmail: boolean;
}

export interface HealthRecord {
  id: number;
  participantId: number;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
  medications?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelationship?: string;
  insuranceInfo?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  insuranceGroupNumber?: string;
  insuranceExpiryDate?: string;
  doctorName?: string;
  doctorPhone?: string;
  doctorEmail?: string;
  hospitalName?: string;
  hospitalPhone?: string;
  hospitalAddress?: string;
  vaccinationHistory?: string;
  chronicConditions?: string;
  dietaryRestrictions?: string;
  physicalLimitations?: string;
  mentalHealthInfo?: string;
  behavioralInfo?: string;
  specialNeeds?: string;
  accommodations?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  hasAllergies: boolean;
  hasMedicalConditions: boolean;
  hasMedications: boolean;
  hasInsurance: boolean;
  hasDoctor: boolean;
  hasHospital: boolean;
  hasVaccinationHistory: boolean;
  hasChronicConditions: boolean;
  hasDietaryRestrictions: boolean;
  hasPhysicalLimitations: boolean;
  hasMentalHealthInfo: boolean;
  hasBehavioralInfo: boolean;
  hasSpecialNeeds: boolean;
  hasAccommodations: boolean;
  emergencyInfo: string;
  doctorInfo: string;
  hospitalInfo: string;
  insuranceInfoText: string;
  hasHealthConcerns: boolean;
}

export interface Payment {
  id: number;
  registrationId: number;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId?: string;
  status: string;
  paymentDate: string;
  receiptNumber?: string;
  invoiceNumber?: string;
  notes?: string;
  refundReason?: string;
  refundDate?: string;
  refundedBy?: string;
  refundAmount?: number;
  refundTransactionId?: string;
  paymentGateway?: string;
  paymentGatewayResponse?: string;
  cardLastFourDigits?: string;
  cardType?: string;
  bankName?: string;
  accountNumber?: string;
  checkNumber?: string;
  processedBy?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  isCompleted: boolean;
  isPending: boolean;
  isFailed: boolean;
  isRefunded: boolean;
  isCancelled: boolean;
  hasRefund: boolean;
  isPartialRefund: boolean;
  isFullRefund: boolean;
  isPaid: boolean;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  isActive: boolean;
  daysUntilCamp: number;
  isUpcoming: boolean;
  isOngoing: boolean;
  canCancel: boolean;
  requiresPayment: boolean;
  isFullyDocumented: boolean;
  amountText: string;
  refundAmountText: string;
  paymentMethodText: string;
  statusText: string;
  hasTransactionId: boolean;
  hasReceipt: boolean;
  hasInvoice: boolean;
  isCreditCardPayment: boolean;
  isBankTransfer: boolean;
  isOnlinePayment: boolean;
  isCashPayment: boolean;
}

export interface CampSchedule {
  id: number;
  campId: number;
  activityId?: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  location: string;
  instructor?: string;
  equipment?: string;
  notes?: string;
  type: string;
  isMandatory: boolean;
  maxParticipants: number;
  color?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  duration: string;
  timeRange: string;
  dayName: string;
  activityName?: string;
  isActivity: boolean;
  isMeal: boolean;
  isFreeTime: boolean;
  isMeeting: boolean;
  hasInstructor: boolean;
  hasEquipment: boolean;
  hasMaxParticipants: boolean;
}

export interface MealPlan {
  id: number;
  campId: number;
  mealType: string;
  dayOfWeek: number;
  menu: string;
  specialDiet?: string;
  vegetarianOption?: string;
  veganOption?: string;
  glutenFreeOption?: string;
  dairyFreeOption?: string;
  nutFreeOption?: string;
  allergenInfo?: string;
  nutritionalInfo?: string;
  ingredients?: string;
  preparationMethod?: string;
  servingSize?: string;
  calories?: string;
  notes?: string;
  servingTime?: string;
  location?: string;
  chef?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  dayName: string;
  mealTypeText: string;
  hasSpecialDiet: boolean;
  hasVegetarianOption: boolean;
  hasVeganOption: boolean;
  hasGlutenFreeOption: boolean;
  hasDairyFreeOption: boolean;
  hasNutFreeOption: boolean;
  hasAllergenInfo: boolean;
  hasNutritionalInfo: boolean;
  hasServingTime: boolean;
  servingTimeText: string;
}

export interface Transportation {
  id: number;
  campId: number;
  type: string;
  departureLocation: string;
  departureTime: string;
  arrivalTime: string;
  capacity: number;
  driverName?: string;
  driverPhone?: string;
  driverLicense?: string;
  vehicleInfo?: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  vehicleYear?: string;
  vehicleColor?: string;
  route?: string;
  stops?: string;
  notes?: string;
  status: string;
  registeredPassengers: number;
  contactPerson?: string;
  contactPhone?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  insuranceInfo?: string;
  safetyInfo?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  duration: string;
  availableSeats: number;
  isFull: boolean;
  isScheduled: boolean;
  isInTransit: boolean;
  isArrived: boolean;
  isCancelled: boolean;
  isUpcoming: boolean;
  isPast: boolean;
  isOngoing: boolean;
  typeText: string;
  driverInfo: string;
  vehicleInfoText: string;
  contactInfo: string;
  emergencyInfo: string;
  hasDriver: boolean;
  hasVehicleInfo: boolean;
  hasRoute: boolean;
  hasStops: boolean;
}

// Statistics Types
export interface CampStatistics {
  totalCamps: number;
  activeCamps: number;
  upcomingCamps: number;
  ongoingCamps: number;
  completedCamps: number;
  totalRegistrations: number;
  confirmedRegistrations: number;
  pendingRegistrations: number;
  cancelledRegistrations: number;
  totalRevenue: number;
  pendingRevenue: number;
  totalParticipants: number;
  uniqueParticipants: number;
}

export interface RegistrationStatistics {
  totalRegistrations: number;
  confirmedRegistrations: number;
  pendingRegistrations: number;
  cancelledRegistrations: number;
  completedRegistrations: number;
  checkedInRegistrations: number;
  checkedOutRegistrations: number;
  totalRevenue: number;
  pendingRevenue: number;
  confirmedRevenue: number;
  fullyDocumentedRegistrations: number;
  incompleteDocumentRegistrations: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} 