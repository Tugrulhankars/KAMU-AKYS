namespace AcikVeriPortali.API.DTOs
{
    public class DataSetCreateRequest
    {
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Keywords { get; set; }
        public int CategoryId { get; set; }
        public string? License { get; set; }
        public string? Source { get; set; }
        public string? ContactEmail { get; set; }
        public string? UpdateFrequency { get; set; }
        public DateTime? NextUpdateDate { get; set; }
        public string? FilePath { get; set; }
        public string? FileFormat { get; set; }
    }

    public class DataSetUpdateRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Keywords { get; set; }
        public int? CategoryId { get; set; }
        public string? License { get; set; }
        public string? Source { get; set; }
        public string? ContactEmail { get; set; }
        public string? UpdateFrequency { get; set; }
        public DateTime? NextUpdateDate { get; set; }
        public string? Status { get; set; }
    }

    public class DataSetResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Keywords { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string? CategoryColor { get; set; }
        public string? CreatedBy { get; set; }
        public string? FileFormat { get; set; }
        public string? FilePath { get; set; }
        public long FileSize { get; set; }
        public int DownloadCount { get; set; }
        public int ViewCount { get; set; }
        public string? Status { get; set; }
        public DateTime? PublishedAt { get; set; }
        public DateTime? LastUpdatedAt { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? License { get; set; }
        public string? Source { get; set; }
        public string? ContactEmail { get; set; }
        public string? UpdateFrequency { get; set; }
        public DateTime? NextUpdateDate { get; set; }
    }

    public class DataSetListResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string CategoryName { get; set; }
        public string? CategoryColor { get; set; }
        public string? FileFormat { get; set; }
        public string? FilePath { get; set; }
        public int DownloadCount { get; set; }
        public int ViewCount { get; set; }
        public string? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastUpdatedAt { get; set; }
    }
} 