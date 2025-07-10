using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.Models
{
    public class Sertifika : BaseEntity
    {
        [Required]
        public int AntrenorId { get; set; }

        [Required]
        public int KategoriId { get; set; }

        private string _certificateNumber = string.Empty;
        [Required]
        [StringLength(50)]
        public string CertificateNumber
        {
            get => _certificateNumber;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Certificate number boş olamaz.");
                _certificateNumber = value;
            }
        }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(100)]
        public string? IssuingOrganization { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime? ExpiryDate { get; set; }

        [StringLength(20)]
        public string? Level { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(500)]
        public string? FilePath { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        [StringLength(50)]
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Antrenor Antrenor { get; set; } = null!;
        public virtual SertifikaKategori Kategori { get; set; } = null!;
        public virtual ICollection<SertifikaGereksinim> Gereksinimler { get; set; } = new List<SertifikaGereksinim>();

        // Computed properties
        public bool IsValid => !ExpiryDate.HasValue || ExpiryDate.Value > DateTime.UtcNow;
        public bool IsExpired => ExpiryDate.HasValue && ExpiryDate.Value <= DateTime.UtcNow;
        public int DaysUntilExpiry => ExpiryDate.HasValue ? (ExpiryDate.Value - DateTime.UtcNow).Days : int.MaxValue;
        public bool IsExpiringSoon => DaysUntilExpiry <= 30 && DaysUntilExpiry > 0;
        public int ValidityYears => ExpiryDate.HasValue ? (ExpiryDate.Value - IssueDate).Days / 365 : 0;
    }

    public class SertifikaKategori : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Icon { get; set; }

        [StringLength(20)]
        public string? Color { get; set; }

        public int DisplayOrder { get; set; }

        [StringLength(20)]
        public string? ValidityPeriod { get; set; }

        // Navigation properties
        public virtual ICollection<Sertifika> Certificates { get; set; } = new List<Sertifika>();
        public virtual ICollection<SertifikaGereksinim> Requirements { get; set; } = new List<SertifikaGereksinim>();
    }

    public class SertifikaGereksinim : BaseEntity
    {
        [Required]
        public int CertificateId { get; set; }

        [Required]
        [StringLength(200)]
        public string Requirement { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(20)]
        public string? Type { get; set; }

        public bool IsRequired { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime? CompletionDate { get; set; }

        [StringLength(500)]
        public string? Evidence { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        // Navigation properties
        public virtual Sertifika Certificate { get; set; } = null!;

        // Computed properties
        public bool IsOverdue => IsRequired && !IsCompleted && CompletionDate.HasValue && CompletionDate.Value < DateTime.UtcNow;
        public int DaysSinceCompletion => CompletionDate.HasValue ? (DateTime.UtcNow - CompletionDate.Value).Days : 0;
    }

    public class SertifikaSinav : BaseEntity
    {
        [Required]
        public int CertificateId { get; set; }

        [Required]
        [StringLength(200)]
        public string ExamName { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        public DateTime ExamDate { get; set; }

        [StringLength(100)]
        public string? Location { get; set; }

        private decimal _score;
        [Required]
        [Range(0, 100)]
        public decimal Score
        {
            get => _score;
            set
            {
                if (value < 0 || value > 100)
                    throw new ArgumentException("Score must be between 0 and 100.");
                _score = value;
            }
        }

        private decimal _passingScore;
        [Required]
        [Range(0, 100)]
        public decimal PassingScore
        {
            get => _passingScore;
            set
            {
                if (value < 0 || value > 100)
                    throw new ArgumentException("Passing score must be between 0 and 100.");
                _passingScore = value;
            }
        }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        // Navigation properties
        public virtual Sertifika Certificate { get; set; } = null!;

        // Computed properties
        public bool IsPassed => Score >= PassingScore;
        public bool IsFailed => Score < PassingScore;
        public decimal ScorePercentage => Score;
        public bool IsRecent => ExamDate >= DateTime.UtcNow.AddMonths(-6);
    }

    public class SertifikaBasvuru : BaseEntity
    {
        [Required]
        public int AntrenorId { get; set; }

        [Required]
        public int KategoriId { get; set; }

        public DateTime ApplicationDate { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        public DateTime? ReviewDate { get; set; }

        [StringLength(100)]
        public string? Reviewer { get; set; }

        [StringLength(1000)]
        public string? ReviewNotes { get; set; }

        public DateTime? ApprovalDate { get; set; }

        public DateTime? RejectionDate { get; set; }

        [StringLength(1000)]
        public string? RejectionReason { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        // Navigation properties
        public virtual Antrenor Antrenor { get; set; } = null!;
        public virtual SertifikaKategori Kategori { get; set; } = null!;

        // Computed properties
        public bool IsPending => Status == "Pending";
        public bool IsApproved => Status == "Approved";
        public bool IsRejected => Status == "Rejected";
        public bool IsUnderReview => Status == "Under Review";
        public int DaysSinceApplication => (DateTime.UtcNow - ApplicationDate).Days;
        public bool IsOverdue => DaysSinceApplication > 30 && IsPending;
    }

    public class SertifikaGecmis : BaseEntity
    {
        [Required]
        public int CertificateId { get; set; }

        [Required]
        [StringLength(200)]
        public string Action { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        public DateTime ActionDate { get; set; }

        [StringLength(100)]
        public string? PerformedBy { get; set; }

        [StringLength(20)]
        public string? ActionType { get; set; }

        [StringLength(1000)]
        public string? PreviousValue { get; set; }

        [StringLength(1000)]
        public string? NewValue { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        // Navigation properties
        public virtual Sertifika Certificate { get; set; } = null!;

        // Computed properties
        public bool IsRecent => ActionDate >= DateTime.UtcNow.AddMonths(-3);
        public bool IsImportant => ActionType == "Status Change" || ActionType == "Expiry";
        public int DaysSinceAction => (DateTime.UtcNow - ActionDate).Days;
    }

    public class SertifikaGuncelleme : BaseEntity
    {
        [Required]
        public int SertifikaId { get; set; }

        [Required]
        public DateTime BaslangicTarihi { get; set; }

        [Required]
        public DateTime BitisTarihi { get; set; }

        [StringLength(20)]
        public string? Durum { get; set; }

        [StringLength(1000)]
        public string? Aciklama { get; set; }

        [StringLength(100)]
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Sertifika Sertifika { get; set; } = null!;

        // Computed properties
        public bool IsActive => Durum == "Active";
        public bool IsExpired => BitisTarihi < DateTime.UtcNow;
        public int DaysRemaining => (BitisTarihi - DateTime.UtcNow).Days;
    }
} 