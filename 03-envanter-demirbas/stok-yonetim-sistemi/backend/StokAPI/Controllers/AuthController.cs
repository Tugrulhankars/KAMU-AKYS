using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StokAPI.Data;
using StokAPI.DTOs;
using StokAPI.Models;
using StokAPI.Services;

namespace StokAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtService _jwtService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ApplicationDbContext context, IJwtService jwtService, ILogger<AuthController> logger)
        {
            _context = context;
            _jwtService = jwtService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<LoginResponseDto>>> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == loginDto.Email && u.IsActive);

                if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                {
                    return BadRequest(ApiResponse<LoginResponseDto>.ErrorResponse("E-posta veya şifre hatalı"));
                }

                var token = _jwtService.GenerateToken(user);
                
                // Login log kaydı
                await LogUserActivity(user.Id, LogAction.Login, "Kullanıcı giriş yaptı");

                var userDto = new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Username = user.Username,
                    Role = user.Role,
                    IsActive = user.IsActive,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt
                };

                var response = new LoginResponseDto
                {
                    Token = token,
                    User = userDto,
                    ExpiresAt = DateTime.UtcNow.AddHours(24)
                };

                return Ok(ApiResponse<LoginResponseDto>.SuccessResponse(response, "Giriş başarılı"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Login işlemi sırasında hata oluştu");
                return StatusCode(500, ApiResponse<LoginResponseDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse<UserDto>>> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                // Email kontrolü
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == registerDto.Email);

                if (existingUser != null)
                {
                    return BadRequest(ApiResponse<UserDto>.ErrorResponse("Bu email zaten kullanılıyor"));
                }

                var user = new User
                {
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    Email = registerDto.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                    Role = UserRole.DepoGorevlisi, // Default role
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var userDto = new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Username = user.Username,
                    Role = user.Role,
                    IsActive = user.IsActive,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt
                };

                return Ok(ApiResponse<UserDto>.SuccessResponse(userDto, "Kullanıcı başarıyla oluşturuldu"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Register işlemi sırasında hata oluştu");
                return StatusCode(500, ApiResponse<UserDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        private async Task LogUserActivity(int userId, LogAction action, string description)
        {
            try
            {
                var log = new Log
                {
                    UserId = userId,
                    Action = action,
                    Description = description,
                    IpAddress = HttpContext.Connection.RemoteIpAddress?.ToString(),
                    UserAgent = HttpContext.Request.Headers["User-Agent"].ToString(),
                    CreatedAt = DateTime.UtcNow
                };

                _context.Logs.Add(log);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Log kaydı sırasında hata oluştu");
            }
        }
    }
} 