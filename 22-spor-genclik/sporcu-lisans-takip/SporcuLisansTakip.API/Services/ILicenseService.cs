using SporcuLisansTakip.API.DTOs;

namespace SporcuLisansTakip.API.Services
{
    public interface ILicenseService
    {
        Task<LicenseDto> CreateLicenseAsync(CreateLicenseRequest request, string issuedById);
        Task<LicenseDto?> GetLicenseByIdAsync(int id);
        Task<LicenseDto?> GetLicenseByNumberAsync(string licenseNumber);
        Task<List<LicenseListDto>> GetAllLicensesAsync();
        Task<List<LicenseListDto>> GetLicensesByAthleteAsync(int athleteId);
        Task<List<LicenseListDto>> GetLicensesBySportAsync(int sportId);
        Task<List<LicenseListDto>> GetExpiredLicensesAsync();
        Task<List<LicenseListDto>> GetExpiringSoonLicensesAsync();
        Task<LicenseDto> UpdateLicenseAsync(int id, UpdateLicenseRequest request);
        Task<LicenseDto> RenewLicenseAsync(LicenseRenewalRequest request, string renewedById);
        Task<bool> SuspendLicenseAsync(int id, string reason, string suspendedById);
        Task<bool> CancelLicenseAsync(int id, string reason, string cancelledById);
        Task<bool> DeleteLicenseAsync(int id);
        Task<LicenseStatisticsDto> GetLicenseStatisticsAsync();
        Task<string> GenerateLicenseNumberAsync();
        Task<byte[]> GenerateLicensePdfAsync(int licenseId);
        Task<string> GenerateLicenseQrCodeAsync(int licenseId);
    }
} 