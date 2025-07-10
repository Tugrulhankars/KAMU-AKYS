namespace GenclikKampiYonetim.API.Models
{
    public class Registration
    {
        public int Id { get; set; }
        public string RegistrationNumber { get; set; } = string.Empty;
        public int CampId { get; set; }
        public int ParticipantId { get; set; }
        public string RegisteredById { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Pending"; // Pending, Confirmed, Cancelled, Completed
        public string PaymentStatus { get; set; } = "Pending"; // Pending, Paid, Refunded, Cancelled
        public string PaymentMethod { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "TRY";
        public string? TransactionId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string? Notes { get; set; }
        public string? CancellationReason { get; set; }
        public DateTime? CancellationDate { get; set; }
        public string? CancelledBy { get; set; }
        public string? SpecialRequirements { get; set; }
        public string? DietaryRestrictions { get; set; }
        public string? MedicalNotes { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? EmergencyContactRelationship { get; set; }
        public bool ParentConsentReceived { get; set; } = false;
        public bool HealthReportReceived { get; set; } = false;
        public bool PaymentReceived { get; set; } = false;
        public DateTime? CheckInDate { get; set; }
        public DateTime? CheckOutDate { get; set; }
        public string? CheckInBy { get; set; }
        public string? CheckOutBy { get; set; }
        public string? RoomNumber { get; set; }
        public string? GroupAssignment { get; set; }
        public string? CounselorName { get; set; }
        public string? CounselorPhone { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Camp Camp { get; set; } = null!;
        public virtual Participant Participant { get; set; } = null!;
        public virtual ApplicationUser RegisteredBy { get; set; } = null!;
        public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

        // Computed properties
        public bool IsConfirmed => Status == "Confirmed";
        public bool IsCancelled => Status == "Cancelled";
        public bool IsCompleted => Status == "Completed";
        public bool IsPending => Status == "Pending";
        public bool IsPaid => PaymentStatus == "Paid";
        public bool IsCheckedIn => CheckInDate.HasValue;
        public bool IsCheckedOut => CheckOutDate.HasValue;
        public bool IsActive => IsConfirmed && !IsCancelled && !IsCompleted;
        public int DaysUntilCamp => (Camp.StartDate - DateTime.UtcNow).Days;
        public bool IsUpcoming => IsConfirmed && DaysUntilCamp > 0;
        public bool IsOngoing => IsConfirmed && Camp.IsOngoing;
        public bool CanCancel => IsConfirmed && !IsCheckedIn && DaysUntilCamp > 1;
        public bool RequiresPayment => Amount > 0 && !IsPaid;
        public bool IsFullyDocumented => ParentConsentReceived && HealthReportReceived && PaymentReceived;
    }
} 