using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SporcuLisansTakip.API.Data;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Models;

namespace SporcuLisansTakip.API.Services
{
    public class ClubService : IClubService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public ClubService(ApplicationDbContext context, IMapper mapper, IFileService fileService)
        {
            _context = context;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<ClubDto> CreateClubAsync(CreateClubRequest request)
        {
            var existingClub = await _context.Clubs
                .FirstOrDefaultAsync(c => c.Name.ToLower() == request.Name.ToLower());
            
            if (existingClub != null)
                throw new InvalidOperationException("Bu isimde bir kulüp zaten mevcut");

            var club = _mapper.Map<Club>(request);
            club.CreatedAt = DateTime.UtcNow;
            club.IsActive = true;

            _context.Clubs.Add(club);
            await _context.SaveChangesAsync();

            return await GetClubByIdAsync(club.Id);
        }

        public async Task<ClubDto?> GetClubByIdAsync(int id)
        {
            var club = await _context.Clubs
                .Include(c => c.Athletes)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (club == null) return null;

            var clubDto = _mapper.Map<ClubDto>(club);
            clubDto.AthleteCount = club.Athletes.Count;

            return clubDto;
        }

        public async Task<List<ClubListDto>> GetAllClubsAsync()
        {
            var clubs = await _context.Clubs
                .Include(c => c.Athletes)
                .Where(c => c.IsActive)
                .OrderBy(c => c.Name)
                .ToListAsync();

            return clubs.Select(c => new ClubListDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                PhoneNumber = c.PhoneNumber,
                Email = c.Email,
                IsActive = c.IsActive,
                AthleteCount = c.Athletes.Count
            }).ToList();
        }

        public async Task<ClubDto> UpdateClubAsync(int id, UpdateClubRequest request)
        {
            var club = await _context.Clubs.FindAsync(id);
            if (club == null)
                throw new InvalidOperationException("Kulüp bulunamadı");

            var existingClub = await _context.Clubs
                .FirstOrDefaultAsync(c => c.Name.ToLower() == request.Name.ToLower() && c.Id != id);
            
            if (existingClub != null)
                throw new InvalidOperationException("Bu isimde bir kulüp zaten mevcut");

            _mapper.Map(request, club);
            club.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetClubByIdAsync(id);
        }

        public async Task<bool> DeleteClubAsync(int id)
        {
            var club = await _context.Clubs
                .Include(c => c.Athletes)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (club == null) return false;

            if (club.Athletes.Any())
                throw new InvalidOperationException("Bu kulübe ait sporcular bulunduğu için silinemez");

            _context.Clubs.Remove(club);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeactivateClubAsync(int id)
        {
            var club = await _context.Clubs.FindAsync(id);
            if (club == null) return false;

            club.IsActive = false;
            club.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ActivateClubAsync(int id)
        {
            var club = await _context.Clubs.FindAsync(id);
            if (club == null) return false;

            club.IsActive = true;
            club.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string?> UploadLogoAsync(int clubId, IFormFile file)
        {
            var club = await _context.Clubs.FindAsync(clubId);
            if (club == null) return null;

            var fileName = $"club_{clubId}_{DateTime.UtcNow:yyyyMMddHHmmss}{Path.GetExtension(file.FileName)}";
            var filePath = await _fileService.SaveFileAsync(file, "clubs", fileName);

            club.LogoPath = filePath;
            club.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return filePath;
        }

        public async Task<List<ClubListDto>> SearchClubsAsync(string searchTerm)
        {
            var clubs = await _context.Clubs
                .Include(c => c.Athletes)
                .Where(c => c.IsActive && 
                           (c.Name.Contains(searchTerm) || 
                            c.Description.Contains(searchTerm) ||
                            c.PhoneNumber.Contains(searchTerm) ||
                            c.Email.Contains(searchTerm)))
                .OrderBy(c => c.Name)
                .ToListAsync();

            return clubs.Select(c => new ClubListDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description,
                PhoneNumber = c.PhoneNumber,
                Email = c.Email,
                IsActive = c.IsActive,
                AthleteCount = c.Athletes.Count
            }).ToList();
        }
    }
} 