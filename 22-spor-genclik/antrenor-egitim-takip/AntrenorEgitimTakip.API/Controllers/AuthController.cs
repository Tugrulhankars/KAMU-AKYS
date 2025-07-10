using AntrenorEgitimTakip.API.Data;
using AntrenorEgitimTakip.API.DTOs;
using AntrenorEgitimTakip.API.Models;
using AntrenorEgitimTakip.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AntrenorEgitimTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly ApplicationDbContext _context;

        public AuthController(ITokenService tokenService, IUserService userService, ApplicationDbContext context)
        {
            _tokenService = tokenService;
            _userService = userService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApiResponse<LoginResponse>>> Login([FromBody] LoginRequest request)
        {
            try
            {
                if (!await _userService.ValidateCredentialsAsync(request.Email, request.Password))
                {
                    return BadRequest(ApiResponse<LoginResponse>.ErrorResult("Geçersiz e-posta veya şifre"));
                }

                var user = await _userService.GetUserByEmailAsync(request.Email);
                if (user == null)
                {
                    return BadRequest(ApiResponse<LoginResponse>.ErrorResult("Kullanıcı bulunamadı"));
                }

                if (!user.IsActive)
                {
                    return BadRequest(ApiResponse<LoginResponse>.ErrorResult("Hesabınız aktif değil"));
                }

                // Son giriş tarihini güncelle
                var dbUser = await _context.Users.FindAsync(user.Id);
                if (dbUser != null)
                {
                    dbUser.LastLoginAt = DateTime.UtcNow;
                    await _context.SaveChangesAsync();
                }

                var token = _tokenService.GenerateJwtToken(dbUser!);
                var refreshToken = _tokenService.GenerateRefreshToken();

                var response = new LoginResponse
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    ExpiresAt = DateTime.UtcNow.AddHours(24),
                    User = user
                };

                return Ok(ApiResponse<LoginResponse>.SuccessResult(response, "Başarıyla giriş yapıldı"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<LoginResponse>.ErrorResult($"Giriş yapılırken hata oluştu: {ex.Message}"));
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<ApiResponse<UserDto>>> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var user = await _userService.CreateUserAsync(request);
                return Ok(ApiResponse<UserDto>.SuccessResult(user, "Kullanıcı başarıyla oluşturuldu"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<UserDto>.ErrorResult(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<UserDto>.ErrorResult($"Kayıt olurken hata oluştu: {ex.Message}"));
            }
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<ApiResponse<UserDto>>> GetCurrentUser()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    return Unauthorized(ApiResponse<UserDto>.ErrorResult("Geçersiz token"));
                }

                var user = await _userService.GetCurrentUserAsync(userId);
                if (user == null)
                {
                    return NotFound(ApiResponse<UserDto>.ErrorResult("Kullanıcı bulunamadı"));
                }

                return Ok(ApiResponse<UserDto>.SuccessResult(user));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<UserDto>.ErrorResult($"Kullanıcı bilgileri alınırken hata oluştu: {ex.Message}"));
            }
        }

        [Authorize]
        [HttpPost("change-password")]
        public async Task<ActionResult<ApiResponse<object>>> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    return Unauthorized(ApiResponse<object>.ErrorResult("Geçersiz token"));
                }

                var success = await _userService.ChangePasswordAsync(userId, request.CurrentPassword, request.NewPassword);
                if (!success)
                {
                    return BadRequest(ApiResponse<object>.ErrorResult("Mevcut şifre yanlış"));
                }

                return Ok(ApiResponse<object>.SuccessResult(null, "Şifre başarıyla değiştirildi"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResult($"Şifre değiştirilirken hata oluştu: {ex.Message}"));
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult<ApiResponse<object>>> Logout()
        {
            try
            {
                // JWT token'ları client tarafında silinir
                // Burada gerekirse ek işlemler yapılabilir (örn: token blacklist)
                return Ok(ApiResponse<object>.SuccessResult(null, "Başarıyla çıkış yapıldı"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResult($"Çıkış yapılırken hata oluştu: {ex.Message}"));
            }
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<ApiResponse<LoginResponse>>> RefreshToken([FromBody] string refreshToken)
        {
            try
            {
                // Refresh token validasyonu burada yapılabilir
                // Şimdilik basit bir implementasyon
                return BadRequest(ApiResponse<LoginResponse>.ErrorResult("Refresh token özelliği henüz implement edilmedi"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<LoginResponse>.ErrorResult($"Token yenilenirken hata oluştu: {ex.Message}"));
            }
        }

        [Authorize]
        [HttpGet("validate-token")]
        public async Task<ActionResult<ApiResponse<object>>> ValidateToken()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim))
                {
                    return Unauthorized(ApiResponse<object>.ErrorResult("Geçersiz token"));
                }

                return Ok(ApiResponse<object>.SuccessResult(null, "Token geçerli"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResult($"Token validasyonu sırasında hata oluştu: {ex.Message}"));
            }
        }
    }
} 