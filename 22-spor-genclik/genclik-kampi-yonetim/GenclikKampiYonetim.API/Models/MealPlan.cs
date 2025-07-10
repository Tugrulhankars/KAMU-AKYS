namespace GenclikKampiYonetim.API.Models
{
    public class MealPlan
    {
        public int Id { get; set; }
        public int CampId { get; set; }
        public string MealType { get; set; } = string.Empty; // Breakfast, Lunch, Dinner, Snack
        public DayOfWeek DayOfWeek { get; set; }
        public string Menu { get; set; } = string.Empty;
        public string? SpecialDiet { get; set; }
        public string? VegetarianOption { get; set; }
        public string? VeganOption { get; set; }
        public string? GlutenFreeOption { get; set; }
        public string? DairyFreeOption { get; set; }
        public string? NutFreeOption { get; set; }
        public string? AllergenInfo { get; set; }
        public string? NutritionalInfo { get; set; }
        public string? Ingredients { get; set; }
        public string? PreparationMethod { get; set; }
        public string? ServingSize { get; set; }
        public string? Calories { get; set; }
        public string? Notes { get; set; }
        public TimeSpan? ServingTime { get; set; }
        public string? Location { get; set; }
        public string? Chef { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Camp Camp { get; set; } = null!;

        // Computed properties
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

        public string MealTypeText => MealType switch
        {
            "Breakfast" => "Kahvaltı",
            "Lunch" => "Öğle Yemeği",
            "Dinner" => "Akşam Yemeği",
            "Snack" => "Ara Öğün",
            _ => MealType
        };

        public bool HasSpecialDiet => !string.IsNullOrEmpty(SpecialDiet);
        public bool HasVegetarianOption => !string.IsNullOrEmpty(VegetarianOption);
        public bool HasVeganOption => !string.IsNullOrEmpty(VeganOption);
        public bool HasGlutenFreeOption => !string.IsNullOrEmpty(GlutenFreeOption);
        public bool HasDairyFreeOption => !string.IsNullOrEmpty(DairyFreeOption);
        public bool HasNutFreeOption => !string.IsNullOrEmpty(NutFreeOption);
        public bool HasAllergenInfo => !string.IsNullOrEmpty(AllergenInfo);
        public bool HasNutritionalInfo => !string.IsNullOrEmpty(NutritionalInfo);
        public bool HasServingTime => ServingTime.HasValue;
        public string ServingTimeText => ServingTime?.ToString(@"hh\:mm") ?? "";
    }
} 