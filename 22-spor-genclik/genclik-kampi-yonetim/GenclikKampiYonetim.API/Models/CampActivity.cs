namespace GenclikKampiYonetim.API.Models
{
    public class CampActivity
    {
        public int Id { get; set; }
        public int CampId { get; set; }
        public int ActivityId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; }

        // Navigation properties
        public virtual Camp Camp { get; set; } = null!;
        public virtual Activity Activity { get; set; } = null!;
    }
} 