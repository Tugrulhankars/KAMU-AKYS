using Microsoft.EntityFrameworkCore;
using SporTesisiRezervasyon.API.Data;
using SporTesisiRezervasyon.API.DTOs;
using SporTesisiRezervasyon.API.Models;

namespace SporTesisiRezervasyon.API.Services
{
    public class FacilityService : IFacilityService
    {
        private readonly ApplicationDbContext _context;

        public FacilityService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Facility>> GetAllFacilitiesAsync()
        {
            return await _context.Facilities
                .Include(f => f.FacilityType)
                .Where(f => f.IsActive)
                .ToListAsync();
        }

        public async Task<Facility?> GetFacilityByIdAsync(int id)
        {
            return await _context.Facilities
                .Include(f => f.FacilityType)
                .Include(f => f.Schedules)
                .FirstOrDefaultAsync(f => f.Id == id && f.IsActive);
        }

        public async Task<Facility> CreateFacilityAsync(CreateFacilityRequest request)
        {
            var facility = new Facility
            {
                Name = request.Name,
                Description = request.Description,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                Capacity = request.Capacity,
                HourlyRate = request.HourlyRate,
                FacilityTypeId = request.FacilityTypeId,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Facilities.Add(facility);
            await _context.SaveChangesAsync();

            return facility;
        }

        public async Task<bool> UpdateFacilityAsync(int id, CreateFacilityRequest request)
        {
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null)
                return false;

            facility.Name = request.Name;
            facility.Description = request.Description;
            facility.Address = request.Address;
            facility.PhoneNumber = request.PhoneNumber;
            facility.Email = request.Email;
            facility.Capacity = request.Capacity;
            facility.HourlyRate = request.HourlyRate;
            facility.FacilityTypeId = request.FacilityTypeId;
            facility.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteFacilityAsync(int id)
        {
            var facility = await _context.Facilities.FindAsync(id);
            if (facility == null)
                return false;

            facility.IsActive = false;
            facility.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Facility>> GetFacilitiesByTypeAsync(int typeId)
        {
            return await _context.Facilities
                .Include(f => f.FacilityType)
                .Where(f => f.FacilityTypeId == typeId && f.IsActive)
                .ToListAsync();
        }

        public async Task<IEnumerable<FacilityType>> GetAllFacilityTypesAsync()
        {
            return await _context.FacilityTypes.ToListAsync();
        }

        public async Task<bool> IsFacilityAvailableAsync(int facilityId, DateTime startTime, DateTime endTime)
        {
            // Aynı zaman diliminde başka rezervasyon var mı kontrol et
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