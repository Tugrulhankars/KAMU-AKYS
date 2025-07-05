using System.ComponentModel.DataAnnotations;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Application.DTOs.Auth;

public class RegisterRequestDto
{
    [Required(ErrorMessage = "Kullanıcı adı gereklidir")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Kullanıcı adı 3-50 karakter arası olmalıdır")]
    public string Username { get; set; } = string.Empty;

    [Required(ErrorMessage = "E-posta gereklidir")]
    [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Şifre gereklidir")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Şifre en az 6 karakter olmalıdır")]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Ad gereklidir")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Soyad gereklidir")]
    public string LastName { get; set; } = string.Empty;

    public string Department { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Personel;
} 