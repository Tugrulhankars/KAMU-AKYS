namespace GenclikKampiYonetim.API.Models
{
    public class Camp
    {
        public int Id { get; set; }
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
        public string Status { get; set; } = "Active"; // Active, Inactive, Cancelled, Completed
        public string Difficulty { get; set; } = "Beginner"; // Beginner, Intermediate, Advanced
        public string Requirements { get; set; } = string.Empty;
        public string Equipment { get; set; } = string.Empty;
        public string Accommodation { get; set; } = string.Empty;
        public string Meals { get; set; } = string.Empty;
        public string Transportation { get; set; } = string.Empty;
        public string Insurance { get; set; } = string.Empty;
        public string PhotoPath { get; set; } = string.Empty;
        public string BrochurePath { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual CampLocation Location { get; set; } = null!;
        public virtual CampCategory Category { get; set; } = null!;
        public virtual ICollection<Registration> Registrations { get; set; } = new List<Registration>();
        public virtual ICollection<CampActivity> CampActivities { get; set; } = new List<CampActivity>();
        public virtual ICollection<CampSchedule> CampSchedules { get; set; } = new List<CampSchedule>();
        public virtual ICollection<MealPlan> MealPlans { get; set; } = new List<MealPlan>();
        public virtual ICollection<Transportation> Transportations { get; set; } = new List<Transportation>();
        public virtual ICollection<CampStaff> CampStaff { get; set; } = new List<CampStaff>();

        // Computed properties
        public int Duration => (EndDate - StartDate).Days;
        public int RegisteredCount => Registrations.Count(r => r.Status == "Confirmed");
        public int AvailableSpots => Capacity - RegisteredCount;
        public bool IsFull => AvailableSpots <= 0;
        public bool IsUpcoming => StartDate > DateTime.UtcNow;
        public bool IsOngoing => StartDate <= DateTime.UtcNow && EndDate >= DateTime.UtcNow;
        public bool IsCompleted => EndDate < DateTime.UtcNow;
        public bool IsRegistrationOpen => IsActive && IsUpcoming && !IsFull;
    }
} 