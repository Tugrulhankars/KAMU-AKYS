using DemirbasAPI.Domain.Common;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Domain.Entities;

public class Assignment : BaseEntity
{
    public AssignmentType Type { get; set; } = AssignmentType.Assignment;
    public DateTime AssignmentDate { get; set; } = DateTime.UtcNow;
    public DateTime? ReturnDate { get; set; }
    public string Notes { get; set; } = string.Empty;
    public string Condition { get; set; } = string.Empty; // Teslim alındığında/verildiğinde durumu
    
    // Foreign Keys
    public int AssetId { get; set; }
    public int UserId { get; set; }
    public int AssignedByUserId { get; set; } // Zimmet/İade işlemini yapan kullanıcı

    // Navigation Properties
    public Asset Asset { get; set; } = null!;
    public User User { get; set; } = null!; // Zimmet alan/veren kullanıcı
    public User AssignedByUser { get; set; } = null!; // İşlemi yapan kullanıcı
} 