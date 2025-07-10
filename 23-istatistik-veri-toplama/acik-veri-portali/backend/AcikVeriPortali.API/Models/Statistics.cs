using System.ComponentModel.DataAnnotations;

namespace AcikVeriPortali.API.Models
{
    public class DataSetStatistics
    {
        public int Id { get; set; }
        public int DataSetId { get; set; }
        public DateTime Date { get; set; }
        public int ViewCount { get; set; }
        public int DownloadCount { get; set; }
        public int UniqueVisitors { get; set; }
        public string? TopReferrer { get; set; }
        public string? TopUserAgent { get; set; }
        public string? TopCountry { get; set; }
        public string? TopCity { get; set; }
        
        // Navigation property
        public virtual DataSet DataSet { get; set; } = null!;
    }

    public class PortalStatistics
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int TotalViews { get; set; }
        public int TotalDownloads { get; set; }
        public int TotalUsers { get; set; }
        public int NewRegistrations { get; set; }
        public int ActiveDataSets { get; set; }
        public int NewDataSets { get; set; }
        public string? TopCategory { get; set; }
        public string? TopDataSet { get; set; }
        public double AverageResponseTime { get; set; }
        public int ErrorCount { get; set; }
    }

    public class UserActivity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Action { get; set; } = string.Empty; // Login, Download, View, Search, etc.
        public string? Details { get; set; }
        public string? UserIp { get; set; }
        public string? UserAgent { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string? SessionId { get; set; }
        
        // Navigation property
        public virtual User User { get; set; } = null!;
    }

    public class DataQualityReport
    {
        public int Id { get; set; }
        public int DataSetId { get; set; }
        public DateTime CheckedAt { get; set; }
        public int TotalRecords { get; set; }
        public int ValidRecords { get; set; }
        public int InvalidRecords { get; set; }
        public double CompletenessScore { get; set; } // 0-100
        public double AccuracyScore { get; set; } // 0-100
        public double ConsistencyScore { get; set; } // 0-100
        public double TimelinessScore { get; set; } // 0-100
        public double OverallScore { get; set; } // 0-100
        public string? Issues { get; set; } // JSON formatında detaylar
        public string Status { get; set; } = "Pending"; // Pending, Passed, Failed, Warning
        
        // Navigation property
        public virtual DataSet DataSet { get; set; } = null!;
    }

    public class Notification
    {
        public int Id { get; set; }
        public int? UserId { get; set; } // Null for system-wide notifications
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = "Info"; // Info, Warning, Error, Success
        public string? ActionUrl { get; set; }
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ReadAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
        
        // Navigation property
        public virtual User? User { get; set; }
    }

    public class WebhookSubscription
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string Events { get; set; } = string.Empty; // JSON array of event types
        public string? Secret { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastTriggeredAt { get; set; }
        public int SuccessCount { get; set; } = 0;
        public int FailureCount { get; set; } = 0;
    }

    public class WebhookLog
    {
        public int Id { get; set; }
        public int WebhookSubscriptionId { get; set; }
        public string Event { get; set; } = string.Empty;
        public string Payload { get; set; } = string.Empty; // JSON payload
        public int StatusCode { get; set; }
        public string? Response { get; set; }
        public bool IsSuccess { get; set; }
        public DateTime TriggeredAt { get; set; } = DateTime.UtcNow;
        public double ResponseTimeMs { get; set; }
        
        // Navigation property
        public virtual WebhookSubscription WebhookSubscription { get; set; } = null!;
    }
} 