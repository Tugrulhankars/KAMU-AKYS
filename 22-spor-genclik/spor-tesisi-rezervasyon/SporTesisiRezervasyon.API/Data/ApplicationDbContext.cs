using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SporTesisiRezervasyon.API.Models;

namespace SporTesisiRezervasyon.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Facility> Facilities { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<FacilityType> FacilityTypes { get; set; }
        public DbSet<FacilitySchedule> FacilitySchedules { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Facility entity konfigürasyonu
            builder.Entity<Facility>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Address).IsRequired().HasMaxLength(200);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(100);
                
                entity.HasOne(e => e.FacilityType)
                    .WithMany(ft => ft.Facilities)
                    .HasForeignKey(e => e.FacilityTypeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Reservation entity konfigürasyonu
            builder.Entity<Reservation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.StartTime).IsRequired();
                entity.Property(e => e.EndTime).IsRequired();
                entity.Property(e => e.Status).IsRequired();
                entity.Property(e => e.Notes).HasMaxLength(500);
                
                entity.HasOne(e => e.Facility)
                    .WithMany(f => f.Reservations)
                    .HasForeignKey(e => e.FacilityId)
                    .OnDelete(DeleteBehavior.Restrict);
                
                entity.HasOne(e => e.User)
                    .WithMany(u => u.Reservations)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // FacilityType entity konfigürasyonu
            builder.Entity<FacilityType>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Description).HasMaxLength(200);
            });

            // FacilitySchedule entity konfigürasyonu
            builder.Entity<FacilitySchedule>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.DayOfWeek).IsRequired();
                entity.Property(e => e.OpenTime).IsRequired();
                entity.Property(e => e.CloseTime).IsRequired();
                
                entity.HasOne(e => e.Facility)
                    .WithMany(f => f.Schedules)
                    .HasForeignKey(e => e.FacilityId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // Seed data
            SeedData(builder);
        }

        private void SeedData(ModelBuilder builder)
        {
            // Facility Types
            builder.Entity<FacilityType>().HasData(
                new FacilityType { Id = 1, Name = "Futbol Sahası", Description = "Açık futbol sahası" },
                new FacilityType { Id = 2, Name = "Basketbol Sahası", Description = "Açık basketbol sahası" },
                new FacilityType { Id = 3, Name = "Tenis Kortu", Description = "Açık tenis kortu" },
                new FacilityType { Id = 4, Name = "Voleybol Sahası", Description = "Açık voleybol sahası" },
                new FacilityType { Id = 5, Name = "Yüzme Havuzu", Description = "Kapalı yüzme havuzu" },
                new FacilityType { Id = 6, Name = "Spor Salonu", Description = "Kapalı spor salonu" },
                new FacilityType { Id = 7, Name = "Koşu Pisti", Description = "Açık koşu pisti" },
                new FacilityType { Id = 8, Name = "Fitness Merkezi", Description = "Fitness ekipmanları" }
            );

            // Sample Facilities
            builder.Entity<Facility>().HasData(
                new Facility 
                { 
                    Id = 1, 
                    Name = "Merkez Futbol Sahası", 
                    Description = "Şehir merkezinde bulunan profesyonel futbol sahası",
                    Address = "Merkez Mahallesi, Spor Caddesi No:1",
                    PhoneNumber = "0212 555 0001",
                    Email = "merkez@sportesisi.com",
                    Capacity = 22,
                    HourlyRate = 500.00m,
                    IsActive = true,
                    FacilityTypeId = 1
                },
                new Facility 
                { 
                    Id = 2, 
                    Name = "Olimpiyat Basketbol Sahası", 
                    Description = "Olimpiyat standartlarında basketbol sahası",
                    Address = "Olimpiyat Mahallesi, Spor Sokak No:5",
                    PhoneNumber = "0212 555 0002",
                    Email = "basketbol@sportesisi.com",
                    Capacity = 10,
                    HourlyRate = 300.00m,
                    IsActive = true,
                    FacilityTypeId = 2
                },
                new Facility 
                { 
                    Id = 3, 
                    Name = "Elite Tenis Kortu", 
                    Description = "Profesyonel tenis kortu",
                    Address = "Elite Mahallesi, Tenis Caddesi No:3",
                    PhoneNumber = "0212 555 0003",
                    Email = "tenis@sportesisi.com",
                    Capacity = 4,
                    HourlyRate = 400.00m,
                    IsActive = true,
                    FacilityTypeId = 3
                }
            );
        }
    }
} 