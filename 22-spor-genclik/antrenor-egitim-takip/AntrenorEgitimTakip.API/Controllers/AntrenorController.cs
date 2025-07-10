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
    [Authorize]
    public class AntrenorController : ControllerBase
    {
        private readonly IAntrenorService _antrenorService;
        private readonly IUserService _userService;
        private readonly ApplicationDbContext _context;

        public AntrenorController(IAntrenorService antrenorService, IUserService userService, ApplicationDbContext context)
        {
            _antrenorService = antrenorService;
            _userService = userService;
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Yonetici")]
        public async Task<ActionResult<ApiResponse<IEnumerable<AntrenorDto>>>> GetAllAntrenorler()
        {
            try
            {
                var antrenorler = await _antrenorService.GetAllAsync();
                return Ok(ApiResponse<IEnumerable<AntrenorDto>>.SuccessResult(antrenorler));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<IEnumerable<AntrenorDto>>.ErrorResult($"Antrenörler alınırken hata oluştu: {ex.Message}"));
            }
        }

        [HttpGet("aktif")]
        [Authorize(Roles = "Admin,Yonetici")]
        public async Task<ActionResult<ApiResponse<IEnumerable<AntrenorDto>>>> GetAktifAntrenorler()
        {
            try
            {
                var antrenorler = await _antrenorService.GetActiveAsync();
                return Ok(ApiResponse<IEnumerable<AntrenorDto>>.SuccessResult(antrenorler));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<IEnumerable<AntrenorDto>>.ErrorResult($"Aktif antrenörler alınırken hata oluştu: {ex.Message}"));
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<AntrenorDto>>> GetAntrenorById(int id)
        {
            try
            {
                var antrenor = await _antrenorService.GetByIdAsync(id);
                if (antrenor == null)
                {
                    return NotFound(ApiResponse<AntrenorDto>.ErrorResult("Antrenör bulunamadı"));
                }
                return Ok(ApiResponse<AntrenorDto>.SuccessResult(antrenor));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<AntrenorDto>.ErrorResult($"Antrenör alınırken hata oluştu: {ex.Message}"));
            }
        }

        [HttpGet("me")]
        public async Task<ActionResult<ApiResponse<AntrenorDto>>> GetCurrentAntrenor()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                {
                    return Unauthorized(ApiResponse<AntrenorDto>.ErrorResult("Geçersiz token"));
                }
                var antrenor = await _antrenorService.GetByUserIdAsync(userId);
                if (antrenor == null)
                {
                    return NotFound(ApiResponse<AntrenorDto>.ErrorResult("Antrenör bilgisi bulunamadı"));
                }
                return Ok(ApiResponse<AntrenorDto>.SuccessResult(antrenor));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<AntrenorDto>.ErrorResult($"Antrenör bilgisi alınırken hata oluştu: {ex.Message}"));
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Yonetici")]
        public async Task<ActionResult<ApiResponse<AntrenorDto>>> CreateAntrenor([FromBody] CreateAntrenorDto dto)
        {
            try
            {
                var createdAntrenor = await _antrenorService.CreateAsync(dto);
                return Ok(ApiResponse<AntrenorDto>.SuccessResult(createdAntrenor, "Antrenör başarıyla oluşturuldu"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<AntrenorDto>.ErrorResult(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<AntrenorDto>.ErrorResult($"Antrenör oluşturulurken hata oluştu: {ex.Message}"));
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<AntrenorDto>>> UpdateAntrenor(int id, [FromBody] UpdateAntrenorDto dto)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userRoles = User.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();
                if (!userRoles.Contains("Admin") && !userRoles.Contains("Yonetici"))
                {
                    if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
                    {
                        return Unauthorized(ApiResponse<AntrenorDto>.ErrorResult("Yetkisiz erişim"));
                    }
                    var currentAntrenor = await _antrenorService.GetByUserIdAsync(userId);
                    if (currentAntrenor == null || currentAntrenor.Id != id)
                    {
                        return Forbid();
                    }
                }
                var updatedAntrenor = await _antrenorService.UpdateAsync(id, dto);
                return Ok(ApiResponse<AntrenorDto>.SuccessResult(updatedAntrenor, "Antrenör başarıyla güncellendi"));
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ApiResponse<AntrenorDto>.ErrorResult(ex.Message));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<AntrenorDto>.ErrorResult($"Antrenör güncellenirken hata oluştu: {ex.Message}"));
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Yonetici")]
        public async Task<ActionResult<ApiResponse<object>>> DeleteAntrenor(int id)
        {
            try
            {
                var success = await _antrenorService.DeleteAsync(id);
                if (!success)
                {
                    return NotFound(ApiResponse<object>.ErrorResult("Antrenör bulunamadı"));
                }
                return Ok(ApiResponse<object>.SuccessResult(null, "Antrenör başarıyla silindi"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<object>.ErrorResult($"Antrenör silinirken hata oluştu: {ex.Message}"));
            }
        }

        [HttpGet("search")]
        [Authorize(Roles = "Admin,Yonetici")]
        public async Task<ActionResult<ApiResponse<IEnumerable<AntrenorDto>>>> SearchAntrenorler([FromQuery] string q)
        {
            try
            {
                var antrenorler = await _antrenorService.SearchAsync(q);
                return Ok(ApiResponse<IEnumerable<AntrenorDto>>.SuccessResult(antrenorler));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ApiResponse<IEnumerable<AntrenorDto>>.ErrorResult($"Arama sırasında hata oluştu: {ex.Message}"));
            }
        }
    }
} 