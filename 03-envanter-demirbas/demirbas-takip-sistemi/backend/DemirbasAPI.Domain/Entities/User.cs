using DemirbasAPI.Domain.Common;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Domain.Entities;

public class User : BaseEntity
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Personel;
    public bool IsActive { get; set; } = true;

    // Navigation Properties
    public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
} 