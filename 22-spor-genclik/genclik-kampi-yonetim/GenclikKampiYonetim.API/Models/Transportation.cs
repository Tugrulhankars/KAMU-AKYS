namespace GenclikKampiYonetim.API.Models
{
    public class Transportation
    {
        public int Id { get; set; }
        public int CampId { get; set; }
        public string Type { get; set; } = string.Empty; // Bus, Minibus, Car, Train, Plane
        public string DepartureLocation { get; set; } = string.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int Capacity { get; set; }
        public string? DriverName { get; set; }
        public string? DriverPhone { get; set; }
        public string? DriverLicense { get; set; }
        public string? VehicleInfo { get; set; }
        public string? VehiclePlate { get; set; }
        public string? VehicleModel { get; set; }
        public string? VehicleYear { get; set; }
        public string? VehicleColor { get; set; }
        public string? Route { get; set; }
        public string? Stops { get; set; }
        public string? Notes { get; set; }
        public string Status { get; set; } = "Scheduled"; // Scheduled, In Transit, Arrived, Cancelled
        public int RegisteredPassengers { get; set; } = 0;
        public string? ContactPerson { get; set; }
        public string? ContactPhone { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? InsuranceInfo { get; set; }
        public string? SafetyInfo { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Camp Camp { get; set; } = null!;

        // Computed properties
        public TimeSpan Duration => ArrivalTime - DepartureTime;
        public int AvailableSeats => Capacity - RegisteredPassengers;
        public bool IsFull => AvailableSeats <= 0;
        public bool IsScheduled => Status == "Scheduled";
        public bool IsInTransit => Status == "In Transit";
        public bool IsArrived => Status == "Arrived";
        public bool IsCancelled => Status == "Cancelled";
        public bool IsUpcoming => DepartureTime > DateTime.UtcNow;
        public bool IsPast => ArrivalTime < DateTime.UtcNow;
        public bool IsOngoing => DepartureTime <= DateTime.UtcNow && ArrivalTime >= DateTime.UtcNow;
        public string TypeText => Type switch
        {
            "Bus" => "Otobüs",
            "Minibus" => "Minibüs",
            "Car" => "Araba",
            "Train" => "Tren",
            "Plane" => "Uçak",
            _ => Type
        };
        public string DriverInfo => $"{DriverName} - {DriverPhone}";
        public string VehicleInfoText => $"{VehicleModel} ({VehicleYear}) - {VehiclePlate}";
        public string ContactInfo => $"{ContactPerson} - {ContactPhone}";
        public string EmergencyInfo => $"{EmergencyContact} - {EmergencyPhone}";
        public bool HasDriver => !string.IsNullOrEmpty(DriverName);
        public bool HasVehicleInfo => !string.IsNullOrEmpty(VehicleInfo);
        public bool HasRoute => !string.IsNullOrEmpty(Route);
        public bool HasStops => !string.IsNullOrEmpty(Stops);
    }
} 