using SporTesisiRezervasyon.API.DTOs;
using SporTesisiRezervasyon.API.Models;

namespace SporTesisiRezervasyon.API.Services
{
    public interface IReservationService
    {
        Task<IEnumerable<Reservation>> GetAllReservationsAsync();
        Task<Reservation?> GetReservationByIdAsync(int id);
        Task<Reservation> CreateReservationAsync(CreateReservationRequest request, string userId);
        Task<bool> UpdateReservationAsync(int id, CreateReservationRequest request);
        Task<bool> CancelReservationAsync(int id);
        Task<IEnumerable<Reservation>> GetReservationsByUserAsync(string userId);
        Task<IEnumerable<Reservation>> GetReservationsByFacilityAsync(int facilityId);
        Task<IEnumerable<Reservation>> GetReservationsByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<bool> IsTimeSlotAvailableAsync(int facilityId, DateTime startTime, DateTime endTime);
    }
} 