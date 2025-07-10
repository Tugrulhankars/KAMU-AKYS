using System.ComponentModel.DataAnnotations;

namespace NufusSayimAPI.Models;

public class Person
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Surname { get; set; } = string.Empty;

    [Required]
    public DateTime BirthDate { get; set; }

    [Required]
    [MaxLength(10)]
    public string Gender { get; set; } = string.Empty; // Erkek, Kadın

    [Required]
    public int HouseholdId { get; set; }

    [MaxLength(11)]
    public string? NationalId { get; set; } // TC Kimlik No (opsiyonel)

    [MaxLength(20)]
    public string? PhoneNumber { get; set; }

    [MaxLength(100)]
    public string? Email { get; set; }

    [MaxLength(100)]
    public string? Occupation { get; set; } // Meslek

    [MaxLength(50)]
    public string? MaritalStatus { get; set; } // Medeni Durum

    [MaxLength(50)]
    public string? EducationLevel { get; set; } // Eğitim Durumu

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public int CreatedByUserId { get; set; }

    public int? UpdatedByUserId { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation properties
    public virtual Household Household { get; set; } = null!;
    public virtual User CreatedByUser { get; set; } = null!;
    public virtual User? UpdatedByUser { get; set; }

    // Calculated property
    public int Age => DateTime.UtcNow.Year - BirthDate.Year;
} 