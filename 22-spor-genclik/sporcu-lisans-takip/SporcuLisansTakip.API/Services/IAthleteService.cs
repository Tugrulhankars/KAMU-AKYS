using SporcuLisansTakip.API.DTOs;

namespace SporcuLisansTakip.API.Services
{
    public interface IAthleteService
    {
        Task<AthleteDto> CreateAthleteAsync(CreateAthleteRequest request);
        Task<AthleteDto?> GetAthleteByIdAsync(int id);
        Task<AthleteDto?> GetAthleteByIdentityNumberAsync(string identityNumber);
        Task<List<AthleteListDto>> GetAllAthletesAsync();
        Task<List<AthleteListDto>> GetAthletesByClubAsync(int clubId);
        Task<AthleteDto> UpdateAthleteAsync(int id, UpdateAthleteRequest request);
        Task<bool> DeleteAthleteAsync(int id);
        Task<bool> DeactivateAthleteAsync(int id);
        Task<bool> ActivateAthleteAsync(int id);
        Task<string?> UploadPhotoAsync(int athleteId, IFormFile file);
        Task<List<AthleteListDto>> SearchAthletesAsync(string searchTerm);
    }
} 