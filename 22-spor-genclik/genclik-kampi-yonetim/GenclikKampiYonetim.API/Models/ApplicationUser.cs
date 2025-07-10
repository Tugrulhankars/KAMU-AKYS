using Microsoft.AspNetCore.Identity;

namespace GenclikKampiYonetim.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; }
        public string UserType { get; set; } = string.Empty; // Admin, Staff, Participant, Parent
        public string? ProfilePhotoPath { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;
        public string? Department { get; set; }
        public string? Position { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? ParentName { get; set; }
        public string? ParentPhone { get; set; }
        public string? ParentEmail { get; set; }
        public string? SchoolName { get; set; }
        public string? Grade { get; set; }
        public string? StudentId { get; set; }
        public string? TeacherName { get; set; }
        public string? TeacherPhone { get; set; }
        public string? TeacherEmail { get; set; }
        public string? Notes { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual ICollection<Registration> Registrations { get; set; } = new List<Registration>();
        public virtual ICollection<CampStaff> CampStaff { get; set; } = new List<CampStaff>();
        public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

        public string FullName => $"{FirstName} {LastName}".Trim();
    }
} 