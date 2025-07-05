using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DemirbasAPI.Application.DTOs.User;
using DemirbasAPI.Application.Interfaces;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<UsersController> _logger;

    public UsersController(
        IUserRepository userRepository,
        IMapper mapper,
        ILogger<UsersController> logger)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var users = await _userRepository.GetAllAsync();
            var userDtos = _mapper.Map<IEnumerable<UserDto>>(users.Where(u => !u.IsDeleted));
            return Ok(userDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kullanıcılar getirilirken hata oluştu");
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        try
        {
            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            // Sadece admin veya kendi profilini görüntüleyebilir
            if (currentUserRole != UserRole.Admin && currentUserId != id)
            {
                return Forbid();
            }

            var user = await _userRepository.GetByIdAsync(id);
            if (user == null || user.IsDeleted)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı" });
            }

            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kullanıcı getirilirken hata oluştu: {UserId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpPut("{id}/activate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> ActivateUser(int id)
    {
        try
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null || user.IsDeleted)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı" });
            }

            user.IsActive = true;
            user.UpdatedDate = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            _logger.LogInformation("Kullanıcı aktifleştirildi: {UserId}", id);
            return Ok(new { message = "Kullanıcı başarıyla aktifleştirildi" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kullanıcı aktifleştirilirken hata oluştu: {UserId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpPut("{id}/deactivate")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeactivateUser(int id)
    {
        try
        {
            var currentUserId = GetCurrentUserId();
            
            // Admin kendi hesabını deaktive edemez
            if (currentUserId == id)
            {
                return BadRequest(new { message = "Kendi hesabınızı deaktive edemezsiniz" });
            }

            var user = await _userRepository.GetByIdAsync(id);
            if (user == null || user.IsDeleted)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı" });
            }

            user.IsActive = false;
            user.UpdatedDate = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            _logger.LogInformation("Kullanıcı deaktifleştirildi: {UserId}", id);
            return Ok(new { message = "Kullanıcı başarıyla deaktifleştirildi" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kullanıcı deaktifleştirilirken hata oluştu: {UserId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        try
        {
            var currentUserId = GetCurrentUserId();
            
            // Admin kendi hesabını silemez
            if (currentUserId == id)
            {
                return BadRequest(new { message = "Kendi hesabınızı silemezsiniz" });
            }

            var user = await _userRepository.GetByIdAsync(id);
            if (user == null || user.IsDeleted)
            {
                return NotFound(new { message = "Kullanıcı bulunamadı" });
            }

            user.IsDeleted = true;
            user.UpdatedDate = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            _logger.LogInformation("Kullanıcı silindi: {UserId}", id);
            return Ok(new { message = "Kullanıcı başarıyla silindi" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kullanıcı silinirken hata oluştu: {UserId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
    }

    private UserRole GetCurrentUserRole()
    {
        var roleClaim = User.FindFirst(System.Security.Claims.ClaimTypes.Role);
        return roleClaim != null && Enum.TryParse<UserRole>(roleClaim.Value, out var role) ? role : UserRole.Personel;
    }
} 