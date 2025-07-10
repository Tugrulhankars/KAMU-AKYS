using AcikVeriPortali.API.Data;
using AcikVeriPortali.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AcikVeriPortali.API.Services
{
    public class StatisticsService : IStatisticsService
    {
        private readonly ApplicationDbContext _context;

        public StatisticsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PortalStatistics> GetPortalStatisticsAsync(DateTime? date = null)
        {
            var targetDate = date ?? DateTime.UtcNow.Date;
            
            var stats = await _context.PortalStatistics
                .FirstOrDefaultAsync(s => s.Date == targetDate);

            if (stats == null)
            {
                // Eğer istatistik yoksa oluştur
                await GenerateDailyStatisticsAsync();
                stats = await _context.PortalStatistics
                    .FirstOrDefaultAsync(s => s.Date == targetDate);
            }

            return stats ?? new PortalStatistics { Date = targetDate };
        }

        public async Task<DataSetStatistics> GetDataSetStatisticsAsync(int dataSetId, DateTime? date = null)
        {
            var targetDate = date ?? DateTime.UtcNow.Date;
            
            var stats = await _context.DataSetStatistics
                .FirstOrDefaultAsync(s => s.DataSetId == dataSetId && s.Date == targetDate);

            if (stats == null)
            {
                // Eğer istatistik yoksa oluştur
                await GenerateDataSetStatisticsAsync(dataSetId);
                stats = await _context.DataSetStatistics
                    .FirstOrDefaultAsync(s => s.DataSetId == dataSetId && s.Date == targetDate);
            }

            return stats ?? new DataSetStatistics { DataSetId = dataSetId, Date = targetDate };
        }

        public async Task<IEnumerable<DataSetStatistics>> GetDataSetStatisticsRangeAsync(int dataSetId, DateTime startDate, DateTime endDate)
        {
            return await _context.DataSetStatistics
                .Where(s => s.DataSetId == dataSetId && s.Date >= startDate && s.Date <= endDate)
                .OrderBy(s => s.Date)
                .ToListAsync();
        }

        public async Task<IEnumerable<PortalStatistics>> GetPortalStatisticsRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.PortalStatistics
                .Where(s => s.Date >= startDate && s.Date <= endDate)
                .OrderBy(s => s.Date)
                .ToListAsync();
        }

        public async Task<bool> RecordUserActivityAsync(int userId, string action, string? details = null, string? userIp = null, string? userAgent = null, string? sessionId = null)
        {
            var activity = new UserActivity
            {
                UserId = userId,
                Action = action,
                Details = details,
                UserIp = userIp,
                UserAgent = userAgent,
                SessionId = sessionId,
                Timestamp = DateTime.UtcNow
            };

            _context.UserActivities.Add(activity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<UserActivity>> GetUserActivitiesAsync(int userId, DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.UserActivities.Where(a => a.UserId == userId);

            if (startDate.HasValue)
                query = query.Where(a => a.Timestamp >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(a => a.Timestamp <= endDate.Value);

            return await query
                .OrderByDescending(a => a.Timestamp)
                .ToListAsync();
        }

        public async Task<object> GetDashboardDataAsync()
        {
            var today = DateTime.UtcNow.Date;
            var lastWeek = today.AddDays(-7);
            var lastMonth = today.AddMonths(-1);

            var totalDataSets = await _context.DataSets.CountAsync();
            var publishedDataSets = await _context.DataSets.CountAsync(d => d.Status == "Published");
            var totalUsers = await _context.Users.CountAsync();
            var totalDownloads = await _context.DataSetDownloads.CountAsync();
            var totalViews = await _context.DataSetViews.CountAsync();

            var todayDownloads = await _context.DataSetDownloads
                .CountAsync(d => d.DownloadedAt.Date == today);
            var todayViews = await _context.DataSetViews
                .CountAsync(v => v.ViewedAt.Date == today);

            var weeklyDownloads = await _context.DataSetDownloads
                .CountAsync(d => d.DownloadedAt >= lastWeek);
            var weeklyViews = await _context.DataSetViews
                .CountAsync(v => v.ViewedAt >= lastWeek);

            var monthlyDownloads = await _context.DataSetDownloads
                .CountAsync(d => d.DownloadedAt >= lastMonth);
            var monthlyViews = await _context.DataSetViews
                .CountAsync(v => v.ViewedAt >= lastMonth);

            return new
            {
                Overview = new
                {
                    TotalDataSets = totalDataSets,
                    PublishedDataSets = publishedDataSets,
                    TotalUsers = totalUsers,
                    TotalDownloads = totalDownloads,
                    TotalViews = totalViews
                },
                Today = new
                {
                    Downloads = todayDownloads,
                    Views = todayViews
                },
                Weekly = new
                {
                    Downloads = weeklyDownloads,
                    Views = weeklyViews
                },
                Monthly = new
                {
                    Downloads = monthlyDownloads,
                    Views = monthlyViews
                }
            };
        }

        public async Task<object> GetPopularDataSetsAsync(int count = 10)
        {
            var popularDataSets = await _context.DataSets
                .Where(d => d.Status == "Published")
                .OrderByDescending(d => d.DownloadCount)
                .ThenByDescending(d => d.ViewCount)
                .Take(count)
                .Select(d => new
                {
                    d.Id,
                    d.Title,
                    d.DownloadCount,
                    d.ViewCount,
                    CategoryName = d.Category.Name,
                    d.CreatedAt
                })
                .ToListAsync();

            return popularDataSets;
        }

        public async Task<object> GetCategoryStatisticsAsync()
        {
            var categoryStats = await _context.Categories
                .Where(c => c.IsActive)
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Color,
                    DataSetCount = c.DataSets.Count,
                    TotalDownloads = c.DataSets.Sum(d => d.DownloadCount),
                    TotalViews = c.DataSets.Sum(d => d.ViewCount),
                    PublishedDataSets = c.DataSets.Count(d => d.Status == "Published")
                })
                .OrderByDescending(c => c.DataSetCount)
                .ToListAsync();

            return categoryStats;
        }

        public async Task<object> GetUserEngagementMetricsAsync()
        {
            var lastMonth = DateTime.UtcNow.AddMonths(-1);

            var activeUsers = await _context.UserActivities
                .Where(a => a.Timestamp >= lastMonth)
                .Select(a => a.UserId)
                .Distinct()
                .CountAsync();

            var newUsers = await _context.Users
                .CountAsync(u => u.CreatedAt >= lastMonth);

            var topUsers = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.FirstName,
                    u.LastName,
                    u.Email,
                    DownloadCount = u.Downloads.Count,
                    DataSetCount = u.DataSets.Count,
                    LastActivity = u.Downloads.OrderByDescending(d => d.DownloadedAt).FirstOrDefault().DownloadedAt
                })
                .OrderByDescending(u => u.DownloadCount)
                .Take(10)
                .ToListAsync();

            return new
            {
                ActiveUsers = activeUsers,
                NewUsers = newUsers,
                TopUsers = topUsers
            };
        }

        public async Task<bool> GenerateDailyStatisticsAsync()
        {
            var today = DateTime.UtcNow.Date;
            
            // Bugün için istatistik zaten varsa güncelle
            var existingStats = await _context.PortalStatistics
                .FirstOrDefaultAsync(s => s.Date == today);

            if (existingStats != null)
            {
                _context.PortalStatistics.Remove(existingStats);
            }

            var totalViews = await _context.DataSetViews
                .CountAsync(v => v.ViewedAt.Date == today);
            var totalDownloads = await _context.DataSetDownloads
                .CountAsync(d => d.DownloadedAt.Date == today);
            var totalUsers = await _context.Users.CountAsync();
            var newRegistrations = await _context.Users
                .CountAsync(u => u.CreatedAt.Date == today);
            var activeDataSets = await _context.DataSets
                .CountAsync(d => d.Status == "Published");
            var newDataSets = await _context.DataSets
                .CountAsync(d => d.CreatedAt.Date == today);

            var topCategory = await _context.DataSets
                .Where(d => d.Status == "Published")
                .GroupBy(d => d.Category.Name)
                .OrderByDescending(g => g.Sum(d => d.DownloadCount))
                .Select(g => g.Key)
                .FirstOrDefaultAsync();

            var topDataSet = await _context.DataSets
                .Where(d => d.Status == "Published")
                .OrderByDescending(d => d.DownloadCount)
                .Select(d => d.Title)
                .FirstOrDefaultAsync();

            var stats = new PortalStatistics
            {
                Date = today,
                TotalViews = totalViews,
                TotalDownloads = totalDownloads,
                TotalUsers = totalUsers,
                NewRegistrations = newRegistrations,
                ActiveDataSets = activeDataSets,
                NewDataSets = newDataSets,
                TopCategory = topCategory,
                TopDataSet = topDataSet,
                AverageResponseTime = 0, // Bu değer middleware'den alınabilir
                ErrorCount = 0 // Bu değer log'lardan alınabilir
            };

            _context.PortalStatistics.Add(stats);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> GenerateDataSetStatisticsAsync(int dataSetId)
        {
            var today = DateTime.UtcNow.Date;
            
            // Bugün için istatistik zaten varsa güncelle
            var existingStats = await _context.DataSetStatistics
                .FirstOrDefaultAsync(s => s.DataSetId == dataSetId && s.Date == today);

            if (existingStats != null)
            {
                _context.DataSetStatistics.Remove(existingStats);
            }

            var views = await _context.DataSetViews
                .Where(v => v.DataSetId == dataSetId && v.ViewedAt.Date == today)
                .ToListAsync();

            var downloads = await _context.DataSetDownloads
                .Where(d => d.DataSetId == dataSetId && d.DownloadedAt.Date == today)
                .ToListAsync();

            var uniqueVisitors = views.Select(v => v.UserIp).Distinct().Count();

            var topReferrer = views
                .Where(v => !string.IsNullOrEmpty(v.Referrer))
                .GroupBy(v => v.Referrer)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .FirstOrDefault();

            var topUserAgent = views
                .Where(v => !string.IsNullOrEmpty(v.UserAgent))
                .GroupBy(v => v.UserAgent)
                .OrderByDescending(g => g.Count())
                .Select(g => g.Key)
                .FirstOrDefault();

            var stats = new DataSetStatistics
            {
                DataSetId = dataSetId,
                Date = today,
                ViewCount = views.Count,
                DownloadCount = downloads.Count,
                UniqueVisitors = uniqueVisitors,
                TopReferrer = topReferrer,
                TopUserAgent = topUserAgent
            };

            _context.DataSetStatistics.Add(stats);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 