using System.ComponentModel.DataAnnotations;

namespace SporTesisiRezervasyon.API.DTOs
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Ad gereklidir")]
        [MaxLength(50, ErrorMessage = "Ad en fazla 50 karakter olabilir")]
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Soyad gereklidir")]
        [MaxLength(50, ErrorMessage = "Soyad en fazla 50 karakter olabilir")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "E-posta adresi gereklidir")]
        [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz")]
        [MaxLength(100, ErrorMessage = "E-posta adresi en fazla 100 karakter olabilir")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Telefon numarası gereklidir")]
        [Phone(ErrorMessage = "Geçerli bir telefon numarası giriniz")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre gereklidir")]
        [MinLength(6, ErrorMessage = "Şifre en az 6 karakter olmalıdır")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Şifre tekrarı gereklidir")]
        [Compare("Password", ErrorMessage = "Şifreler eşleşmiyor")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [MaxLength(11, ErrorMessage = "TC Kimlik No en fazla 11 karakter olabilir")]
        public string? IdentityNumber { get; set; }

        [MaxLength(200, ErrorMessage = "Adres en fazla 200 karakter olabilir")]
        public string? Address { get; set; }

        [Required(ErrorMessage = "Doğum tarihi gereklidir")]
        public DateTime DateOfBirth { get; set; }
    }
} 