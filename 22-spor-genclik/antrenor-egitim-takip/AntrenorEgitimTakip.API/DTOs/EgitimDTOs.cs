using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.DTOs
{
    public class CreateEgitimDto
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        [Required]
        public int KategoriId { get; set; }

        [StringLength(100)]
        public string? Egitmen { get; set; }

        [Required]
        public DateTime BaslangicTarihi { get; set; }

        [Required]
        public DateTime BitisTarihi { get; set; }

        [Required]
        [Range(1, 365)]
        public int Sure { get; set; }

        [StringLength(50)]
        public string? Seviye { get; set; }

        [Required]
        [Range(1, 1000)]
        public int Kapasite { get; set; }

        [StringLength(200)]
        public string? Lokasyon { get; set; }

        [StringLength(50)]
        public string? Durum { get; set; }

        [StringLength(500)]
        public string? Gereksinimler { get; set; }

        [StringLength(500)]
        public string? Materyaller { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }
    }

    public class UpdateEgitimDto
    {
        [StringLength(200)]
        public string? Name { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        public int? KategoriId { get; set; }

        [StringLength(100)]
        public string? Egitmen { get; set; }

        public DateTime? BaslangicTarihi { get; set; }

        public DateTime? BitisTarihi { get; set; }

        [Range(1, 365)]
        public int? Sure { get; set; }

        [StringLength(50)]
        public string? Seviye { get; set; }

        [Range(1, 1000)]
        public int? Kapasite { get; set; }

        [StringLength(200)]
        public string? Lokasyon { get; set; }

        [StringLength(50)]
        public string? Durum { get; set; }

        [StringLength(500)]
        public string? Gereksinimler { get; set; }

        [StringLength(500)]
        public string? Materyaller { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }

        public bool? IsActive { get; set; }
    }

    public class CreateEgitimKategoriDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Icon { get; set; }

        [StringLength(20)]
        public string? Color { get; set; }

        public int DisplayOrder { get; set; } = 0;
    }

    public class UpdateEgitimKategoriDto
    {
        [StringLength(100)]
        public string? Name { get; set; }

        [StringLength(500)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Icon { get; set; }

        [StringLength(20)]
        public string? Color { get; set; }

        public int? DisplayOrder { get; set; }

        public bool? IsActive { get; set; }
    }

    public class CreateEgitimModulDto
    {
        [Required]
        public int EgitimId { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        [Required]
        [Range(1, 100)]
        public int Sure { get; set; }

        [Required]
        [Range(1, 100)]
        public int Sira { get; set; }

        [StringLength(50)]
        public string? Durum { get; set; }

        [StringLength(500)]
        public string? Hedefler { get; set; }

        [StringLength(500)]
        public string? Materyaller { get; set; }
    }

    public class UpdateEgitimModulDto
    {
        [StringLength(200)]
        public string? Name { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        [Range(1, 100)]
        public int? Sure { get; set; }

        [Range(1, 100)]
        public int? Sira { get; set; }

        [StringLength(50)]
        public string? Durum { get; set; }

        [StringLength(500)]
        public string? Hedefler { get; set; }

        [StringLength(500)]
        public string? Materyaller { get; set; }
    }

    public class CreateEgitimIcerikDto
    {
        [Required]
        public int ModulId { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Tip { get; set; }

        [StringLength(500)]
        public string? DosyaYolu { get; set; }

        [Required]
        [Range(1, 100)]
        public int Sure { get; set; }

        [Required]
        [Range(1, 100)]
        public int Sira { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }
    }

    public class UpdateEgitimIcerikDto
    {
        [StringLength(200)]
        public string? Name { get; set; }

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(50)]
        public string? Tip { get; set; }

        [StringLength(500)]
        public string? DosyaYolu { get; set; }

        [Range(1, 100)]
        public int? Sure { get; set; }

        [Range(1, 100)]
        public int? Sira { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }
    }

    public class CreateEgitimKayitDto
    {
        [Required]
        public int AntrenorId { get; set; }

        [Required]
        public int EgitimId { get; set; }

        [StringLength(50)]
        public string? Durum { get; set; }

        public DateTime? BaslangicTarihi { get; set; }

        public DateTime? BitisTarihi { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }
    }

    public class UpdateEgitimKayitDto
    {
        [StringLength(50)]
        public string? Durum { get; set; }

        public DateTime? BaslangicTarihi { get; set; }

        public DateTime? BitisTarihi { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }

        public bool? IsActive { get; set; }
    }

    public class CreateEgitimTamamlamaDto
    {
        [Required]
        public int KayitId { get; set; }

        [Required]
        public int ModulId { get; set; }

        [Required]
        public DateTime TamamlamaTarihi { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal Puan { get; set; }

        [StringLength(50)]
        public string? Durum { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }
    }

    public class UpdateEgitimTamamlamaDto
    {
        public DateTime? TamamlamaTarihi { get; set; }

        [Range(0, 100)]
        public decimal? Puan { get; set; }

        [StringLength(50)]
        public string? Durum { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }
    }

    public class CreateEgitimDevamDto
    {
        [Required]
        public int KayitId { get; set; }

        [Required]
        public DateTime Tarih { get; set; }

        [Required]
        public bool Geldi { get; set; }

        [StringLength(50)]
        public string? GecKalmaSuresi { get; set; }

        [StringLength(50)]
        public string? ErkenAyrilmaSuresi { get; set; }

        [StringLength(500)]
        public string? Aciklama { get; set; }
    }

    public class UpdateEgitimDevamDto
    {
        public DateTime? Tarih { get; set; }

        public bool? Geldi { get; set; }

        [StringLength(50)]
        public string? GecKalmaSuresi { get; set; }

        [StringLength(50)]
        public string? ErkenAyrilmaSuresi { get; set; }

        [StringLength(500)]
        public string? Aciklama { get; set; }
    }

    public class CreateEgitimNotDto
    {
        [Required]
        public int KayitId { get; set; }

        [Required]
        [StringLength(200)]
        public string Baslik { get; set; } = string.Empty;

        [StringLength(2000)]
        public string? Icerik { get; set; }

        [StringLength(50)]
        public string? Tip { get; set; }

        public bool Onemli { get; set; } = false;
    }

    public class UpdateEgitimNotDto
    {
        [StringLength(200)]
        public string? Baslik { get; set; }

        [StringLength(2000)]
        public string? Icerik { get; set; }

        [StringLength(50)]
        public string? Tip { get; set; }

        public bool? Onemli { get; set; }
    }

    public class EgitimDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int KategoriId { get; set; }
        public string? Egitmen { get; set; }
        public DateTime BaslangicTarihi { get; set; }
        public DateTime BitisTarihi { get; set; }
        public int Sure { get; set; }
        public string? Seviye { get; set; }
        public int Kapasite { get; set; }
        public int KayitliKisi { get; set; }
        public string? Lokasyon { get; set; }
        public string? Durum { get; set; }
        public string? Gereksinimler { get; set; }
        public string? Materyaller { get; set; }
        public string? Notlar { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        
        // Computed properties
        public bool HasStarted { get; set; }
        public bool HasEnded { get; set; }
        public bool IsOngoing { get; set; }
        public int RemainingDays { get; set; }
        public int AvailableSlots { get; set; }
        public bool IsFull { get; set; }
    }

    public class EgitimKategoriDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Icon { get; set; }
        public string? Color { get; set; }
        public int DisplayOrder { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class EgitimModulDto
    {
        public int Id { get; set; }
        public int EgitimId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Sure { get; set; }
        public int Sira { get; set; }
        public string? Durum { get; set; }
        public string? Hedefler { get; set; }
        public string? Materyaller { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class EgitimIcerikDto
    {
        public int Id { get; set; }
        public int ModulId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Tip { get; set; }
        public string? DosyaYolu { get; set; }
        public int Sure { get; set; }
        public int Sira { get; set; }
        public string? Notlar { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }

    public class EgitimKayitDto
    {
        public int Id { get; set; }
        public int AntrenorId { get; set; }
        public int EgitimId { get; set; }
        public DateTime KayitTarihi { get; set; }
        public string? Durum { get; set; }
        public DateTime? BaslangicTarihi { get; set; }
        public DateTime? BitisTarihi { get; set; }
        public decimal? TamamlanmaOrani { get; set; }
        public decimal? BasariPuani { get; set; }
        public string? BasariDurumu { get; set; }
        public string? Notlar { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        
        // Computed properties
        public string? AntrenorAdSoyad { get; set; }
        public string? EgitimAdi { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsInProgress { get; set; }
        public bool IsSuccessful { get; set; }
        public int RemainingDays { get; set; }
    }

    public class EgitimTamamlamaDto
    {
        public int Id { get; set; }
        public int KayitId { get; set; }
        public int ModulId { get; set; }
        public DateTime TamamlanmaTarihi { get; set; }
        public decimal Puan { get; set; }
        public string? Durum { get; set; }
        public string? Notlar { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        
        // Computed properties
        public bool IsSuccessful { get; set; }
    }

    public class EgitimDevamDto
    {
        public int Id { get; set; }
        public int KayitId { get; set; }
        public DateTime Tarih { get; set; }
        public bool Katildi { get; set; }
        public string? GecGelis { get; set; }
        public string? ErkenCikis { get; set; }
        public string? Aciklama { get; set; }
        public string? Notlar { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        
        // Computed properties
        public bool FullDay { get; set; }
    }

    public class EgitimNotDto
    {
        public int Id { get; set; }
        public int KayitId { get; set; }
        public string Baslik { get; set; } = string.Empty;
        public string? Icerik { get; set; }
        public string? Tip { get; set; }
        public string? EkleyenKisi { get; set; }
        public DateTime Tarih { get; set; }
        public bool Onemli { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }
} 