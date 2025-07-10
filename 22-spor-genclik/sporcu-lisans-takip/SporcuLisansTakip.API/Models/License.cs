using System.ComponentModel.DataAnnotations;

namespace SporcuLisansTakip.API.Models
{
    public class License
    {
        public int Id { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string LicenseNumber { get; set; } = string.Empty;
        
        public int AthleteId { get; set; }
        public int SportId { get; set; }
        public int LicenseTypeId { get; set; }
        public int LicenseCategoryId { get; set; }
        
        public DateTime IssueDate { get; set; } = DateTime.UtcNow;
        public DateTime ExpiryDate { get; set; }
        public DateTime? RenewalDate { get; set; }
        
        public string Status { get; set; } = "Active"; // Active, Expired, Suspended, Cancelled
        
        [MaxLength(500)]
        public string? Notes { get; set; }
        
        [MaxLength(500)]
        public string? QrCodePath { get; set; }
        
        [MaxLength(500)]
        public string? PdfPath { get; set; }
        
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public Athlete Athlete { get; set; } = null!;
        public Sport Sport { get; set; } = null!;
        public LicenseType LicenseType { get; set; } = null!;
        public LicenseCategory LicenseCategory { get; set; } = null!;
        
        public string? IssuedById { get; set; }
        public ApplicationUser? IssuedBy { get; set; }
        
        public virtual ICollection<LicenseHistory> History { get; set; } = new List<LicenseHistory>();
        
        // Computed properties
        public bool IsExpired => DateTime.UtcNow > ExpiryDate;
        public bool IsExpiringSoon => DateTime.UtcNow.AddDays(30) > ExpiryDate && !IsExpired;
        public int DaysUntilExpiry => (ExpiryDate - DateTime.UtcNow).Days;
    }
} 