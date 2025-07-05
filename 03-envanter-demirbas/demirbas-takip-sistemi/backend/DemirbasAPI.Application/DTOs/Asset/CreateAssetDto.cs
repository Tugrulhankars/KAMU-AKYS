using System.ComponentModel.DataAnnotations;

namespace DemirbasAPI.Application.DTOs.Asset;

public class CreateAssetDto
{
    [Required(ErrorMessage = "Demirbaş adı gereklidir")]
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "Demirbaş kodu gereklidir")]
    public string AssetCode { get; set; } = string.Empty;

    public string SerialNumber { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;

    [Range(0, double.MaxValue, ErrorMessage = "Satın alma fiyatı 0'dan büyük olmalıdır")]
    public decimal PurchasePrice { get; set; }

    [Required(ErrorMessage = "Satın alma tarihi gereklidir")]
    public DateTime PurchaseDate { get; set; }

    public string Location { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;

    [Required(ErrorMessage = "Kategori seçimi gereklidir")]
    public int CategoryId { get; set; }
} 