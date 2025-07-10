using SporTesisiRezervasyon.API.Models;

namespace SporTesisiRezervasyon.API.Services
{
    public interface ITokenService
    {
        string GenerateToken(ApplicationUser user);
        bool ValidateToken(string token);
    }
} 