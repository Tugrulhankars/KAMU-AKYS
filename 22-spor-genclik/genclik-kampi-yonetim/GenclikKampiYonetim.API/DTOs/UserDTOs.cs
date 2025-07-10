namespace GenclikKampiYonetim.API.DTOs
{
    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; }
        public string UserType { get; set; } = string.Empty;
        public string? ProfilePhotoPath { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; }
        public string? Department { get; set; }
        public string? Position { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? ParentName { get; set; }
        public string? ParentPhone { get; set; }
        public string? ParentEmail { get; set; }
        public string? SchoolName { get; set; }
        public string? Grade { get; set; }
        public string? StudentId { get; set; }
        public string? TeacherName { get; set; }
        public string? TeacherPhone { get; set; }
        public string? TeacherEmail { get; set; }
        public string? Notes { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? UpdatedBy { get; set; }
        public string FullName { get; set; } = string.Empty;
        public int? Age { get; set; }
        public int RegistrationCount { get; set; }
        public bool HasActiveRegistration { get; set; }
    }

    public class CreateUserRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; }
        public string UserType { get; set; } = string.Empty;
        public string? Department { get; set; }
        public string? Position { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? ParentName { get; set; }
        public string? ParentPhone { get; set; }
        public string? ParentEmail { get; set; }
        public string? SchoolName { get; set; }
        public string? Grade { get; set; }
        public string? StudentId { get; set; }
        public string? TeacherName { get; set; }
        public string? TeacherPhone { get; set; }
        public string? TeacherEmail { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateUserRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; }
        public string UserType { get; set; } = string.Empty;
        public string? Department { get; set; }
        public string? Position { get; set; }
        public string? Address { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? EmergencyContact { get; set; }
        public string? EmergencyPhone { get; set; }
        public string? BloodType { get; set; }
        public string? Allergies { get; set; }
        public string? MedicalConditions { get; set; }
        public string? ParentName { get; set; }
        public string? ParentPhone { get; set; }
        public string? ParentEmail { get; set; }
        public string? SchoolName { get; set; }
        public string? Grade { get; set; }
        public string? StudentId { get; set; }
        public string? TeacherName { get; set; }
        public string? TeacherPhone { get; set; }
        public string? TeacherEmail { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; }
    }

    public class UserListDto
    {
        public string Id { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; }
        public string UserType { get; set; } = string.Empty;
        public string? Department { get; set; }
        public string? Position { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; }
        public int RegistrationCount { get; set; }
        public bool HasActiveRegistration { get; set; }
    }
} 