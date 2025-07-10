namespace GenclikKampiYonetim.API.DTOs
{
    public class CampDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int LocationId { get; set; }
        public string LocationName { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Capacity { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; } = "TRY";
        public string Status { get; set; } = "Active";
        public string Difficulty { get; set; } = "Beginner";
        public string Requirements { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Accommodation { get; set; } = string.Empty;
        public string Meals { get; set; } = string.Empty;
        public string Transportation { get; set; } = string.Empty;
        public string Insurance { get; set; } = string.Empty;
        public string PhotoPath { get; set; } = string.Empty;
        public string BrochurePath { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public int Duration { get; set; }
        public int RegisteredCount { get; set; }
        public int AvailableSpots { get; set; }
        public bool IsFull { get; set; }
        public bool IsUpcoming { get; set; }
        public bool IsOngoing { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsRegistrationOpen { get; set; }
        public List<ActivityDto> Activities { get; set; } = new List<ActivityDto>();
        public List<CampScheduleDto> Schedules { get; set; } = new List<CampScheduleDto>();
        public List<MealPlanDto> MealPlans { get; set; } = new List<MealPlanDto>();
        public List<TransportationDto> Transportations { get; set; } = new List<TransportationDto>();
    }

    public class CreateCampRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int LocationId { get; set; }
        public int CategoryId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Capacity { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; } = "TRY";
        public string Difficulty { get; set; } = "Beginner";
        public string Requirements { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Accommodation { get; set; } = string.Empty;
        public string Meals { get; set; } = string.Empty;
        public string Transportation { get; set; } = string.Empty;
        public string Insurance { get; set; } = string.Empty;
        public List<int> ActivityIds { get; set; } = new List<int>();
    }

    public class UpdateCampRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int LocationId { get; set; }
        public int CategoryId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Capacity { get; set; }
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; } = "TRY";
        public string Status { get; set; } = "Active";
        public string Difficulty { get; set; } = "Beginner";
        public string Requirements { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Accommodation { get; set; } = string.Empty;
        public string Meals { get; set; } = string.Empty;
        public string Transportation { get; set; } = string.Empty;
        public string Insurance { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public List<int> ActivityIds { get; set; } = new List<int>();
    }

    public class CampListDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string LocationName { get; set; } = string.Empty;
        public string CategoryName { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int Capacity { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; } = "TRY";
        public string Status { get; set; } = "Active";
        public string Difficulty { get; set; } = "Beginner";
        public bool IsActive { get; set; } = true;
        public int Duration { get; set; }
        public int RegisteredCount { get; set; }
        public int AvailableSpots { get; set; }
        public bool IsFull { get; set; }
        public bool IsUpcoming { get; set; }
        public bool IsOngoing { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsRegistrationOpen { get; set; }
    }

    public class CampStatisticsDto
    {
        public int TotalCamps { get; set; }
        public int ActiveCamps { get; set; }
        public int UpcomingCamps { get; set; }
        public int OngoingCamps { get; set; }
        public int CompletedCamps { get; set; }
        public int TotalRegistrations { get; set; }
        public int ConfirmedRegistrations { get; set; }
        public int PendingRegistrations { get; set; }
        public int CancelledRegistrations { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal PendingRevenue { get; set; }
        public int TotalParticipants { get; set; }
        public int UniqueParticipants { get; set; }
    }
} 