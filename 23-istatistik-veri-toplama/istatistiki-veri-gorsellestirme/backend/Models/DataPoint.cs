using System.ComponentModel.DataAnnotations;

namespace KamuVeriAPI.Models
{
    public class DataPoint
    {
        public int Id { get; set; }
        
        public int DatasetId { get; set; }
        public Dataset Dataset { get; set; } = null!;
        
        [Required]
        [StringLength(100)]
        public string Key { get; set; } = string.Empty;
        
        public decimal Value { get; set; }
        
        public DateTime Date { get; set; }
        
        [StringLength(100)]
        public string? Category { get; set; }
    }
} 