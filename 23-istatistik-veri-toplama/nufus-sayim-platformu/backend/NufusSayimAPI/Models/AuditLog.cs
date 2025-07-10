using System;

namespace NufusSayimAPI.Models
{
    public class AuditLog
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string? UserId { get; set; } // Kullanıcı kimliği (isteğe bağlı)
        public string? UserName { get; set; } // Kullanıcı adı (isteğe bağlı)
        public string Action { get; set; } = string.Empty; // Yapılan işlem
        public string? Entity { get; set; } // Hangi tablo/varlık
        public string? EntityId { get; set; } // Varlık ID
        public string? Details { get; set; } // Ek bilgi
        public string? IpAddress { get; set; } // İsteği yapan IP
    }
} 