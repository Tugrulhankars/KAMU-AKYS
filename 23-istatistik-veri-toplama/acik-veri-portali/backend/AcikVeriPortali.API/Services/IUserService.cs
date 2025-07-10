using AcikVeriPortali.API.Models;

namespace AcikVeriPortali.API.Services
{
    public interface IUserService
    {
        Task<User?> GetByIdAsync(int id);
        Task<IEnumerable<User>> GetAllAsync();
        Task<bool> DeleteAsync(int id);
        Task<bool> UpdateRoleAsync(int id, string role);
    }
} 