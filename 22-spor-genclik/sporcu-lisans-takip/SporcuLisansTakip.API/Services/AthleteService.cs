using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SporcuLisansTakip.API.Data;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Models;

namespace SporcuLisansTakip.API.Services
{
    public class AthleteService : IAthleteService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public AthleteService(ApplicationDbContext context, IMapper mapper, IFileService fileService)
        {
            _context = context;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<AthleteDto> CreateAthleteAsync(CreateAthleteRequest request)
        {
            var existingAthlete = await _context.Athletes
                .FirstOrDefaultAsync(a => a.IdentityNumber == request.IdentityNumber);
            
            if (existingAthlete != null)
                throw new InvalidOperationException("Bu TC kimlik numarası ile kayıtlı sporcu bulunmaktadır");

            var athlete = _mapper.Map<Athlete>(request);
            athlete.CreatedAt = DateTime.UtcNow;
            athlete.IsActive = true;

            _context.Athletes.Add(athlete);
            await _context.SaveChangesAsync();

            return await GetAthleteByIdAsync(athlete.Id);
        }

        public async Task<AthleteDto?> GetAthleteByIdAsync(int id)
        {
            var athlete = await _context.Athletes
                .Include(a => a.Club)
                .Include(a => a.Licenses)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (athlete == null) return null;

            var athleteDto = _mapper.Map<AthleteDto>(athlete);
            athleteDto.LicenseCount = athlete.Licenses.Count;
            athleteDto.ClubName = athlete.Club?.Name;

            return athleteDto;
        }

        public async Task<AthleteDto?> GetAthleteByIdentityNumberAsync(string identityNumber)
        {
            var athlete = await _context.Athletes
                .Include(a => a.Club)
                .Include(a => a.Licenses)
                .FirstOrDefaultAsync(a => a.IdentityNumber == identityNumber);

            if (athlete == null) return null;

            var athleteDto = _mapper.Map<AthleteDto>(athlete);
            athleteDto.LicenseCount = athlete.Licenses.Count;
            athleteDto.ClubName = athlete.Club?.Name;

            return athleteDto;
        }

        public async Task<List<AthleteListDto>> GetAllAthletesAsync()
        {
            var athletes = await _context.Athletes
                .Include(a => a.Club)
                .Include(a => a.Licenses)
                .Where(a => a.IsActive)
                .OrderBy(a => a.FirstName)
                .ThenBy(a => a.LastName)
                .ToListAsync();

            return athletes.Select(a => new AthleteListDto
            {
                Id = a.Id,
                FullName = a.FullName,
                IdentityNumber = a.IdentityNumber,
                Age = a.Age,
                ClubName = a.Club?.Name,
                PhoneNumber = a.PhoneNumber,
                IsActive = a.IsActive,
                LicenseCount = a.Licenses.Count
            }).ToList();
        }

        public async Task<List<AthleteListDto>> GetAthletesByClubAsync(int clubId)
        {
            var athletes = await _context.Athletes
                .Include(a => a.Club)
                .Include(a => a.Licenses)
                .Where(a => a.ClubId == clubId && a.IsActive)
                .OrderBy(a => a.FirstName)
                .ThenBy(a => a.LastName)
                .ToListAsync();

            return athletes.Select(a => new AthleteListDto
            {
                Id = a.Id,
                FullName = a.FullName,
                IdentityNumber = a.IdentityNumber,
                Age = a.Age,
                ClubName = a.Club?.Name,
                PhoneNumber = a.PhoneNumber,
                IsActive = a.IsActive,
                LicenseCount = a.Licenses.Count
            }).ToList();
        }

        public async Task<AthleteDto> UpdateAthleteAsync(int id, UpdateAthleteRequest request)
        {
            var athlete = await _context.Athletes.FindAsync(id);
            if (athlete == null)
                throw new InvalidOperationException("Sporcu bulunamadı");

            _mapper.Map(request, athlete);
            athlete.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetAthleteByIdAsync(id);
        }

        public async Task<bool> DeleteAthleteAsync(int id)
        {
            var athlete = await _context.Athletes.FindAsync(id);
            if (athlete == null) return false;

            _context.Athletes.Remove(athlete);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeactivateAthleteAsync(int id)
        {
            var athlete = await _context.Athletes.FindAsync(id);
            if (athlete == null) return false;

            athlete.IsActive = false;
            athlete.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ActivateAthleteAsync(int id)
        {
            var athlete = await _context.Athletes.FindAsync(id);
            if (athlete == null) return false;

            athlete.IsActive = true;
            athlete.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string?> UploadPhotoAsync(int athleteId, IFormFile file)
        {
            var athlete = await _context.Athletes.FindAsync(athleteId);
            if (athlete == null) return null;

            var fileName = $"athlete_{athleteId}_{DateTime.UtcNow:yyyyMMddHHmmss}{Path.GetExtension(file.FileName)}";
            var filePath = await _fileService.SaveFileAsync(file, "athletes", fileName);

            athlete.PhotoPath = filePath;
            athlete.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return filePath;
        }

        public async Task<List<AthleteListDto>> SearchAthletesAsync(string searchTerm)
        {
            var athletes = await _context.Athletes
                .Include(a => a.Club)
                .Include(a => a.Licenses)
                .Where(a => a.IsActive && 
                           (a.FirstName.Contains(searchTerm) || 
                            a.LastName.Contains(searchTerm) || 
                            a.IdentityNumber.Contains(searchTerm) ||
                            a.PhoneNumber.Contains(searchTerm)))
                .OrderBy(a => a.FirstName)
                .ThenBy(a => a.LastName)
                .ToListAsync();

            return athletes.Select(a => new AthleteListDto
            {
                Id = a.Id,
                FullName = a.FullName,
                IdentityNumber = a.IdentityNumber,
                Age = a.Age,
                ClubName = a.Club?.Name,
                PhoneNumber = a.PhoneNumber,
                IsActive = a.IsActive,
                LicenseCount = a.Licenses.Count
            }).ToList();
        }
    }
} 