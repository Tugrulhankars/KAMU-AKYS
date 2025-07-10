namespace GenclikKampiYonetim.API.DTOs
{
    public class RegistrationDto
    {
        public int Id { get; set; }
        public string RegistrationNumber { get; set; } = string.Empty;
        public int CampId { get; set; }
        public string CampName { get; set; } = string.Empty;
        public int ParticipantId { get; set; }
        public string ParticipantName { get; set; } = string.Empty;
        public string RegisteredById { get; set; } = string.Empty;
        public string RegisteredByName { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
        public string Status { get; set; } = "Pending";
        public string PaymentStatus { get; set; } = "Pending";
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
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsConfirmed { get; set; }
        public bool IsCancelled { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsPending { get; set; }
        public bool IsPaid { get; set; }
        public bool IsCheckedIn { get; set; }
        public bool IsCheckedOut { get; set; }
        public bool IsActive { get; set; }
        public int DaysUntilCamp { get; set; }
        public bool IsUpcoming { get; set; }
        public bool IsOngoing { get; set; }
        public bool CanCancel { get; set; }
        public bool RequiresPayment { get; set; }
        public bool IsFullyDocumented { get; set; }
        public List<PaymentDto> Payments { get; set; } = new List<PaymentDto>();
    }

    public class CreateRegistrationRequest
    {
        public int CampId { get; set; }
        public int ParticipantId { get; set; }
        public string? SpecialRequirements { get; set; }
        public string? DietaryRestrictions { get; set; }
        public string? MedicalNotes { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? EmergencyContactRelationship { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateRegistrationRequest
    {
        public string Status { get; set; } = "Pending";
        public string? Notes { get; set; }
        public string? SpecialRequirements { get; set; }
        public string? DietaryRestrictions { get; set; }
        public string? MedicalNotes { get; set; }
        public string? EmergencyContactName { get; set; }
        public string? EmergencyContactPhone { get; set; }
        public string? EmergencyContactRelationship { get; set; }
        public string? RoomNumber { get; set; }
        public string? GroupAssignment { get; set; }
        public string? CounselorName { get; set; }
        public string? CounselorPhone { get; set; }
    }

    public class RegistrationListDto
    {
        public int Id { get; set; }
        public string RegistrationNumber { get; set; } = string.Empty;
        public string CampName { get; set; } = string.Empty;
        public string ParticipantName { get; set; } = string.Empty;
        public DateTime RegistrationDate { get; set; }
        public string Status { get; set; } = "Pending";
        public string PaymentStatus { get; set; } = "Pending";
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "TRY";
        public bool IsConfirmed { get; set; }
        public bool IsPaid { get; set; }
        public bool IsCheckedIn { get; set; }
        public bool IsCheckedOut { get; set; }
        public int DaysUntilCamp { get; set; }
        public bool IsUpcoming { get; set; }
        public bool IsOngoing { get; set; }
    }

    public class CancelRegistrationRequest
    {
        public string Reason { get; set; } = string.Empty;
    }

    public class CheckInRequest
    {
        public string? RoomNumber { get; set; }
        public string? GroupAssignment { get; set; }
        public string? CounselorName { get; set; }
        public string? CounselorPhone { get; set; }
        public string? Notes { get; set; }
    }

    public class CheckOutRequest
    {
        public string? Notes { get; set; }
    }

    public class RegistrationStatisticsDto
    {
        public int TotalRegistrations { get; set; }
        public int ConfirmedRegistrations { get; set; }
        public int PendingRegistrations { get; set; }
        public int CancelledRegistrations { get; set; }
        public int CompletedRegistrations { get; set; }
        public int CheckedInRegistrations { get; set; }
        public int CheckedOutRegistrations { get; set; }
        public decimal TotalRevenue { get; set; }
        public decimal PendingRevenue { get; set; }
        public decimal ConfirmedRevenue { get; set; }
        public int FullyDocumentedRegistrations { get; set; }
        public int IncompleteDocumentRegistrations { get; set; }
    }
} 