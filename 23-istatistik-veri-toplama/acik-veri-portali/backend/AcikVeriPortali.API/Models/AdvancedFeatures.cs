using System.ComponentModel.DataAnnotations;

namespace AcikVeriPortali.API.Models
{
    public class DataSetVersion
    {
        public int Id { get; set; }
        public int DataSetId { get; set; }
        public string Version { get; set; } = string.Empty; // 1.0, 1.1, 2.0, etc.
        public string? Changelog { get; set; }
        public string? FilePath { get; set; }
        public long FileSize { get; set; }
        public string FileFormat { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int CreatedById { get; set; }
        public bool IsActive { get; set; } = true;
        
        // Navigation properties
        public virtual DataSet DataSet { get; set; } = null!;
        public virtual User CreatedBy { get; set; } = null!;
    }

    public class DataSetComment
    {
        public int Id { get; set; }
        public int DataSetId { get; set; }
        public int UserId { get; set; }
        public string Comment { get; set; } = string.Empty;
        public int? ParentCommentId { get; set; }
        public int Rating { get; set; } // 1-5 stars
        public bool IsApproved { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual DataSet DataSet { get; set; } = null!;
        public virtual User User { get; set; } = null!;
        public virtual DataSetComment? ParentComment { get; set; }
        public virtual ICollection<DataSetComment> Replies { get; set; } = new List<DataSetComment>();
    }

    public class DataSetTag
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Color { get; set; } = "#6c757d";
        public int UsageCount { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual ICollection<DataSet> DataSets { get; set; } = new List<DataSet>();
    }

    public class DataSetMetadata
    {
        public int Id { get; set; }
        public int DataSetId { get; set; }
        public string Key { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string DataType { get; set; } = "String"; // String, Number, Boolean, Date, JSON
        
        // Navigation property
        public virtual DataSet DataSet { get; set; } = null!;
    }

    public class DataSetSchema
    {
        public int Id { get; set; }
        public int DataSetId { get; set; }
        public string ColumnName { get; set; } = string.Empty;
        public string DataType { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsRequired { get; set; } = false;
        public string? DefaultValue { get; set; }
        public string? ValidationRules { get; set; } // JSON formatında validasyon kuralları
        public int OrderIndex { get; set; }
        
        // Navigation property
        public virtual DataSet DataSet { get; set; } = null!;
    }

    public class DataSetAccessLog
    {
        public int Id { get; set; }
        public int DataSetId { get; set; }
        public int? UserId { get; set; }
        public string AccessType { get; set; } = string.Empty; // View, Download, API, etc.
        public string? UserIp { get; set; }
        public string? UserAgent { get; set; }
        public string? Referrer { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? Organization { get; set; }
        public DateTime AccessedAt { get; set; } = DateTime.UtcNow;
        public double ResponseTimeMs { get; set; }
        public int StatusCode { get; set; }
        
        // Navigation properties
        public virtual DataSet DataSet { get; set; } = null!;
        public virtual User? User { get; set; }
    }

    public class DataSetExport
    {
        public int Id { get; set; }
        public int DataSetId { get; set; }
        public int RequestedById { get; set; }
        public string ExportFormat { get; set; } = string.Empty; // CSV, JSON, XML, Excel
        public string? Filters { get; set; } // JSON formatında filtreler
        public string Status { get; set; } = "Pending"; // Pending, Processing, Completed, Failed
        public string? FilePath { get; set; }
        public long? FileSize { get; set; }
        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedAt { get; set; }
        public string? ErrorMessage { get; set; }
        
        // Navigation properties
        public virtual DataSet DataSet { get; set; } = null!;
        public virtual User RequestedBy { get; set; } = null!;
    }

    public class DataSetSubscription
    {
        public int Id { get; set; }
        public int DataSetId { get; set; }
        public int UserId { get; set; }
        public string NotificationType { get; set; } = "Email"; // Email, SMS, Push
        public string Frequency { get; set; } = "Daily"; // Daily, Weekly, Monthly, OnUpdate
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastNotifiedAt { get; set; }
        
        // Navigation properties
        public virtual DataSet DataSet { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
} 