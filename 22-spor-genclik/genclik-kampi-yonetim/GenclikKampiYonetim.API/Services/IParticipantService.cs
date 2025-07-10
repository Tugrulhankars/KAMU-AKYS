using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;

namespace GenclikKampiYonetim.API.Services
{
    public interface IParticipantService
    {
        Task<List<ParticipantDto>> GetAllParticipantsAsync();
        Task<ParticipantDto?> GetParticipantByIdAsync(int id);
        Task<ParticipantDto> CreateParticipantAsync(CreateParticipantRequest request);
        Task<ParticipantDto> UpdateParticipantAsync(int id, UpdateParticipantRequest request);
        Task<bool> DeleteParticipantAsync(int id);
        Task<List<ParticipantListDto>> GetParticipantListAsync();
        Task<ParticipantStatisticsDto> GetParticipantStatisticsAsync();
    }
} 