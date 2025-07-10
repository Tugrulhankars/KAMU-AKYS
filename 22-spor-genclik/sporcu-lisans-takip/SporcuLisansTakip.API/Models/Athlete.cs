using System.ComponentModel.DataAnnotations;

namespace SporcuLisansTakip.API.Models
{
    public class Athlete
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(11)]
        public string IdentityNumber { get; set; } = string.Empty;
        
        public DateTime DateOfBirth { get; set; }
        
        [MaxLength(20)]
        public string? PhoneNumber { get; set; }
        
        [MaxLength(100)]
        public string? Email { get; set; }
        
        [MaxLength(200)]
        public string? Address { get; set; }
        
        public string Gender { get; set; } = "Erkek"; // Erkek, Kadın
        
        [MaxLength(100)]
        public string? EmergencyContact { get; set; }
        
        [MaxLength(20)]
        public string? EmergencyPhone { get; set; }
        
        [MaxLength(5)]
        public string? BloodType { get; set; }
        
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        
        [MaxLength(500)]
        public string? PhotoPath { get; set; }
        
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public int? ClubId { get; set; }
        public Club? Club { get; set; }
        
        public virtual ICollection<License> Licenses { get; set; } = new List<License>();
        public virtual ICollection<Document> Documents { get; set; } = new List<Document>();
        
        // Computed properties
        public string FullName => $"{FirstName} {LastName}";
        public int Age => DateTime.Now.Year - DateOfBirth.Year - (DateTime.Now.DayOfYear < DateOfBirth.DayOfYear ? 1 : 0);
    }
} 