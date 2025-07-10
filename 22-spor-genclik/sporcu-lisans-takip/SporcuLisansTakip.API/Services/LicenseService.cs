using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SporcuLisansTakip.API.Data;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Models;

namespace SporcuLisansTakip.API.Services
{
    public class LicenseService : ILicenseService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPdfService _pdfService;
        private readonly IQrCodeService _qrCodeService;

        public LicenseService(ApplicationDbContext context, IMapper mapper, IPdfService pdfService, IQrCodeService qrCodeService)
        {
            _context = context;
            _mapper = mapper;
            _pdfService = pdfService;
            _qrCodeService = qrCodeService;
        }

        public async Task<LicenseDto> CreateLicenseAsync(CreateLicenseRequest request, string issuedById)
        {
            var athlete = await _context.Athletes.FindAsync(request.AthleteId);
            if (athlete == null)
                throw new InvalidOperationException("Sporcu bulunamadı");

            var sport = await _context.Sports.FindAsync(request.SportId);
            if (sport == null)
                throw new InvalidOperationException("Spor bulunamadı");

            var licenseType = await _context.LicenseTypes.FindAsync(request.LicenseTypeId);
            if (licenseType == null)
                throw new InvalidOperationException("Lisans türü bulunamadı");

            var licenseCategory = await _context.LicenseCategories.FindAsync(request.LicenseCategoryId);
            if (licenseCategory == null)
                throw new InvalidOperationException("Lisans kategorisi bulunamadı");

            var license = new License
            {
                LicenseNumber = await GenerateLicenseNumberAsync(),
                AthleteId = request.AthleteId,
                SportId = request.SportId,
                LicenseTypeId = request.LicenseTypeId,
                LicenseCategoryId = request.LicenseCategoryId,
                IssueDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddDays(licenseType.ValidityPeriod),
                Status = "Active",
                Notes = request.Notes,
                IssuedById = issuedById,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Licenses.Add(license);
            await _context.SaveChangesAsync();

            // Lisans geçmişi ekle
            var history = new LicenseHistory
            {
                LicenseId = license.Id,
                Action = "Oluşturuldu",
                ActionDate = DateTime.UtcNow,
                Notes = "Lisans oluşturuldu",
                ActionById = issuedById
            };

            _context.LicenseHistories.Add(history);
            await _context.SaveChangesAsync();

            return await GetLicenseByIdAsync(license.Id);
        }

        public async Task<LicenseDto?> GetLicenseByIdAsync(int id)
        {
            var license = await _context.Licenses
                .Include(l => l.Athlete)
                .Include(l => l.Sport)
                .Include(l => l.LicenseType)
                .Include(l => l.LicenseCategory)
                .Include(l => l.IssuedBy)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (license == null) return null;

            return _mapper.Map<LicenseDto>(license);
        }

        public async Task<LicenseDto?> GetLicenseByNumberAsync(string licenseNumber)
        {
            var license = await _context.Licenses
                .Include(l => l.Athlete)
                .Include(l => l.Sport)
                .Include(l => l.LicenseType)
                .Include(l => l.LicenseCategory)
                .Include(l => l.IssuedBy)
                .FirstOrDefaultAsync(l => l.LicenseNumber == licenseNumber);

            if (license == null) return null;

            return _mapper.Map<LicenseDto>(license);
        }

        public async Task<List<LicenseListDto>> GetAllLicensesAsync()
        {
            var licenses = await _context.Licenses
                .Include(l => l.Athlete)
                .Include(l => l.Sport)
                .Include(l => l.LicenseType)
                .Include(l => l.LicenseCategory)
                .Where(l => l.IsActive)
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();

            return _mapper.Map<List<LicenseListDto>>(licenses);
        }

        public async Task<List<LicenseListDto>> GetLicensesByAthleteAsync(int athleteId)
        {
            var licenses = await _context.Licenses
                .Include(l => l.Athlete)
                .Include(l => l.Sport)
                .Include(l => l.LicenseType)
                .Include(l => l.LicenseCategory)
                .Where(l => l.AthleteId == athleteId && l.IsActive)
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();

            return _mapper.Map<List<LicenseListDto>>(licenses);
        }

        public async Task<List<LicenseListDto>> GetLicensesBySportAsync(int sportId)
        {
            var licenses = await _context.Licenses
                .Include(l => l.Athlete)
                .Include(l => l.Sport)
                .Include(l => l.LicenseType)
                .Include(l => l.LicenseCategory)
                .Where(l => l.SportId == sportId && l.IsActive)
                .OrderByDescending(l => l.CreatedAt)
                .ToListAsync();

            return _mapper.Map<List<LicenseListDto>>(licenses);
        }

        public async Task<List<LicenseListDto>> GetExpiredLicensesAsync()
        {
            var licenses = await _context.Licenses
                .Include(l => l.Athlete)
                .Include(l => l.Sport)
                .Include(l => l.LicenseType)
                .Include(l => l.LicenseCategory)
                .Where(l => l.ExpiryDate < DateTime.UtcNow && l.IsActive)
                .OrderBy(l => l.ExpiryDate)
                .ToListAsync();

            return _mapper.Map<List<LicenseListDto>>(licenses);
        }

        public async Task<List<LicenseListDto>> GetExpiringSoonLicensesAsync()
        {
            var thirtyDaysFromNow = DateTime.UtcNow.AddDays(30);
            var licenses = await _context.Licenses
                .Include(l => l.Athlete)
                .Include(l => l.Sport)
                .Include(l => l.LicenseType)
                .Include(l => l.LicenseCategory)
                .Where(l => l.ExpiryDate <= thirtyDaysFromNow && l.ExpiryDate > DateTime.UtcNow && l.IsActive)
                .OrderBy(l => l.ExpiryDate)
                .ToListAsync();

            return _mapper.Map<List<LicenseListDto>>(licenses);
        }

        public async Task<LicenseDto> UpdateLicenseAsync(int id, UpdateLicenseRequest request)
        {
            var license = await _context.Licenses.FindAsync(id);
            if (license == null)
                throw new InvalidOperationException("Lisans bulunamadı");

            license.Notes = request.Notes;
            license.Status = request.Status;
            license.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetLicenseByIdAsync(id);
        }

        public async Task<LicenseDto> RenewLicenseAsync(LicenseRenewalRequest request, string renewedById)
        {
            var license = await _context.Licenses
                .Include(l => l.LicenseType)
                .FirstOrDefaultAsync(l => l.Id == request.LicenseId);

            if (license == null)
                throw new InvalidOperationException("Lisans bulunamadı");

            license.RenewalDate = DateTime.UtcNow;
            license.ExpiryDate = DateTime.UtcNow.AddDays(license.LicenseType.ValidityPeriod);
            license.Status = "Active";
            license.Notes = request.Notes;
            license.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Lisans geçmişi ekle
            var history = new LicenseHistory
            {
                LicenseId = license.Id,
                Action = "Yenilendi",
                ActionDate = DateTime.UtcNow,
                Notes = request.Notes ?? "Lisans yenilendi",
                ActionById = renewedById
            };

            _context.LicenseHistories.Add(history);
            await _context.SaveChangesAsync();

            return await GetLicenseByIdAsync(license.Id);
        }

        public async Task<bool> SuspendLicenseAsync(int id, string reason, string suspendedById)
        {
            var license = await _context.Licenses.FindAsync(id);
            if (license == null) return false;

            license.Status = "Suspended";
            license.Notes = reason;
            license.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Lisans geçmişi ekle
            var history = new LicenseHistory
            {
                LicenseId = license.Id,
                Action = "Askıya Alındı",
                ActionDate = DateTime.UtcNow,
                Notes = reason,
                ActionById = suspendedById
            };

            _context.LicenseHistories.Add(history);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CancelLicenseAsync(int id, string reason, string cancelledById)
        {
            var license = await _context.Licenses.FindAsync(id);
            if (license == null) return false;

            license.Status = "Cancelled";
            license.Notes = reason;
            license.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            // Lisans geçmişi ekle
            var history = new LicenseHistory
            {
                LicenseId = license.Id,
                Action = "İptal Edildi",
                ActionDate = DateTime.UtcNow,
                Notes = reason,
                ActionById = cancelledById
            };

            _context.LicenseHistories.Add(history);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteLicenseAsync(int id)
        {
            var license = await _context.Licenses.FindAsync(id);
            if (license == null) return false;

            _context.Licenses.Remove(license);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<LicenseStatisticsDto> GetLicenseStatisticsAsync()
        {
            var licenses = await _context.Licenses.Where(l => l.IsActive).ToListAsync();

            return new LicenseStatisticsDto
            {
                TotalLicenses = licenses.Count,
                ActiveLicenses = licenses.Count(l => l.Status == "Active" && !l.IsExpired),
                ExpiredLicenses = licenses.Count(l => l.IsExpired),
                ExpiringSoonLicenses = licenses.Count(l => l.IsExpiringSoon),
                SuspendedLicenses = licenses.Count(l => l.Status == "Suspended"),
                CancelledLicenses = licenses.Count(l => l.Status == "Cancelled")
            };
        }

        public async Task<string> GenerateLicenseNumberAsync()
        {
            var year = DateTime.UtcNow.Year;
            var lastLicense = await _context.Licenses
                .Where(l => l.LicenseNumber.StartsWith($"L{year}"))
                .OrderByDescending(l => l.LicenseNumber)
                .FirstOrDefaultAsync();

            int sequence = 1;
            if (lastLicense != null)
            {
                var lastSequence = int.Parse(lastLicense.LicenseNumber.Substring(5));
                sequence = lastSequence + 1;
            }

            return $"L{year}{sequence:D6}";
        }

        public async Task<byte[]> GenerateLicensePdfAsync(int licenseId)
        {
            var license = await GetLicenseByIdAsync(licenseId);
            if (license == null)
                throw new InvalidOperationException("Lisans bulunamadı");

            return await _pdfService.GenerateLicensePdfAsync(license);
        }

        public async Task<string> GenerateLicenseQrCodeAsync(int licenseId)
        {
            var license = await GetLicenseByIdAsync(licenseId);
            if (license == null)
                throw new InvalidOperationException("Lisans bulunamadı");

            return await _qrCodeService.GenerateQrCodeAsync(license.LicenseNumber);
        }
    }
} 