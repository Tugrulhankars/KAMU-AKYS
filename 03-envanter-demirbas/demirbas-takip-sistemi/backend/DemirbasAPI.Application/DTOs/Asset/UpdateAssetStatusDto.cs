using System.ComponentModel.DataAnnotations;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Application.DTOs.Asset;

public class UpdateAssetStatusDto
{
    [Required(ErrorMessage = "Durum seçimi gereklidir")]
    public AssetStatus Status { get; set; }
} 