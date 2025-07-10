using AcikVeriPortali.API.DTOs;
using AcikVeriPortali.API.Models;

namespace AcikVeriPortali.API.Services
{
    public interface IAuthService
    {
        Task<AuthResponse?> LoginAsync(LoginRequest request);
        Task<AuthResponse?> RegisterAsync(RegisterRequest request);
        string GenerateJwtToken(User user);
    }
} 