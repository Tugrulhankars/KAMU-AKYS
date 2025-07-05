using DemirbasAPI.Domain.Common;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Domain.Entities;

public class Asset : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string AssetCode { get; set; } = string.Empty; // Demirbaş kodu (unique)
    public string SerialNumber { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public AssetStatus Status { get; set; } = AssetStatus.Available;
    public string Location { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    
    // Foreign Keys
    public int CategoryId { get; set; }
    public int? CurrentAssignedUserId { get; set; } // Şu anda zimmetli olduğu kullanıcı

    // Navigation Properties
    public Category Category { get; set; } = null!;
    public User? CurrentAssignedUser { get; set; }
    public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
} 