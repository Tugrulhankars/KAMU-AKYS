namespace GenclikKampiYonetim.API.DTOs
{
    public class ActivityDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public int Duration { get; set; }
        public int MaxParticipants { get; set; }
        public int MinParticipants { get; set; }
        public string Difficulty { get; set; } = "Beginner";
        public string Requirements { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public string? PhotoPath { get; set; }
        public string? VideoPath { get; set; }
        public string? DocumentPath { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public string DurationText { get; set; } = string.Empty;
        public int ParticipantCount { get; set; }
        public bool IsAvailable { get; set; }
        public int AvailableSpots { get; set; }
    }

    public class CreateActivityRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public int Duration { get; set; }
        public int MaxParticipants { get; set; }
        public int MinParticipants { get; set; }
        public string Difficulty { get; set; } = "Beginner";
        public string Requirements { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }

    public class UpdateActivityRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public int Duration { get; set; }
        public int MaxParticipants { get; set; }
        public int MinParticipants { get; set; }
        public string Difficulty { get; set; } = "Beginner";
        public string Requirements { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class ActivityListDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        public int Duration { get; set; }
        public string DurationText { get; set; } = string.Empty;
        public int MaxParticipants { get; set; }
        public string Difficulty { get; set; } = "Beginner";
        public string Location { get; set; } = string.Empty;
        public string Instructor { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public int ParticipantCount { get; set; }
        public bool IsAvailable { get; set; }
        public int AvailableSpots { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class ActivityCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? IconPath { get; set; }
        public string? Color { get; set; }
        public int DisplayOrder { get; set; } = 0;
        public bool IsActive { get; set; } = true;
        public int ActivityCount { get; set; }
        public int ActiveActivityCount { get; set; }
    }

    public class CreateActivityCategoryRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Color { get; set; }
        public int DisplayOrder { get; set; } = 0;
    }

    public class UpdateActivityCategoryRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Color { get; set; }
        public int DisplayOrder { get; set; } = 0;
        public bool IsActive { get; set; } = true;
    }

    public class ActivityStatisticsDto
    {
        public int TotalActivities { get; set; }
        public int ActiveActivities { get; set; }
        public Dictionary<string, int> ActivitiesByCategory { get; set; } = new Dictionary<string, int>();
    }
} 