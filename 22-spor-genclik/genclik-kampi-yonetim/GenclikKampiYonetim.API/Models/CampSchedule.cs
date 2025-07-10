namespace GenclikKampiYonetim.API.Models
{
    public class CampSchedule
    {
        public int Id { get; set; }
        public int CampId { get; set; }
        public int? ActivityId { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string? Instructor { get; set; }
        public string? Equipment { get; set; }
        public string? Notes { get; set; }
        public string Type { get; set; } = "Activity"; // Activity, Meal, Free Time, Meeting, etc.
        public bool IsMandatory { get; set; } = true;
        public int MaxParticipants { get; set; } = 0;
        public string? Color { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Camp Camp { get; set; } = null!;
        public virtual Activity? Activity { get; set; }

        // Computed properties
        public TimeSpan Duration => EndTime - StartTime;
        public string TimeRange => $"{StartTime:hh\\:mm} - {EndTime:hh\\:mm}";
        public string DayName => DayOfWeek switch
        {
            DayOfWeek.Monday => "Pazartesi",
            DayOfWeek.Tuesday => "Salı",
            DayOfWeek.Wednesday => "Çarşamba",
            DayOfWeek.Thursday => "Perşembe",
            DayOfWeek.Friday => "Cuma",
            DayOfWeek.Saturday => "Cumartesi",
            DayOfWeek.Sunday => "Pazar",
            _ => DayOfWeek.ToString()
        };
        public bool IsActivity => Type == "Activity";
        public bool IsMeal => Type == "Meal";
        public bool IsFreeTime => Type == "Free Time";
        public bool IsMeeting => Type == "Meeting";
        public bool HasInstructor => !string.IsNullOrEmpty(Instructor);
        public bool HasEquipment => !string.IsNullOrEmpty(Equipment);
        public bool HasMaxParticipants => MaxParticipants > 0;
    }
} 