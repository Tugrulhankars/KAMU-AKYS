using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SporcuLisansTakip.API.Data;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Models;

namespace SporcuLisansTakip.API.Services
{
    public class SportService : ISportService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public SportService(ApplicationDbContext context, IMapper mapper, IFileService fileService)
        {
            _context = context;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<SportDto> CreateSportAsync(CreateSportRequest request)
        {
            var existingSport = await _context.Sports
                .FirstOrDefaultAsync(s => s.Name.ToLower() == request.Name.ToLower());
            
            if (existingSport != null)
                throw new InvalidOperationException("Bu isimde bir spor zaten mevcut");

            var sport = _mapper.Map<Sport>(request);
            sport.CreatedAt = DateTime.UtcNow;
            sport.IsActive = true;

            _context.Sports.Add(sport);
            await _context.SaveChangesAsync();

            return await GetSportByIdAsync(sport.Id);
        }

        public async Task<SportDto?> GetSportByIdAsync(int id)
        {
            var sport = await _context.Sports
                .Include(s => s.Licenses)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sport == null) return null;

            var sportDto = _mapper.Map<SportDto>(sport);
            sportDto.LicenseCount = sport.Licenses.Count;

            return sportDto;
        }

        public async Task<List<SportListDto>> GetAllSportsAsync()
        {
            var sports = await _context.Sports
                .Include(s => s.Licenses)
                .Where(s => s.IsActive)
                .OrderBy(s => s.Name)
                .ToListAsync();

            return sports.Select(s => new SportListDto
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                IconPath = s.IconPath,
                IsActive = s.IsActive,
                LicenseCount = s.Licenses.Count
            }).ToList();
        }

        public async Task<SportDto> UpdateSportAsync(int id, UpdateSportRequest request)
        {
            var sport = await _context.Sports.FindAsync(id);
            if (sport == null)
                throw new InvalidOperationException("Spor bulunamadı");

            var existingSport = await _context.Sports
                .FirstOrDefaultAsync(s => s.Name.ToLower() == request.Name.ToLower() && s.Id != id);
            
            if (existingSport != null)
                throw new InvalidOperationException("Bu isimde bir spor zaten mevcut");

            _mapper.Map(request, sport);
            sport.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetSportByIdAsync(id);
        }

        public async Task<bool> DeleteSportAsync(int id)
        {
            var sport = await _context.Sports
                .Include(s => s.Licenses)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (sport == null) return false;

            if (sport.Licenses.Any())
                throw new InvalidOperationException("Bu spora ait lisanslar bulunduğu için silinemez");

            _context.Sports.Remove(sport);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeactivateSportAsync(int id)
        {
            var sport = await _context.Sports.FindAsync(id);
            if (sport == null) return false;

            sport.IsActive = false;
            sport.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ActivateSportAsync(int id)
        {
            var sport = await _context.Sports.FindAsync(id);
            if (sport == null) return false;

            sport.IsActive = true;
            sport.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string?> UploadIconAsync(int sportId, IFormFile file)
        {
            var sport = await _context.Sports.FindAsync(sportId);
            if (sport == null) return null;

            var fileName = $"sport_{sportId}_{DateTime.UtcNow:yyyyMMddHHmmss}{Path.GetExtension(file.FileName)}";
            var filePath = await _fileService.SaveFileAsync(file, "sports", fileName);

            sport.IconPath = filePath;
            sport.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return filePath;
        }
    }
} 