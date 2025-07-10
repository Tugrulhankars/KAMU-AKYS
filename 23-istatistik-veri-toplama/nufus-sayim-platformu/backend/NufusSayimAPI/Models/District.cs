using System.ComponentModel.DataAnnotations;

namespace NufusSayimAPI.Models;

public class District
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public int CityId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int? CreatedByUserId { get; set; }

    // Navigation properties
    public virtual City City { get; set; } = null!;
    public virtual User? CreatedByUser { get; set; }
    public virtual ICollection<Household> Households { get; set; } = new List<Household>();
} 