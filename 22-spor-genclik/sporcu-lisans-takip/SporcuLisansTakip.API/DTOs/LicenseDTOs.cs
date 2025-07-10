namespace SporcuLisansTakip.API.DTOs
{
    public class CreateLicenseRequest
    {
        public int AthleteId { get; set; }
        public int SportId { get; set; }
        public int LicenseTypeId { get; set; }
        public int LicenseCategoryId { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateLicenseRequest
    {
        public string? Notes { get; set; }
        public string Status { get; set; } = "Active";
    }

    public class LicenseDto
    {
        public int Id { get; set; }
        public string LicenseNumber { get; set; } = string.Empty;
        public int AthleteId { get; set; }
        public string AthleteName { get; set; } = string.Empty;
        public string AthleteIdentityNumber { get; set; } = string.Empty;
        public int SportId { get; set; }
        public string SportName { get; set; } = string.Empty;
        public int LicenseTypeId { get; set; }
        public string LicenseTypeName { get; set; } = string.Empty;
        public int LicenseCategoryId { get; set; }
        public string LicenseCategoryName { get; set; } = string.Empty;
        public DateTime IssueDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime? RenewalDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string? QrCodePath { get; set; }
        public string? PdfPath { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? IssuedBy { get; set; }
        public bool IsExpired { get; set; }
        public bool IsExpiringSoon { get; set; }
        public int DaysUntilExpiry { get; set; }
    }

    public class LicenseListDto
    {
        public int Id { get; set; }
        public string LicenseNumber { get; set; } = string.Empty;
        public string AthleteName { get; set; } = string.Empty;
        public string SportName { get; set; } = string.Empty;
        public string LicenseTypeName { get; set; } = string.Empty;
        public string LicenseCategoryName { get; set; } = string.Empty;
        public DateTime IssueDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public bool IsExpired { get; set; }
        public bool IsExpiringSoon { get; set; }
        public int DaysUntilExpiry { get; set; }
    }

    public class LicenseRenewalRequest
    {
        public int LicenseId { get; set; }
        public string? Notes { get; set; }
    }

    public class LicenseStatisticsDto
    {
        public int TotalLicenses { get; set; }
        public int ActiveLicenses { get; set; }
        public int ExpiredLicenses { get; set; }
        public int ExpiringSoonLicenses { get; set; }
        public int SuspendedLicenses { get; set; }
        public int CancelledLicenses { get; set; }
    }
} 