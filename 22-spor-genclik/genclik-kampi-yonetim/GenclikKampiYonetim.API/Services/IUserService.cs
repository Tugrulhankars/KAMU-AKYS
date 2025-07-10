using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;

namespace GenclikKampiYonetim.API.Services
{
    public interface IUserService
    {
        Task<UserDto> GetByIdAsync(string id);
        Task<UserDto> GetByEmailAsync(string email);
        Task<List<UserListDto>> GetAllAsync();
        Task<UserDto> CreateAsync(CreateUserRequest request);
        Task<UserDto> UpdateAsync(string id, UpdateUserRequest request);
        Task DeleteAsync(string id);
        Task ActivateAsync(string id);
        Task DeactivateAsync(string id);
        Task ChangePasswordAsync(string id, string currentPassword, string newPassword);
        Task<bool> IsEmailUniqueAsync(string email);
        Task<bool> IsIdentityNumberUniqueAsync(string identityNumber);
    }
} 