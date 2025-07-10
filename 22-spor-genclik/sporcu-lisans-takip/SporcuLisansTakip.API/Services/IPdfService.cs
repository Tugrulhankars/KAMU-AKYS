using SporcuLisansTakip.API.DTOs;

namespace SporcuLisansTakip.API.Services
{
    public interface IPdfService
    {
        Task<byte[]> GenerateLicensePdfAsync(LicenseDto license);
    }
} 