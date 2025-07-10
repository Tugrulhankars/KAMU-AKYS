namespace GenclikKampiYonetim.API.Models
{
    public class ActivityCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? IconPath { get; set; }
        public string? Color { get; set; }
        public int DisplayOrder { get; set; } = 0;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual ICollection<Activity> Activities { get; set; } = new List<Activity>();

        // Computed properties
        public int ActivityCount => Activities.Count(a => a.IsActive);
        public int ActiveActivityCount => Activities.Count(a => a.IsActive && a.IsAvailable);
    }
} 