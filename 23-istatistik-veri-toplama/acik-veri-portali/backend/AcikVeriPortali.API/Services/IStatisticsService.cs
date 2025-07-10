using AcikVeriPortali.API.Models;

namespace AcikVeriPortali.API.Services
{
    public interface IStatisticsService
    {
        Task<PortalStatistics> GetPortalStatisticsAsync(DateTime? date = null);
        Task<DataSetStatistics> GetDataSetStatisticsAsync(int dataSetId, DateTime? date = null);
        Task<IEnumerable<DataSetStatistics>> GetDataSetStatisticsRangeAsync(int dataSetId, DateTime startDate, DateTime endDate);
        Task<IEnumerable<PortalStatistics>> GetPortalStatisticsRangeAsync(DateTime startDate, DateTime endDate);
        Task<bool> RecordUserActivityAsync(int userId, string action, string? details = null, string? userIp = null, string? userAgent = null, string? sessionId = null);
        Task<IEnumerable<UserActivity>> GetUserActivitiesAsync(int userId, DateTime? startDate = null, DateTime? endDate = null);
        Task<object> GetDashboardDataAsync();
        Task<object> GetPopularDataSetsAsync(int count = 10);
        Task<object> GetCategoryStatisticsAsync();
        Task<object> GetUserEngagementMetricsAsync();
        Task<bool> GenerateDailyStatisticsAsync();
        Task<bool> GenerateDataSetStatisticsAsync(int dataSetId);
    }
} 