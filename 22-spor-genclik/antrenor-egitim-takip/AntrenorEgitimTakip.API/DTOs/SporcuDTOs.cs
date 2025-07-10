using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.DTOs
{
    public class CreateSporcuDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(20)]
        public string SporcuNumarasi { get; set; } = string.Empty;

        [StringLength(100)]
        public string? LicenseNumber { get; set; }

        [StringLength(50)]
        public string? Sport { get; set; }

        [StringLength(50)]
        public string? Kategori { get; set; }

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

        // User properties
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = string.Empty;

        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        [StringLength(200)]
        public string? Address { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [StringLength(10)]
        public string? Gender { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;
    }

    public class UpdateSporcuDto
    {
        [StringLength(20)]
        public string? SporcuNumarasi { get; set; }

        [StringLength(100)]
        public string? LicenseNumber { get; set; }

        [StringLength(50)]
        public string? Sport { get; set; }

        [StringLength(50)]
        public string? Kategori { get; set; }

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

        // User properties
        [StringLength(50)]
        public string? FirstName { get; set; }

        [StringLength(50)]
        public string? LastName { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        [StringLength(200)]
        public string? Address { get; set; }

        public DateTime? DateOfBirth { get; set; }

        [StringLength(10)]
        public string? Gender { get; set; }

        public bool? IsActive { get; set; }
    }

    public class CreateSporcuAntrenorDto
    {
        [Required]
        public int SporcuId { get; set; }

        [Required]
        public int AntrenorId { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }
    }

    public class UpdateSporcuAntrenorDto
    {
        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        public bool? IsActive { get; set; }
    }

    public class CreateSporcuPerformansDto
    {
        [Required]
        public int SporcuId { get; set; }

        [Required]
        public DateTime EvaluationDate { get; set; }

        [StringLength(100)]
        public string? Evaluator { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal TechnicalScore { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal PhysicalScore { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal MentalScore { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal OverallScore { get; set; }

        [StringLength(20)]
        public string? PerformanceLevel { get; set; }

        [StringLength(1000)]
        public string? Strengths { get; set; }

        [StringLength(1000)]
        public string? AreasForImprovement { get; set; }

        [StringLength(1000)]
        public string? Goals { get; set; }

        [StringLength(1000)]
        public string? Comments { get; set; }
    }

    public class UpdateSporcuPerformansDto
    {
        public DateTime? EvaluationDate { get; set; }

        [StringLength(100)]
        public string? Evaluator { get; set; }

        [Range(0, 100)]
        public decimal? TechnicalScore { get; set; }

        [Range(0, 100)]
        public decimal? PhysicalScore { get; set; }

        [Range(0, 100)]
        public decimal? MentalScore { get; set; }

        [Range(0, 100)]
        public decimal? OverallScore { get; set; }

        [StringLength(20)]
        public string? PerformanceLevel { get; set; }

        [StringLength(1000)]
        public string? Strengths { get; set; }

        [StringLength(1000)]
        public string? AreasForImprovement { get; set; }

        [StringLength(1000)]
        public string? Goals { get; set; }

        [StringLength(1000)]
        public string? Comments { get; set; }

        public bool? IsActive { get; set; }
    }

    public class CreateSporcuYarismaDto
    {
        [Required]
        public int SporcuId { get; set; }

        [Required]
        [StringLength(100)]
        public string CompetitionName { get; set; } = string.Empty;

        [Required]
        public DateTime CompetitionDate { get; set; }

        [StringLength(100)]
        public string? Location { get; set; }

        [StringLength(20)]
        public string? Result { get; set; }

        public decimal? Score { get; set; }

        [StringLength(100)]
        public string? Medal { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }
    }

    public class UpdateSporcuYarismaDto
    {
        [StringLength(100)]
        public string? CompetitionName { get; set; }

        public DateTime? CompetitionDate { get; set; }

        [StringLength(100)]
        public string? Location { get; set; }

        [StringLength(20)]
        public string? Result { get; set; }

        public decimal? Score { get; set; }

        [StringLength(100)]
        public string? Medal { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        public bool? IsActive { get; set; }
    }

    public class SporcuAntrenorDto
    {
        public int Id { get; set; }
        public int SporcuId { get; set; }
        public int AntrenorId { get; set; }
        public DateTime BaslangicTarihi { get; set; }
        public DateTime? BitisTarihi { get; set; }
        public bool IsCurrent { get; set; }
        public int Duration { get; set; }
    }

    public class SporcuPerformansDto
    {
        public int Id { get; set; }
        public int SporcuId { get; set; }
        public int PerformansId { get; set; }
        public bool IsExcellent { get; set; }
        public bool IsGood { get; set; }
        public bool IsAverage { get; set; }
        public bool IsBelowAverage { get; set; }
        public bool IsPoor { get; set; }
    }

    public class SporcuYarismaDto
    {
        public int Id { get; set; }
        public int SporcuId { get; set; }
        public string CompetitionName { get; set; } = string.Empty;
        public DateTime CompetitionDate { get; set; }
        public bool IsWinner { get; set; }
        public bool IsMedalist { get; set; }
        public bool IsRecent { get; set; }
    }
} 