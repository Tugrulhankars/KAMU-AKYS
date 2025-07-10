using System.ComponentModel.DataAnnotations;

namespace SporcuLisansTakip.API.Models
{
    public class Club
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [MaxLength(200)]
        public string? Address { get; set; }
        
        [MaxLength(20)]
        public string? PhoneNumber { get; set; }
        
        [MaxLength(100)]
        public string? Email { get; set; }
        
        [MaxLength(200)]
        public string? Website { get; set; }
        
        [MaxLength(500)]
        public string? LogoPath { get; set; }
        
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual ICollection<Athlete> Athletes { get; set; } = new List<Athlete>();
    }
} 