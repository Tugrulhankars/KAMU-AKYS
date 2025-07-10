using AntrenorEgitimTakip.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AntrenorEgitimTakip.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Kullanıcı yönetimi
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        // Antrenör yönetimi
        public DbSet<Antrenor> Antrenorler { get; set; }
        public DbSet<AntrenorBilgi> AntrenorBilgileri { get; set; }
        public DbSet<AntrenorUzmanlik> AntrenorUzmanliklar { get; set; }
        public DbSet<AntrenorDeneyim> AntrenorDeneyimler { get; set; }

        // Eğitim yönetimi
        public DbSet<Egitim> Egitimler { get; set; }
        public DbSet<EgitimKategori> EgitimKategorileri { get; set; }
        public DbSet<EgitimModul> EgitimModulleri { get; set; }
        public DbSet<EgitimIcerik> EgitimIcerikleri { get; set; }

        // Sertifika yönetimi
        public DbSet<Sertifika> Sertifikalar { get; set; }
        public DbSet<SertifikaKategori> SertifikaKategorileri { get; set; }
        public DbSet<SertifikaGereksinim> SertifikaGereksinimleri { get; set; }
        public DbSet<SertifikaSinav> SertifikaSinavlari { get; set; }
        public DbSet<SertifikaBasvuru> SertifikaBasvurulari { get; set; }
        public DbSet<SertifikaGecmis> SertifikaGecmisleri { get; set; }

        // Performans yönetimi
        public DbSet<Performans> Performanslar { get; set; }
        public DbSet<PerformansKategori> PerformansKategorileri { get; set; }
        public DbSet<PerformansOlcum> PerformansOlcumleri { get; set; }
        public DbSet<PerformansHedef> PerformansHedefleri { get; set; }
        public DbSet<PerformansRapor> PerformansRaporlari { get; set; }
        public DbSet<PerformansGrafik> PerformansGrafikleri { get; set; }
        public DbSet<PerformansDetay> PerformansDetaylar { get; set; }
        public DbSet<PerformansKriter> PerformansKriterleri { get; set; }

        // Eğitim takip
        public DbSet<EgitimKayit> EgitimKayitlari { get; set; }
        public DbSet<EgitimTamamlama> EgitimTamamlamalar { get; set; }
        public DbSet<EgitimDevam> EgitimDevamlar { get; set; }
        public DbSet<EgitimNot> EgitimNotlar { get; set; }

        // Sporcu yönetimi
        public DbSet<Sporcu> Sporcular { get; set; }
        public DbSet<SporcuBilgi> SporcuBilgileri { get; set; }
        public DbSet<SporcuAntrenor> SporcuAntrenorler { get; set; }
        public DbSet<SporcuPerformans> SporcuPerformanslar { get; set; }
        public DbSet<SporcuYarisma> SporcuYarismalari { get; set; }

        // Sistem yönetimi
        public DbSet<Sistem> Sistemler { get; set; }
        public DbSet<SistemAyarlar> SistemAyarlari { get; set; }
        public DbSet<SistemLog> SistemLoglari { get; set; }
        public DbSet<SistemBildirim> SistemBildirimleri { get; set; }
        public DbSet<SistemRol> SistemRolleri { get; set; }
        public DbSet<SistemYetki> SistemYetkileri { get; set; }
        public DbSet<Log> Loglar { get; set; }
        public DbSet<Ayarlar> Ayarlar { get; set; }
        public DbSet<Bildirim> Bildirimler { get; set; }
        public DbSet<Rapor> Raporlar { get; set; }

        // Uzmanlık alanları
        public DbSet<Uzmanlik> Uzmanliklar { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User - Role many-to-many
            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            // Antrenor - Uzmanlik many-to-many
            modelBuilder.Entity<AntrenorUzmanlik>()
                .HasKey(au => new { au.AntrenorId, au.UzmanlikId });

            // Sporcu - Antrenor many-to-many
            modelBuilder.Entity<SporcuAntrenor>()
                .HasKey(sa => new { sa.SporcuId, sa.AntrenorId });

            modelBuilder.Entity<SporcuAntrenor>()
                .HasOne(sa => sa.Sporcu)
                .WithMany(s => s.TrainerAthletes)
                .HasForeignKey(sa => sa.SporcuId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SporcuAntrenor>()
                .HasOne(sa => sa.Antrenor)
                .WithMany(a => a.SporcuAntrenorler)
                .HasForeignKey(sa => sa.AntrenorId)
                .OnDelete(DeleteBehavior.Cascade);

            // Eğitim kategorileri seed
            modelBuilder.Entity<EgitimKategori>().HasData(
                new EgitimKategori { Id = 1, Name = "Temel Eğitim", Description = "Temel antrenör eğitimleri" },
                new EgitimKategori { Id = 2, Name = "İleri Seviye", Description = "İleri seviye antrenör eğitimleri" },
                new EgitimKategori { Id = 3, Name = "Uzmanlık", Description = "Uzmanlık alanı eğitimleri" },
                new EgitimKategori { Id = 4, Name = "Sertifika", Description = "Sertifika programları" }
            );

            modelBuilder.Entity<EgitimTamamlama>()
                .HasOne(et => et.Modul)
                .WithMany()
                .HasForeignKey(et => et.ModulId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SporcuPerformans>()
                .HasOne(sp => sp.Sporcu)
                .WithMany(s => s.Performances)
                .HasForeignKey(sp => sp.SporcuId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SporcuPerformans>()
                .HasOne(sp => sp.Performans)
                .WithMany()
                .HasForeignKey(sp => sp.PerformansId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
} 