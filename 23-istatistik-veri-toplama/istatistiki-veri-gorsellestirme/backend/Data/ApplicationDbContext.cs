using KamuVeriAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace KamuVeriAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Dataset> Datasets { get; set; }
        public DbSet<DataPoint> DataPoints { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            // Dataset configuration
            modelBuilder.Entity<Dataset>()
                .HasOne(d => d.CreatedByUser)
                .WithMany()
                .HasForeignKey(d => d.CreatedByUserId)
                .OnDelete(DeleteBehavior.Restrict);

            // DataPoint configuration
            modelBuilder.Entity<DataPoint>()
                .HasOne(dp => dp.Dataset)
                .WithMany(d => d.DataPoints)
                .HasForeignKey(dp => dp.DatasetId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DataPoint>()
                .Property(dp => dp.Value)
                .HasPrecision(18, 2);

            // Seed data
            modelBuilder.Entity<User>().HasData(
                new User 
                { 
                    Id = 1, 
                    Username = "admin", 
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"), 
                    Role = "Admin",
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
} 