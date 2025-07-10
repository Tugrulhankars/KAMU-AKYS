using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.DTOs
{
    public class SertifikaDto
    {
        public int Id { get; set; }
        public int AntrenorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? IssuingAuthority { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? CertificateNumber { get; set; }
        public string? FilePath { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        
        // Computed properties
        public string? AntrenorAdSoyad { get; set; }
        public bool IsValid { get; set; }
        public bool IsExpired { get; set; }
        public int DaysUntilExpiry { get; set; }
        public bool IsExpiringSoon { get; set; }
    }

    public class CreateSertifikaDto
    {
        [Required]
        public int AntrenorId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(100)]
        public string? IssuingAuthority { get; set; }

        [Required]
        public DateTime IssueDate { get; set; }

        public DateTime? ExpiryDate { get; set; }

        [StringLength(50)]
        public string? CertificateNumber { get; set; }

        [StringLength(500)]
        public string? FilePath { get; set; }
    }

    public class UpdateSertifikaDto
    {
        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(100)]
        public string? IssuingAuthority { get; set; }

        public DateTime? IssueDate { get; set; }

        public DateTime? ExpiryDate { get; set; }

        [StringLength(50)]
        public string? CertificateNumber { get; set; }

        [StringLength(500)]
        public string? FilePath { get; set; }

        public bool? IsActive { get; set; }
    }

    public class SertifikaKategoriDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Kategori { get; set; }
        public int GecerlilikSuresi { get; set; }
        public string? Seviye { get; set; }
        public string? Gereksinimler { get; set; }
        public string? Aciklama { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateSertifikaKategoriDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Kategori { get; set; }

        [Required]
        [Range(1, 3650)]
        public int GecerlilikSuresi { get; set; }

        [StringLength(50)]
        public string? Seviye { get; set; }

        [StringLength(500)]
        public string? Gereksinimler { get; set; }

        [StringLength(1000)]
        public string? Aciklama { get; set; }
    }

    public class UpdateSertifikaKategoriDto
    {
        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Kategori { get; set; }

        [Range(1, 3650)]
        public int? GecerlilikSuresi { get; set; }

        [StringLength(50)]
        public string? Seviye { get; set; }

        [StringLength(500)]
        public string? Gereksinimler { get; set; }

        [StringLength(1000)]
        public string? Aciklama { get; set; }

        public bool? IsActive { get; set; }
    }

    public class SertifikaGuncellemeDto
    {
        public int Id { get; set; }
        public int SertifikaId { get; set; }
        public DateTime BaslangicTarihi { get; set; }
        public DateTime BitisTarihi { get; set; }
        public string? Durum { get; set; }
        public string? Aciklama { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateSertifikaGuncellemeDto
    {
        [Required]
        public int SertifikaId { get; set; }

        [Required]
        public DateTime BaslangicTarihi { get; set; }

        [Required]
        public DateTime BitisTarihi { get; set; }

        [StringLength(50)]
        public string? Durum { get; set; }

        [StringLength(500)]
        public string? Aciklama { get; set; }
    }

    public class UpdateSertifikaGuncellemeDto
    {
        public DateTime? BaslangicTarihi { get; set; }

        public DateTime? BitisTarihi { get; set; }

        [StringLength(50)]
        public string? Durum { get; set; }

        [StringLength(500)]
        public string? Aciklama { get; set; }
    }
} 