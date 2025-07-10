namespace GenclikKampiYonetim.API.Models
{
    public class StaffRole
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Responsibilities { get; set; } = string.Empty;
        public string? Requirements { get; set; }
        public string? Qualifications { get; set; }
        public string? Certifications { get; set; }
        public decimal? HourlyRate { get; set; }
        public string? Color { get; set; }
        public int DisplayOrder { get; set; } = 0;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual ICollection<CampStaff> Staff { get; set; } = new List<CampStaff>();

        // Computed properties
        public int StaffCount => Staff.Count(s => s.IsActive);
        public int ActiveStaffCount => Staff.Count(s => s.IsActive && s.HasActiveAssignments);
    }
} 