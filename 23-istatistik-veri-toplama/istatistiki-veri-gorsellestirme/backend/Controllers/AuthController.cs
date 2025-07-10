using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KamuVeriAPI.Data;
using KamuVeriAPI.DTOs;
using KamuVeriAPI.Models;
using KamuVeriAPI.Services;

namespace KamuVeriAPI.Controllers
{
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

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto registerDto)
        {
            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return BadRequest(new { message = "Bu e-posta zaten kullanılıyor." });
            }

            // Create new user
            var user = new User
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                Username = registerDto.Email, // Username artık email ile aynı tutuluyor
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Generate token
            var token = _jwtService.GenerateToken(user);
            var expiresAt = DateTime.UtcNow.AddDays(7);

            return Ok(new AuthResponseDto
            {
                Token = token,
                Username = user.Email,
                Role = user.Role,
                ExpiresAt = expiresAt
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            {
                return BadRequest(new { message = "E-posta veya şifre hatalı." });
            }

            var token = _jwtService.GenerateToken(user);
            var expiresAt = DateTime.UtcNow.AddDays(7);

            return Ok(new AuthResponseDto
            {
                Token = token,
                Username = user.Email,
                Role = user.Role,
                ExpiresAt = expiresAt
            });
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetUserCount()
        {
            var count = await _context.Users.CountAsync();
            return Ok(count);
        }
    }
} 