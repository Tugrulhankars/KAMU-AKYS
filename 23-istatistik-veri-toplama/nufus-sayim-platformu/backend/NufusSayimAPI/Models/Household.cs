using System.ComponentModel.DataAnnotations;

namespace NufusSayimAPI.Models;

public class Household
{
    public int Id { get; set; }

    [Required]
    [MaxLength(500)]
    public string Address { get; set; } = string.Empty;

    [Required]
    public int DistrictId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public int CreatedByUserId { get; set; }

    public int? UpdatedByUserId { get; set; }

    [MaxLength(200)]
    public string? Notes { get; set; }

    public bool IsActive { get; set; } = true;

    // Navigation properties
    public virtual District District { get; set; } = null!;
    public virtual User CreatedByUser { get; set; } = null!;
    public virtual User? UpdatedByUser { get; set; }
    public virtual ICollection<Person> People { get; set; } = new List<Person>();
} 