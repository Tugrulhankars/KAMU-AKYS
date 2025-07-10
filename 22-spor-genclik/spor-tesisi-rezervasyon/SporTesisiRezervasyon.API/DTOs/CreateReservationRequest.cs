using System.ComponentModel.DataAnnotations;

namespace SporTesisiRezervasyon.API.DTOs
{
    public class CreateReservationRequest
    {
        [Required(ErrorMessage = "Spor tesisi ID gereklidir")]
        public int FacilityId { get; set; }

        [Required(ErrorMessage = "Başlangıç zamanı gereklidir")]
        public DateTime StartTime { get; set; }

        [Required(ErrorMessage = "Bitiş zamanı gereklidir")]
        public DateTime EndTime { get; set; }

        [MaxLength(500, ErrorMessage = "Notlar en fazla 500 karakter olabilir")]
        public string? Notes { get; set; }
    }
} 