using System.ComponentModel.DataAnnotations;

namespace SporTesisiRezervasyon.API.Models
{
    public class FacilitySchedule
    {
        public int Id { get; set; }

        [Required]
        public DayOfWeek DayOfWeek { get; set; }

        [Required]
        public TimeSpan OpenTime { get; set; }

        [Required]
        public TimeSpan CloseTime { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Foreign key
        public int FacilityId { get; set; }

        // Navigation property
        public virtual Facility Facility { get; set; } = null!;
    }
} 