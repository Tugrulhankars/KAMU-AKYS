using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NufusSayimAPI.Data;
using NufusSayimAPI.DTOs;
using NufusSayimAPI.Models;
using NufusSayimAPI.Services;

namespace NufusSayimAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public AuthController(ApplicationDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        try
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username && u.IsActive);

            if (user == null)
            {
                return BadRequest(new { message = "Kullanıcı adı veya şifre hatalı" });
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest(new { message = "Kullanıcı adı veya şifre hatalı" });
            }

            var token = _jwtService.GenerateToken(user);
            var expiresAt = DateTime.UtcNow.AddMinutes(60);

            return Ok(new AuthResponse
            {
                Token = token,
                Username = user.Username,
                Role = user.Role,
                ExpiresAt = expiresAt
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Giriş sırasında bir hata oluştu", error = ex.Message });
        }
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        try
        {
            // Check if username already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (existingUser != null)
            {
                return BadRequest(new { message = "Bu kullanıcı adı zaten kullanılıyor" });
            }

            // Validate role
            var validRoles = new[] { "Admin", "Görevli", "Gözlemci" };
            if (!validRoles.Contains(request.Role))
            {
                return BadRequest(new { message = "Geçersiz rol" });
            }

            // Create new user
            var user = new User
            {
                Username = request.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = request.Role,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user);
            var expiresAt = DateTime.UtcNow.AddMinutes(60);

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, new AuthResponse
            {
                Token = token,
                Username = user.Username,
                Role = user.Role,
                ExpiresAt = expiresAt
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Kayıt sırasında bir hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        try
        {
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader == null || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized(new { message = "Token gerekli" });
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();
            var userId = _jwtService.GetUserIdFromToken(token);

            if (userId == null)
            {
                return Unauthorized(new { message = "Geçersiz token" });
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null || !user.IsActive)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı" });
            }

            return Ok(new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role,
                CreatedAt = user.CreatedAt,
                IsActive = user.IsActive
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Kullanıcı bilgileri alınırken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("user/{id}")]
    public async Task<ActionResult<UserDto>> GetUserById(int id)
    {
        try
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı" });
            }

            return Ok(new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Role = user.Role,
                CreatedAt = user.CreatedAt,
                IsActive = user.IsActive
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Kullanıcı bilgileri alınırken hata oluştu", error = ex.Message });
        }
    }
}