using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.Models
{
    public class Antrenor : BaseEntity
    {
        [Required]
        public int UserId { get; set; }

        private string _trainerNumber = string.Empty;
        [Required]
        [StringLength(20)]
        public string TrainerNumber
        {
            get => _trainerNumber;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Trainer number boş olamaz.");
                _trainerNumber = value;
            }
        }

        [StringLength(100)]
        public string? LicenseNumber { get; set; }

        [StringLength(50)]
        public string? ExpertiseArea { get; set; }

        [StringLength(20)]
        public string? Level { get; set; }

        public DateTime? LicenseStartDate { get; set; }
        public DateTime? LicenseEndDate { get; set; }

        [StringLength(100)]
        public string? LicenseIssuingAuthority { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual User User { get; set; } = null!;
        public virtual AntrenorBilgi? Bilgi { get; set; }
        public virtual ICollection<AntrenorUzmanlik> Uzmanliklar { get; set; } = new List<AntrenorUzmanlik>();
        public virtual ICollection<AntrenorDeneyim> Deneyimler { get; set; } = new List<AntrenorDeneyim>();
        public virtual ICollection<EgitimKayit> EgitimKayitlari { get; set; } = new List<EgitimKayit>();
        public virtual ICollection<Sertifika> Sertifikalar { get; set; } = new List<Sertifika>();
        public virtual ICollection<Performans> Performanslar { get; set; } = new List<Performans>();
        public virtual ICollection<SporcuAntrenor> SporcuAntrenorler { get; set; } = new List<SporcuAntrenor>();

        // Computed properties
        public string FullName => User?.FullName ?? string.Empty;
        public bool LicenseValid => LicenseEndDate.HasValue && LicenseEndDate.Value > DateTime.UtcNow;
        public int ExperienceYears => Deneyimler?.Sum(d => d.TotalDuration) ?? 0;
    }

    public class AntrenorBilgi : BaseEntity
    {
        [Required]
        public int AntrenorId { get; set; }

        [StringLength(100)]
        public string? EducationStatus { get; set; }
        [StringLength(200)]
        public string? GraduatedSchool { get; set; }
        [StringLength(100)]
        public string? Department { get; set; }
        public DateTime? GraduationDate { get; set; }
        [StringLength(1000)]
        public string? Certificates { get; set; }
        [StringLength(1000)]
        public string? Courses { get; set; }
        [StringLength(1000)]
        public string? References { get; set; }
        [StringLength(500)]
        public string? Hobbies { get; set; }
        [StringLength(1000)]
        public string? Notes { get; set; }
        public virtual Antrenor Antrenor { get; set; } = null!;
    }

    public class AntrenorUzmanlik : BaseEntity
    {
        [Required]
        public int AntrenorId { get; set; }
        [Required]
        public int UzmanlikId { get; set; }
        [StringLength(20)]
        public string? Level { get; set; }
        public virtual Antrenor Antrenor { get; set; } = null!;
        public virtual Uzmanlik Uzmanlik { get; set; } = null!;
    }

    public class Uzmanlik : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [StringLength(500)]
        public string? Description { get; set; }
        [StringLength(50)]
        public string? Category { get; set; }
        public virtual ICollection<AntrenorUzmanlik> AntrenorUzmanliklar { get; set; } = new List<AntrenorUzmanlik>();
    }

    public class AntrenorDeneyim : BaseEntity
    {
        [Required]
        public int AntrenorId { get; set; }
        [Required]
        [StringLength(200)]
        public string InstitutionName { get; set; } = string.Empty;
        [StringLength(100)]
        public string? Position { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Duration { get; set; } // Ay cinsinden
        [StringLength(1000)]
        public string? Responsibilities { get; set; }
        [StringLength(1000)]
        public string? Achievements { get; set; }
        [StringLength(100)]
        public string? ReferencePerson { get; set; }
        [StringLength(20)]
        public string? ReferencePhone { get; set; }
        public virtual Antrenor Antrenor { get; set; } = null!;
        public bool IsOngoing => !EndDate.HasValue;
        public int TotalDuration => IsOngoing ? (DateTime.UtcNow - StartDate).Days / 30 : (EndDate!.Value - StartDate).Days / 30;
    }
} 