using SporTesisiRezervasyon.API.DTOs;
using SporTesisiRezervasyon.API.Models;

namespace SporTesisiRezervasyon.API.Services
{
    public interface IUserService
    {
        Task<ApplicationUser?> GetUserByIdAsync(string id);
        Task<ApplicationUser?> GetUserByEmailAsync(string email);
        Task<bool> CreateUserAsync(RegisterRequest request);
        Task<bool> ValidateUserAsync(LoginRequest request);
        Task<IEnumerable<ApplicationUser>> GetAllUsersAsync();
        Task<bool> UpdateUserAsync(string id, RegisterRequest request);
        Task<bool> DeleteUserAsync(string id);
    }
} 