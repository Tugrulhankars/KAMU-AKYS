using Microsoft.EntityFrameworkCore;
using NufusSayimAPI.Models;

namespace NufusSayimAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<City> Cities { get; set; }
    public DbSet<District> Districts { get; set; }
    public DbSet<Household> Households { get; set; }
    public DbSet<Person> People { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User Configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Username).IsUnique();
            entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
            entity.Property(e => e.PasswordHash).IsRequired();
            entity.Property(e => e.Role).IsRequired().HasMaxLength(20);
        });

        // City Configuration
        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            
            entity.HasOne(e => e.CreatedByUser)
                  .WithMany(u => u.Cities)
                  .HasForeignKey(e => e.CreatedByUserId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // District Configuration
        modelBuilder.Entity<District>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            
            entity.HasOne(e => e.City)
                  .WithMany(c => c.Districts)
                  .HasForeignKey(e => e.CityId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.CreatedByUser)
                  .WithMany(u => u.Districts)
                  .HasForeignKey(e => e.CreatedByUserId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Household Configuration
        modelBuilder.Entity<Household>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Address).IsRequired().HasMaxLength(500);
            entity.Property(e => e.Notes).HasMaxLength(200);
            
            entity.HasOne(e => e.District)
                  .WithMany(d => d.Households)
                  .HasForeignKey(e => e.DistrictId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.CreatedByUser)
                  .WithMany()
                  .HasForeignKey(e => e.CreatedByUserId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.UpdatedByUser)
                  .WithMany()
                  .HasForeignKey(e => e.UpdatedByUserId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // Person Configuration
        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Surname).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Gender).IsRequired().HasMaxLength(10);
            entity.Property(e => e.NationalId).HasMaxLength(11);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Occupation).HasMaxLength(100);
            entity.Property(e => e.MaritalStatus).HasMaxLength(50);
            entity.Property(e => e.EducationLevel).HasMaxLength(50);
            
            entity.HasOne(e => e.Household)
                  .WithMany(h => h.People)
                  .HasForeignKey(e => e.HouseholdId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.CreatedByUser)
                  .WithMany()
                  .HasForeignKey(e => e.CreatedByUserId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.UpdatedByUser)
                  .WithMany()
                  .HasForeignKey(e => e.UpdatedByUserId)
                  .OnDelete(DeleteBehavior.SetNull);

            // Index for performance
            entity.HasIndex(e => e.NationalId);
            entity.HasIndex(e => new { e.Name, e.Surname });
        });

        // Seed Data
        SeedData(modelBuilder);
    }

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Default Admin User
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Role = "Admin",
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            }
        );

        // Sample Cities
        modelBuilder.Entity<City>().HasData(
            new City { Id = 1, Name = "İstanbul", CreatedAt = DateTime.UtcNow },
            new City { Id = 2, Name = "Ankara", CreatedAt = DateTime.UtcNow },
            new City { Id = 3, Name = "İzmir", CreatedAt = DateTime.UtcNow }
        );

        // Sample Districts
        modelBuilder.Entity<District>().HasData(
            new District { Id = 1, Name = "Kadıköy", CityId = 1, CreatedAt = DateTime.UtcNow },
            new District { Id = 2, Name = "Beşiktaş", CityId = 1, CreatedAt = DateTime.UtcNow },
            new District { Id = 3, Name = "Çankaya", CityId = 2, CreatedAt = DateTime.UtcNow },
            new District { Id = 4, Name = "Keçiören", CityId = 2, CreatedAt = DateTime.UtcNow },
            new District { Id = 5, Name = "Konak", CityId = 3, CreatedAt = DateTime.UtcNow }
        );
    }
} 