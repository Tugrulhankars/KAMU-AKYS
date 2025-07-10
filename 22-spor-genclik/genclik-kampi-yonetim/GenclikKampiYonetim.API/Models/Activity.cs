namespace GenclikKampiYonetim.API.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public int Duration { get; set; } // Dakika cinsinden
        public int MaxParticipants { get; set; }
        public int MinParticipants { get; set; }
        public string Difficulty { get; set; } = "Beginner"; // Beginner, Intermediate, Advanced
        public string Requirements { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public string? PhotoPath { get; set; }
        public string? VideoPath { get; set; }
        public string? DocumentPath { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual ActivityCategory Category { get; set; } = null!;
        public virtual ICollection<CampActivity> CampActivities { get; set; } = new List<CampActivity>();
        public virtual ICollection<ParticipantActivity> ParticipantActivities { get; set; } = new List<ParticipantActivity>();
        public virtual ICollection<CampSchedule> CampSchedules { get; set; } = new List<CampSchedule>();

        // Computed properties
        public string DurationText => Duration >= 60 ? $"{Duration / 60} saat {(Duration % 60 > 0 ? $"{Duration % 60} dakika" : "")}" : $"{Duration} dakika";
        public int ParticipantCount => ParticipantActivities.Count;
        public bool IsAvailable => IsActive && ParticipantCount < MaxParticipants;
        public int AvailableSpots => MaxParticipants - ParticipantCount;
    }
} 