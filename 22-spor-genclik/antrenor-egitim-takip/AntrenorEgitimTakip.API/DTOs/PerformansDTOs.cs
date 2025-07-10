using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.DTOs
{


    public class CreatePerformansDto
    {
        [Required]
        public int AntrenorId { get; set; }

        [Required]
        public int EvaluationPeriodId { get; set; }

        [Required]
        public DateTime EvaluationDate { get; set; }

        [StringLength(100)]
        public string? Evaluator { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal TechnicalScore { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal CommunicationScore { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal LeadershipScore { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal InnovationScore { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal TeamworkScore { get; set; }

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

    public class UpdatePerformansDto
    {
        public DateTime? EvaluationDate { get; set; }

        [StringLength(100)]
        public string? Evaluator { get; set; }

        [Range(0, 100)]
        public decimal? TechnicalScore { get; set; }

        [Range(0, 100)]
        public decimal? CommunicationScore { get; set; }

        [Range(0, 100)]
        public decimal? LeadershipScore { get; set; }

        [Range(0, 100)]
        public decimal? InnovationScore { get; set; }

        [Range(0, 100)]
        public decimal? TeamworkScore { get; set; }

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

    public class PerformansDonemiDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Status { get; set; }
        public string? Criteria { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsCurrent { get; set; }
        public bool HasEnded { get; set; }
        public int RemainingDays { get; set; }
    }

    public class CreatePerformansDonemiDto
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
    }

    public class UpdatePerformansDonemiDto
    {
        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [StringLength(1000)]
        public string? Criteria { get; set; }

        public bool? IsActive { get; set; }
    }

    public class PerformansDetayDto
    {
        public int Id { get; set; }
        public int PerformanceId { get; set; }
        public int CriterionId { get; set; }
        public decimal Score { get; set; }
        public string? Comments { get; set; }
        public string? Evidence { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsSuccessful { get; set; }
    }

    public class CreatePerformansDetayDto
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
    }

    public class UpdatePerformansDetayDto
    {
        [Range(0, 100)]
        public decimal? Score { get; set; }

        [StringLength(1000)]
        public string? Comments { get; set; }

        [StringLength(100)]
        public string? Evidence { get; set; }
    }

    public class PerformansKriterDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Category { get; set; }
        public int Weight { get; set; }
        public string? Type { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreatePerformansKriterDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(100)]
        public string? Category { get; set; }

        [Required]
        [Range(1, 100)]
        public int Weight { get; set; }

        [StringLength(20)]
        public string? Type { get; set; }
    }

    public class UpdatePerformansKriterDto
    {
        [StringLength(200)]
        public string? Name { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(100)]
        public string? Category { get; set; }

        [Range(1, 100)]
        public int? Weight { get; set; }

        [StringLength(20)]
        public string? Type { get; set; }

        public bool? IsActive { get; set; }
    }

    public class PerformansHedefDto
    {
        public int Id { get; set; }
        public int AntrenorId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime TargetDate { get; set; }
        public DateTime? CompletionDate { get; set; }
        public string? Status { get; set; }
        public decimal Progress { get; set; }
        public string? Kategori { get; set; }
        public string? Priority { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsOverdue { get; set; }
        public int DaysUntilTarget { get; set; }
        public bool IsUrgent { get; set; }
    }

    public class CreatePerformansHedefDto
    {
        [Required]
        public int AntrenorId { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime TargetDate { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [Range(0, 100)]
        public decimal Progress { get; set; } = 0;

        [StringLength(100)]
        public string? Kategori { get; set; }

        [StringLength(20)]
        public string? Priority { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }
    }

    public class UpdatePerformansHedefDto
    {
        [StringLength(200)]
        public string? Title { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? TargetDate { get; set; }

        public DateTime? CompletionDate { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        [Range(0, 100)]
        public decimal? Progress { get; set; }

        [StringLength(100)]
        public string? Kategori { get; set; }

        [StringLength(20)]
        public string? Priority { get; set; }

        [StringLength(1000)]
        public string? Notes { get; set; }

        public bool? IsActive { get; set; }
    }
} 