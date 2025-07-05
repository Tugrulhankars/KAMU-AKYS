using System.ComponentModel.DataAnnotations;

namespace DemirbasAPI.Application.DTOs.Category;

public class CreateCategoryDto
{
    [Required(ErrorMessage = "Kategori adı gereklidir")]
    [StringLength(100, ErrorMessage = "Kategori adı en fazla 100 karakter olabilir")]
    public string Name { get; set; } = string.Empty;

    [StringLength(500, ErrorMessage = "Açıklama en fazla 500 karakter olabilir")]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "Kategori kodu gereklidir")]
    [StringLength(20, ErrorMessage = "Kategori kodu en fazla 20 karakter olabilir")]
    public string Code { get; set; } = string.Empty;
} 