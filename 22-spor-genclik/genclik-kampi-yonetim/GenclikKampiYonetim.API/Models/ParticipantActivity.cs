namespace GenclikKampiYonetim.API.Models
{
    public class ParticipantActivity
    {
        public int Id { get; set; }
        public int ParticipantId { get; set; }
        public int ActivityId { get; set; }
        public int CampId { get; set; }
        public DateTime ActivityDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Status { get; set; } = "Scheduled"; // Scheduled, Completed, Cancelled, NoShow
        public string? Notes { get; set; }
        public string? InstructorNotes { get; set; }
        public int? Rating { get; set; } // 1-5 arası
        public string? Feedback { get; set; }
        public bool IsAttended { get; set; } = false;
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public string? CheckInBy { get; set; }
        public string? CheckOutBy { get; set; }
        public string? EquipmentProvided { get; set; }
        public string? SafetyBriefing { get; set; }
        public string? IncidentReport { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Participant Participant { get; set; } = null!;
        public virtual Activity Activity { get; set; } = null!;
        public virtual Camp Camp { get; set; } = null!;

        // Computed properties
        public bool IsCompleted => Status == "Completed";
        public bool IsCancelled => Status == "Cancelled";
        public bool IsNoShow => Status == "NoShow";
        public bool IsScheduled => Status == "Scheduled";
        public TimeSpan Duration => EndTime - StartTime;
        public bool IsToday => ActivityDate.Date == DateTime.UtcNow.Date;
        public bool IsPast => ActivityDate.Date < DateTime.UtcNow.Date;
        public bool IsFuture => ActivityDate.Date > DateTime.UtcNow.Date;
        public bool HasRating => Rating.HasValue && Rating > 0;
        public bool HasFeedback => !string.IsNullOrEmpty(Feedback);
        public bool HasIncident => !string.IsNullOrEmpty(IncidentReport);
    }
} 