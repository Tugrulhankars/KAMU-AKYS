using SporcuLisansTakip.API.DTOs;

namespace SporcuLisansTakip.API.Services
{
    public interface ISportService
    {
        Task<SportDto> CreateSportAsync(CreateSportRequest request);
        Task<SportDto?> GetSportByIdAsync(int id);
        Task<List<SportListDto>> GetAllSportsAsync();
        Task<SportDto> UpdateSportAsync(int id, UpdateSportRequest request);
        Task<bool> DeleteSportAsync(int id);
        Task<bool> DeactivateSportAsync(int id);
        Task<bool> ActivateSportAsync(int id);
        Task<string?> UploadIconAsync(int sportId, IFormFile file);
    }
} 