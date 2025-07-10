using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;

namespace GenclikKampiYonetim.API.Services
{
    public interface IRegistrationService
    {
        Task<List<RegistrationDto>> GetAllRegistrationsAsync();
        Task<RegistrationDto?> GetRegistrationByIdAsync(int id);
        Task<RegistrationDto> CreateRegistrationAsync(CreateRegistrationRequest request);
        Task<RegistrationDto> UpdateRegistrationAsync(int id, UpdateRegistrationRequest request);
        Task<bool> DeleteRegistrationAsync(int id);
        Task<List<RegistrationListDto>> GetRegistrationListAsync();
        Task<RegistrationStatisticsDto> GetRegistrationStatisticsAsync();
        Task<RegistrationDto> ConfirmRegistrationAsync(int id);
        Task<RegistrationDto> CancelRegistrationAsync(int id, CancelRegistrationRequest request);
        Task<RegistrationDto> CheckInAsync(int id, CheckInRequest request);
        Task<RegistrationDto> CheckOutAsync(int id, CheckOutRequest request);
    }
} 