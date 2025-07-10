using AcikVeriPortali.API.DTOs;
using AcikVeriPortali.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AcikVeriPortali.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.LoginAsync(request);
            if (result == null)
                return Unauthorized(new { message = "Kullanıcı adı veya şifre hatalı." });
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);
            if (result == null)
                return BadRequest(new { message = "Kullanıcı adı veya e-posta zaten kayıtlı." });
            return Ok(result);
        }
    }
} 