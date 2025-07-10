namespace GenclikKampiYonetim.API.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // Info, Success, Warning, Error, Reminder
        public string Status { get; set; } = "Unread"; // Unread, Read, Archived
        public string? UserId { get; set; }
        public string? TargetType { get; set; } // Camp, Participant, Registration, Activity, etc.
        public int? TargetId { get; set; }
        public string? ActionUrl { get; set; }
        public string? ActionText { get; set; }
        public DateTime? ScheduledAt { get; set; }
        public DateTime? SentAt { get; set; }
        public DateTime? ReadAt { get; set; }
        public string? EmailSent { get; set; }
        public string? SmsSent { get; set; }
        public string? PushSent { get; set; }
        public string? Priority { get; set; } // Low, Normal, High, Urgent
        public string? Category { get; set; } // System, Camp, Registration, Payment, etc.
        public string? Tags { get; set; }
        public string? Metadata { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual ApplicationUser? User { get; set; }

        // Computed properties
        public bool IsUnread => Status == "Unread";
        public bool IsRead => Status == "Read";
        public bool IsArchived => Status == "Archived";
        public bool IsScheduled => ScheduledAt.HasValue && ScheduledAt > DateTime.UtcNow;
        public bool IsSent => SentAt.HasValue;
        public bool IsDelayed => ScheduledAt.HasValue && ScheduledAt < DateTime.UtcNow && !SentAt.HasValue;
        public bool HasTarget => !string.IsNullOrEmpty(TargetType) && TargetId.HasValue;
        public bool HasAction => !string.IsNullOrEmpty(ActionUrl) && !string.IsNullOrEmpty(ActionText);
        public bool IsEmailSent => !string.IsNullOrEmpty(EmailSent);
        public bool IsSmsSent => !string.IsNullOrEmpty(SmsSent);
        public bool IsPushSent => !string.IsNullOrEmpty(PushSent);
        public string TypeIcon => Type switch
        {
            "Info" => "ℹ️",
            "Success" => "✅",
            "Warning" => "⚠️",
            "Error" => "❌",
            "Reminder" => "🔔",
            _ => "📢"
        };
        public string PriorityIcon => Priority switch
        {
            "Low" => "🔵",
            "Normal" => "🟡",
            "High" => "🟠",
            "Urgent" => "🔴",
            _ => "🟡"
        };
        public string StatusText => Status switch
        {
            "Unread" => "Okunmamış",
            "Read" => "Okundu",
            "Archived" => "Arşivlendi",
            _ => Status
        };
        public string PriorityText => Priority switch
        {
            "Low" => "Düşük",
            "Normal" => "Normal",
            "High" => "Yüksek",
            "Urgent" => "Acil",
            _ => "Normal"
        };
        public bool IsOverdue => ScheduledAt.HasValue && ScheduledAt < DateTime.UtcNow.AddDays(-1) && !SentAt.HasValue;
    }
} 