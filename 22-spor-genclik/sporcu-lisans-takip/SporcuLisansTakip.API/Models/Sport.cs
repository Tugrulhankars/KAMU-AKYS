using System.ComponentModel.DataAnnotations;

namespace SporcuLisansTakip.API.Models
{
    public class Sport
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(500)]
        public string? Description { get; set; }
        
        [MaxLength(500)]
        public string? IconPath { get; set; }
        
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual ICollection<License> Licenses { get; set; } = new List<License>();
    }
} 