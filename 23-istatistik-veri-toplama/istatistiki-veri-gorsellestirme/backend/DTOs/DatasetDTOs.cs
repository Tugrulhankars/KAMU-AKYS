using System.ComponentModel.DataAnnotations;

namespace KamuVeriAPI.DTOs
{
    public class CreateDatasetDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;
        
        public bool IsPublic { get; set; } = false;
    }
    
    public class DatasetDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsPublic { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedByUsername { get; set; } = string.Empty;
        public int DataPointsCount { get; set; }
        public string? FileUrl { get; set; }
    }
    
    public class CreateDataPointDto
    {
        [Required]
        [StringLength(100)]
        public string Key { get; set; } = string.Empty;
        
        public decimal Value { get; set; }
        
        public DateTime Date { get; set; }
        
        [StringLength(100)]
        public string? Category { get; set; }
    }
    
    public class DataPointDto
    {
        public int Id { get; set; }
        public string Key { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public DateTime Date { get; set; }
        public string? Category { get; set; }
    }
} 