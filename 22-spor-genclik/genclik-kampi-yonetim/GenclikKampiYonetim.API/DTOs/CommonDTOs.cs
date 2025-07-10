namespace GenclikKampiYonetim.API.DTOs
{
    // CampLocation DTOs
    public class CampLocationDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string? PostalCode { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Facilities { get; set; } = string.Empty;
        public string? PhotoPath { get; set; }
        public string? MapCoordinates { get; set; }
        public int Capacity { get; set; }
        public string AccommodationType { get; set; } = string.Empty;
        public string? ContactPerson { get; set; }
        public string? ContactPhone { get; set; }
        public string? ContactEmail { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? MedicalFacility { get; set; }
        public string? MedicalPhone { get; set; }
        public string? SecurityContact { get; set; }
        public string? SecurityPhone { get; set; }
        public string? TransportationInfo { get; set; }
        public string? ParkingInfo { get; set; }
        public string? WiFiInfo { get; set; }
        public string? ElectricityInfo { get; set; }
        public string? WaterInfo { get; set; }
        public string? SanitationInfo { get; set; }
        public string? KitchenInfo { get; set; }
        public string? DiningInfo { get; set; }
        public string? RecreationInfo { get; set; }
        public string? SafetyInfo { get; set; }
        public string? Rules { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public string FullAddress { get; set; } = string.Empty;
        public string ContactInfo { get; set; } = string.Empty;
        public string EmergencyInfo { get; set; } = string.Empty;
        public bool HasMedicalFacility { get; set; }
        public bool HasSecurity { get; set; }
        public bool HasWiFi { get; set; }
        public bool HasParking { get; set; }
    }

    public class CreateCampLocationRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string? PostalCode { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Facilities { get; set; } = string.Empty;
        public string? MapCoordinates { get; set; }
        public int Capacity { get; set; }
        public string AccommodationType { get; set; } = string.Empty;
        public string? ContactPerson { get; set; }
        public string? ContactPhone { get; set; }
        public string? ContactEmail { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? MedicalFacility { get; set; }
        public string? MedicalPhone { get; set; }
        public string? SecurityContact { get; set; }
        public string? SecurityPhone { get; set; }
        public string? TransportationInfo { get; set; }
        public string? ParkingInfo { get; set; }
        public string? WiFiInfo { get; set; }
        public string? ElectricityInfo { get; set; }
        public string? WaterInfo { get; set; }
        public string? SanitationInfo { get; set; }
        public string? KitchenInfo { get; set; }
        public string? DiningInfo { get; set; }
        public string? RecreationInfo { get; set; }
        public string? SafetyInfo { get; set; }
        public string? Rules { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateCampLocationRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string? PostalCode { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Facilities { get; set; } = string.Empty;
        public string? MapCoordinates { get; set; }
        public int Capacity { get; set; }
        public string AccommodationType { get; set; } = string.Empty;
        public string? ContactPerson { get; set; }
        public string? ContactPhone { get; set; }
        public string? ContactEmail { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? MedicalFacility { get; set; }
        public string? MedicalPhone { get; set; }
        public string? SecurityContact { get; set; }
        public string? SecurityPhone { get; set; }
        public string? TransportationInfo { get; set; }
        public string? ParkingInfo { get; set; }
        public string? WiFiInfo { get; set; }
        public string? ElectricityInfo { get; set; }
        public string? WaterInfo { get; set; }
        public string? SanitationInfo { get; set; }
        public string? KitchenInfo { get; set; }
        public string? DiningInfo { get; set; }
        public string? RecreationInfo { get; set; }
        public string? SafetyInfo { get; set; }
        public string? Rules { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
    }

    // CampCategory DTOs
    public class CampCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? IconPath { get; set; }
        public string? Color { get; set; }
        public int DisplayOrder { get; set; } = 0;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public int CampCount { get; set; }
        public int ActiveCampCount { get; set; }
    }

    public class CreateCampCategoryRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Color { get; set; }
        public int DisplayOrder { get; set; } = 0;
    }

    public class UpdateCampCategoryRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Color { get; set; }
        public int DisplayOrder { get; set; } = 0;
        public bool IsActive { get; set; } = true;
    }

    // EmergencyContact DTOs
    public class EmergencyContactDto
    {
        public int Id { get; set; }
        public int ParticipantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Relationship { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? WorkPhone { get; set; }
        public string? WorkAddress { get; set; }
        public bool IsPrimary { get; set; } = false;
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public string FullContactInfo { get; set; } = string.Empty;
        public bool HasWorkInfo { get; set; }
        public bool HasEmail { get; set; }
    }

    public class CreateEmergencyContactRequest
    {
        public int ParticipantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Relationship { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? WorkPhone { get; set; }
        public string? WorkAddress { get; set; }
        public bool IsPrimary { get; set; } = false;
        public string? Notes { get; set; }
    }

    public class UpdateEmergencyContactRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Relationship { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? WorkPhone { get; set; }
        public string? WorkAddress { get; set; }
        public bool IsPrimary { get; set; } = false;
        public string? Notes { get; set; }
    }

    // HealthRecord DTOs
    public class HealthRecordDto
    {
        public int Id { get; set; }
        public int ParticipantId { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? Medications { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? EmergencyContactRelationship { get; set; }
        public string? InsuranceInfo { get; set; }
        public string? InsuranceProvider { get; set; }
        public string? InsurancePolicyNumber { get; set; }
        public string? InsuranceGroupNumber { get; set; }
        public string? InsuranceExpiryDate { get; set; }
        public string? DoctorName { get; set; }
        public string? DoctorPhone { get; set; }
        public string? DoctorEmail { get; set; }
        public string? HospitalName { get; set; }
        public string? HospitalPhone { get; set; }
        public string? HospitalAddress { get; set; }
        public string? VaccinationHistory { get; set; }
        public string? ChronicConditions { get; set; }
        public string? DietaryRestrictions { get; set; }
        public string? PhysicalLimitations { get; set; }
        public string? MentalHealthInfo { get; set; }
        public string? BehavioralInfo { get; set; }
        public string? SpecialNeeds { get; set; }
        public string? Accommodations { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public bool HasAllergies { get; set; }
        public bool HasMedicalConditions { get; set; }
        public bool HasMedications { get; set; }
        public bool HasInsurance { get; set; }
        public bool HasDoctor { get; set; }
        public bool HasHospital { get; set; }
        public bool HasVaccinationHistory { get; set; }
        public bool HasChronicConditions { get; set; }
        public bool HasDietaryRestrictions { get; set; }
        public bool HasPhysicalLimitations { get; set; }
        public bool HasMentalHealthInfo { get; set; }
        public bool HasBehavioralInfo { get; set; }
        public bool HasSpecialNeeds { get; set; }
        public bool HasAccommodations { get; set; }
        public string EmergencyInfo { get; set; } = string.Empty;
        public string DoctorInfo { get; set; } = string.Empty;
        public string HospitalInfo { get; set; } = string.Empty;
        public string InsuranceInfoText { get; set; } = string.Empty;
        public bool HasHealthConcerns { get; set; }
    }

    public class CreateHealthRecordRequest
    {
        public int ParticipantId { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? Medications { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? EmergencyContactRelationship { get; set; }
        public string? InsuranceInfo { get; set; }
        public string? InsuranceProvider { get; set; }
        public string? InsurancePolicyNumber { get; set; }
        public string? InsuranceGroupNumber { get; set; }
        public string? InsuranceExpiryDate { get; set; }
        public string? DoctorName { get; set; }
        public string? DoctorPhone { get; set; }
        public string? DoctorEmail { get; set; }
        public string? HospitalName { get; set; }
        public string? HospitalPhone { get; set; }
        public string? HospitalAddress { get; set; }
        public string? VaccinationHistory { get; set; }
        public string? ChronicConditions { get; set; }
        public string? DietaryRestrictions { get; set; }
        public string? PhysicalLimitations { get; set; }
        public string? MentalHealthInfo { get; set; }
        public string? BehavioralInfo { get; set; }
        public string? SpecialNeeds { get; set; }
        public string? Accommodations { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateHealthRecordRequest
    {
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? Medications { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? EmergencyContactRelationship { get; set; }
        public string? InsuranceInfo { get; set; }
        public string? InsuranceProvider { get; set; }
        public string? InsurancePolicyNumber { get; set; }
        public string? InsuranceGroupNumber { get; set; }
        public string? InsuranceExpiryDate { get; set; }
        public string? DoctorName { get; set; }
        public string? DoctorPhone { get; set; }
        public string? DoctorEmail { get; set; }
        public string? HospitalName { get; set; }
        public string? HospitalPhone { get; set; }
        public string? HospitalAddress { get; set; }
        public string? VaccinationHistory { get; set; }
        public string? ChronicConditions { get; set; }
        public string? DietaryRestrictions { get; set; }
        public string? PhysicalLimitations { get; set; }
        public string? MentalHealthInfo { get; set; }
        public string? BehavioralInfo { get; set; }
        public string? SpecialNeeds { get; set; }
        public string? Accommodations { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
    }

    // CampSchedule DTOs
    public class CampScheduleDto
    {
        public int Id { get; set; }
        public int CampId { get; set; }
        public string Day { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string TimeSlot { get; set; } = string.Empty;
        public string Activity { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public int Duration { get; set; }
        public string Difficulty { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
    }

    public class CreateCampScheduleRequest
    {
        public int CampId { get; set; }
        public string Day { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string TimeSlot { get; set; } = string.Empty;
        public string Activity { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public int Duration { get; set; }
        public string Difficulty { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }

    public class UpdateCampScheduleRequest
    {
        public string Day { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string TimeSlot { get; set; } = string.Empty;
        public string Activity { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public int Duration { get; set; }
        public string Difficulty { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }

    // MealPlan DTOs
    public class MealPlanDto
    {
        public int Id { get; set; }
        public int CampId { get; set; }
        public string Day { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string MealType { get; set; } = string.Empty; // Breakfast, Lunch, Dinner, Snack
        public string Menu { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string NutritionalInfo { get; set; } = string.Empty;
        public string AllergenInfo { get; set; } = string.Empty;
        public string DietaryOptions { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
    }

    public class CreateMealPlanRequest
    {
        public int CampId { get; set; }
        public string Day { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string MealType { get; set; } = string.Empty;
        public string Menu { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string NutritionalInfo { get; set; } = string.Empty;
        public string AllergenInfo { get; set; } = string.Empty;
        public string DietaryOptions { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }

    public class UpdateMealPlanRequest
    {
        public string Day { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string MealType { get; set; } = string.Empty;
        public string Menu { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string NutritionalInfo { get; set; } = string.Empty;
        public string AllergenInfo { get; set; } = string.Empty;
        public string DietaryOptions { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
    }

    // Transportation DTOs
    public class TransportationDto
    {
        public int Id { get; set; }
        public int CampId { get; set; }
        public string Type { get; set; } = string.Empty; // Bus, Car, Train, Plane
        public string Route { get; set; } = string.Empty;
        public string DepartureLocation { get; set; } = string.Empty;
        public string ArrivalLocation { get; set; } = string.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string VehicleInfo { get; set; } = string.Empty;
        public string DriverInfo { get; set; } = string.Empty;
        public string ContactInfo { get; set; } = string.Empty;
        public decimal Cost { get; set; }
        public string Currency { get; set; } = "TRY";
        public int Capacity { get; set; }
        public int BookedSeats { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public int AvailableSeats { get; set; }
        public bool IsFull { get; set; }
    }

    public class CreateTransportationRequest
    {
        public int CampId { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Route { get; set; } = string.Empty;
        public string DepartureLocation { get; set; } = string.Empty;
        public string ArrivalLocation { get; set; } = string.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string VehicleInfo { get; set; } = string.Empty;
        public string DriverInfo { get; set; } = string.Empty;
        public string ContactInfo { get; set; } = string.Empty;
        public decimal Cost { get; set; }
        public string Currency { get; set; } = "TRY";
        public int Capacity { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateTransportationRequest
    {
        public string Type { get; set; } = string.Empty;
        public string Route { get; set; } = string.Empty;
        public string DepartureLocation { get; set; } = string.Empty;
        public string ArrivalLocation { get; set; } = string.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string VehicleInfo { get; set; } = string.Empty;
        public string DriverInfo { get; set; } = string.Empty;
        public string ContactInfo { get; set; } = string.Empty;
        public decimal Cost { get; set; }
        public string Currency { get; set; } = "TRY";
        public int Capacity { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
    }

    // Payment DTOs
    public class PaymentDto
    {
        public int Id { get; set; }
        public int RegistrationId { get; set; }
        public string PaymentNumber { get; set; } = string.Empty;
        public string PaymentMethod { get; set; } = string.Empty; // Cash, Credit Card, Bank Transfer, etc.
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "TRY";
        public string Status { get; set; } = "Pending"; // Pending, Completed, Failed, Refunded
        public string? TransactionId { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime? ProcessedDate { get; set; }
        public string? ReceiptNumber { get; set; }
        public string? Notes { get; set; }
        public string? FailureReason { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsPending { get; set; }
        public bool IsFailed { get; set; }
        public bool IsRefunded { get; set; }
    }

    public class CreatePaymentRequest
    {
        public int RegistrationId { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "TRY";
        public string? TransactionId { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdatePaymentRequest
    {
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "TRY";
        public string Status { get; set; } = "Pending";
        public string? TransactionId { get; set; }
        public DateTime? ProcessedDate { get; set; }
        public string? ReceiptNumber { get; set; }
        public string? Notes { get; set; }
        public string? FailureReason { get; set; }
        public bool IsActive { get; set; } = true;
    }

    // CampStaff ve StaffRole DTO'ları
    public class CampStaffDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName => $"{FirstName} {LastName}";
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? PhotoPath { get; set; }
        public string? Qualifications { get; set; }
        public string? Experience { get; set; }
        public string? Certifications { get; set; }
        public string? Specializations { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty;
    }

    public class CampStaffListDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string RoleName { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }

    public class CreateCampStaffRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? PhotoPath { get; set; }
        public string? Qualifications { get; set; }
        public string? Experience { get; set; }
        public string? Certifications { get; set; }
        public string? Specializations { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? Notes { get; set; }
        public int RoleId { get; set; }
    }

    public class UpdateCampStaffRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? PhotoPath { get; set; }
        public string? Qualifications { get; set; }
        public string? Experience { get; set; }
        public string? Certifications { get; set; }
        public string? Specializations { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? Notes { get; set; }
        public int RoleId { get; set; }
        public bool IsActive { get; set; }
    }

    public class StaffRoleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Responsibilities { get; set; } = string.Empty;
        public string? Requirements { get; set; }
        public string? Qualifications { get; set; }
        public string? Certifications { get; set; }
        public decimal? HourlyRate { get; set; }
        public string? Color { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public int StaffCount { get; set; }
        public int ActiveStaffCount { get; set; }
    }

    public class CreateStaffRoleRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Responsibilities { get; set; } = string.Empty;
        public string? Requirements { get; set; }
        public string? Qualifications { get; set; }
        public string? Certifications { get; set; }
        public decimal? HourlyRate { get; set; }
        public string? Color { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class UpdateStaffRoleRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Responsibilities { get; set; } = string.Empty;
        public string? Requirements { get; set; }
        public string? Qualifications { get; set; }
        public string? Certifications { get; set; }
        public decimal? HourlyRate { get; set; }
        public string? Color { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; }
    }
} 