using System.ComponentModel.DataAnnotations;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Application.DTOs.Assignment;

public class CreateAssignmentDto
{
    [Required(ErrorMessage = "İşlem türü gereklidir")]
    public AssignmentType Type { get; set; }

    public DateTime AssignmentDate { get; set; } = DateTime.UtcNow;
    public DateTime? ReturnDate { get; set; }
    public string Notes { get; set; } = string.Empty;
    public string Condition { get; set; } = string.Empty;

    [Required(ErrorMessage = "Demirbaş seçimi gereklidir")]
    public int AssetId { get; set; }

    [Required(ErrorMessage = "Kullanıcı seçimi gereklidir")]
    public int UserId { get; set; }
} 