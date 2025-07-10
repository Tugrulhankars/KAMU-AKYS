using AcikVeriPortali.API.Data;
using AcikVeriPortali.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AcikVeriPortali.API.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return false;
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateRoleAsync(int id, string role)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return false;
            user.Role = role;
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 