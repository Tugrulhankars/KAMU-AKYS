using System.ComponentModel.DataAnnotations;

namespace SporTesisiRezervasyon.API.Models
{
    public enum ReservationStatus
    {
        Pending = 0,
        Confirmed = 1,
        Cancelled = 2,
        Completed = 3,
        NoShow = 4
    }

    public class Reservation
    {
        public int Id { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

        [Required]
        public ReservationStatus Status { get; set; } = ReservationStatus.Pending;

        [MaxLength(500)]
        public string? Notes { get; set; }

        public decimal TotalPrice { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        // Foreign keys
        public int FacilityId { get; set; }
        public string UserId { get; set; } = string.Empty;

        // Navigation properties
        public virtual Facility Facility { get; set; } = null!;
        public virtual ApplicationUser User { get; set; } = null!;
    }
} 