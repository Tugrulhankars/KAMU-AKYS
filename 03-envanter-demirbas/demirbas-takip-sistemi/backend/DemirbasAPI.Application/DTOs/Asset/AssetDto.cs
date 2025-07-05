using DemirbasAPI.Application.DTOs.Category;
using DemirbasAPI.Application.DTOs.User;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Application.DTOs.Asset;

public class AssetDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string AssetCode { get; set; } = string.Empty;
    public string SerialNumber { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public AssetStatus Status { get; set; }
    public string Location { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public CategoryDto? Category { get; set; }
    public UserDto? CurrentAssignedUser { get; set; }
    public DateTime CreatedDate { get; set; }
} 