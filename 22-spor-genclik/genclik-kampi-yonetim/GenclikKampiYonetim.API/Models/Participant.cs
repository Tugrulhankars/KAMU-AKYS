namespace GenclikKampiYonetim.API.Models
{
    public class Participant
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string IdentityNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? EmergencyContactRelationship { get; set; }
        public string? PhotoPath { get; set; }
        public string? ParentConsentPath { get; set; }
        public string? HealthReportPath { get; set; }
        public string? SchoolName { get; set; }
        public string? Grade { get; set; }
        public string? StudentId { get; set; }
        public string? ParentName { get; set; }
        public string? ParentPhone { get; set; }
        public string? ParentEmail { get; set; }
        public string? TeacherName { get; set; }
        public string? TeacherPhone { get; set; }
        public string? TeacherEmail { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public string? Province { get; set; }
        public string? City { get; set; }

        // Navigation properties
        public virtual ICollection<Registration> Registrations { get; set; } = new List<Registration>();
        public virtual ICollection<ParticipantActivity> ParticipantActivities { get; set; } = new List<ParticipantActivity>();
        public virtual ICollection<EmergencyContact> EmergencyContacts { get; set; } = new List<EmergencyContact>();
        public virtual ICollection<HealthRecord> HealthRecords { get; set; } = new List<HealthRecord>();

        // Computed properties
        public string FullName => $"{FirstName} {LastName}".Trim();
        public int Age => DateTime.UtcNow.Year - DateOfBirth.Year - (DateTime.UtcNow < DateOfBirth.AddYears(DateTime.UtcNow.Year - DateOfBirth.Year) ? 1 : 0);
        public int RegistrationCount => Registrations.Count(r => r.Status == "Confirmed");
        public bool HasActiveRegistration => Registrations.Any(r => r.Status == "Confirmed" && r.Camp.IsOngoing);
    }
} 