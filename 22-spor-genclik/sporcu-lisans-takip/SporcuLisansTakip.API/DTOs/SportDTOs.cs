namespace SporcuLisansTakip.API.DTOs
{
    public class CreateSportRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? IconPath { get; set; }
    }

    public class UpdateSportRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? IconPath { get; set; }
        public bool IsActive { get; set; }
    }

    public class SportDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? IconPath { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int LicenseCount { get; set; }
    }

    public class SportListDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? IconPath { get; set; }
        public bool IsActive { get; set; }
        public int LicenseCount { get; set; }
    }
} 