using System.ComponentModel.DataAnnotations;

namespace KamuVeriAPI.Models
{
    public class Dataset
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;
        
        public bool IsPublic { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; } = null!;
        
        public ICollection<DataPoint> DataPoints { get; set; } = new List<DataPoint>();
        
        public string? FilePath { get; set; }
    }
} 