namespace GenclikKampiYonetim.API.Models
{
    public class HealthRecord
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
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Participant Participant { get; set; } = null!;

        // Computed properties
        public bool HasAllergies => !string.IsNullOrEmpty(Allergies);
        public bool HasMedicalConditions => !string.IsNullOrEmpty(MedicalConditions);
        public bool HasMedications => !string.IsNullOrEmpty(Medications);
        public bool HasInsurance => !string.IsNullOrEmpty(InsuranceInfo);
        public bool HasDoctor => !string.IsNullOrEmpty(DoctorName);
        public bool HasHospital => !string.IsNullOrEmpty(HospitalName);
        public bool HasVaccinationHistory => !string.IsNullOrEmpty(VaccinationHistory);
        public bool HasChronicConditions => !string.IsNullOrEmpty(ChronicConditions);
        public bool HasDietaryRestrictions => !string.IsNullOrEmpty(DietaryRestrictions);
        public bool HasPhysicalLimitations => !string.IsNullOrEmpty(PhysicalLimitations);
        public bool HasMentalHealthInfo => !string.IsNullOrEmpty(MentalHealthInfo);
        public bool HasBehavioralInfo => !string.IsNullOrEmpty(BehavioralInfo);
        public bool HasSpecialNeeds => !string.IsNullOrEmpty(SpecialNeeds);
        public bool HasAccommodations => !string.IsNullOrEmpty(Accommodations);
        public string EmergencyInfo => $"{EmergencyContactName} ({EmergencyContactRelationship}) - {EmergencyContactPhone}";
        public string DoctorInfo => $"{DoctorName} - {DoctorPhone}";
        public string HospitalInfo => $"{HospitalName} - {HospitalPhone}";
        public string InsuranceInfoText => $"{InsuranceProvider} - {InsurancePolicyNumber}";
        public bool HasHealthConcerns => HasAllergies || HasMedicalConditions || HasMedications || HasChronicConditions || HasPhysicalLimitations || HasMentalHealthInfo || HasBehavioralInfo || HasSpecialNeeds;
    }
} 