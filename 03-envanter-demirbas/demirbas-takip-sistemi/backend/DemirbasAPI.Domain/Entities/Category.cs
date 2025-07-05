using DemirbasAPI.Domain.Common;

namespace DemirbasAPI.Domain.Entities;

public class Category : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty; // Kategori kodu (örn: BLG-001)

    // Navigation Properties
    public ICollection<Asset> Assets { get; set; } = new List<Asset>();
} 