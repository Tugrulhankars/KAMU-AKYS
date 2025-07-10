using System.ComponentModel.DataAnnotations;

namespace NufusSayimAPI.DTOs;

// City DTOs
public class CityDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string? CreatedByUsername { get; set; }
    public int DistrictCount { get; set; }
}

public class CreateCityRequest
{
    [Required(ErrorMessage = "Şehir adı gereklidir")]
    [MaxLength(100, ErrorMessage = "Şehir adı en fazla 100 karakter olabilir")]
    public string Name { get; set; } = string.Empty;
}

// District DTOs
public class DistrictDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int CityId { get; set; }
    public string CityName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string? CreatedByUsername { get; set; }
    public int HouseholdCount { get; set; }
}

public class CreateDistrictRequest
{
    [Required(ErrorMessage = "İlçe adı gereklidir")]
    [MaxLength(100, ErrorMessage = "İlçe adı en fazla 100 karakter olabilir")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Şehir seçimi gereklidir")]
    public int CityId { get; set; }
}

// Household DTOs
public class HouseholdDto
{
    public int Id { get; set; }
    public string Address { get; set; } = string.Empty;
    public int DistrictId { get; set; }
    public string DistrictName { get; set; } = string.Empty;
    public string CityName { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string CreatedByUsername { get; set; } = string.Empty;
    public string? UpdatedByUsername { get; set; }
    public string? Notes { get; set; }
    public bool IsActive { get; set; }
    public int PersonCount { get; set; }
    public List<PersonDto> People { get; set; } = new();
}

public class CreateHouseholdRequest
{
    [Required(ErrorMessage = "Adres gereklidir")]
    [MaxLength(500, ErrorMessage = "Adres en fazla 500 karakter olabilir")]
    public string Address { get; set; } = string.Empty;

    [Required(ErrorMessage = "İlçe seçimi gereklidir")]
    public int DistrictId { get; set; }

    [MaxLength(200, ErrorMessage = "Notlar en fazla 200 karakter olabilir")]
    public string? Notes { get; set; }
}

public class UpdateHouseholdRequest
{
    [Required(ErrorMessage = "Adres gereklidir")]
    [MaxLength(500, ErrorMessage = "Adres en fazla 500 karakter olabilir")]
    public string Address { get; set; } = string.Empty;

    [Required(ErrorMessage = "İlçe seçimi gereklidir")]
    public int DistrictId { get; set; }

    [MaxLength(200, ErrorMessage = "Notlar en fazla 200 karakter olabilir")]
    public string? Notes { get; set; }

    public bool IsActive { get; set; } = true;
}

// Person DTOs
public class PersonDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string FullName => $"{Name} {Surname}";
    public DateTime BirthDate { get; set; }
    public string Gender { get; set; } = string.Empty;
    public int Age { get; set; }
    public int HouseholdId { get; set; }
    public string? NationalId { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Occupation { get; set; }
    public string? MaritalStatus { get; set; }
    public string? EducationLevel { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string CreatedByUsername { get; set; } = string.Empty;
    public string? UpdatedByUsername { get; set; }
    public bool IsActive { get; set; }
    
    // Household info
    public string HouseholdAddress { get; set; } = string.Empty;
    public string DistrictName { get; set; } = string.Empty;
    public string CityName { get; set; } = string.Empty;
}

public class CreatePersonRequest
{
    [Required(ErrorMessage = "Ad gereklidir")]
    [MaxLength(100, ErrorMessage = "Ad en fazla 100 karakter olabilir")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Soyad gereklidir")]
    [MaxLength(100, ErrorMessage = "Soyad en fazla 100 karakter olabilir")]
    public string Surname { get; set; } = string.Empty;

    [Required(ErrorMessage = "Doğum tarihi gereklidir")]
    public DateTime BirthDate { get; set; }

    [Required(ErrorMessage = "Cinsiyet gereklidir")]
    public string Gender { get; set; } = string.Empty;

    [Required(ErrorMessage = "Hane seçimi gereklidir")]
    public int HouseholdId { get; set; }

    [MaxLength(11, ErrorMessage = "TC Kimlik No en fazla 11 karakter olabilir")]
    public string? NationalId { get; set; }

    [MaxLength(20, ErrorMessage = "Telefon en fazla 20 karakter olabilir")]
    public string? PhoneNumber { get; set; }

    [MaxLength(100, ErrorMessage = "E-posta en fazla 100 karakter olabilir")]
    [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz")]
    public string? Email { get; set; }

    [MaxLength(100, ErrorMessage = "Meslek en fazla 100 karakter olabilir")]
    public string? Occupation { get; set; }

    [MaxLength(50, ErrorMessage = "Medeni durum en fazla 50 karakter olabilir")]
    public string? MaritalStatus { get; set; }

    [MaxLength(50, ErrorMessage = "Eğitim durumu en fazla 50 karakter olabilir")]
    public string? EducationLevel { get; set; }
}

public class UpdatePersonRequest
{
    [Required(ErrorMessage = "Ad gereklidir")]
    [MaxLength(100, ErrorMessage = "Ad en fazla 100 karakter olabilir")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Soyad gereklidir")]
    [MaxLength(100, ErrorMessage = "Soyad en fazla 100 karakter olabilir")]
    public string Surname { get; set; } = string.Empty;

    [Required(ErrorMessage = "Doğum tarihi gereklidir")]
    public DateTime BirthDate { get; set; }

    [Required(ErrorMessage = "Cinsiyet gereklidir")]
    public string Gender { get; set; } = string.Empty;

    [Required(ErrorMessage = "Hane seçimi gereklidir")]
    public int HouseholdId { get; set; }

    [MaxLength(11, ErrorMessage = "TC Kimlik No en fazla 11 karakter olabilir")]
    public string? NationalId { get; set; }

    [MaxLength(20, ErrorMessage = "Telefon en fazla 20 karakter olabilir")]
    public string? PhoneNumber { get; set; }

    [MaxLength(100, ErrorMessage = "E-posta en fazla 100 karakter olabilir")]
    [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz")]
    public string? Email { get; set; }

    [MaxLength(100, ErrorMessage = "Meslek en fazla 100 karakter olabilir")]
    public string? Occupation { get; set; }

    [MaxLength(50, ErrorMessage = "Medeni durum en fazla 50 karakter olabilir")]
    public string? MaritalStatus { get; set; }

    [MaxLength(50, ErrorMessage = "Eğitim durumu en fazla 50 karakter olabilir")]
    public string? EducationLevel { get; set; }

    public bool IsActive { get; set; } = true;
}

// Statistics DTOs
public class StatisticsDto
{
    public int TotalCities { get; set; }
    public int TotalDistricts { get; set; }
    public int TotalHouseholds { get; set; }
    public int TotalPeople { get; set; }
    public int TotalUsers { get; set; }
    public int ActiveHouseholds { get; set; }
    public int ActivePeople { get; set; }
    public Dictionary<string, int> PeopleByGender { get; set; } = new();
    public Dictionary<string, int> PeopleByAgeGroup { get; set; } = new();
    public Dictionary<string, int> HouseholdsByCity { get; set; } = new();
} 