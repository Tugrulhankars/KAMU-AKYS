namespace GenclikKampiYonetim.API.Models
{
    public class EmergencyContact
    {
        public int Id { get; set; }
        public int ParticipantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Relationship { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? WorkPhone { get; set; }
        public string? WorkAddress { get; set; }
        public bool IsPrimary { get; set; } = false;
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Participant Participant { get; set; } = null!;

        // Computed properties
        public string FullContactInfo => $"{Name} ({Relationship}) - {PhoneNumber}";
        public bool HasWorkInfo => !string.IsNullOrEmpty(WorkPhone) || !string.IsNullOrEmpty(WorkAddress);
        public bool HasEmail => !string.IsNullOrEmpty(Email);
    }
} 