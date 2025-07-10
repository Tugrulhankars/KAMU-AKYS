using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.Models
{
    public class Sistem : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(20)]
        public string? Version { get; set; }

        [StringLength(50)]
        public string? Environment { get; set; }

        [StringLength(20)]
        public string? Status { get; set; }

        public DateTime? LastMaintenanceDate { get; set; }

        public DateTime? NextMaintenanceDate { get; set; }

        [StringLength(1000)]
        public string? MaintenanceNotes { get; set; }

        [StringLength(50)]
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual ICollection<SistemAyarlar> Settings { get; set; } = new List<SistemAyarlar>();
        public virtual ICollection<SistemLog> Logs { get; set; } = new List<SistemLog>();

        // Computed properties
        public bool IsActive => Status == "Active";
        public bool IsMaintenanceDue => NextMaintenanceDate.HasValue && NextMaintenanceDate.Value <= DateTime.UtcNow;
        public int DaysUntilMaintenance => NextMaintenanceDate.HasValue ? (NextMaintenanceDate.Value - DateTime.UtcNow).Days : 0;
        public bool IsProduction => Environment == "Production";
        public bool IsDevelopment => Environment == "Development";
    }

    public class SistemAyarlar : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Key { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Value { get; set; }

        [StringLength(100)]
        public string? Category { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(20)]
        public string? Type { get; set; }

        public bool IsRequired { get; set; }

        public bool IsEncrypted { get; set; }

        [StringLength(50)]
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Sistem System { get; set; } = null!;

        // Computed properties
        public bool IsBoolean => Type == "Boolean";
        public bool IsNumber => Type == "Number";
        public bool IsString => Type == "String";
        public bool IsJson => Type == "JSON";
        public bool HasValue => !string.IsNullOrEmpty(Value);
    }

    public class SistemLog : BaseEntity
    {
        [Required]
        [StringLength(20)]
        public string Level { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string Message { get; set; } = string.Empty;

        [StringLength(100)]
        public string? Source { get; set; }

        [StringLength(100)]
        public string? User { get; set; }

        [StringLength(50)]
        public string? IPAddress { get; set; }

        [StringLength(100)]
        public string? UserAgent { get; set; }

        [StringLength(1000)]
        public string? Exception { get; set; }

        [StringLength(1000)]
        public string? StackTrace { get; set; }

        [StringLength(1000)]
        public string? AdditionalData { get; set; }

        // Navigation properties
        public virtual Sistem System { get; set; } = null!;

        // Computed properties
        public bool IsError => Level == "Error";
        public bool IsWarning => Level == "Warning";
        public bool IsInfo => Level == "Info";
        public bool IsDebug => Level == "Debug";
        public bool IsCritical => Level == "Critical";
        public bool IsRecent => CreatedAt >= DateTime.UtcNow.AddHours(-24);
        public bool HasException => !string.IsNullOrEmpty(Exception);
    }

    public class SistemBildirim : BaseEntity
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Message { get; set; }

        [StringLength(20)]
        public string? Type { get; set; }

        [StringLength(20)]
        public string? Priority { get; set; }

        public bool IsRead { get; set; }

        public DateTime? ReadDate { get; set; }

        [StringLength(500)]
        public string? ActionUrl { get; set; }

        [StringLength(100)]
        public string? Sender { get; set; }

        [StringLength(1000)]
        public string? AdditionalData { get; set; }

        // Navigation properties
        public virtual User User { get; set; } = null!;

        // Computed properties
        public bool IsUnread => !IsRead;
        public bool IsHighPriority => Priority == "High";
        public bool IsUrgent => Priority == "Urgent";
        public bool IsRecent => CreatedAt >= DateTime.UtcNow.AddDays(-7);
        public int DaysSinceCreated => (DateTime.UtcNow - CreatedAt).Days;
        public bool IsOverdue => DaysSinceCreated > 30 && IsUnread;
    }

    public class SistemRol : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(20)]
        public string? Level { get; set; }

        public bool IsActive { get; set; }

        public bool IsSystem { get; set; }

        [StringLength(50)]
        public string? CreatedBy { get; set; }

        // Navigation properties
        public virtual ICollection<User> Users { get; set; } = new List<User>();
        public virtual ICollection<SistemYetki> Permissions { get; set; } = new List<SistemYetki>();

        // Computed properties
        public bool IsAdmin => Name == "Admin";
        public bool IsTrainer => Name == "Trainer";
        public bool IsAthlete => Name == "Athlete";
        public bool IsGuest => Name == "Guest";
        public bool IsCustom => !IsSystem;
        public bool HasUsers => Users.Any();
    }

    public class SistemYetki : BaseEntity
    {
        [Required]
        public int RoleId { get; set; }

        [Required]
        [StringLength(100)]
        public string Permission { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(20)]
        public string? Resource { get; set; }

        [StringLength(20)]
        public string? Action { get; set; }

        public bool IsGranted { get; set; }

        [StringLength(1000)]
        public string? Conditions { get; set; }

        [StringLength(50)]
        public string? GrantedBy { get; set; }

        // Navigation properties
        public virtual SistemRol Role { get; set; } = null!;

        // Computed properties
        public bool IsReadPermission => Action == "Read";
        public bool IsWritePermission => Action == "Write";
        public bool IsDeletePermission => Action == "Delete";
        public bool IsAdminPermission => Action == "Admin";
        public bool IsConditional => !string.IsNullOrEmpty(Conditions);
        public string FullPermission => $"{Resource}.{Action}";
    }

    public class Log : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Level { get; set; } = string.Empty;
        [Required]
        [StringLength(1000)]
        public string Message { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        [StringLength(1000)]
        public string? Exception { get; set; }
        [StringLength(1000)]
        public string? Properties { get; set; }
    }

    public class Ayarlar : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Key { get; set; } = string.Empty;
        [StringLength(1000)]
        public string? Value { get; set; }
        [StringLength(1000)]
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class Bildirim : BaseEntity
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        [StringLength(1000)]
        public string? Message { get; set; }
        public bool Okunmamis { get; set; }
        public bool Gecmis { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class Rapor : BaseEntity
    {
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        [StringLength(1000)]
        public string? Description { get; set; }
        public bool Tamamlandi { get; set; }
        public bool HataVar { get; set; }
        public int Sure { get; set; }
        public DateTime CreatedAt { get; set; }
    }
} 