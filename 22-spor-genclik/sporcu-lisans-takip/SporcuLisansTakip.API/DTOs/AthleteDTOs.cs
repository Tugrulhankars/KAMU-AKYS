namespace SporcuLisansTakip.API.DTOs
{
    public class CreateAthleteRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string IdentityNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string Gender { get; set; } = "Erkek";
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? BloodType { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public int? ClubId { get; set; }
    }

    public class UpdateAthleteRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? BloodType { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public int? ClubId { get; set; }
        public bool IsActive { get; set; }
    }

    public class AthleteDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string IdentityNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? BloodType { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public string? PhotoPath { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int? ClubId { get; set; }
        public string? ClubName { get; set; }
        public string FullName { get; set; } = string.Empty;
        public int Age { get; set; }
        public int LicenseCount { get; set; }
    }

    public class AthleteListDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string IdentityNumber { get; set; } = string.Empty;
        public int Age { get; set; }
        public string? ClubName { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public int LicenseCount { get; set; }
    }
} 