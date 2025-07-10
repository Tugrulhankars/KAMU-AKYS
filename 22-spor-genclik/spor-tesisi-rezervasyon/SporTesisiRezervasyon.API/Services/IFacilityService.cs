using SporTesisiRezervasyon.API.DTOs;
using SporTesisiRezervasyon.API.Models;

namespace SporTesisiRezervasyon.API.Services
{
    public interface IFacilityService
    {
        Task<IEnumerable<Facility>> GetAllFacilitiesAsync();
        Task<Facility?> GetFacilityByIdAsync(int id);
        Task<Facility> CreateFacilityAsync(CreateFacilityRequest request);
        Task<bool> UpdateFacilityAsync(int id, CreateFacilityRequest request);
        Task<bool> DeleteFacilityAsync(int id);
        Task<IEnumerable<Facility>> GetFacilitiesByTypeAsync(int typeId);
        Task<IEnumerable<FacilityType>> GetAllFacilityTypesAsync();
        Task<bool> IsFacilityAvailableAsync(int facilityId, DateTime startTime, DateTime endTime);
    }
} 