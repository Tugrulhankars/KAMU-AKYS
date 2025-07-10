using System.ComponentModel.DataAnnotations;

namespace NufusSayimAPI.Models;

public class User
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Role { get; set; } = "Gözlemci"; // Admin, Görevli, Gözlemci

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;

    // Navigation properties
    public virtual ICollection<City> Cities { get; set; } = new List<City>();
    public virtual ICollection<District> Districts { get; set; } = new List<District>();
} 