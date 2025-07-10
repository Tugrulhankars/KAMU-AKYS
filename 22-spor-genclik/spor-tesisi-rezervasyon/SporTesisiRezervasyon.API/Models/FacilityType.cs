using System.ComponentModel.DataAnnotations;

namespace SporTesisiRezervasyon.API.Models
{
    public class FacilityType
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Facility> Facilities { get; set; } = new List<Facility>();
    }
} 