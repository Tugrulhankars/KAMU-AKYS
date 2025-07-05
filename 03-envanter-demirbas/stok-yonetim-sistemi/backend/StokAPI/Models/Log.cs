using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StokAPI.Models
{
    public enum LogAction
    {
        Login = 1,
        Logout = 2,
        CreateProduct = 3,
        UpdateProduct = 4,
        DeleteProduct = 5,
        CreateCategory = 6,
        UpdateCategory = 7,
        DeleteCategory = 8,
        StockIn = 9,
        StockOut = 10,
        CreateUser = 11,
        UpdateUser = 12,
        DeleteUser = 13
    }

    public class Log
    {
        public int Id { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public LogAction Action { get; set; }
        
        [StringLength(100)]
        public string? TableName { get; set; }
        
        public int? RecordId { get; set; }
        
        [StringLength(2000)]
        public string? Description { get; set; }
        
        [StringLength(45)]
        public string? IpAddress { get; set; }
        
        [StringLength(500)]
        public string? UserAgent { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
    }
} 