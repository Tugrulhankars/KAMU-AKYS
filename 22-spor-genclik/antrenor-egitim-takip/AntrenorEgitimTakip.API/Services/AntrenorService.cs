using AntrenorEgitimTakip.API.Data;
using AntrenorEgitimTakip.API.Models;
using Microsoft.EntityFrameworkCore;
using AntrenorEgitimTakip.API.DTOs;
using AutoMapper;
using AntrenorEgitimTakip.API.AutoMapper;

namespace AntrenorEgitimTakip.API.Services
{
    public interface IAntrenorService
    {
        Task<IEnumerable<AntrenorDto>> GetAllAsync();
        Task<AntrenorDto?> GetByIdAsync(int id);
        Task<AntrenorDto> CreateAsync(CreateAntrenorDto createDto);
        Task<AntrenorDto> UpdateAsync(int id, UpdateAntrenorDto updateDto);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<AntrenorDto>> SearchAsync(string searchTerm);
        Task<IEnumerable<AntrenorDto>> GetByExpertiseAsync(string expertise);
        Task<IEnumerable<AntrenorDto>> GetActiveAsync();
        Task<AntrenorDto?> GetByUserIdAsync(int userId);
        Task<IEnumerable<AntrenorDto>> GetByLicenseStatusAsync(bool isValid);
        Task<IEnumerable<AntrenorDto>> GetByExperienceLevelAsync(int minYears);
    }

    public class AntrenorService : IAntrenorService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<AntrenorService> _logger;

        public AntrenorService(ApplicationDbContext context, IMapper mapper, ILogger<AntrenorService> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<IEnumerable<AntrenorDto>> GetAllAsync()
        {
            try
            {
                var antrenorler = await _context.Antrenorler
                    .Include(a => a.User)
                    .Include(a => a.Bilgi)
                    .Include(a => a.Uzmanliklar)
                        .ThenInclude(u => u.Uzmanlik)
                    .Include(a => a.Deneyimler)
                    .Where(a => a.IsActive)
                    .OrderBy(a => a.User.FirstName)
                    .ThenBy(a => a.User.LastName)
                    .ToListAsync();

                return _mapper.Map<IEnumerable<AntrenorDto>>(antrenorler);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting all trainers");
                throw;
            }
        }

        public async Task<AntrenorDto?> GetByIdAsync(int id)
        {
            try
            {
                var antrenor = await _context.Antrenorler
                    .Include(a => a.User)
                    .Include(a => a.Bilgi)
                    .Include(a => a.Uzmanliklar)
                        .ThenInclude(u => u.Uzmanlik)
                    .Include(a => a.Deneyimler)
                    .Include(a => a.Sertifikalar)
                    .Include(a => a.Performanslar)
                    .Include(a => a.EgitimKayitlari)
                        .ThenInclude(ek => ek.Egitim)
                    .Include(a => a.SporcuAntrenorler)
                        .ThenInclude(sa => sa.Sporcu)
                            .ThenInclude(s => s.User)
                    .FirstOrDefaultAsync(a => a.Id == id && a.IsActive);

                return _mapper.Map<AntrenorDto>(antrenor);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting trainer by id: {Id}", id);
                throw;
            }
        }

        public async Task<AntrenorDto> CreateAsync(CreateAntrenorDto createDto)
        {
            try
            {
                var antrenor = _mapper.Map<Antrenor>(createDto);

                // Check if trainer number already exists
                if (await _context.Antrenorler.AnyAsync(a => a.TrainerNumber == antrenor.TrainerNumber))
                {
                    throw new InvalidOperationException($"Trainer number '{antrenor.TrainerNumber}' already exists");
                }

                antrenor.CreatedAt = DateTime.UtcNow;
                antrenor.IsActive = true;

                _context.Antrenorler.Add(antrenor);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Created new trainer with ID: {Id}", antrenor.Id);

                return await GetByIdAsync(antrenor.Id) ?? throw new InvalidOperationException("Failed to retrieve created trainer");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating trainer");
                throw;
            }
        }

        public async Task<AntrenorDto> UpdateAsync(int id, UpdateAntrenorDto updateDto)
        {
            try
            {
                var existingAntrenor = await _context.Antrenorler
                    .Include(a => a.User)
                    .FirstOrDefaultAsync(a => a.Id == id && a.IsActive);

                if (existingAntrenor == null)
                {
                    throw new KeyNotFoundException($"Trainer with ID {id} not found");
                }

                var antrenor = _mapper.Map<Antrenor>(updateDto);

                // Check if trainer number already exists for another trainer
                if (await _context.Antrenorler.AnyAsync(a => a.TrainerNumber == antrenor.TrainerNumber && a.Id != antrenor.Id))
                {
                    throw new InvalidOperationException($"Trainer number '{antrenor.TrainerNumber}' already exists");
                }

                // Update trainer properties
                existingAntrenor.TrainerNumber = antrenor.TrainerNumber;
                existingAntrenor.LicenseNumber = antrenor.LicenseNumber;
                existingAntrenor.ExpertiseArea = antrenor.ExpertiseArea;
                existingAntrenor.Level = antrenor.Level;
                existingAntrenor.LicenseStartDate = antrenor.LicenseStartDate;
                existingAntrenor.LicenseEndDate = antrenor.LicenseEndDate;
                existingAntrenor.LicenseIssuingAuthority = antrenor.LicenseIssuingAuthority;
                existingAntrenor.Description = antrenor.Description;
                existingAntrenor.UpdatedAt = DateTime.UtcNow;
                existingAntrenor.UpdatedBy = "System"; // TODO: Get from current user

                // Update user properties if provided
                if (antrenor.User != null)
                {
                    existingAntrenor.User.FirstName = antrenor.User.FirstName;
                    existingAntrenor.User.LastName = antrenor.User.LastName;
                    existingAntrenor.User.Email = antrenor.User.Email;
                    existingAntrenor.User.PhoneNumber = antrenor.User.PhoneNumber;
                    existingAntrenor.User.UpdatedAt = DateTime.UtcNow;
                }

                await _context.SaveChangesAsync();

                _logger.LogInformation("Updated trainer with ID: {Id}", id);

                return await GetByIdAsync(id) ?? throw new InvalidOperationException("Failed to retrieve updated trainer");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating trainer with ID: {Id}", id);
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var antrenor = await _context.Antrenorler
                    .FirstOrDefaultAsync(a => a.Id == id && a.IsActive);

                if (antrenor == null)
                {
                    return false;
                }

                antrenor.IsActive = false;
                antrenor.UpdatedAt = DateTime.UtcNow;
                antrenor.UpdatedBy = "System"; // TODO: Get from current user

                await _context.SaveChangesAsync();

                _logger.LogInformation("Deleted trainer with ID: {Id}", id);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting trainer with ID: {Id}", id);
                throw;
            }
        }

        public async Task<IEnumerable<AntrenorDto>> SearchAsync(string searchTerm)
        {
            try
            {
                var antrenorler = await _context.Antrenorler
                    .Include(a => a.User)
                    .Include(a => a.Bilgi)
                    .Where(a => a.IsActive && (
                        a.User.FirstName.Contains(searchTerm) ||
                        a.User.LastName.Contains(searchTerm) ||
                        a.User.Email.Contains(searchTerm) ||
                        a.TrainerNumber.Contains(searchTerm) ||
                        a.LicenseNumber.Contains(searchTerm) ||
                        a.ExpertiseArea.Contains(searchTerm)
                    ))
                    .OrderBy(a => a.User.FirstName)
                    .ThenBy(a => a.User.LastName)
                    .ToListAsync();

                return _mapper.Map<IEnumerable<AntrenorDto>>(antrenorler);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching trainers with term: {SearchTerm}", searchTerm);
                throw;
            }
        }

        public async Task<IEnumerable<AntrenorDto>> GetByExpertiseAsync(string expertise)
        {
            try
            {
                var antrenorler = await _context.Antrenorler
                    .Include(a => a.User)
                    .Include(a => a.Bilgi)
                    .Where(a => a.IsActive && a.ExpertiseArea.Contains(expertise))
                    .OrderBy(a => a.User.FirstName)
                    .ThenBy(a => a.User.LastName)
                    .ToListAsync();

                return _mapper.Map<IEnumerable<AntrenorDto>>(antrenorler);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting trainers by expertise: {Expertise}", expertise);
                throw;
            }
        }

        public async Task<IEnumerable<AntrenorDto>> GetActiveAsync()
        {
            try
            {
                var antrenorler = await _context.Antrenorler
                    .Include(a => a.User)
                    .Include(a => a.Bilgi)
                    .Where(a => a.IsActive)
                    .OrderBy(a => a.User.FirstName)
                    .ThenBy(a => a.User.LastName)
                    .ToListAsync();

                return _mapper.Map<IEnumerable<AntrenorDto>>(antrenorler);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting active trainers");
                throw;
            }
        }

        public async Task<AntrenorDto?> GetByUserIdAsync(int userId)
        {
            try
            {
                var antrenor = await _context.Antrenorler
                    .Include(a => a.User)
                    .Include(a => a.Bilgi)
                    .Include(a => a.Uzmanliklar)
                        .ThenInclude(u => u.Uzmanlik)
                    .Include(a => a.Deneyimler)
                    .FirstOrDefaultAsync(a => a.UserId == userId && a.IsActive);

                return _mapper.Map<AntrenorDto>(antrenor);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting trainer by user ID: {UserId}", userId);
                throw;
            }
        }

        public async Task<IEnumerable<AntrenorDto>> GetByLicenseStatusAsync(bool isValid)
        {
            try
            {
                var query = _context.Antrenorler
                    .Include(a => a.User)
                    .Include(a => a.Bilgi)
                    .Where(a => a.IsActive);

                if (isValid)
                {
                    query = query.Where(a => a.LicenseEndDate.HasValue && a.LicenseEndDate.Value > DateTime.UtcNow);
                }
                else
                {
                    query = query.Where(a => !a.LicenseEndDate.HasValue || a.LicenseEndDate.Value <= DateTime.UtcNow);
                }

                var antrenorler = await query
                    .OrderBy(a => a.User.FirstName)
                    .ThenBy(a => a.User.LastName)
                    .ToListAsync();

                return _mapper.Map<IEnumerable<AntrenorDto>>(antrenorler);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting trainers by license status: {IsValid}", isValid);
                throw;
            }
        }

        public async Task<IEnumerable<AntrenorDto>> GetByExperienceLevelAsync(int minYears)
        {
            try
            {
                var antrenorler = await _context.Antrenorler
                    .Include(a => a.User)
                    .Include(a => a.Bilgi)
                    .Include(a => a.Deneyimler)
                    .Where(a => a.IsActive && a.Deneyimler.Sum(d => d.TotalDuration) >= minYears * 12)
                    .OrderBy(a => a.User.FirstName)
                    .ThenBy(a => a.User.LastName)
                    .ToListAsync();

                return _mapper.Map<IEnumerable<AntrenorDto>>(antrenorler);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting trainers by experience level: {MinYears}", minYears);
                throw;
            }
        }
    }
} 