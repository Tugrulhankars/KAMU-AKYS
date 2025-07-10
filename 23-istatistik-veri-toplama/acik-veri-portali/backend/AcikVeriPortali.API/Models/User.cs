using System.ComponentModel.DataAnnotations;

namespace AcikVeriPortali.API.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [EmailAddress]
        [StringLength(150)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;
        
        [StringLength(20)]
        public string Role { get; set; } = "User"; // Admin, User, Moderator
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? LastLoginAt { get; set; }
        
        // Navigation properties
        public virtual ICollection<DataSet> DataSets { get; set; } = new List<DataSet>();
        public virtual ICollection<DataSetDownload> Downloads { get; set; } = new List<DataSetDownload>();
    }
} 