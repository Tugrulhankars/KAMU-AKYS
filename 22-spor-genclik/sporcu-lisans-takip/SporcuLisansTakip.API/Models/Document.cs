using System.ComponentModel.DataAnnotations;

namespace SporcuLisansTakip.API.Models
{
    public class Document
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string FileName { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string FilePath { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string FileType { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        public long FileSize { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public int AthleteId { get; set; }
        public virtual Athlete Athlete { get; set; } = null!;
    }
} 