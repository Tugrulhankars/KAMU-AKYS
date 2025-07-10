using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace SporTesisiRezervasyon.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [MaxLength(11)]
        public string? IdentityNumber { get; set; }

        [MaxLength(200)]
        public string? Address { get; set; }

        public DateTime DateOfBirth { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }

        public bool IsActive { get; set; } = true;

        // Navigation properties
        public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

        // Computed property
        public string FullName => $"{FirstName} {LastName}";
    }
} 