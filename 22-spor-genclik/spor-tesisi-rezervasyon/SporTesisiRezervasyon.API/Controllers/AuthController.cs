using Microsoft.AspNetCore.Mvc;
using SporTesisiRezervasyon.API.DTOs;
using SporTesisiRezervasyon.API.Services;

namespace SporTesisiRezervasyon.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public AuthController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _userService.CreateUserAsync(request);
                if (result)
                {
                    return Ok(new { message = "Kullanıcı başarıyla oluşturuldu" });
                }
                return BadRequest(new { message = "Kullanıcı oluşturulamadı" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var isValid = await _userService.ValidateUserAsync(request);
                if (!isValid)
                    return Unauthorized(new { message = "Geçersiz e-posta veya şifre" });

                var user = await _userService.GetUserByEmailAsync(request.Email);
                if (user == null)
                    return Unauthorized(new { message = "Kullanıcı bulunamadı" });

                var token = _tokenService.GenerateToken(user);

                return Ok(new
                {
                    token = token,
                    user = new
                    {
                        id = user.Id,
                        email = user.Email,
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        fullName = user.FullName
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
} 