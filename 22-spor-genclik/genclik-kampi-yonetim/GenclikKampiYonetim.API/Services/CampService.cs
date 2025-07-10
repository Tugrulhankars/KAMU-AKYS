using AutoMapper;
using Microsoft.EntityFrameworkCore;
using GenclikKampiYonetim.API.Data;
using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;

namespace GenclikKampiYonetim.API.Services
{
    public class CampService : ICampService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public CampService(ApplicationDbContext context, IMapper mapper, IFileService fileService)
        {
            _context = context;
            _mapper = mapper;
            _fileService = fileService;
        }

        public async Task<CampDto> GetByIdAsync(int id)
        {
            var camp = await _context.Camps
                .Include(c => c.Location)
                .Include(c => c.Category)
                .Include(c => c.CampActivities)
                    .ThenInclude(ca => ca.Activity)
                        .ThenInclude(a => a.Category)
                .Include(c => c.CampSchedules)
                .Include(c => c.MealPlans)
                .Include(c => c.Transportations)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (camp == null)
                throw new ArgumentException("Kamp bulunamadı");

            var campDto = _mapper.Map<CampDto>(camp);
            campDto.Activities = _mapper.Map<List<ActivityDto>>(camp.CampActivities.Select(ca => ca.Activity));
            campDto.Schedules = _mapper.Map<List<CampScheduleDto>>(camp.CampSchedules);
            campDto.MealPlans = _mapper.Map<List<MealPlanDto>>(camp.MealPlans);
            campDto.Transportations = _mapper.Map<List<TransportationDto>>(camp.Transportations);

            return campDto;
        }

        public async Task<List<CampListDto>> GetAllAsync()
        {
            var camps = await _context.Camps
                .Include(c => c.Location)
                .Include(c => c.Category)
                .Include(c => c.Registrations)
                .ToListAsync();

            return _mapper.Map<List<CampListDto>>(camps);
        }

        public async Task<List<CampListDto>> GetActiveAsync()
        {
            var camps = await _context.Camps
                .Include(c => c.Location)
                .Include(c => c.Category)
                .Include(c => c.Registrations)
                .Where(c => c.IsActive && c.Status == "Active")
                .ToListAsync();

            return _mapper.Map<List<CampListDto>>(camps);
        }

        public async Task<List<CampListDto>> GetUpcomingAsync()
        {
            var camps = await _context.Camps
                .Include(c => c.Location)
                .Include(c => c.Category)
                .Include(c => c.Registrations)
                .Where(c => c.IsActive && c.IsUpcoming)
                .ToListAsync();

            return _mapper.Map<List<CampListDto>>(camps);
        }

        public async Task<List<CampListDto>> GetOngoingAsync()
        {
            var camps = await _context.Camps
                .Include(c => c.Location)
                .Include(c => c.Category)
                .Include(c => c.Registrations)
                .Where(c => c.IsActive && c.IsOngoing)
                .ToListAsync();

            return _mapper.Map<List<CampListDto>>(camps);
        }

        public async Task<List<CampListDto>> GetByCategoryAsync(int categoryId)
        {
            var camps = await _context.Camps
                .Include(c => c.Location)
                .Include(c => c.Category)
                .Include(c => c.Registrations)
                .Where(c => c.CategoryId == categoryId && c.IsActive)
                .ToListAsync();

            return _mapper.Map<List<CampListDto>>(camps);
        }

        public async Task<List<CampListDto>> GetByLocationAsync(int locationId)
        {
            var camps = await _context.Camps
                .Include(c => c.Location)
                .Include(c => c.Category)
                .Include(c => c.Registrations)
                .Where(c => c.LocationId == locationId && c.IsActive)
                .ToListAsync();

            return _mapper.Map<List<CampListDto>>(camps);
        }

        public async Task<List<CampListDto>> SearchAsync(string searchTerm)
        {
            var camps = await _context.Camps
                .Include(c => c.Location)
                .Include(c => c.Category)
                .Include(c => c.Registrations)
                .Where(c => c.IsActive && 
                           (c.Name.Contains(searchTerm) || 
                            c.Description.Contains(searchTerm) || 
                            c.Location.Name.Contains(searchTerm) ||
                            c.Category.Name.Contains(searchTerm)))
                .ToListAsync();

            return _mapper.Map<List<CampListDto>>(camps);
        }

        public async Task<CampDto> CreateAsync(CreateCampRequest request)
        {
            var camp = _mapper.Map<Camp>(request);
            camp.CreatedAt = DateTime.UtcNow;

            _context.Camps.Add(camp);
            await _context.SaveChangesAsync();

            // Kamp aktivitelerini ekle
            if (request.ActivityIds.Any())
            {
                var campActivities = request.ActivityIds.Select(activityId => new CampActivity
                {
                    CampId = camp.Id,
                    ActivityId = activityId,
                    CreatedAt = DateTime.UtcNow
                }).ToList();

                _context.CampActivities.AddRange(campActivities);
                await _context.SaveChangesAsync();
            }

            return await GetByIdAsync(camp.Id);
        }

        public async Task<CampDto> UpdateAsync(int id, UpdateCampRequest request)
        {
            var camp = await _context.Camps.FindAsync(id);
            if (camp == null)
                throw new ArgumentException("Kamp bulunamadı");

            _mapper.Map(request, camp);
            camp.UpdatedAt = DateTime.UtcNow;

            // Mevcut aktiviteleri sil
            var existingActivities = await _context.CampActivities.Where(ca => ca.CampId == id).ToListAsync();
            _context.CampActivities.RemoveRange(existingActivities);

            // Yeni aktiviteleri ekle
            if (request.ActivityIds.Any())
            {
                var campActivities = request.ActivityIds.Select(activityId => new CampActivity
                {
                    CampId = camp.Id,
                    ActivityId = activityId,
                    CreatedAt = DateTime.UtcNow
                }).ToList();

                _context.CampActivities.AddRange(campActivities);
            }

            await _context.SaveChangesAsync();

            return await GetByIdAsync(camp.Id);
        }

        public async Task DeleteAsync(int id)
        {
            var camp = await _context.Camps.FindAsync(id);
            if (camp == null)
                throw new ArgumentException("Kamp bulunamadı");

            _context.Camps.Remove(camp);
            await _context.SaveChangesAsync();
        }

        public async Task ActivateAsync(int id)
        {
            var camp = await _context.Camps.FindAsync(id);
            if (camp == null)
                throw new ArgumentException("Kamp bulunamadı");

            camp.IsActive = true;
            camp.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }

        public async Task DeactivateAsync(int id)
        {
            var camp = await _context.Camps.FindAsync(id);
            if (camp == null)
                throw new ArgumentException("Kamp bulunamadı");

            camp.IsActive = false;
            camp.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
        }

        public async Task<CampStatisticsDto> GetStatisticsAsync()
        {
            var camps = await _context.Camps
                .Include(c => c.Registrations)
                .ToListAsync();

            var registrations = await _context.Registrations
                .Include(r => r.Payments)
                .ToListAsync();

            var statistics = new CampStatisticsDto
            {
                TotalCamps = camps.Count,
                ActiveCamps = camps.Count(c => c.IsActive && c.Status == "Active"),
                UpcomingCamps = camps.Count(c => c.IsActive && c.IsUpcoming),
                OngoingCamps = camps.Count(c => c.IsActive && c.IsOngoing),
                CompletedCamps = camps.Count(c => c.IsActive && c.IsCompleted),
                TotalRegistrations = registrations.Count,
                ConfirmedRegistrations = registrations.Count(r => r.Status == "Confirmed"),
                PendingRegistrations = registrations.Count(r => r.Status == "Pending"),
                CancelledRegistrations = registrations.Count(r => r.Status == "Cancelled"),
                TotalRevenue = registrations.Where(r => r.PaymentStatus == "Paid").Sum(r => r.Amount),
                PendingRevenue = registrations.Where(r => r.PaymentStatus == "Pending").Sum(r => r.Amount),
                TotalParticipants = registrations.Select(r => r.ParticipantId).Distinct().Count(),
                UniqueParticipants = registrations.Where(r => r.Status == "Confirmed").Select(r => r.ParticipantId).Distinct().Count()
            };

            return statistics;
        }

        public async Task<string> UploadPhotoAsync(int id, IFormFile file)
        {
            var camp = await _context.Camps.FindAsync(id);
            if (camp == null)
                throw new ArgumentException("Kamp bulunamadı");

            var photoPath = await _fileService.UploadFileAsync(file, "camp-photos");
            camp.PhotoPath = photoPath;
            camp.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return photoPath;
        }

        public async Task<string> UploadBrochureAsync(int id, IFormFile file)
        {
            var camp = await _context.Camps.FindAsync(id);
            if (camp == null)
                throw new ArgumentException("Kamp bulunamadı");

            var brochurePath = await _fileService.UploadFileAsync(file, "camp-brochures");
            camp.BrochurePath = brochurePath;
            camp.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return brochurePath;
        }
    }
} 