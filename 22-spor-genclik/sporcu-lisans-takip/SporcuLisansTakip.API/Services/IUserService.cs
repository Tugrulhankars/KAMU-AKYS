using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Models;

namespace SporcuLisansTakip.API.Services
{
    public interface IUserService
    {
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<UserDto?> GetUserByIdAsync(string id);
        Task<UserDto?> GetUserByEmailAsync(string email);
        Task<List<UserDto>> GetAllUsersAsync();
        Task<bool> UpdateUserAsync(string id, UserDto userDto);
        Task<bool> DeactivateUserAsync(string id);
        Task<bool> ActivateUserAsync(string id);
        Task<bool> ChangePasswordAsync(string userId, string currentPassword, string newPassword);
    }
} 