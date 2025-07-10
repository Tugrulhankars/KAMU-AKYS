using Microsoft.AspNetCore.Identity;

namespace SporcuLisansTakip.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;
        public string? ProfilePhotoPath { get; set; }
        public string UserType { get; set; } = "Admin"; // Admin, Manager, Staff
    }
} 