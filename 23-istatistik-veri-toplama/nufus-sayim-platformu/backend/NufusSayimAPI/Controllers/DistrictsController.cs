using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NufusSayimAPI.Data;
using NufusSayimAPI.DTOs;
using NufusSayimAPI.Models;
using NufusSayimAPI.Services;

namespace NufusSayimAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DistrictsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public DistrictsController(ApplicationDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DistrictDto>>> GetDistricts()
    {
        try
        {
            var districts = await _context.Districts
                .Include(d => d.City)
                .Include(d => d.CreatedByUser)
                .Include(d => d.Households)
                .Select(d => new DistrictDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    CityId = d.CityId,
                    CityName = d.City.Name,
                    CreatedAt = d.CreatedAt,
                    CreatedByUsername = d.CreatedByUser != null ? d.CreatedByUser.Username : null,
                    HouseholdCount = d.Households.Count
                })
                .OrderBy(d => d.CityName)
                .ThenBy(d => d.Name)
                .ToListAsync();

            return Ok(districts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "İlçeler listelenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DistrictDto>> GetDistrict(int id)
    {
        try
        {
            var district = await _context.Districts
                .Include(d => d.City)
                .Include(d => d.CreatedByUser)
                .Include(d => d.Households)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (district == null)
            {
                return NotFound(new { message = "İlçe bulunamadı" });
            }

            var districtDto = new DistrictDto
            {
                Id = district.Id,
                Name = district.Name,
                CityId = district.CityId,
                CityName = district.City.Name,
                CreatedAt = district.CreatedAt,
                CreatedByUsername = district.CreatedByUser?.Username,
                HouseholdCount = district.Households.Count
            };

            return Ok(districtDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "İlçe bilgileri alınırken hata oluştu", error = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Görevli")]
    public async Task<ActionResult<DistrictDto>> CreateDistrict(CreateDistrictRequest request)
    {
        try
        {
            // Get current user
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var userId = _jwtService.GetUserIdFromToken(token!);

            // Check if city exists
            var city = await _context.Cities.FindAsync(request.CityId);
            if (city == null)
            {
                return BadRequest(new { message = "Şehir bulunamadı" });
            }

            // Check if district already exists in this city
            var existingDistrict = await _context.Districts
                .FirstOrDefaultAsync(d => d.Name.ToLower() == request.Name.ToLower() && d.CityId == request.CityId);

            if (existingDistrict != null)
            {
                return BadRequest(new { message = "Bu şehirde bu isimde bir ilçe zaten mevcut" });
            }

            var district = new District
            {
                Name = request.Name,
                CityId = request.CityId,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = userId
            };

            _context.Districts.Add(district);
            await _context.SaveChangesAsync();

            var districtDto = new DistrictDto
            {
                Id = district.Id,
                Name = district.Name,
                CityId = district.CityId,
                CityName = city.Name,
                CreatedAt = district.CreatedAt,
                CreatedByUsername = _jwtService.GetUsernameFromToken(token!),
                HouseholdCount = 0
            };

            return CreatedAtAction(nameof(GetDistrict), new { id = district.Id }, districtDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "İlçe oluşturulurken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("{id}/households")]
    public async Task<ActionResult<IEnumerable<HouseholdDto>>> GetDistrictHouseholds(int id)
    {
        try
        {
            var district = await _context.Districts
                .Include(d => d.City)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (district == null)
            {
                return NotFound(new { message = "İlçe bulunamadı" });
            }

            var households = await _context.Households
                .Include(h => h.District)
                    .ThenInclude(d => d.City)
                .Include(h => h.CreatedByUser)
                .Include(h => h.UpdatedByUser)
                .Include(h => h.People)
                .Where(h => h.DistrictId == id && h.IsActive)
                .Select(h => new HouseholdDto
                {
                    Id = h.Id,
                    Address = h.Address,
                    DistrictId = h.DistrictId,
                    DistrictName = h.District.Name,
                    CityName = h.District.City.Name,
                    CreatedAt = h.CreatedAt,
                    UpdatedAt = h.UpdatedAt,
                    CreatedByUsername = h.CreatedByUser.Username,
                    UpdatedByUsername = h.UpdatedByUser != null ? h.UpdatedByUser.Username : null,
                    Notes = h.Notes,
                    IsActive = h.IsActive,
                    PersonCount = h.People.Count(p => p.IsActive)
                })
                .OrderByDescending(h => h.CreatedAt)
                .ToListAsync();

            return Ok(households);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Haneler listelenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("city/{cityId}")]
    public async Task<ActionResult<IEnumerable<DistrictDto>>> GetDistrictsByCity(int cityId)
    {
        try
        {
            var city = await _context.Cities.FindAsync(cityId);
            if (city == null)
            {
                return NotFound(new { message = "Şehir bulunamadı" });
            }

            var districts = await _context.Districts
                .Include(d => d.City)
                .Include(d => d.CreatedByUser)
                .Include(d => d.Households)
                .Where(d => d.CityId == cityId)
                .Select(d => new DistrictDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    CityId = d.CityId,
                    CityName = d.City.Name,
                    CreatedAt = d.CreatedAt,
                    CreatedByUsername = d.CreatedByUser != null ? d.CreatedByUser.Username : null,
                    HouseholdCount = d.Households.Count
                })
                .OrderBy(d => d.Name)
                .ToListAsync();

            return Ok(districts);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "İlçeler listelenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<DistrictDto>> UpdateDistrict(int id, CreateDistrictRequest request)
    {
        try
        {
            var district = await _context.Districts
                .Include(d => d.City)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (district == null)
            {
                return NotFound(new { message = "İlçe bulunamadı" });
            }

            // Check if city exists
            var city = await _context.Cities.FindAsync(request.CityId);
            if (city == null)
            {
                return BadRequest(new { message = "Şehir bulunamadı" });
            }

            // Check if another district with the same name exists in the same city
            var existingDistrict = await _context.Districts
                .FirstOrDefaultAsync(d => d.Name.ToLower() == request.Name.ToLower() && 
                                         d.CityId == request.CityId && d.Id != id);

            if (existingDistrict != null)
            {
                return BadRequest(new { message = "Bu şehirde bu isimde bir ilçe zaten mevcut" });
            }

            district.Name = request.Name;
            district.CityId = request.CityId;
            await _context.SaveChangesAsync();

            var districtDto = new DistrictDto
            {
                Id = district.Id,
                Name = district.Name,
                CityId = district.CityId,
                CityName = city.Name,
                CreatedAt = district.CreatedAt,
                CreatedByUsername = district.CreatedByUser?.Username,
                HouseholdCount = await _context.Households.CountAsync(h => h.DistrictId == id)
            };

            return Ok(districtDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "İlçe güncellenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteDistrict(int id)
    {
        try
        {
            var district = await _context.Districts
                .Include(d => d.Households)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (district == null)
            {
                return NotFound(new { message = "İlçe bulunamadı" });
            }

            // Check if district has households
            if (district.Households.Any())
            {
                return BadRequest(new { message = "Bu ilçeye ait haneler var, önce haneleri silmelisiniz" });
            }

            _context.Districts.Remove(district);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "İlçe silinirken hata oluştu", error = ex.Message });
        }
    }
} 