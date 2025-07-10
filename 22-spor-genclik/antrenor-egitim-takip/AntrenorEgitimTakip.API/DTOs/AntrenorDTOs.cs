using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.DTOs
{
    public class AntrenorDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string AntrenorNumarasi { get; set; } = string.Empty;
        public string? LicenseNumber { get; set; }
        public string? ExpertiseArea { get; set; }
        public string? Level { get; set; }
        public DateTime? LicenseStartDate { get; set; }
        public DateTime? LicenseEndDate { get; set; }
        public string? LicenseIssuingAuthority { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }
        
        // User properties
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string AntrenorAdSoyad => $"{FirstName} {LastName}";
        public bool LicenseValid => LicenseEndDate.HasValue && LicenseEndDate.Value > DateTime.UtcNow;
        
        // Related data
        public AntrenorBilgiDto? Bilgi { get; set; }
        public List<AntrenorUzmanlikDto> Uzmanliklar { get; set; } = new List<AntrenorUzmanlikDto>();
        public List<AntrenorDeneyimDto> Deneyimler { get; set; } = new List<AntrenorDeneyimDto>();
        public List<SertifikaDto> Sertifikalar { get; set; } = new List<SertifikaDto>();
        public List<PerformansDto> Performanslar { get; set; } = new List<PerformansDto>();
        public int ExperienceYears { get; set; }
    }

    public class CreateAntrenorDto
    {
        [Required]
        [StringLength(20)]
        public string AntrenorNumarasi { get; set; } = string.Empty;

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

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;
    }

    public class UpdateAntrenorDto
    {
        [StringLength(20)]
        public string? AntrenorNumarasi { get; set; }

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
    }

    public class AntrenorBilgiDto
    {
        public int Id { get; set; }
        public int AntrenorId { get; set; }
        public string? EducationStatus { get; set; }
        public string? GraduatedSchool { get; set; }
        public string? Department { get; set; }
        public DateTime? GraduationDate { get; set; }
        public string? Certificates { get; set; }
        public string? Courses { get; set; }
        public string? References { get; set; }
        public string? Hobbies { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateAntrenorBilgiDto
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
    }

    public class UpdateAntrenorBilgiDto
    {
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
    }

    public class AntrenorUzmanlikDto
    {
        public int Id { get; set; }
        public int AntrenorId { get; set; }
        public int UzmanlikId { get; set; }
        public string? Level { get; set; }
        public DateTime CreatedAt { get; set; }
        public string UzmanlikName { get; set; } = string.Empty;
        public string? UzmanlikDescription { get; set; }
        public string? UzmanlikCategory { get; set; }
    }

    public class CreateAntrenorUzmanlikDto
    {
        [Required]
        public int AntrenorId { get; set; }

        [Required]
        public int UzmanlikId { get; set; }

        [StringLength(20)]
        public string? Level { get; set; }
    }

    public class AntrenorDeneyimDto
    {
        public int Id { get; set; }
        public int AntrenorId { get; set; }
        public string InstitutionName { get; set; } = string.Empty;
        public string? Position { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Duration { get; set; }
        public string? Responsibilities { get; set; }
        public string? Achievements { get; set; }
        public string? ReferencePerson { get; set; }
        public string? ReferencePhone { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsOngoing { get; set; }
        public int TotalDuration { get; set; }
    }

    public class CreateAntrenorDeneyimDto
    {
        [Required]
        public int AntrenorId { get; set; }

        [Required]
        [StringLength(200)]
        public string InstitutionName { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Position { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int Duration { get; set; }

        [StringLength(1000)]
        public string? Responsibilities { get; set; }

        [StringLength(1000)]
        public string? Achievements { get; set; }

        [StringLength(100)]
        public string? ReferencePerson { get; set; }

        [StringLength(20)]
        public string? ReferencePhone { get; set; }
    }

    public class UpdateAntrenorDeneyimDto
    {
        [StringLength(200)]
        public string? InstitutionName { get; set; }

        [StringLength(100)]
        public string? Position { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Duration { get; set; }

        [StringLength(1000)]
        public string? Responsibilities { get; set; }

        [StringLength(1000)]
        public string? Achievements { get; set; }

        [StringLength(100)]
        public string? ReferencePerson { get; set; }

        [StringLength(20)]
        public string? ReferencePhone { get; set; }
    }

    public class UzmanlikDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Category { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateUzmanlikDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Category { get; set; }
    }

    public class UpdateUzmanlikDto
    {
        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Category { get; set; }

        public bool? IsActive { get; set; }
    }

    public class PerformansDto
    {
        public int Id { get; set; }
        public int AntrenorId { get; set; }
        public DateTime AssessmentDate { get; set; }
        public decimal TechnicalSkillScore { get; set; }
        public decimal CommunicationScore { get; set; }
        public decimal LeadershipScore { get; set; }
        public decimal AdaptabilityScore { get; set; }
        public decimal OverallScore { get; set; }
        public string? Comments { get; set; }
        public string? AssessorName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        
        // Computed properties for AutoMapper
        public string? TrainerName { get; set; }
        public bool IsExcellent { get; set; }
        public bool IsGood { get; set; }
        public bool IsAverage { get; set; }
        public bool IsBelowAverage { get; set; }
        public bool IsPoor { get; set; }
        public string? PerformanceCategory { get; set; }
    }
} 