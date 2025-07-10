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
public class CitiesController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public CitiesController(ApplicationDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CityDto>>> GetCities()
    {
        try
        {
            var cities = await _context.Cities
                .Include(c => c.CreatedByUser)
                .Include(c => c.Districts)
                .Select(c => new CityDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    CreatedAt = c.CreatedAt,
                    CreatedByUsername = c.CreatedByUser != null ? c.CreatedByUser.Username : null,
                    DistrictCount = c.Districts.Count
                })
                .OrderBy(c => c.Name)
                .ToListAsync();

            return Ok(cities);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Şehirler listelenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CityDto>> GetCity(int id)
    {
        try
        {
            var city = await _context.Cities
                .Include(c => c.CreatedByUser)
                .Include(c => c.Districts)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (city == null)
            {
                return NotFound(new { message = "Şehir bulunamadı" });
            }

            var cityDto = new CityDto
            {
                Id = city.Id,
                Name = city.Name,
                CreatedAt = city.CreatedAt,
                CreatedByUsername = city.CreatedByUser?.Username,
                DistrictCount = city.Districts.Count
            };

            return Ok(cityDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Şehir bilgileri alınırken hata oluştu", error = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Görevli")]
    public async Task<ActionResult<CityDto>> CreateCity(CreateCityRequest request)
    {
        try
        {
            // Get current user
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var userId = _jwtService.GetUserIdFromToken(token!);

            // Check if city already exists
            var existingCity = await _context.Cities
                .FirstOrDefaultAsync(c => c.Name.ToLower() == request.Name.ToLower());

            if (existingCity != null)
            {
                return BadRequest(new { message = "Bu şehir zaten mevcut" });
            }

            var city = new City
            {
                Name = request.Name,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = userId
            };

            _context.Cities.Add(city);
            await _context.SaveChangesAsync();

            var cityDto = new CityDto
            {
                Id = city.Id,
                Name = city.Name,
                CreatedAt = city.CreatedAt,
                CreatedByUsername = _jwtService.GetUsernameFromToken(token!),
                DistrictCount = 0
            };

            return CreatedAtAction(nameof(GetCity), new { id = city.Id }, cityDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Şehir oluşturulurken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("{id}/districts")]
    public async Task<ActionResult<IEnumerable<DistrictDto>>> GetCityDistricts(int id)
    {
        try
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null)
            {
                return NotFound(new { message = "Şehir bulunamadı" });
            }

            var districts = await _context.Districts
                .Include(d => d.City)
                .Include(d => d.CreatedByUser)
                .Include(d => d.Households)
                .Where(d => d.CityId == id)
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
    public async Task<ActionResult<CityDto>> UpdateCity(int id, CreateCityRequest request)
    {
        try
        {
            var city = await _context.Cities.FindAsync(id);
            if (city == null)
            {
                return NotFound(new { message = "Şehir bulunamadı" });
            }

            // Check if another city with the same name exists
            var existingCity = await _context.Cities
                .FirstOrDefaultAsync(c => c.Name.ToLower() == request.Name.ToLower() && c.Id != id);

            if (existingCity != null)
            {
                return BadRequest(new { message = "Bu şehir adı zaten kullanılıyor" });
            }

            city.Name = request.Name;
            await _context.SaveChangesAsync();

            var cityDto = new CityDto
            {
                Id = city.Id,
                Name = city.Name,
                CreatedAt = city.CreatedAt,
                CreatedByUsername = city.CreatedByUser?.Username,
                DistrictCount = await _context.Districts.CountAsync(d => d.CityId == id)
            };

            return Ok(cityDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Şehir güncellenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteCity(int id)
    {
        try
        {
            var city = await _context.Cities
                .Include(c => c.Districts)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (city == null)
            {
                return NotFound(new { message = "Şehir bulunamadı" });
            }

            // Check if city has districts
            if (city.Districts.Any())
            {
                return BadRequest(new { message = "Bu şehre ait ilçeler var, önce ilçeleri silmelisiniz" });
            }

            _context.Cities.Remove(city);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Şehir silinirken hata oluştu", error = ex.Message });
        }
    }
} 