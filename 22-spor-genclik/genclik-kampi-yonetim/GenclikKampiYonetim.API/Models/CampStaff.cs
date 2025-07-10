namespace GenclikKampiYonetim.API.Models
{
    public class CampStaff
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
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
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual StaffRole Role { get; set; } = null!;
        public virtual ICollection<Camp> AssignedCamps { get; set; } = new List<Camp>();

        // Computed properties
        public string FullName => $"{FirstName} {LastName}".Trim();
        public int Age => DateOfBirth.HasValue ? DateTime.UtcNow.Year - DateOfBirth.Value.Year - (DateTime.UtcNow < DateOfBirth.Value.AddYears(DateTime.UtcNow.Year - DateOfBirth.Value.Year) ? 1 : 0) : 0;
        public int AssignedCampCount => AssignedCamps.Count;
        public bool HasActiveAssignments => AssignedCamps.Any(c => c.IsActive && c.IsOngoing);
        public string ContactInfo => $"{FullName} - {PhoneNumber}";
        public string EmergencyInfo => $"{EmergencyContact} - {EmergencyPhone}";
    }
} 