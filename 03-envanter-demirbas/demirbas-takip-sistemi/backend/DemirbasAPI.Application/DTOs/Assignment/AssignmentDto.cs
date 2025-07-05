using DemirbasAPI.Application.DTOs.Asset;
using DemirbasAPI.Application.DTOs.User;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Application.DTOs.Assignment;

public class AssignmentDto
{
    public int Id { get; set; }
    public AssignmentType Type { get; set; }
    public DateTime AssignmentDate { get; set; }
    public DateTime? ReturnDate { get; set; }
    public string Notes { get; set; } = string.Empty;
    public string Condition { get; set; } = string.Empty;
    public int AssetId { get; set; }
    public AssetDto? Asset { get; set; }
    public int UserId { get; set; }
    public UserDto? User { get; set; }
    public int AssignedByUserId { get; set; }
    public UserDto? AssignedByUser { get; set; }
} 