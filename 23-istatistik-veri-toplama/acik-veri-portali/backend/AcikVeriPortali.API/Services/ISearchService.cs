using AcikVeriPortali.API.DTOs;

namespace AcikVeriPortali.API.Services
{
    public interface ISearchService
    {
        Task<object> AdvancedSearchAsync(AdvancedSearchRequest request);
        Task<object> SearchByTagsAsync(string[] tags);
        Task<object> SearchByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<object> SearchByCategoryAsync(int categoryId, bool includeSubCategories = true);
        Task<object> SearchByFileFormatAsync(string[] formats);
        Task<object> SearchByAccessLevelAsync(string accessLevel);
        Task<object> SearchByQualityScoreAsync(double minScore);
        Task<object> SearchByGeographicCoverageAsync(string location);
        Task<object> SearchByTemporalCoverageAsync(string timeRange);
        Task<object> SearchByKeywordsAsync(string[] keywords, bool useAndOperator = false);
        Task<object> GetSearchSuggestionsAsync(string query);
        Task<object> GetRelatedDataSetsAsync(int dataSetId);
        Task<object> GetFeaturedDataSetsAsync(int count = 10);
        Task<object> GetRecentDataSetsAsync(int count = 10);
        Task<object> GetTrendingDataSetsAsync(int count = 10);
    }

    public class AdvancedSearchRequest
    {
        public string? Query { get; set; }
        public int[]? CategoryIds { get; set; }
        public string[]? Tags { get; set; }
        public string[]? FileFormats { get; set; }
        public string? AccessLevel { get; set; }
        public double? MinQualityScore { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? GeographicCoverage { get; set; }
        public string? TemporalCoverage { get; set; }
        public bool? IsMachineReadable { get; set; }
        public bool? IsOpenFormat { get; set; }
        public bool? IsFeatured { get; set; }
        public string? SortBy { get; set; } // Title, CreatedAt, UpdatedAt, DownloadCount, ViewCount, Rating
        public string? SortOrder { get; set; } // Asc, Desc
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
    }
} 