using AutoMapper;
using Microsoft.AspNetCore.Identity;
using GenclikKampiYonetim.API.Data;
using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GenclikKampiYonetim.API.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public UserService(UserManager<ApplicationUser> userManager, IMapper mapper, ApplicationDbContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }

        public async Task<UserDto> GetByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new ArgumentException("Kullanıcı bulunamadı");

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Age = user.DateOfBirth.HasValue ? DateTime.UtcNow.Year - user.DateOfBirth.Value.Year - (DateTime.UtcNow < user.DateOfBirth.Value.AddYears(DateTime.UtcNow.Year - user.DateOfBirth.Value.Year) ? 1 : 0) : null;
            userDto.RegistrationCount = user.Registrations.Count(r => r.Status == "Confirmed");
            userDto.HasActiveRegistration = user.Registrations.Any(r => r.Status == "Confirmed" && r.Camp.IsOngoing);

            return userDto;
        }

        public async Task<UserDto> GetByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                throw new ArgumentException("Kullanıcı bulunamadı");

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Age = user.DateOfBirth.HasValue ? DateTime.UtcNow.Year - user.DateOfBirth.Value.Year - (DateTime.UtcNow < user.DateOfBirth.Value.AddYears(DateTime.UtcNow.Year - user.DateOfBirth.Value.Year) ? 1 : 0) : null;
            userDto.RegistrationCount = user.Registrations.Count(r => r.Status == "Confirmed");
            userDto.HasActiveRegistration = user.Registrations.Any(r => r.Status == "Confirmed" && r.Camp.IsOngoing);

            return userDto;
        }

        public async Task<List<UserListDto>> GetAllAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            var userListDtos = new List<UserListDto>();

            foreach (var user in users)
            {
                var userListDto = _mapper.Map<UserListDto>(user);
                userListDto.RegistrationCount = user.Registrations.Count(r => r.Status == "Confirmed");
                userListDto.HasActiveRegistration = user.Registrations.Any(r => r.Status == "Confirmed" && r.Camp.IsOngoing);
                userListDtos.Add(userListDto);
            }

            return userListDtos;
        }

        public async Task<UserDto> CreateAsync(CreateUserRequest request)
        {
            if (await IsEmailUniqueAsync(request.Email))
                throw new ArgumentException("Bu e-posta adresi zaten kullanılıyor");

            if (!string.IsNullOrEmpty(request.IdentityNumber) && await IsIdentityNumberUniqueAsync(request.IdentityNumber))
                throw new ArgumentException("Bu kimlik numarası zaten kullanılıyor");

            var user = _mapper.Map<ApplicationUser>(request);
            user.UserName = request.Email;

            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
                throw new ArgumentException($"Kullanıcı oluşturulamadı: {string.Join(", ", result.Errors.Select(e => e.Description))}");

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Age = user.DateOfBirth.HasValue ? DateTime.UtcNow.Year - user.DateOfBirth.Value.Year - (DateTime.UtcNow < user.DateOfBirth.Value.AddYears(DateTime.UtcNow.Year - user.DateOfBirth.Value.Year) ? 1 : 0) : null;

            return userDto;
        }

        public async Task<UserDto> UpdateAsync(string id, UpdateUserRequest request)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new ArgumentException("Kullanıcı bulunamadı");

            _mapper.Map(request, user);
            user.UpdatedAt = DateTime.UtcNow;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                throw new ArgumentException($"Kullanıcı güncellenemedi: {string.Join(", ", result.Errors.Select(e => e.Description))}");

            var userDto = _mapper.Map<UserDto>(user);
            userDto.Age = user.DateOfBirth.HasValue ? DateTime.UtcNow.Year - user.DateOfBirth.Value.Year - (DateTime.UtcNow < user.DateOfBirth.Value.AddYears(DateTime.UtcNow.Year - user.DateOfBirth.Value.Year) ? 1 : 0) : null;
            userDto.RegistrationCount = user.Registrations.Count(r => r.Status == "Confirmed");
            userDto.HasActiveRegistration = user.Registrations.Any(r => r.Status == "Confirmed" && r.Camp.IsOngoing);

            return userDto;
        }

        public async Task DeleteAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new ArgumentException("Kullanıcı bulunamadı");

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                throw new ArgumentException($"Kullanıcı silinemedi: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }

        public async Task ActivateAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new ArgumentException("Kullanıcı bulunamadı");

            user.IsActive = true;
            user.UpdatedAt = DateTime.UtcNow;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                throw new ArgumentException($"Kullanıcı aktifleştirilemedi: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }

        public async Task DeactivateAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new ArgumentException("Kullanıcı bulunamadı");

            user.IsActive = false;
            user.UpdatedAt = DateTime.UtcNow;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                throw new ArgumentException($"Kullanıcı deaktifleştirilemedi: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }

        public async Task ChangePasswordAsync(string id, string currentPassword, string newPassword)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                throw new ArgumentException("Kullanıcı bulunamadı");

            var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
            if (!result.Succeeded)
                throw new ArgumentException($"Şifre değiştirilemedi: {string.Join(", ", result.Errors.Select(e => e.Description))}");
        }

        public async Task<bool> IsEmailUniqueAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user == null;
        }

        public async Task<bool> IsIdentityNumberUniqueAsync(string identityNumber)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.IdentityNumber == identityNumber);
            return user == null;
        }
    }
} 