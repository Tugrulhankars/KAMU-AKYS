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
public class HouseholdsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public HouseholdsController(ApplicationDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpGet]
    public async Task<ActionResult<object>> GetHouseholds(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] int? districtId = null,
        [FromQuery] int? cityId = null,
        [FromQuery] bool includeInactive = false)
    {
        try
        {
            var query = _context.Households
                .Include(h => h.District)
                    .ThenInclude(d => d.City)
                .Include(h => h.CreatedByUser)
                .Include(h => h.UpdatedByUser)
                .Include(h => h.People)
                .AsQueryable();

            // Apply filters
            if (!includeInactive)
                query = query.Where(h => h.IsActive);

            if (districtId.HasValue)
                query = query.Where(h => h.DistrictId == districtId.Value);

            if (cityId.HasValue)
                query = query.Where(h => h.District.CityId == cityId.Value);

            if (!string.IsNullOrEmpty(search))
                query = query.Where(h => h.Address.Contains(search) || 
                                        h.District.Name.Contains(search) || 
                                        h.District.City.Name.Contains(search));

            var totalCount = await query.CountAsync();
            var pageCount = (int)Math.Ceiling((double)totalCount / pageSize);

            var households = await query
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
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = new
            {
                Items = households,
                TotalCount = totalCount,
                PageCount = pageCount,
                CurrentPage = page,
                PageSize = pageSize
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Haneler listelenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<HouseholdDto>> GetHousehold(int id)
    {
        try
        {
            var household = await _context.Households
                .Include(h => h.District)
                    .ThenInclude(d => d.City)
                .Include(h => h.CreatedByUser)
                .Include(h => h.UpdatedByUser)
                .Include(h => h.People.Where(p => p.IsActive))
                    .ThenInclude(p => p.CreatedByUser)
                .Include(h => h.People.Where(p => p.IsActive))
                    .ThenInclude(p => p.UpdatedByUser)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (household == null)
            {
                return NotFound(new { message = "Hane bulunamadı" });
            }

            var householdDto = new HouseholdDto
            {
                Id = household.Id,
                Address = household.Address,
                DistrictId = household.DistrictId,
                DistrictName = household.District.Name,
                CityName = household.District.City.Name,
                CreatedAt = household.CreatedAt,
                UpdatedAt = household.UpdatedAt,
                CreatedByUsername = household.CreatedByUser.Username,
                UpdatedByUsername = household.UpdatedByUser?.Username,
                Notes = household.Notes,
                IsActive = household.IsActive,
                PersonCount = household.People.Count,
                People = household.People.Select(p => new PersonDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Surname = p.Surname,
                    BirthDate = p.BirthDate,
                    Gender = p.Gender,
                    Age = p.Age,
                    HouseholdId = p.HouseholdId,
                    NationalId = p.NationalId,
                    PhoneNumber = p.PhoneNumber,
                    Email = p.Email,
                    Occupation = p.Occupation,
                    MaritalStatus = p.MaritalStatus,
                    EducationLevel = p.EducationLevel,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    CreatedByUsername = p.CreatedByUser.Username,
                    UpdatedByUsername = p.UpdatedByUser?.Username,
                    IsActive = p.IsActive,
                    HouseholdAddress = household.Address,
                    DistrictName = household.District.Name,
                    CityName = household.District.City.Name
                }).OrderBy(p => p.BirthDate).ToList()
            };

            return Ok(householdDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Hane bilgileri alınırken hata oluştu", error = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Görevli")]
    public async Task<ActionResult<HouseholdDto>> CreateHousehold(CreateHouseholdRequest request)
    {
        try
        {
            // Get current user
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var userId = _jwtService.GetUserIdFromToken(token!);

            // Check if district exists
            var district = await _context.Districts
                .Include(d => d.City)
                .FirstOrDefaultAsync(d => d.Id == request.DistrictId);

            if (district == null)
            {
                return BadRequest(new { message = "İlçe bulunamadı" });
            }

            var household = new Household
            {
                Address = request.Address,
                DistrictId = request.DistrictId,
                Notes = request.Notes,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = userId!.Value,
                IsActive = true
            };

            _context.Households.Add(household);
            await _context.SaveChangesAsync();

            var householdDto = new HouseholdDto
            {
                Id = household.Id,
                Address = household.Address,
                DistrictId = household.DistrictId,
                DistrictName = district.Name,
                CityName = district.City.Name,
                CreatedAt = household.CreatedAt,
                CreatedByUsername = _jwtService.GetUsernameFromToken(token!)!,
                Notes = household.Notes,
                IsActive = household.IsActive,
                PersonCount = 0,
                People = new List<PersonDto>()
            };

            return CreatedAtAction(nameof(GetHousehold), new { id = household.Id }, householdDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Hane oluşturulurken hata oluştu", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Görevli")]
    public async Task<ActionResult<HouseholdDto>> UpdateHousehold(int id, UpdateHouseholdRequest request)
    {
        try
        {
            var household = await _context.Households
                .Include(h => h.District)
                    .ThenInclude(d => d.City)
                .Include(h => h.CreatedByUser)
                .FirstOrDefaultAsync(h => h.Id == id);

            if (household == null)
            {
                return NotFound(new { message = "Hane bulunamadı" });
            }

            // Check if new district exists
            if (request.DistrictId != household.DistrictId)
            {
                var newDistrict = await _context.Districts
                    .Include(d => d.City)
                    .FirstOrDefaultAsync(d => d.Id == request.DistrictId);

                if (newDistrict == null)
                {
                    return BadRequest(new { message = "Yeni ilçe bulunamadı" });
                }
            }

            // Get current user
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var userId = _jwtService.GetUserIdFromToken(token!);

            // Update household
            household.Address = request.Address;
            household.DistrictId = request.DistrictId;
            household.Notes = request.Notes;
            household.IsActive = request.IsActive;
            household.UpdatedAt = DateTime.UtcNow;
            household.UpdatedByUserId = userId;

            await _context.SaveChangesAsync();

            // Reload with updated district info
            await _context.Entry(household)
                .Reference(h => h.District)
                .Query()
                .Include(d => d.City)
                .LoadAsync();

            var householdDto = new HouseholdDto
            {
                Id = household.Id,
                Address = household.Address,
                DistrictId = household.DistrictId,
                DistrictName = household.District.Name,
                CityName = household.District.City.Name,
                CreatedAt = household.CreatedAt,
                UpdatedAt = household.UpdatedAt,
                CreatedByUsername = household.CreatedByUser.Username,
                UpdatedByUsername = _jwtService.GetUsernameFromToken(token!)!,
                Notes = household.Notes,
                IsActive = household.IsActive,
                PersonCount = await _context.People.CountAsync(p => p.HouseholdId == id && p.IsActive)
            };

            return Ok(householdDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Hane güncellenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteHousehold(int id)
    {
        try
        {
            var household = await _context.Households.FindAsync(id);
            if (household == null)
            {
                return NotFound(new { message = "Hane bulunamadı" });
            }

            // Soft delete - mark as inactive
            household.IsActive = false;
            household.UpdatedAt = DateTime.UtcNow;

            // Get current user
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var userId = _jwtService.GetUserIdFromToken(token!);
            household.UpdatedByUserId = userId;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Hane başarıyla silindi" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Hane silinirken hata oluştu", error = ex.Message });
        }
    }
} 