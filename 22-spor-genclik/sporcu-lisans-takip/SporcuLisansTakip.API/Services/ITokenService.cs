using SporcuLisansTakip.API.Models;

namespace SporcuLisansTakip.API.Services
{
    public interface ITokenService
    {
        string GenerateJwtToken(ApplicationUser user);
        string GenerateRefreshToken();
        bool ValidateToken(string token);
        string? GetUserIdFromToken(string token);
    }
} 