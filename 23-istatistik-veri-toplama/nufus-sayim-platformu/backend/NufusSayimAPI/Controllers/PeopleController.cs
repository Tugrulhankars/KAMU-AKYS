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
public class PeopleController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public PeopleController(ApplicationDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpGet]
    public async Task<ActionResult<object>> GetPeople(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] int? householdId = null,
        [FromQuery] int? districtId = null,
        [FromQuery] int? cityId = null,
        [FromQuery] string? gender = null,
        [FromQuery] int? minAge = null,
        [FromQuery] int? maxAge = null,
        [FromQuery] bool includeInactive = false)
    {
        try
        {
            var query = _context.People
                .Include(p => p.Household)
                    .ThenInclude(h => h.District)
                        .ThenInclude(d => d.City)
                .Include(p => p.CreatedByUser)
                .Include(p => p.UpdatedByUser)
                .AsQueryable();

            // Apply filters
            if (!includeInactive)
                query = query.Where(p => p.IsActive);

            if (householdId.HasValue)
                query = query.Where(p => p.HouseholdId == householdId.Value);

            if (districtId.HasValue)
                query = query.Where(p => p.Household.DistrictId == districtId.Value);

            if (cityId.HasValue)
                query = query.Where(p => p.Household.District.CityId == cityId.Value);

            if (!string.IsNullOrEmpty(gender))
                query = query.Where(p => p.Gender.ToLower() == gender.ToLower());

            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.Name.Contains(search) || 
                                        p.Surname.Contains(search) || 
                                        p.NationalId.Contains(search) ||
                                        p.PhoneNumber.Contains(search) ||
                                        p.Household.Address.Contains(search));

            var people = await query.ToListAsync();

            // Apply age filter after loading (because Age is calculated property)
            if (minAge.HasValue)
                people = people.Where(p => p.Age >= minAge.Value).ToList();

            if (maxAge.HasValue)
                people = people.Where(p => p.Age <= maxAge.Value).ToList();

            var totalCount = people.Count;
            var pageCount = (int)Math.Ceiling((double)totalCount / pageSize);

            var paginatedPeople = people
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var peopleDto = paginatedPeople.Select(p => new PersonDto
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
                HouseholdAddress = p.Household.Address,
                DistrictName = p.Household.District.Name,
                CityName = p.Household.District.City.Name
            }).OrderBy(p => p.CityName)
              .ThenBy(p => p.DistrictName)
              .ThenBy(p => p.HouseholdAddress)
              .ThenBy(p => p.BirthDate)
              .ToList();

            var result = new
            {
                Items = peopleDto,
                TotalCount = totalCount,
                PageCount = pageCount,
                CurrentPage = page,
                PageSize = pageSize
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Kişiler listelenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PersonDto>> GetPerson(int id)
    {
        try
        {
            var person = await _context.People
                .Include(p => p.Household)
                    .ThenInclude(h => h.District)
                        .ThenInclude(d => d.City)
                .Include(p => p.CreatedByUser)
                .Include(p => p.UpdatedByUser)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (person == null)
            {
                return NotFound(new { message = "Kişi bulunamadı" });
            }

            var personDto = new PersonDto
            {
                Id = person.Id,
                Name = person.Name,
                Surname = person.Surname,
                BirthDate = person.BirthDate,
                Gender = person.Gender,
                Age = person.Age,
                HouseholdId = person.HouseholdId,
                NationalId = person.NationalId,
                PhoneNumber = person.PhoneNumber,
                Email = person.Email,
                Occupation = person.Occupation,
                MaritalStatus = person.MaritalStatus,
                EducationLevel = person.EducationLevel,
                CreatedAt = person.CreatedAt,
                UpdatedAt = person.UpdatedAt,
                CreatedByUsername = person.CreatedByUser.Username,
                UpdatedByUsername = person.UpdatedByUser?.Username,
                IsActive = person.IsActive,
                HouseholdAddress = person.Household.Address,
                DistrictName = person.Household.District.Name,
                CityName = person.Household.District.City.Name
            };

            return Ok(personDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Kişi bilgileri alınırken hata oluştu", error = ex.Message });
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Görevli")]
    public async Task<ActionResult<PersonDto>> CreatePerson(CreatePersonRequest request)
    {
        try
        {
            // Get current user
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var userId = _jwtService.GetUserIdFromToken(token!);

            // Check if household exists
            var household = await _context.Households
                .Include(h => h.District)
                    .ThenInclude(d => d.City)
                .FirstOrDefaultAsync(h => h.Id == request.HouseholdId && h.IsActive);

            if (household == null)
            {
                return BadRequest(new { message = "Hane bulunamadı veya aktif değil" });
            }

            // Validate birth date
            if (request.BirthDate > DateTime.Now.Date)
            {
                return BadRequest(new { message = "Doğum tarihi gelecek bir tarih olamaz" });
            }

            if (request.BirthDate < new DateTime(1900, 1, 1))
            {
                return BadRequest(new { message = "Doğum tarihi çok eski bir tarih olamaz" });
            }

            // Check if National ID already exists (if provided)
            if (!string.IsNullOrEmpty(request.NationalId))
            {
                var existingPerson = await _context.People
                    .FirstOrDefaultAsync(p => p.NationalId == request.NationalId && p.IsActive);

                if (existingPerson != null)
                {
                    return BadRequest(new { message = "Bu TC Kimlik Numarası zaten kayıtlı" });
                }
            }

            var person = new Person
            {
                Name = request.Name,
                Surname = request.Surname,
                BirthDate = request.BirthDate,
                Gender = request.Gender,
                HouseholdId = request.HouseholdId,
                NationalId = request.NationalId,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                Occupation = request.Occupation,
                MaritalStatus = request.MaritalStatus,
                EducationLevel = request.EducationLevel,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = userId!.Value,
                IsActive = true
            };

            _context.People.Add(person);
            await _context.SaveChangesAsync();

            var personDto = new PersonDto
            {
                Id = person.Id,
                Name = person.Name,
                Surname = person.Surname,
                BirthDate = person.BirthDate,
                Gender = person.Gender,
                Age = person.Age,
                HouseholdId = person.HouseholdId,
                NationalId = person.NationalId,
                PhoneNumber = person.PhoneNumber,
                Email = person.Email,
                Occupation = person.Occupation,
                MaritalStatus = person.MaritalStatus,
                EducationLevel = person.EducationLevel,
                CreatedAt = person.CreatedAt,
                CreatedByUsername = _jwtService.GetUsernameFromToken(token!)!,
                IsActive = person.IsActive,
                HouseholdAddress = household.Address,
                DistrictName = household.District.Name,
                CityName = household.District.City.Name
            };

            return CreatedAtAction(nameof(GetPerson), new { id = person.Id }, personDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Kişi oluşturulurken hata oluştu", error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Görevli")]
    public async Task<ActionResult<PersonDto>> UpdatePerson(int id, UpdatePersonRequest request)
    {
        try
        {
            var person = await _context.People
                .Include(p => p.Household)
                    .ThenInclude(h => h.District)
                        .ThenInclude(d => d.City)
                .Include(p => p.CreatedByUser)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (person == null)
            {
                return NotFound(new { message = "Kişi bulunamadı" });
            }

            // Check if new household exists
            if (request.HouseholdId != person.HouseholdId)
            {
                var newHousehold = await _context.Households
                    .Include(h => h.District)
                        .ThenInclude(d => d.City)
                    .FirstOrDefaultAsync(h => h.Id == request.HouseholdId && h.IsActive);

                if (newHousehold == null)
                {
                    return BadRequest(new { message = "Yeni hane bulunamadı veya aktif değil" });
                }
            }

            // Validate birth date
            if (request.BirthDate > DateTime.Now.Date)
            {
                return BadRequest(new { message = "Doğum tarihi gelecek bir tarih olamaz" });
            }

            if (request.BirthDate < new DateTime(1900, 1, 1))
            {
                return BadRequest(new { message = "Doğum tarihi çok eski bir tarih olamaz" });
            }

            // Check if National ID already exists (if changed and provided)
            if (!string.IsNullOrEmpty(request.NationalId) && request.NationalId != person.NationalId)
            {
                var existingPerson = await _context.People
                    .FirstOrDefaultAsync(p => p.NationalId == request.NationalId && p.IsActive && p.Id != id);

                if (existingPerson != null)
                {
                    return BadRequest(new { message = "Bu TC Kimlik Numarası zaten kayıtlı" });
                }
            }

            // Get current user
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var userId = _jwtService.GetUserIdFromToken(token!);

            // Update person
            person.Name = request.Name;
            person.Surname = request.Surname;
            person.BirthDate = request.BirthDate;
            person.Gender = request.Gender;
            person.HouseholdId = request.HouseholdId;
            person.NationalId = request.NationalId;
            person.PhoneNumber = request.PhoneNumber;
            person.Email = request.Email;
            person.Occupation = request.Occupation;
            person.MaritalStatus = request.MaritalStatus;
            person.EducationLevel = request.EducationLevel;
            person.IsActive = request.IsActive;
            person.UpdatedAt = DateTime.UtcNow;
            person.UpdatedByUserId = userId;

            await _context.SaveChangesAsync();

            // Reload with updated household info if changed
            if (request.HouseholdId != person.HouseholdId)
            {
                await _context.Entry(person)
                    .Reference(p => p.Household)
                    .Query()
                    .Include(h => h.District)
                        .ThenInclude(d => d.City)
                    .LoadAsync();
            }

            var personDto = new PersonDto
            {
                Id = person.Id,
                Name = person.Name,
                Surname = person.Surname,
                BirthDate = person.BirthDate,
                Gender = person.Gender,
                Age = person.Age,
                HouseholdId = person.HouseholdId,
                NationalId = person.NationalId,
                PhoneNumber = person.PhoneNumber,
                Email = person.Email,
                Occupation = person.Occupation,
                MaritalStatus = person.MaritalStatus,
                EducationLevel = person.EducationLevel,
                CreatedAt = person.CreatedAt,
                UpdatedAt = person.UpdatedAt,
                CreatedByUsername = person.CreatedByUser.Username,
                UpdatedByUsername = _jwtService.GetUsernameFromToken(token!)!,
                IsActive = person.IsActive,
                HouseholdAddress = person.Household.Address,
                DistrictName = person.Household.District.Name,
                CityName = person.Household.District.City.Name
            };

            return Ok(personDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Kişi güncellenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeletePerson(int id)
    {
        try
        {
            var person = await _context.People.FindAsync(id);
            if (person == null)
            {
                return NotFound(new { message = "Kişi bulunamadı" });
            }

            // Soft delete - mark as inactive
            person.IsActive = false;
            person.UpdatedAt = DateTime.UtcNow;

            // Get current user
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var userId = _jwtService.GetUserIdFromToken(token!);
            person.UpdatedByUserId = userId;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Kişi başarıyla silindi" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Kişi silinirken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<PersonDto>>> SearchPeople(
        [FromQuery] string? name = null,
        [FromQuery] string? surname = null,
        [FromQuery] string? nationalId = null,
        [FromQuery] string? phoneNumber = null)
    {
        try
        {
            if (string.IsNullOrEmpty(name) && string.IsNullOrEmpty(surname) && 
                string.IsNullOrEmpty(nationalId) && string.IsNullOrEmpty(phoneNumber))
            {
                return BadRequest(new { message = "En az bir arama kriteri girilmelidir" });
            }

            var query = _context.People
                .Include(p => p.Household)
                    .ThenInclude(h => h.District)
                        .ThenInclude(d => d.City)
                .Include(p => p.CreatedByUser)
                .Include(p => p.UpdatedByUser)
                .Where(p => p.IsActive)
                .AsQueryable();

            if (!string.IsNullOrEmpty(name))
                query = query.Where(p => p.Name.ToLower().Contains(name.ToLower()));

            if (!string.IsNullOrEmpty(surname))
                query = query.Where(p => p.Surname.ToLower().Contains(surname.ToLower()));

            if (!string.IsNullOrEmpty(nationalId))
                query = query.Where(p => p.NationalId != null && p.NationalId.Contains(nationalId));

            if (!string.IsNullOrEmpty(phoneNumber))
                query = query.Where(p => p.PhoneNumber != null && p.PhoneNumber.Contains(phoneNumber));

            var people = await query
                .Take(100) // Limit results
                .Select(p => new PersonDto
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
                    UpdatedByUsername = p.UpdatedByUser != null ? p.UpdatedByUser.Username : null,
                    IsActive = p.IsActive,
                    HouseholdAddress = p.Household.Address,
                    DistrictName = p.Household.District.Name,
                    CityName = p.Household.District.City.Name
                })
                .OrderBy(p => p.Surname)
                .ThenBy(p => p.Name)
                .ToListAsync();

            return Ok(people);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Kişi arama sırasında hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("household/{householdId}")]
    public async Task<ActionResult<IEnumerable<PersonDto>>> GetPeopleByHousehold(int householdId)
    {
        try
        {
            var household = await _context.Households
                .Include(h => h.District)
                    .ThenInclude(d => d.City)
                .FirstOrDefaultAsync(h => h.Id == householdId);

            if (household == null)
            {
                return NotFound(new { message = "Hane bulunamadı" });
            }

            var people = await _context.People
                .Include(p => p.Household)
                    .ThenInclude(h => h.District)
                        .ThenInclude(d => d.City)
                .Include(p => p.CreatedByUser)
                .Include(p => p.UpdatedByUser)
                .Where(p => p.HouseholdId == householdId && p.IsActive)
                .Select(p => new PersonDto
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
                    UpdatedByUsername = p.UpdatedByUser != null ? p.UpdatedByUser.Username : null,
                    IsActive = p.IsActive,
                    HouseholdAddress = p.Household.Address,
                    DistrictName = p.Household.District.Name,
                    CityName = p.Household.District.City.Name
                })
                .OrderBy(p => p.BirthDate)
                .ToListAsync();

            return Ok(people);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Hane kişileri listelenirken hata oluştu", error = ex.Message });
        }
    }
} 