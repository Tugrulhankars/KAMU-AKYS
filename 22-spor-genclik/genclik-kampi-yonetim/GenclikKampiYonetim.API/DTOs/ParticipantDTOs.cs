namespace GenclikKampiYonetim.API.DTOs
{
    public class ParticipantDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string? PostalCode { get; set; }
        public string? SchoolName { get; set; }
        public string? Grade { get; set; }
        public string? ParentName { get; set; }
        public string? ParentPhone { get; set; }
        public string? ParentEmail { get; set; }
        public string? ParentAddress { get; set; }
        public string? MedicalConditions { get; set; }
        public string? Allergies { get; set; }
        public string? DietaryRestrictions { get; set; }
        public string? SpecialNeeds { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public List<EmergencyContactDto> EmergencyContacts { get; set; } = new List<EmergencyContactDto>();
        public HealthRecordDto? HealthRecord { get; set; }
    }

    public class CreateParticipantRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string? PostalCode { get; set; }
        public string? SchoolName { get; set; }
        public string? Grade { get; set; }
        public string? ParentName { get; set; }
        public string? ParentPhone { get; set; }
        public string? ParentEmail { get; set; }
        public string? ParentAddress { get; set; }
        public string? MedicalConditions { get; set; }
        public string? Allergies { get; set; }
        public string? DietaryRestrictions { get; set; }
        public string? SpecialNeeds { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateParticipantRequest
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string? PostalCode { get; set; }
        public string? SchoolName { get; set; }
        public string? Grade { get; set; }
        public string? ParentName { get; set; }
        public string? ParentPhone { get; set; }
        public string? ParentEmail { get; set; }
        public string? ParentAddress { get; set; }
        public string? MedicalConditions { get; set; }
        public string? Allergies { get; set; }
        public string? DietaryRestrictions { get; set; }
        public string? SpecialNeeds { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; } = true;
    }

    public class ParticipantListDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; }
    }

    public class ParticipantStatisticsDto
    {
        public int TotalParticipants { get; set; }
        public int ActiveParticipants { get; set; }
        public int MaleParticipants { get; set; }
        public int FemaleParticipants { get; set; }
        public Dictionary<int, int> AgeGroups { get; set; } = new Dictionary<int, int>();
    }
}