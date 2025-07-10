using AutoMapper;
using GenclikKampiYonetim.API.Data;
using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GenclikKampiYonetim.API.Services
{
    public class ActivityService : IActivityService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public ActivityService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ActivityDto>> GetAllActivitiesAsync()
        {
            var activities = await _context.Activities
                .Include(a => a.Category)
                .ToListAsync();

            return _mapper.Map<List<ActivityDto>>(activities);
        }

        public async Task<ActivityDto?> GetActivityByIdAsync(int id)
        {
            var activity = await _context.Activities
                .Include(a => a.Category)
                .FirstOrDefaultAsync(a => a.Id == id);

            return _mapper.Map<ActivityDto>(activity);
        }

        public async Task<ActivityDto> CreateActivityAsync(CreateActivityRequest request)
        {
            var activity = _mapper.Map<Activity>(request);
            activity.CreatedAt = DateTime.UtcNow;

            _context.Activities.Add(activity);
            await _context.SaveChangesAsync();

            return await GetActivityByIdAsync(activity.Id) ?? throw new InvalidOperationException("Activity could not be created");
        }

        public async Task<ActivityDto> UpdateActivityAsync(int id, UpdateActivityRequest request)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
                throw new ArgumentException("Activity not found");

            _mapper.Map(request, activity);
            activity.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return await GetActivityByIdAsync(id) ?? throw new InvalidOperationException("Activity could not be updated");
        }

        public async Task<bool> DeleteActivityAsync(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null)
                return false;

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<ActivityListDto>> GetActivityListAsync()
        {
            var activities = await _context.Activities
                .Include(a => a.Category)
                .Select(a => new ActivityListDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    CategoryName = a.Category.Name,
                    Difficulty = a.Difficulty,
                    Duration = a.Duration,
                    Equipment = a.Equipment,
                    IsActive = a.IsActive,
                    CreatedAt = a.CreatedAt
                })
                .ToListAsync();

            return activities;
        }

        public async Task<ActivityStatisticsDto> GetActivityStatisticsAsync()
        {
            var totalActivities = await _context.Activities.CountAsync();
            var activeActivities = await _context.Activities.CountAsync(a => a.IsActive);
            var activitiesByCategory = await _context.Activities
                .GroupBy(a => a.Category.Name)
                .Select(g => new { Category = g.Key, Count = g.Count() })
                .ToListAsync();

            return new ActivityStatisticsDto
            {
                TotalActivities = totalActivities,
                ActiveActivities = activeActivities,
                ActivitiesByCategory = activitiesByCategory.ToDictionary(x => x.Category, x => x.Count)
            };
        }
    }
} 