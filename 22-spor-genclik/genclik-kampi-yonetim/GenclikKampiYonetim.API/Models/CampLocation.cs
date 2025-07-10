namespace GenclikKampiYonetim.API.Models
{
    public class CampLocation
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string? PostalCode { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Facilities { get; set; } = string.Empty;
        public string? PhotoPath { get; set; }
        public string? MapCoordinates { get; set; }
        public int Capacity { get; set; }
        public string AccommodationType { get; set; } = string.Empty; // Tent, Cabin, Hotel, Dormitory
        public string? ContactPerson { get; set; }
        public string? ContactPhone { get; set; }
        public string? ContactEmail { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? MedicalFacility { get; set; }
        public string? MedicalPhone { get; set; }
        public string? SecurityContact { get; set; }
        public string? SecurityPhone { get; set; }
        public string? TransportationInfo { get; set; }
        public string? ParkingInfo { get; set; }
        public string? WiFiInfo { get; set; }
        public string? ElectricityInfo { get; set; }
        public string? WaterInfo { get; set; }
        public string? SanitationInfo { get; set; }
        public string? KitchenInfo { get; set; }
        public string? DiningInfo { get; set; }
        public string? RecreationInfo { get; set; }
        public string? SafetyInfo { get; set; }
        public string? Rules { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual ICollection<Camp> Camps { get; set; } = new List<Camp>();

        // Computed properties
        public string FullAddress => $"{Address}, {City}/{Province}";
        public string ContactInfo => $"{ContactPerson} - {ContactPhone}";
        public string EmergencyInfo => $"{EmergencyContact} - {EmergencyPhone}";
        public bool HasMedicalFacility => !string.IsNullOrEmpty(MedicalFacility);
        public bool HasSecurity => !string.IsNullOrEmpty(SecurityContact);
        public bool HasWiFi => !string.IsNullOrEmpty(WiFiInfo);
        public bool HasParking => !string.IsNullOrEmpty(ParkingInfo);
    }
} 