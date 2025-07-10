using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.Models
{
    public class Sporcu : BaseEntity
    {
        [Required]
        public int UserId { get; set; }

        private string _athleteNumber = string.Empty;
        [Required]
        [StringLength(20)]
        public string AthleteNumber
        {
            get => _athleteNumber;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Athlete number boş olamaz.");
                _athleteNumber = value;
            }
        }

        [StringLength(100)]
        public string? LicenseNumber { get; set; }

        [StringLength(50)]
        public string? Sport { get; set; }

        [StringLength(50)]
        public string? Category { get; set; }

        [StringLength(20)]
        public string? Level { get; set; }

        public DateTime? LicenseStartDate { get; set; }

        public DateTime? LicenseEndDate { get; set; }

        [StringLength(100)]
        public string? Club { get; set; }

        [StringLength(100)]
        public string? Team { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual User User { get; set; } = null!;
        public virtual SporcuBilgi? Information { get; set; }
        public virtual ICollection<SporcuAntrenor> TrainerAthletes { get; set; } = new List<SporcuAntrenor>();
        public virtual ICollection<SporcuPerformans> Performances { get; set; } = new List<SporcuPerformans>();
        public virtual ICollection<SporcuYarisma> Competitions { get; set; } = new List<SporcuYarisma>();

        // Computed properties
        public string FullName => User?.FullName ?? string.Empty;
        public bool LicenseValid => LicenseEndDate.HasValue && LicenseEndDate.Value > DateTime.UtcNow;
        public int Age => User != null ? (DateTime.UtcNow.Year - User.DateOfBirth.Year) : 0;
    }

    public class SporcuBilgi : BaseEntity
    {
        [Required]
        public int AthleteId { get; set; }

        [StringLength(100)]
        public string? EducationStatus { get; set; }

        [StringLength(200)]
        public string? School { get; set; }

        [StringLength(100)]
        public string? Grade { get; set; }

        [StringLength(100)]
        public string? ParentName { get; set; }

        [StringLength(20)]
        public string? ParentPhone { get; set; }

        [StringLength(100)]
        public string? ParentEmail { get; set; }

        [StringLength(200)]
        public string? EmergencyContact { get; set; }

        [StringLength(20)]
        public string? EmergencyPhone { get; set; }

        [StringLength(1000)]
        public string? MedicalHistory { get; set; }

        [StringLength(1000)]
        public string? Allergies { get; set; }

        [StringLength(1000)]
        public string? Medications { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        // Navigation properties
        public virtual Sporcu Athlete { get; set; } = null!;
    }

    public class SporcuAntrenor : BaseEntity
    {
        [Required]
        public int SporcuId { get; set; }
        [Required]
        public int AntrenorId { get; set; }
        public DateTime BaslangicTarihi { get; set; }
        public DateTime? BitisTarihi { get; set; }
        public bool IsCurrent { get; set; }
        public int Duration { get; set; }
        // Navigation
        public virtual Sporcu Sporcu { get; set; } = null!;
        public virtual Antrenor Antrenor { get; set; } = null!;
    }

    public class SporcuPerformans : BaseEntity
    {
        [Required]
        public int SporcuId { get; set; }
        [Required]
        public int PerformansId { get; set; }
        public bool IsExcellent { get; set; }
        public bool IsGood { get; set; }
        public bool IsAverage { get; set; }
        public bool IsBelowAverage { get; set; }
        public bool IsPoor { get; set; }
        // Navigation
        public virtual Sporcu Sporcu { get; set; } = null!;
        public virtual Performans Performans { get; set; } = null!;
    }

    public class SporcuYarisma : BaseEntity
    {
        [Required]
        public int SporcuId { get; set; }
        [Required]
        [StringLength(200)]
        public string CompetitionName { get; set; } = string.Empty;
        public DateTime CompetitionDate { get; set; }
        public bool IsWinner { get; set; }
        public bool IsMedalist { get; set; }
        public bool IsRecent { get; set; }
        // Navigation
        public virtual Sporcu Sporcu { get; set; } = null!;
    }
} 