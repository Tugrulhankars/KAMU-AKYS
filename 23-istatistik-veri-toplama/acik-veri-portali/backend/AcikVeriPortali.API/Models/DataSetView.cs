namespace AcikVeriPortali.API.Models
{
    public class DataSetView
    {
        public int Id { get; set; }
        
        public int DataSetId { get; set; }
        
        public int? UserId { get; set; } // Null for anonymous views
        
        public string? UserIp { get; set; }
        
        public string? UserAgent { get; set; }
        
        public string? Referrer { get; set; }
        
        public DateTime ViewedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual DataSet DataSet { get; set; } = null!;
        public virtual User? User { get; set; }
    }
} 