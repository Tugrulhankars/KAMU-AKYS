using DemirbasAPI.Domain.Entities;

namespace DemirbasAPI.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
    bool ValidateToken(string token);
    int? GetUserIdFromToken(string token);
} 