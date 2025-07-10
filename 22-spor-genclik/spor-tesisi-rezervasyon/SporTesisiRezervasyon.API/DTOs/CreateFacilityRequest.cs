using System.ComponentModel.DataAnnotations;

namespace SporTesisiRezervasyon.API.DTOs
{
    public class CreateFacilityRequest
    {
        [Required(ErrorMessage = "Tesisi adı gereklidir")]
        [MaxLength(100, ErrorMessage = "Tesisi adı en fazla 100 karakter olabilir")]
        public string Name { get; set; } = string.Empty;

        [MaxLength(500, ErrorMessage = "Açıklama en fazla 500 karakter olabilir")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Adres gereklidir")]
        [MaxLength(200, ErrorMessage = "Adres en fazla 200 karakter olabilir")]
        public string Address { get; set; } = string.Empty;

        [MaxLength(20, ErrorMessage = "Telefon numarası en fazla 20 karakter olabilir")]
        public string? PhoneNumber { get; set; }

        [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz")]
        [MaxLength(100, ErrorMessage = "E-posta adresi en fazla 100 karakter olabilir")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Kapasite gereklidir")]
        [Range(1, int.MaxValue, ErrorMessage = "Kapasite 1'den büyük olmalıdır")]
        public int Capacity { get; set; }

        [Required(ErrorMessage = "Saatlik ücret gereklidir")]
        [Range(0, double.MaxValue, ErrorMessage = "Saatlik ücret 0'dan büyük olmalıdır")]
        public decimal HourlyRate { get; set; }

        [Required(ErrorMessage = "Tesisi türü ID gereklidir")]
        public int FacilityTypeId { get; set; }
    }
} 