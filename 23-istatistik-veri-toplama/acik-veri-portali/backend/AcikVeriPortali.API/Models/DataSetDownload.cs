namespace AcikVeriPortali.API.Models
{
    public class DataSetDownload
    {
        public int Id { get; set; }
        
        public int DataSetId { get; set; }
        
        public int? UserId { get; set; } // Null for anonymous downloads
        
        public string? UserIp { get; set; }
        
        public string? UserAgent { get; set; }
        
        public DateTime DownloadedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual DataSet DataSet { get; set; } = null!;
        public virtual User? User { get; set; }
    }
} 