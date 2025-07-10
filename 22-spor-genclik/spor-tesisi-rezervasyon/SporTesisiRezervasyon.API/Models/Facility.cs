using System.ComponentModel.DataAnnotations;

namespace SporTesisiRezervasyon.API.Models
{
    public class Facility
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [Required]
        [MaxLength(200)]
        public string Address { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? PhoneNumber { get; set; }

        [MaxLength(100)]
        [EmailAddress]
        public string? Email { get; set; }

        public int Capacity { get; set; }

        [Range(0, double.MaxValue)]
        public decimal HourlyRate { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Foreign key
        public int FacilityTypeId { get; set; }

        // Navigation properties
        public virtual FacilityType FacilityType { get; set; } = null!;
        public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
        public virtual ICollection<FacilitySchedule> Schedules { get; set; } = new List<FacilitySchedule>();
    }
} 