using GenclikKampiYonetim.API.DTOs;

namespace GenclikKampiYonetim.API.Services
{
    public interface ICampService
    {
        Task<CampDto> GetByIdAsync(int id);
        Task<List<CampListDto>> GetAllAsync();
        Task<List<CampListDto>> GetActiveAsync();
        Task<List<CampListDto>> GetUpcomingAsync();
        Task<List<CampListDto>> GetOngoingAsync();
        Task<List<CampListDto>> GetByCategoryAsync(int categoryId);
        Task<List<CampListDto>> GetByLocationAsync(int locationId);
        Task<List<CampListDto>> SearchAsync(string searchTerm);
        Task<CampDto> CreateAsync(CreateCampRequest request);
        Task<CampDto> UpdateAsync(int id, UpdateCampRequest request);
        Task DeleteAsync(int id);
        Task ActivateAsync(int id);
        Task DeactivateAsync(int id);
        Task<CampStatisticsDto> GetStatisticsAsync();
        Task<string> UploadPhotoAsync(int id, IFormFile file);
        Task<string> UploadBrochureAsync(int id, IFormFile file);
    }
} 