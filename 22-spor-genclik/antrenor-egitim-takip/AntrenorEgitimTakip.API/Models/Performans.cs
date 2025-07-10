using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.Models
{
    public class Performans : BaseEntity
    {
        [Required]
        public int SporcuId { get; set; }

        [Required]
        public int KategoriId { get; set; }

        public DateTime EvaluationDate { get; set; }

        [StringLength(100)]
        public string? Evaluator { get; set; }

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

        [StringLength(20)]
        public string? Level { get; set; }

        [StringLength(1000)]
        public string? Strengths { get; set; }

        [StringLength(1000)]
        public string? AreasForImprovement { get; set; }

        [StringLength(1000)]
        public string? Recommendations { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        [StringLength(50)]
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Sporcu Sporcu { get; set; } = null!;
        public virtual PerformansKategori Kategori { get; set; } = null!;
        public virtual ICollection<PerformansOlcum> Olcumler { get; set; } = new List<PerformansOlcum>();

        // Computed properties
        public bool IsExcellent => Score >= 90;
        public bool IsGood => Score >= 80 && Score < 90;
        public bool IsAverage => Score >= 70 && Score < 80;
        public bool IsBelowAverage => Score >= 60 && Score < 70;
        public bool IsPoor => Score < 60;
        public string PerformanceGrade => Score switch
        {
            >= 90 => "A",
            >= 80 => "B",
            >= 70 => "C",
            >= 60 => "D",
            _ => "F"
        };
    }

    public class PerformansKategori : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Unit { get; set; }

        [StringLength(20)]
        public string? Type { get; set; }

        public int DisplayOrder { get; set; }

        [StringLength(50)]
        public string? Icon { get; set; }

        [StringLength(20)]
        public string? Color { get; set; }

        // Navigation properties
        public virtual ICollection<Performans> Performances { get; set; } = new List<Performans>();
        public virtual ICollection<PerformansHedef> Goals { get; set; } = new List<PerformansHedef>();
    }

    public class PerformansOlcum : BaseEntity
    {
        [Required]
        public int PerformanceId { get; set; }

        [Required]
        [StringLength(100)]
        public string MeasurementName { get; set; } = string.Empty;

        private decimal _value;
        [Required]
        public decimal Value
        {
            get => _value;
            set
            {
                if (value < 0)
                    throw new ArgumentException("Value cannot be negative.");
                _value = value;
            }
        }

        [StringLength(50)]
        public string? Unit { get; set; }

        [StringLength(20)]
        public string? Type { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        // Navigation properties
        public virtual Performans Performance { get; set; } = null!;

        // Computed properties
        public string FormattedValue => $"{Value:F2} {Unit}";
    }

    public class PerformansHedef : BaseEntity
    {
        [Required]
        public int SporcuId { get; set; }

        [Required]
        public int KategoriId { get; set; }

        [Required]
        [StringLength(200)]
        public string Goal { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime TargetDate { get; set; }

        private decimal _targetValue;
        [Required]
        public decimal TargetValue
        {
            get => _targetValue;
            set
            {
                if (value < 0)
                    throw new ArgumentException("Target value cannot be negative.");
                _targetValue = value;
            }
        }

        private decimal _currentValue;
        public decimal CurrentValue
        {
            get => _currentValue;
            set
            {
                if (value < 0)
                    throw new ArgumentException("Current value cannot be negative.");
                _currentValue = value;
            }
        }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(1000)]
        public string? ActionPlan { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        // Navigation properties
        public virtual Sporcu Sporcu { get; set; } = null!;
        public virtual PerformansKategori Kategori { get; set; } = null!;

        // Computed properties
        public bool IsCompleted => Status == "Completed";
        public bool IsOverdue => TargetDate < DateTime.UtcNow && !IsCompleted;
        public decimal ProgressPercentage => TargetValue > 0 ? (CurrentValue / TargetValue) * 100 : 0;
        public int RemainingDays => (TargetDate - DateTime.UtcNow).Days;
        public bool IsOnTrack => ProgressPercentage >= (decimal)((DateTime.UtcNow - StartDate).TotalDays / (TargetDate - StartDate).TotalDays * 100);
    }

    public class PerformansRapor : BaseEntity
    {
        [Required]
        public int AthleteId { get; set; }

        public DateTime ReportDate { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Summary { get; set; }

        [StringLength(20)]
        public string? Period { get; set; }

        [StringLength(100)]
        public string? Author { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(1000)]
        public string? KeyFindings { get; set; }

        [StringLength(1000)]
        public string? Recommendations { get; set; }

        [StringLength(1000)]
        public string? ActionItems { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        // Navigation properties
        public virtual Sporcu Athlete { get; set; } = null!;

        // Computed properties
        public bool IsRecent => ReportDate >= DateTime.UtcNow.AddMonths(-3);
        public bool IsDraft => Status == "Draft";
        public bool IsFinalized => Status == "Finalized";
    }

    public class PerformansGrafik : BaseEntity
    {
        [Required]
        public int AthleteId { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string ChartType { get; set; } = string.Empty;

        [StringLength(200)]
        public string? Title { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [StringLength(20)]
        public string? TimeUnit { get; set; }

        [StringLength(1000)]
        public string? DataPoints { get; set; }

        [StringLength(1000)]
        public string? Configuration { get; set; }

        [StringLength(50)]
        public string? CreatedBy { get; set; }

        // Navigation properties
        public virtual Sporcu Athlete { get; set; } = null!;
        public virtual PerformansKategori Category { get; set; } = null!;

        // Computed properties
        public bool IsCurrentPeriod => StartDate <= DateTime.UtcNow && EndDate >= DateTime.UtcNow;
        public int DurationDays => (EndDate - StartDate).Days;
    }

    public class PerformansDonemi : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(1000)]
        public string? Criteria { get; set; }

        // Navigation properties
        public virtual ICollection<Performans> Performances { get; set; } = new List<Performans>();

        // Computed properties
        public bool IsCurrent => StartDate <= DateTime.UtcNow && EndDate >= DateTime.UtcNow;
        public bool HasEnded => EndDate < DateTime.UtcNow;
        public int RemainingDays => (EndDate - DateTime.UtcNow).Days;
        public int TotalDays => (EndDate - StartDate).Days;
    }

    public class PerformansDetay : BaseEntity
    {
        [Required]
        public int PerformanceId { get; set; }
        [Required]
        public int CriterionId { get; set; }
        [Required]
        [Range(0, 100)]
        public decimal Score { get; set; }
        [StringLength(1000)]
        public string? Comments { get; set; }
        [StringLength(100)]
        public string? Evidence { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsSuccessful { get; set; }
        // Navigation
        public virtual Performans Performance { get; set; } = null!;
        public virtual PerformansKriter Criterion { get; set; } = null!;
    }

    public class PerformansKriter : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [StringLength(1000)]
        public string? Description { get; set; }
        public string? Category { get; set; }
        public int Weight { get; set; }
        public string? Type { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        // Navigation
        public virtual ICollection<PerformansDetay> Details { get; set; } = new List<PerformansDetay>();
    }
} 