using System.ComponentModel.DataAnnotations;

namespace AcikVeriPortali.API.Models
{
    public class DataSet
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string Keywords { get; set; } = string.Empty;
        
        public int CategoryId { get; set; }
        
        public int CreatedById { get; set; }
        
        public string? FilePath { get; set; }
        
        [StringLength(50)]
        public string FileFormat { get; set; } = string.Empty; // CSV, JSON, XML, XLSX, PDF
        
        public long FileSize { get; set; }
        
        public int DownloadCount { get; set; } = 0;
        
        public int ViewCount { get; set; } = 0;
        
        [StringLength(20)]
        public string Status { get; set; } = "Draft"; // Draft, Published, Archived
        
        public DateTime? PublishedAt { get; set; }
        
        public DateTime? LastUpdatedAt { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        // Metadata
        public string? License { get; set; }
        
        public string? Source { get; set; }
        
        public string? ContactEmail { get; set; }
        
        public string? UpdateFrequency { get; set; } // Daily, Weekly, Monthly, Quarterly, Yearly
        
        public DateTime? NextUpdateDate { get; set; }
        
        // Gelişmiş özellikler
        public string? CurrentVersion { get; set; } = "1.0";
        
        public double? AverageRating { get; set; }
        
        public int RatingCount { get; set; } = 0;
        
        public bool IsFeatured { get; set; } = false;
        
        public bool IsPublic { get; set; } = true;
        
        public string? AccessLevel { get; set; } = "Public"; // Public, Registered, Restricted
        
        public string? GeographicCoverage { get; set; }
        
        public string? TemporalCoverage { get; set; }
        
        public string? DataLanguage { get; set; } = "tr";
        
        public string? CoordinateSystem { get; set; }
        
        public string? DataQualityScore { get; set; } // JSON formatında detaylı skorlar
        
        public string? TechnicalSpecifications { get; set; } // JSON formatında teknik detaylar
        
        public string? RelatedDataSets { get; set; } // JSON array of related dataset IDs
        
        public string? ExternalLinks { get; set; } // JSON array of external links
        
        public string? Citation { get; set; }
        
        public string? DOI { get; set; } // Digital Object Identifier
        
        public bool IsMachineReadable { get; set; } = true;
        
        public bool IsOpenFormat { get; set; } = true;
        
        public string? APIEndpoint { get; set; }
        
        public string? PreviewData { get; set; } // JSON formatında önizleme verisi
        
        public string? DataDictionary { get; set; } // JSON formatında veri sözlüğü
        
        public string? ChangeLog { get; set; }
        
        public string? UsageExamples { get; set; } // JSON formatında kullanım örnekleri
        
        public string? DataLineage { get; set; } // Veri soy ağacı bilgisi
        
        public string? ComplianceInfo { get; set; } // Uyumluluk bilgileri
        
        public string? SecurityClassification { get; set; } = "Public";
        
        public DateTime? DataCollectionStartDate { get; set; }
        
        public DateTime? DataCollectionEndDate { get; set; }
        
        public string? DataCollectionMethod { get; set; }
        
        public string? SamplingMethod { get; set; }
        
        public int? SampleSize { get; set; }
        
        public string? ConfidenceLevel { get; set; }
        
        public string? MarginOfError { get; set; }
        
        public string? Limitations { get; set; }
        
        public string? Disclaimers { get; set; }
        
        public string? Acknowledgments { get; set; }
        
        public string? FundingSource { get; set; }
        
        public string? ProjectCode { get; set; }
        
        public string? Department { get; set; }
        
        public string? ResponsiblePerson { get; set; }
        
        public string? BackupLocation { get; set; }
        
        public string? RetentionPolicy { get; set; }
        
        public DateTime? RetentionEndDate { get; set; }
        
        public bool IsBackedUp { get; set; } = false;
        
        public DateTime? LastBackupDate { get; set; }
        
        public string? BackupStatus { get; set; }
        
        // Navigation properties
        public virtual Category Category { get; set; } = null!;
        public virtual User CreatedBy { get; set; } = null!;
        public virtual ICollection<DataSetDownload> Downloads { get; set; } = new List<DataSetDownload>();
        public virtual ICollection<DataSetView> Views { get; set; } = new List<DataSetView>();
        
        // Yeni navigation properties
        public virtual ICollection<DataSetVersion> Versions { get; set; } = new List<DataSetVersion>();
        public virtual ICollection<DataSetComment> Comments { get; set; } = new List<DataSetComment>();
        public virtual ICollection<DataSetTag> Tags { get; set; } = new List<DataSetTag>();
        public virtual ICollection<DataSetMetadata> Metadata { get; set; } = new List<DataSetMetadata>();
        public virtual ICollection<DataSetSchema> Schema { get; set; } = new List<DataSetSchema>();
        public virtual ICollection<DataSetAccessLog> AccessLogs { get; set; } = new List<DataSetAccessLog>();
        public virtual ICollection<DataSetExport> Exports { get; set; } = new List<DataSetExport>();
        public virtual ICollection<DataSetSubscription> Subscriptions { get; set; } = new List<DataSetSubscription>();
        public virtual ICollection<DataSetStatistics> Statistics { get; set; } = new List<DataSetStatistics>();
        public virtual ICollection<DataQualityReport> QualityReports { get; set; } = new List<DataQualityReport>();
    }
} 