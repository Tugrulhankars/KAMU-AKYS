namespace GenclikKampiYonetim.API.Models
{
    public class CampCategory
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
        public virtual ICollection<Camp> Camps { get; set; } = new List<Camp>();

        // Computed properties
        public int CampCount => Camps.Count(c => c.IsActive);
        public int ActiveCampCount => Camps.Count(c => c.IsActive && c.Status == "Active");
    }
} 