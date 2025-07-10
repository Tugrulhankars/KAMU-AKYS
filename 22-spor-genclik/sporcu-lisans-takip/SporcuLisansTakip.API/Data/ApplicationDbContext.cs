using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SporcuLisansTakip.API.Models;

namespace SporcuLisansTakip.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Athlete> Athletes { get; set; }
        public DbSet<License> Licenses { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<Club> Clubs { get; set; }
        public DbSet<LicenseType> LicenseTypes { get; set; }
        public DbSet<LicenseCategory> LicenseCategories { get; set; }
        public DbSet<LicenseHistory> LicenseHistories { get; set; }
        public DbSet<Document> Documents { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Athlete entity konfigürasyonu
            builder.Entity<Athlete>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
                entity.Property(e => e.IdentityNumber).IsRequired().HasMaxLength(11);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Address).HasMaxLength(200);
                entity.Property(e => e.EmergencyContact).HasMaxLength(100);
                entity.Property(e => e.EmergencyPhone).HasMaxLength(20);
                entity.Property(e => e.BloodType).HasMaxLength(5);
                entity.Property(e => e.PhotoPath).HasMaxLength(500);
                
                entity.HasOne(e => e.Club)
                    .WithMany(c => c.Athletes)
                    .HasForeignKey(e => e.ClubId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // License entity konfigürasyonu
            builder.Entity<License>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.LicenseNumber).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Notes).HasMaxLength(500);
                entity.Property(e => e.QrCodePath).HasMaxLength(500);
                entity.Property(e => e.PdfPath).HasMaxLength(500);
                
                entity.HasOne(e => e.Athlete)
                    .WithMany(a => a.Licenses)
                    .HasForeignKey(e => e.AthleteId)
                    .OnDelete(DeleteBehavior.Restrict);
                
                entity.HasOne(e => e.Sport)
                    .WithMany(s => s.Licenses)
                    .HasForeignKey(e => e.SportId)
                    .OnDelete(DeleteBehavior.Restrict);
                
                entity.HasOne(e => e.LicenseType)
                    .WithMany(lt => lt.Licenses)
                    .HasForeignKey(e => e.LicenseTypeId)
                    .OnDelete(DeleteBehavior.Restrict);
                
                entity.HasOne(e => e.LicenseCategory)
                    .WithMany(lc => lc.Licenses)
                    .HasForeignKey(e => e.LicenseCategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
                
                entity.HasOne(e => e.IssuedBy)
                    .WithMany()
                    .HasForeignKey(e => e.IssuedById)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Sport entity konfigürasyonu
            builder.Entity<Sport>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.IconPath).HasMaxLength(500);
            });

            // Club entity konfigürasyonu
            builder.Entity<Club>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Address).HasMaxLength(200);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Website).HasMaxLength(200);
                entity.Property(e => e.LogoPath).HasMaxLength(500);
            });

            // LicenseType entity konfigürasyonu
            builder.Entity<LicenseType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Description).HasMaxLength(200);
                entity.Property(e => e.ValidityPeriod).IsRequired();
            });

            // LicenseCategory entity konfigürasyonu
            builder.Entity<LicenseCategory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Description).HasMaxLength(200);
            });

            // LicenseHistory entity konfigürasyonu
            builder.Entity<LicenseHistory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Action).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Notes).HasMaxLength(500);
                
                entity.HasOne(e => e.License)
                    .WithMany(l => l.History)
                    .HasForeignKey(e => e.LicenseId)
                    .OnDelete(DeleteBehavior.Cascade);
                
                entity.HasOne(e => e.ActionBy)
                    .WithMany()
                    .HasForeignKey(e => e.ActionById)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Document entity konfigürasyonu
            builder.Entity<Document>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FileName).IsRequired().HasMaxLength(200);
                entity.Property(e => e.FilePath).IsRequired().HasMaxLength(500);
                entity.Property(e => e.FileType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Description).HasMaxLength(500);
                
                entity.HasOne(e => e.Athlete)
                    .WithMany(a => a.Documents)
                    .HasForeignKey(e => e.AthleteId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Seed data
            SeedData(builder);
        }

        private void SeedData(ModelBuilder builder)
        {
            // Sports
            builder.Entity<Sport>().HasData(
                new Sport { Id = 1, Name = "Futbol", Description = "Futbol sporu" },
                new Sport { Id = 2, Name = "Basketbol", Description = "Basketbol sporu" },
                new Sport { Id = 3, Name = "Voleybol", Description = "Voleybol sporu" },
                new Sport { Id = 4, Name = "Tenis", Description = "Tenis sporu" },
                new Sport { Id = 5, Name = "Yüzme", Description = "Yüzme sporu" },
                new Sport { Id = 6, Name = "Atletizm", Description = "Atletizm sporu" },
                new Sport { Id = 7, Name = "Güreş", Description = "Güreş sporu" },
                new Sport { Id = 8, Name = "Judo", Description = "Judo sporu" },
                new Sport { Id = 9, Name = "Karate", Description = "Karate sporu" },
                new Sport { Id = 10, Name = "Taekwondo", Description = "Taekwondo sporu" }
            );

            // License Types
            builder.Entity<LicenseType>().HasData(
                new LicenseType { Id = 1, Name = "Amatör", Description = "Amatör sporcu lisansı", ValidityPeriod = 365 },
                new LicenseType { Id = 2, Name = "Profesyonel", Description = "Profesyonel sporcu lisansı", ValidityPeriod = 365 },
                new LicenseType { Id = 3, Name = "Antrenör", Description = "Antrenör lisansı", ValidityPeriod = 730 },
                new LicenseType { Id = 4, Name = "Hakem", Description = "Hakem lisansı", ValidityPeriod = 730 }
            );

            // License Categories
            builder.Entity<LicenseCategory>().HasData(
                new LicenseCategory { Id = 1, Name = "Minik", Description = "Minik kategorisi" },
                new LicenseCategory { Id = 2, Name = "Yıldız", Description = "Yıldız kategorisi" },
                new LicenseCategory { Id = 3, Name = "Genç", Description = "Genç kategorisi" },
                new LicenseCategory { Id = 4, Name = "Büyük", Description = "Büyük kategorisi" },
                new LicenseCategory { Id = 5, Name = "Master", Description = "Master kategorisi" }
            );

            // Sample Clubs
            builder.Entity<Club>().HasData(
                new Club 
                { 
                    Id = 1, 
                    Name = "Galatasaray Spor Kulübü", 
                    Description = "Türkiye'nin en köklü spor kulüplerinden biri",
                    Address = "Ali Sami Yen Spor Kompleksi, Huzur Mahallesi, Seyrantepe",
                    PhoneNumber = "0212 305 1905",
                    Email = "info@galatasaray.org",
                    Website = "www.galatasaray.org"
                },
                new Club 
                { 
                    Id = 2, 
                    Name = "Fenerbahçe Spor Kulübü", 
                    Description = "Türkiye'nin en büyük spor kulüplerinden biri",
                    Address = "Fenerbahçe Şükrü Saracoğlu Stadyumu, Kadıköy",
                    PhoneNumber = "0216 542 1907",
                    Email = "info@fenerbahce.org",
                    Website = "www.fenerbahce.org"
                },
                new Club 
                { 
                    Id = 3, 
                    Name = "Beşiktaş Jimnastik Kulübü", 
                    Description = "Kara Kartal",
                    Address = "Vodafone Park, Vişnezade Mahallesi, Beşiktaş",
                    PhoneNumber = "0212 227 2888",
                    Email = "info@bjk.com.tr",
                    Website = "www.bjk.com.tr"
                }
            );
        }
    }
} 