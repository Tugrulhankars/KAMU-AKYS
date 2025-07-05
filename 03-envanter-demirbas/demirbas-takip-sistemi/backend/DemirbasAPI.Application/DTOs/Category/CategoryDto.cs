using System.Collections.Generic;

namespace DemirbasAPI.Application.DTOs.Category;

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public int AssetCount { get; set; } // Bu kategoriye bağlı demirbaş sayısı
} 