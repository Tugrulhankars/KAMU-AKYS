using AutoMapper;
using GenclikKampiYonetim.API.Data;
using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GenclikKampiYonetim.API.Services
{
    public class ParticipantService : IParticipantService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ParticipantService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ParticipantDto>> GetAllParticipantsAsync()
        {
            var participants = await _context.Participants
                .Include(p => p.EmergencyContacts)
                .Include(p => p.HealthRecords)
                .ToListAsync();

            return _mapper.Map<List<ParticipantDto>>(participants);
        }

        public async Task<ParticipantDto?> GetParticipantByIdAsync(int id)
        {
            var participant = await _context.Participants
                .Include(p => p.EmergencyContacts)
                .Include(p => p.HealthRecords)
                .FirstOrDefaultAsync(p => p.Id == id);

            return _mapper.Map<ParticipantDto>(participant);
        }

        public async Task<ParticipantDto> CreateParticipantAsync(CreateParticipantRequest request)
        {
            var participant = _mapper.Map<Participant>(request);
            participant.CreatedAt = DateTime.UtcNow;

            _context.Participants.Add(participant);
            await _context.SaveChangesAsync();

            return await GetParticipantByIdAsync(participant.Id) ?? throw new InvalidOperationException("Participant could not be created");
        }

        public async Task<ParticipantDto> UpdateParticipantAsync(int id, UpdateParticipantRequest request)
        {
            var participant = await _context.Participants.FindAsync(id);
            if (participant == null)
                throw new ArgumentException("Participant not found");

            _mapper.Map(request, participant);
            participant.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetParticipantByIdAsync(id) ?? throw new InvalidOperationException("Participant could not be updated");
        }

        public async Task<bool> DeleteParticipantAsync(int id)
        {
            var participant = await _context.Participants.FindAsync(id);
            if (participant == null)
                return false;

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<ParticipantListDto>> GetParticipantListAsync()
        {
            var participants = await _context.Participants
                .Select(p => new ParticipantListDto
                {
                    Id = p.Id,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    FullName = p.FullName,
                    DateOfBirth = p.DateOfBirth,
                    Age = p.Age,
                    Gender = p.Gender,
                    PhoneNumber = p.PhoneNumber,
                    Email = p.Email,
                    City = p.City,
                    Province = p.Province,
                    IsActive = p.IsActive,
                    CreatedAt = p.CreatedAt
                })
                .ToListAsync();

            return participants;
        }

        public async Task<ParticipantStatisticsDto> GetParticipantStatisticsAsync()
        {
            var totalParticipants = await _context.Participants.CountAsync();
            var activeParticipants = await _context.Participants.CountAsync(p => p.IsActive);
            var maleParticipants = await _context.Participants.CountAsync(p => p.Gender == "Male");
            var femaleParticipants = await _context.Participants.CountAsync(p => p.Gender == "Female");

            var ageGroups = await _context.Participants
                .GroupBy(p => p.Age)
                .Select(g => new { Age = g.Key, Count = g.Count() })
                .OrderBy(x => x.Age)
                .ToListAsync();

            return new ParticipantStatisticsDto
            {
                TotalParticipants = totalParticipants,
                ActiveParticipants = activeParticipants,
                MaleParticipants = maleParticipants,
                FemaleParticipants = femaleParticipants,
                AgeGroups = ageGroups.ToDictionary(x => x.Age, x => x.Count)
            };
        }
    }
} 