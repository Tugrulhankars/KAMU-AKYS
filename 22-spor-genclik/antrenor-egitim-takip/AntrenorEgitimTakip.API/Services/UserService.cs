using AntrenorEgitimTakip.API.Data;
using AntrenorEgitimTakip.API.DTOs;
using AntrenorEgitimTakip.API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace AntrenorEgitimTakip.API.Services
{
    public interface IUserService
    {
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<UserDto?> GetUserByEmailAsync(string email);
        Task<List<UserDto>> GetAllUsersAsync();
        Task<UserDto> CreateUserAsync(RegisterRequest request);
        Task<UserDto> UpdateUserAsync(int id, UpdateUserRequest request);
        Task<bool> DeleteUserAsync(int id);
        Task<bool> ActivateUserAsync(int id);
        Task<bool> DeactivateUserAsync(int id);
        Task<bool> ChangePasswordAsync(int id, string currentPassword, string newPassword);
        Task<bool> ValidateCredentialsAsync(string email, string password);
        Task<UserDto?> GetCurrentUserAsync(int userId);
    }

    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Id == id);

            return user != null ? _mapper.Map<UserDto>(user) : null;
        }

        public async Task<UserDto?> GetUserByEmailAsync(string email)
        {
            var user = await _context.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Email == email);

            return user != null ? _mapper.Map<UserDto>(user) : null;
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            var users = await _context.Users
                .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                .Where(u => u.IsActive)
                .OrderBy(u => u.FirstName)
                .ThenBy(u => u.LastName)
                .ToListAsync();

            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<UserDto> CreateUserAsync(RegisterRequest request)
        {
            // E-posta kontrolü
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                throw new InvalidOperationException("Bu e-posta adresi zaten kullanılıyor.");
            }

            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                DateOfBirth = request.DateOfBirth,
                Gender = request.Gender,
                Department = request.Department,
                Position = request.Position,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Rolleri ekle
            if (request.Roles.Any())
            {
                var roles = await _context.Roles
                    .Where(r => request.Roles.Contains(r.Name))
                    .ToListAsync();

                foreach (var role in roles)
                {
                    var userRole = new UserRole
                    {
                        UserId = user.Id,
                        RoleId = role.Id,
                        AssignedAt = DateTime.UtcNow
                    };
                    _context.UserRoles.Add(userRole);
                }
                await _context.SaveChangesAsync();
            }

            return await GetUserByIdAsync(user.Id) ?? throw new InvalidOperationException("Kullanıcı oluşturulamadı.");
        }

        public async Task<UserDto> UpdateUserAsync(int id, UpdateUserRequest request)
        {
            var user = await _context.Users
                .Include(u => u.UserRoles)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new InvalidOperationException("Kullanıcı bulunamadı.");
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.PhoneNumber = request.PhoneNumber;
            user.Address = request.Address;
            user.DateOfBirth = request.DateOfBirth;
            user.Gender = request.Gender;
            user.Department = request.Department;
            user.Position = request.Position;
            user.IsActive = request.IsActive;
            user.UpdatedAt = DateTime.UtcNow;

            // Rolleri güncelle
            if (request.Roles.Any())
            {
                // Mevcut rolleri kaldır
                _context.UserRoles.RemoveRange(user.UserRoles);

                // Yeni rolleri ekle
                var roles = await _context.Roles
                    .Where(r => request.Roles.Contains(r.Name))
                    .ToListAsync();

                foreach (var role in roles)
                {
                    var userRole = new UserRole
                    {
                        UserId = user.Id,
                        RoleId = role.Id,
                        AssignedAt = DateTime.UtcNow
                    };
                    _context.UserRoles.Add(userRole);
                }
            }

            await _context.SaveChangesAsync();

            return await GetUserByIdAsync(user.Id) ?? throw new InvalidOperationException("Kullanıcı güncellenemedi.");
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            user.IsActive = false;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ActivateUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            user.IsActive = true;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeactivateUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            user.IsActive = false;
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ChangePasswordAsync(int id, string currentPassword, string newPassword)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return false;
            }

            if (!BCrypt.Net.BCrypt.Verify(currentPassword, user.PasswordHash))
            {
                return false;
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            user.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> ValidateCredentialsAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !user.IsActive)
            {
                return false;
            }

            return BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        }

        public async Task<UserDto?> GetCurrentUserAsync(int userId)
        {
            return await GetUserByIdAsync(userId);
        }
    }
} 