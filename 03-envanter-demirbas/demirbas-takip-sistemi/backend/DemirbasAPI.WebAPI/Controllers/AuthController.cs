using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using DemirbasAPI.Application.DTOs.Auth;
using DemirbasAPI.Application.Interfaces;
using DemirbasAPI.Domain.Entities;
using BCrypt.Net;

namespace DemirbasAPI.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtService _jwtService;
    private readonly IMapper _mapper;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        IUserRepository userRepository,
        IJwtService jwtService,
        IMapper mapper,
        ILogger<AuthController> logger)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null || !user.IsActive)
            {
                _logger.LogWarning("Başarısız giriş denemesi: {Email}", request.Email);
                return Unauthorized(new { message = "E-posta veya şifre hatalı" });
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                _logger.LogWarning("Başarısız şifre denemesi: {Email}", request.Email);
                return Unauthorized(new { message = "E-posta veya şifre hatalı" });
            }

            var token = _jwtService.GenerateToken(user);
            
            var response = new LoginResponseDto
            {
                Token = token,
                Username = user.Username,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                ExpiresAt = DateTime.UtcNow.AddHours(2)
            };

            _logger.LogInformation("Başarılı giriş: {Username}", user.Username);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Login işlemi sırasında hata oluştu");
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kullanıcı adı kontrolü
            if (await _userRepository.IsUsernameExistsAsync(request.Username))
            {
                return BadRequest(new { message = "Bu kullanıcı adı zaten kullanılıyor" });
            }

            // E-posta kontrolü
            if (await _userRepository.IsEmailExistsAsync(request.Email))
            {
                return BadRequest(new { message = "Bu e-posta adresi zaten kullanılıyor" });
            }

            var user = _mapper.Map<User>(request);
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            await _userRepository.AddAsync(user);

            _logger.LogInformation("Yeni kullanıcı kaydedildi: {Username}", user.Username);
            return Ok(new { message = "Kullanıcı başarıyla kaydedildi" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Register işlemi sırasında hata oluştu");
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }
} 