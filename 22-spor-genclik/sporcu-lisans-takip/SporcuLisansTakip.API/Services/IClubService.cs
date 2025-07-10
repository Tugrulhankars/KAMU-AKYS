using SporcuLisansTakip.API.DTOs;

namespace SporcuLisansTakip.API.Services
{
    public interface IClubService
    {
        Task<ClubDto> CreateClubAsync(CreateClubRequest request);
        Task<ClubDto?> GetClubByIdAsync(int id);
        Task<List<ClubListDto>> GetAllClubsAsync();
        Task<ClubDto> UpdateClubAsync(int id, UpdateClubRequest request);
        Task<bool> DeleteClubAsync(int id);
        Task<bool> DeactivateClubAsync(int id);
        Task<bool> ActivateClubAsync(int id);
        Task<string?> UploadLogoAsync(int clubId, IFormFile file);
        Task<List<ClubListDto>> SearchClubsAsync(string searchTerm);
    }
} 