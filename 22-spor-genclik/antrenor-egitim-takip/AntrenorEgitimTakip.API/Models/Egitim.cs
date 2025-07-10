using System.ComponentModel.DataAnnotations;

namespace AntrenorEgitimTakip.API.Models
{
    public class Egitim : BaseEntity
    {
        private string _name = string.Empty;
        [Required]
        [StringLength(200)]
        public string Name
        {
            get => _name;
            set
            {
                if (string.IsNullOrWhiteSpace(value))
                    throw new ArgumentException("Training name boş olamaz.");
                _name = value;
            }
        }

        [StringLength(1000)]
        public string? Description { get; set; }

        [Required]
        public int KategoriId { get; set; }

        [StringLength(100)]
        public string? Egitmen { get; set; }

        public DateTime BaslangicTarihi { get; set; }

        public DateTime BitisTarihi { get; set; }

        private int _sure;
        [Required]
        [Range(1, 1000)]
        public int Sure
        {
            get => _sure;
            set
            {
                if (value < 1 || value > 1000)
                    throw new ArgumentException("Sure 1 ile 1000 saat arasında olmalıdır.");
                _sure = value;
            }
        }

        [StringLength(50)]
        public string? Seviye { get; set; }

        private int _kapasite;
        [Required]
        [Range(1, 1000)]
        public int Kapasite
        {
            get => _kapasite;
            set
            {
                if (value < 1 || value > 1000)
                    throw new ArgumentException("Kapasite 1 ile 1000 arasında olmalıdır.");
                _kapasite = value;
            }
        }

        public int KayitliKisi { get; set; }

        [StringLength(200)]
        public string? Lokasyon { get; set; }

        [StringLength(20)]
        public string? Durum { get; set; }

        [StringLength(1000)]
        public string? Gereksinimler { get; set; }

        [StringLength(1000)]
        public string? Materyaller { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }

        [StringLength(50)]
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual EgitimKategori Kategori { get; set; } = null!;
        public virtual ICollection<EgitimModul> Moduller { get; set; } = new List<EgitimModul>();
        public virtual ICollection<EgitimKayit> EgitimKayitlari { get; set; } = new List<EgitimKayit>();

        // Computed properties
        public bool Basladi => BaslangicTarihi <= DateTime.UtcNow;
        public bool Bitti => BitisTarihi <= DateTime.UtcNow;
        public bool DevamEdiyor => Basladi && !Bitti;
        public int KalanGun => (BitisTarihi - DateTime.UtcNow).Days;
        public int BosKontenjan => Kapasite - KayitliKisi;
        public bool Dolu => KayitliKisi >= Kapasite;
    }

    public class EgitimKategori : BaseEntity
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

        public int DisplayOrder { get; set; }

        // Navigation properties
        public virtual ICollection<Egitim> Egitimler { get; set; } = new List<Egitim>();
    }

    public class EgitimModul : BaseEntity
    {
        [Required]
        public int EgitimId { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        private int _sure;
        [Required]
        [Range(1, 100)]
        public int Sure
        {
            get => _sure;
            set
            {
                if (value < 1 || value > 100)
                    throw new ArgumentException("Sure 1 ile 100 saat arasında olmalıdır.");
                _sure = value;
            }
        }

        public int Sira { get; set; }

        [StringLength(20)]
        public string? Durum { get; set; }

        [StringLength(1000)]
        public string? Hedefler { get; set; }

        [StringLength(1000)]
        public string? Materyaller { get; set; }

        // Navigation properties
        public virtual Egitim Egitim { get; set; } = null!;
        public virtual ICollection<EgitimIcerik> Icerikler { get; set; } = new List<EgitimIcerik>();
    }

    public class EgitimIcerik : BaseEntity
    {
        [Required]
        public int ModulId { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Description { get; set; }

        [StringLength(20)]
        public string? Tip { get; set; }

        [StringLength(500)]
        public string? DosyaYolu { get; set; }

        private int _sure;
        [Required]
        [Range(1, 1000)]
        public int Sure
        {
            get => _sure;
            set
            {
                if (value < 1 || value > 1000)
                    throw new ArgumentException("Sure 1 ile 1000 dakika arasında olmalıdır.");
                _sure = value;
            }
        }

        public int Sira { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }

        // Navigation properties
        public virtual EgitimModul Modul { get; set; } = null!;
    }

    public class EgitimKayit : BaseEntity
    {
        [Required]
        public int AntrenorId { get; set; }

        [Required]
        public int EgitimId { get; set; }

        public DateTime KayitTarihi { get; set; }

        [StringLength(20)]
        public string? Durum { get; set; }

        public DateTime? BaslangicTarihi { get; set; }

        public DateTime? BitisTarihi { get; set; }

        private decimal? _tamamlanmaOrani;
        [Range(0, 100)]
        public decimal? TamamlanmaOrani
        {
            get => _tamamlanmaOrani;
            set
            {
                if (value.HasValue && (value.Value < 0 || value.Value > 100))
                    throw new ArgumentException("Tamamlanma oranı 0 ile 100 arasında olmalıdır.");
                _tamamlanmaOrani = value;
            }
        }

        private decimal? _basariPuani;
        [Range(0, 100)]
        public decimal? BasariPuani
        {
            get => _basariPuani;
            set
            {
                if (value.HasValue && (value.Value < 0 || value.Value > 100))
                    throw new ArgumentException("Başarı puanı 0 ile 100 arasında olmalıdır.");
                _basariPuani = value;
            }
        }

        [StringLength(20)]
        public string? BasariDurumu { get; set; }

        [StringLength(50)]
        public string? KaydedenKisi { get; set; }

        // Navigation properties
        public virtual Antrenor Antrenor { get; set; } = null!;
        public virtual Egitim Egitim { get; set; } = null!;
        public virtual ICollection<EgitimTamamlama> Tamamlamalar { get; set; } = new List<EgitimTamamlama>();
        public virtual ICollection<EgitimDevam> Devamlar { get; set; } = new List<EgitimDevam>();
        public virtual ICollection<EgitimNot> Notlar { get; set; } = new List<EgitimNot>();

        // Computed properties
        public bool Tamamlandi => Durum == "Tamamlandi";
        public bool DevamEdiyor => Durum == "DevamEdiyor";
        public bool Basarili => BasariDurumu == "Basarili";
        public int KalanGun => BitisTarihi.HasValue ? (BitisTarihi.Value - DateTime.UtcNow).Days : 0;
    }

    public class EgitimTamamlama : BaseEntity
    {
        [Required]
        public int KayitId { get; set; }

        [Required]
        public int ModulId { get; set; }

        public DateTime TamamlanmaTarihi { get; set; }

        private decimal _puan;
        [Required]
        [Range(0, 100)]
        public decimal Puan
        {
            get => _puan;
            set
            {
                if (value < 0 || value > 100)
                    throw new ArgumentException("Puan 0 ile 100 arasında olmalıdır.");
                _puan = value;
            }
        }

        [StringLength(20)]
        public string? Durum { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }

        // Navigation properties
        public virtual EgitimKayit Kayit { get; set; } = null!;
        public virtual EgitimModul Modul { get; set; } = null!;

        // Computed properties
        public bool Basarili => Puan >= 70;
    }

    public class EgitimDevam : BaseEntity
    {
        [Required]
        public int KayitId { get; set; }

        public DateTime Tarih { get; set; }

        public bool Katildi { get; set; }

        [StringLength(20)]
        public string? GecGelis { get; set; }

        [StringLength(20)]
        public string? ErkenCikis { get; set; }

        [StringLength(1000)]
        public string? Notlar { get; set; }

        [StringLength(50)]
        public string? KaydedenKisi { get; set; }

        // Navigation properties
        public virtual EgitimKayit Kayit { get; set; } = null!;

        // Computed properties
        public bool TamGun => string.IsNullOrEmpty(GecGelis) && string.IsNullOrEmpty(ErkenCikis);
    }

    public class EgitimNot : BaseEntity
    {
        [Required]
        public int KayitId { get; set; }

        [Required]
        [StringLength(200)]
        public string Baslik { get; set; } = string.Empty;

        [StringLength(1000)]
        public string? Icerik { get; set; }

        [StringLength(20)]
        public string? Tip { get; set; }

        [StringLength(50)]
        public string? Yazar { get; set; }

        public DateTime Tarih { get; set; }

        public bool Onemli { get; set; }

        // Navigation properties
        public virtual EgitimKayit Kayit { get; set; } = null!;
    }
} 