using System.ComponentModel.DataAnnotations;

namespace SporcuLisansTakip.API.Models
{
    public class LicenseHistory
    {
        public int Id { get; set; }
        public int LicenseId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Action { get; set; } = string.Empty; // Oluşturuldu, Yenilendi, Askıya Alındı, İptal Edildi
        public DateTime ActionDate { get; set; } = DateTime.UtcNow;
        [MaxLength(500)]
        public string? Notes { get; set; }
        public string? ActionById { get; set; }
        public ApplicationUser? ActionBy { get; set; }
        public License License { get; set; } = null!;
    }
} 