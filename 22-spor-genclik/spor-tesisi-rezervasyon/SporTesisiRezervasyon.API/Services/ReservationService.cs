using Microsoft.EntityFrameworkCore;
using SporTesisiRezervasyon.API.Data;
using SporTesisiRezervasyon.API.DTOs;
using SporTesisiRezervasyon.API.Models;

namespace SporTesisiRezervasyon.API.Services
{
    public class ReservationService : IReservationService
    {
        private readonly ApplicationDbContext _context;
        private readonly IFacilityService _facilityService;

        public ReservationService(ApplicationDbContext context, IFacilityService facilityService)
        {
            _context = context;
            _facilityService = facilityService;
        }

        public async Task<IEnumerable<Reservation>> GetAllReservationsAsync()
        {
            return await _context.Reservations
                .Include(r => r.Facility)
                .Include(r => r.Facility.FacilityType)
                .Include(r => r.User)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<Reservation?> GetReservationByIdAsync(int id)
        {
            return await _context.Reservations
                .Include(r => r.Facility)
                .Include(r => r.Facility.FacilityType)
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Reservation> CreateReservationAsync(CreateReservationRequest request, string userId)
        {
            // Tesisi kontrol et
            var facility = await _facilityService.GetFacilityByIdAsync(request.FacilityId);
            if (facility == null)
                throw new ArgumentException("Spor tesisi bulunamadı");

            // Zaman dilimi müsait mi kontrol et
            if (!await IsTimeSlotAvailableAsync(request.FacilityId, request.StartTime, request.EndTime))
                throw new InvalidOperationException("Seçilen zaman dilimi müsait değil");

            // Toplam fiyatı hesapla
            var duration = request.EndTime - request.StartTime;
            var totalPrice = facility.HourlyRate * (decimal)duration.TotalHours;

            var reservation = new Reservation
            {
                FacilityId = request.FacilityId,
                UserId = userId,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                Notes = request.Notes,
                TotalPrice = totalPrice,
                Status = ReservationStatus.Confirmed,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return reservation;
        }

        public async Task<bool> UpdateReservationAsync(int id, CreateReservationRequest request)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
                return false;

            // Eğer rezervasyon iptal edilmişse güncelleme yapılamaz
            if (reservation.Status == ReservationStatus.Cancelled)
                return false;

            // Yeni zaman dilimi müsait mi kontrol et (kendi rezervasyonu hariç)
            var conflictingReservations = await _context.Reservations
                .Where(r => r.FacilityId == request.FacilityId &&
                           r.Id != id &&
                           r.Status != ReservationStatus.Cancelled &&
                           r.Status != ReservationStatus.NoShow &&
                           ((r.StartTime <= request.StartTime && r.EndTime > request.StartTime) ||
                            (r.StartTime < request.EndTime && r.EndTime >= request.EndTime) ||
                            (r.StartTime >= request.StartTime && r.EndTime <= request.EndTime)))
                .AnyAsync();

            if (conflictingReservations)
                return false;

            // Tesisi kontrol et
            var facility = await _facilityService.GetFacilityByIdAsync(request.FacilityId);
            if (facility == null)
                return false;

            // Toplam fiyatı hesapla
            var duration = request.EndTime - request.StartTime;
            var totalPrice = facility.HourlyRate * (decimal)duration.TotalHours;

            reservation.FacilityId = request.FacilityId;
            reservation.StartTime = request.StartTime;
            reservation.EndTime = request.EndTime;
            reservation.Notes = request.Notes;
            reservation.TotalPrice = totalPrice;
            reservation.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CancelReservationAsync(int id)
        {
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
                return false;

            reservation.Status = ReservationStatus.Cancelled;
            reservation.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByUserAsync(string userId)
        {
            return await _context.Reservations
                .Include(r => r.Facility)
                .Include(r => r.Facility.FacilityType)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByFacilityAsync(int facilityId)
        {
            return await _context.Reservations
                .Include(r => r.User)
                .Where(r => r.FacilityId == facilityId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reservation>> GetReservationsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Reservations
                .Include(r => r.Facility)
                .Include(r => r.Facility.FacilityType)
                .Include(r => r.User)
                .Where(r => r.StartTime >= startDate && r.EndTime <= endDate)
                .OrderBy(r => r.StartTime)
                .ToListAsync();
        }

        public async Task<bool> IsTimeSlotAvailableAsync(int facilityId, DateTime startTime, DateTime endTime)
        {
            var conflictingReservations = await _context.Reservations
                .Where(r => r.FacilityId == facilityId &&
                           r.Status != ReservationStatus.Cancelled &&
                           r.Status != ReservationStatus.NoShow &&
                           ((r.StartTime <= startTime && r.EndTime > startTime) ||
                            (r.StartTime < endTime && r.EndTime >= endTime) ||
                            (r.StartTime >= startTime && r.EndTime <= endTime)))
                .AnyAsync();

            return !conflictingReservations;
        }
    }
} 