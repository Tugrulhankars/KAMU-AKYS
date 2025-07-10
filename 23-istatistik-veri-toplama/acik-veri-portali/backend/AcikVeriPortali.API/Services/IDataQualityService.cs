using AcikVeriPortali.API.Models;

namespace AcikVeriPortali.API.Services
{
    public interface IDataQualityService
    {
        Task<DataQualityReport> AnalyzeDataSetQualityAsync(int dataSetId);
        Task<DataQualityReport> GetLatestQualityReportAsync(int dataSetId);
        Task<IEnumerable<DataQualityReport>> GetQualityReportHistoryAsync(int dataSetId, int page = 1, int pageSize = 20);
        Task<bool> ValidateDataSetSchemaAsync(int dataSetId, string filePath);
        Task<object> GetQualityMetricsAsync(int dataSetId);
        Task<bool> CheckDataCompletenessAsync(int dataSetId);
        Task<bool> CheckDataAccuracyAsync(int dataSetId);
        Task<bool> CheckDataConsistencyAsync(int dataSetId);
        Task<bool> CheckDataTimelinessAsync(int dataSetId);
        Task<object> GetQualityScoreBreakdownAsync(int dataSetId);
        Task<bool> SetQualityThresholdsAsync(int dataSetId, double completenessThreshold, double accuracyThreshold, double consistencyThreshold, double timelinessThreshold);
        Task<bool> GenerateQualityAlertAsync(int dataSetId, string issue, string severity);
        Task<object> GetQualityTrendsAsync(int dataSetId, DateTime startDate, DateTime endDate);
        Task<bool> ExportQualityReportAsync(int dataSetId, string format);
        Task<object> GetPortalQualityOverviewAsync();
    }

    public class QualityMetrics
    {
        public double CompletenessScore { get; set; }
        public double AccuracyScore { get; set; }
        public double ConsistencyScore { get; set; }
        public double TimelinessScore { get; set; }
        public double OverallScore { get; set; }
        public int TotalRecords { get; set; }
        public int ValidRecords { get; set; }
        public int InvalidRecords { get; set; }
        public List<string> Issues { get; set; } = new List<string>();
        public Dictionary<string, object> Details { get; set; } = new Dictionary<string, object>();
    }
} 