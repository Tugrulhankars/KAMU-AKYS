using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;
using GenclikKampiYonetim.API.Services;

namespace GenclikKampiYonetim.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ITokenService tokenService,
            IUserService userService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                    return BadRequest(new { message = "Geçersiz e-posta veya şifre" });

                if (!user.IsActive)
                    return BadRequest(new { message = "Hesabınız aktif değil" });

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (!result.Succeeded)
                    return BadRequest(new { message = "Geçersiz e-posta veya şifre" });

                // Son giriş zamanını güncelle
                user.LastLoginAt = DateTime.UtcNow;
                await _userManager.UpdateAsync(user);

                var token = _tokenService.GenerateJwtToken(user);
                var refreshToken = _tokenService.GenerateRefreshToken();

                var response = new AuthResponse
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(1440), // 24 saat
                    User = await _userService.GetByIdAsync(user.Id)
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Giriş yapılırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (await _userService.IsEmailUniqueAsync(request.Email))
                    return BadRequest(new { message = "Bu e-posta adresi zaten kullanılıyor" });

                if (!string.IsNullOrEmpty(request.IdentityNumber) && await _userService.IsIdentityNumberUniqueAsync(request.IdentityNumber))
                    return BadRequest(new { message = "Bu kimlik numarası zaten kullanılıyor" });

                var user = new ApplicationUser
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    UserName = request.Email,
                    IdentityNumber = request.IdentityNumber,
                    UserType = request.UserType,
                    CreatedAt = DateTime.UtcNow,
                    IsActive = true
                };

                var result = await _userManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                    return BadRequest(new { message = "Kayıt oluşturulamadı", errors = result.Errors.Select(e => e.Description) });

                var token = _tokenService.GenerateJwtToken(user);
                var refreshToken = _tokenService.GenerateRefreshToken();

                var response = new AuthResponse
                {
                    Token = token,
                    RefreshToken = refreshToken,
                    ExpiresAt = DateTime.UtcNow.AddMinutes(1440),
                    User = await _userService.GetByIdAsync(user.Id)
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kayıt oluşturulurken bir hata oluştu", error = ex.Message });
            }
        }

        [Authorize]
        [HttpPost("change-password")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            try
            {
                var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                await _userService.ChangePasswordAsync(userId, request.CurrentPassword, request.NewPassword);

                return Ok(new { message = "Şifre başarıyla değiştirildi" });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Şifre değiştirilirken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                    return Ok(new { message = "Şifre sıfırlama bağlantısı gönderildi" }); // Güvenlik için kullanıcıya bilgi verme

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                // TODO: E-posta gönderme işlemi

                return Ok(new { message = "Şifre sıfırlama bağlantısı gönderildi" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "İşlem sırasında bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                    return BadRequest(new { message = "Geçersiz e-posta adresi" });

                var result = await _userManager.ResetPasswordAsync(user, request.Token, request.NewPassword);
                if (!result.Succeeded)
                    return BadRequest(new { message = "Şifre sıfırlanamadı", errors = result.Errors.Select(e => e.Description) });

                return Ok(new { message = "Şifre başarıyla sıfırlandı" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Şifre sıfırlanırken bir hata oluştu", error = ex.Message });
            }
        }

        [Authorize]
        [HttpPost("refresh-token")]
        public async Task<ActionResult<AuthResponse>> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            try
            {
                // TODO: Refresh token validasyonu ve yeni token oluşturma
                return BadRequest(new { message = "Bu özellik henüz implement edilmedi" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Token yenilenirken bir hata oluştu", error = ex.Message });
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok(new { message = "Başarıyla çıkış yapıldı" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Çıkış yapılırken bir hata oluştu", error = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            try
            {
                var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var user = await _userService.GetByIdAsync(userId);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kullanıcı bilgileri alınırken bir hata oluştu", error = ex.Message });
            }
        }
    }
} 