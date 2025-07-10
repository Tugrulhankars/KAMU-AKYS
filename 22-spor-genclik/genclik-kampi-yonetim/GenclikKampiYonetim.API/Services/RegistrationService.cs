using AutoMapper;
using GenclikKampiYonetim.API.Data;
using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GenclikKampiYonetim.API.Services
{
    public class RegistrationService : IRegistrationService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RegistrationService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<RegistrationDto>> GetAllRegistrationsAsync()
        {
            var registrations = await _context.Registrations
                .Include(r => r.Camp)
                .Include(r => r.Participant)
                .Include(r => r.Payments)
                .ToListAsync();

            return _mapper.Map<List<RegistrationDto>>(registrations);
        }

        public async Task<RegistrationDto?> GetRegistrationByIdAsync(int id)
        {
            var registration = await _context.Registrations
                .Include(r => r.Camp)
                .Include(r => r.Participant)
                .Include(r => r.Payments)
                .FirstOrDefaultAsync(r => r.Id == id);

            return _mapper.Map<RegistrationDto>(registration);
        }

        public async Task<RegistrationDto> CreateRegistrationAsync(CreateRegistrationRequest request)
        {
            var registration = _mapper.Map<Registration>(request);
            registration.RegistrationNumber = GenerateRegistrationNumber();
            registration.RegistrationDate = DateTime.UtcNow;
            registration.CreatedAt = DateTime.UtcNow;

            _context.Registrations.Add(registration);
            await _context.SaveChangesAsync();

            return await GetRegistrationByIdAsync(registration.Id) ?? throw new InvalidOperationException("Registration could not be created");
        }

        public async Task<RegistrationDto> UpdateRegistrationAsync(int id, UpdateRegistrationRequest request)
        {
            var registration = await _context.Registrations.FindAsync(id);
            if (registration == null)
                throw new ArgumentException("Registration not found");

            _mapper.Map(request, registration);
            registration.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetRegistrationByIdAsync(id) ?? throw new InvalidOperationException("Registration could not be updated");
        }

        public async Task<bool> DeleteRegistrationAsync(int id)
        {
            var registration = await _context.Registrations.FindAsync(id);
            if (registration == null)
                return false;

            _context.Registrations.Remove(registration);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<RegistrationListDto>> GetRegistrationListAsync()
        {
            var registrations = await _context.Registrations
                .Include(r => r.Camp)
                .Include(r => r.Participant)
                .Select(r => new RegistrationListDto
                {
                    Id = r.Id,
                    RegistrationNumber = r.RegistrationNumber,
                    CampName = r.Camp.Name,
                    ParticipantName = r.Participant.FullName,
                    RegistrationDate = r.RegistrationDate,
                    Status = r.Status,
                    PaymentStatus = r.PaymentStatus,
                    Amount = r.Amount,
                    Currency = r.Currency,
                    IsConfirmed = r.IsConfirmed,
                    IsPaid = r.IsPaid,
                    IsCheckedIn = r.IsCheckedIn,
                    IsCheckedOut = r.IsCheckedOut,
                    DaysUntilCamp = (r.Camp.StartDate - DateTime.UtcNow).Days,
                    IsUpcoming = r.Camp.StartDate > DateTime.UtcNow,
                    IsOngoing = r.Camp.StartDate <= DateTime.UtcNow && r.Camp.EndDate >= DateTime.UtcNow
                })
                .ToListAsync();

            return registrations;
        }

        public async Task<RegistrationStatisticsDto> GetRegistrationStatisticsAsync()
        {
            var totalRegistrations = await _context.Registrations.CountAsync();
            var confirmedRegistrations = await _context.Registrations.CountAsync(r => r.Status == "Confirmed");
            var pendingRegistrations = await _context.Registrations.CountAsync(r => r.Status == "Pending");
            var cancelledRegistrations = await _context.Registrations.CountAsync(r => r.Status == "Cancelled");
            var completedRegistrations = await _context.Registrations.CountAsync(r => r.Status == "Completed");
            var checkedInRegistrations = await _context.Registrations.CountAsync(r => r.IsCheckedIn);
            var checkedOutRegistrations = await _context.Registrations.CountAsync(r => r.IsCheckedOut);

            var totalRevenue = await _context.Registrations
                .Where(r => r.Status == "Confirmed")
                .SumAsync(r => r.Amount);

            var pendingRevenue = await _context.Registrations
                .Where(r => r.Status == "Pending")
                .SumAsync(r => r.Amount);

            var confirmedRevenue = await _context.Registrations
                .Where(r => r.Status == "Confirmed")
                .SumAsync(r => r.Amount);

            return new RegistrationStatisticsDto
            {
                TotalRegistrations = totalRegistrations,
                ConfirmedRegistrations = confirmedRegistrations,
                PendingRegistrations = pendingRegistrations,
                CancelledRegistrations = cancelledRegistrations,
                CompletedRegistrations = completedRegistrations,
                CheckedInRegistrations = checkedInRegistrations,
                CheckedOutRegistrations = checkedOutRegistrations,
                TotalRevenue = totalRevenue,
                PendingRevenue = pendingRevenue,
                ConfirmedRevenue = confirmedRevenue,
                FullyDocumentedRegistrations = await _context.Registrations.CountAsync(r => r.IsFullyDocumented),
                IncompleteDocumentRegistrations = await _context.Registrations.CountAsync(r => !r.IsFullyDocumented)
            };
        }

        public async Task<RegistrationDto> ConfirmRegistrationAsync(int id)
        {
            var registration = await _context.Registrations.FindAsync(id);
            if (registration == null)
                throw new ArgumentException("Registration not found");

            registration.Status = "Confirmed";
            registration.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetRegistrationByIdAsync(id) ?? throw new InvalidOperationException("Registration could not be confirmed");
        }

        public async Task<RegistrationDto> CancelRegistrationAsync(int id, CancelRegistrationRequest request)
        {
            var registration = await _context.Registrations.FindAsync(id);
            if (registration == null)
                throw new ArgumentException("Registration not found");

            registration.Status = "Cancelled";
            registration.CancellationReason = request.Reason;
            registration.CancellationDate = DateTime.UtcNow;
            registration.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetRegistrationByIdAsync(id) ?? throw new InvalidOperationException("Registration could not be cancelled");
        }

        public async Task<RegistrationDto> CheckInAsync(int id, CheckInRequest request)
        {
            var registration = await _context.Registrations.FindAsync(id);
            if (registration == null)
                throw new ArgumentException("Registration not found");

            registration.CheckInDate = DateTime.UtcNow;
            registration.RoomNumber = request.RoomNumber;
            registration.GroupAssignment = request.GroupAssignment;
            registration.CounselorName = request.CounselorName;
            registration.CounselorPhone = request.CounselorPhone;
            registration.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetRegistrationByIdAsync(id) ?? throw new InvalidOperationException("Registration could not be checked in");
        }

        public async Task<RegistrationDto> CheckOutAsync(int id, CheckOutRequest request)
        {
            var registration = await _context.Registrations.FindAsync(id);
            if (registration == null)
                throw new ArgumentException("Registration not found");

            registration.CheckOutDate = DateTime.UtcNow;
            registration.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetRegistrationByIdAsync(id) ?? throw new InvalidOperationException("Registration could not be checked out");
        }

        private string GenerateRegistrationNumber()
        {
            return $"REG-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
        }
    }
} 