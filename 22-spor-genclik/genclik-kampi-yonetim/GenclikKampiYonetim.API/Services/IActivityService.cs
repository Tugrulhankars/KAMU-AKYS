using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;

namespace GenclikKampiYonetim.API.Services
{
    public interface IActivityService
    {
        Task<List<ActivityDto>> GetAllActivitiesAsync();
        Task<ActivityDto?> GetActivityByIdAsync(int id);
        Task<ActivityDto> CreateActivityAsync(CreateActivityRequest request);
        Task<ActivityDto> UpdateActivityAsync(int id, UpdateActivityRequest request);
        Task<bool> DeleteActivityAsync(int id);
        Task<List<ActivityListDto>> GetActivityListAsync();
        Task<ActivityStatisticsDto> GetActivityStatisticsAsync();
    }
} 