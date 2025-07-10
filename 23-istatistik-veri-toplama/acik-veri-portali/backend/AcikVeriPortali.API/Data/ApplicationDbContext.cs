using AcikVeriPortali.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AcikVeriPortali.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Temel modeller
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<DataSet> DataSets { get; set; }
        public DbSet<DataSetDownload> DataSetDownloads { get; set; }
        public DbSet<DataSetView> DataSetViews { get; set; }

        // İstatistik modelleri
        public DbSet<DataSetStatistics> DataSetStatistics { get; set; }
        public DbSet<PortalStatistics> PortalStatistics { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<DataQualityReport> DataQualityReports { get; set; }

        // Gelişmiş özellik modelleri
        public DbSet<DataSetVersion> DataSetVersions { get; set; }
        public DbSet<DataSetComment> DataSetComments { get; set; }
        public DbSet<DataSetTag> DataSetTags { get; set; }
        public DbSet<DataSetMetadata> DataSetMetadata { get; set; }
        public DbSet<DataSetSchema> DataSetSchemas { get; set; }
        public DbSet<DataSetAccessLog> DataSetAccessLogs { get; set; }
        public DbSet<DataSetExport> DataSetExports { get; set; }
        public DbSet<DataSetSubscription> DataSetSubscriptions { get; set; }

        // Bildirim ve webhook modelleri
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<WebhookSubscription> WebhookSubscriptions { get; set; }
        public DbSet<WebhookLog> WebhookLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // Category configuration
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasIndex(e => e.Name).IsUnique();
                entity.HasOne(e => e.ParentCategory)
                      .WithMany(e => e.SubCategories)
                      .HasForeignKey(e => e.ParentCategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSet configuration
            modelBuilder.Entity<DataSet>(entity =>
            {
                entity.HasIndex(e => e.Title);
                entity.HasIndex(e => e.Status);
                entity.HasIndex(e => e.CreatedAt);
                entity.HasIndex(e => e.IsFeatured);
                entity.HasIndex(e => e.IsPublic);
                entity.HasIndex(e => e.AccessLevel);
                entity.HasIndex(e => e.DOI).IsUnique();
                entity.HasOne(e => e.Category)
                      .WithMany(e => e.DataSets)
                      .HasForeignKey(e => e.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.CreatedBy)
                      .WithMany(e => e.DataSets)
                      .HasForeignKey(e => e.CreatedById)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSetDownload configuration
            modelBuilder.Entity<DataSetDownload>(entity =>
            {
                entity.HasIndex(e => e.DownloadedAt);
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.Downloads)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.User)
                      .WithMany(e => e.Downloads)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.SetNull);
                entity.Property(e => e.DownloadedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSetView configuration
            modelBuilder.Entity<DataSetView>(entity =>
            {
                entity.HasIndex(e => e.ViewedAt);
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.Views)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.SetNull);
                entity.Property(e => e.ViewedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSetStatistics configuration
            modelBuilder.Entity<DataSetStatistics>(entity =>
            {
                entity.HasIndex(e => e.Date);
                entity.HasIndex(e => new { e.DataSetId, e.Date }).IsUnique();
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.Statistics)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.Date).HasDefaultValueSql("CURRENT_DATE");
            });

            // PortalStatistics configuration
            modelBuilder.Entity<PortalStatistics>(entity =>
            {
                entity.HasIndex(e => e.Date).IsUnique();
                entity.Property(e => e.Date).HasDefaultValueSql("CURRENT_DATE");
            });

            // UserActivity configuration
            modelBuilder.Entity<UserActivity>(entity =>
            {
                entity.HasIndex(e => e.Timestamp);
                entity.HasIndex(e => e.Action);
                entity.HasIndex(e => e.SessionId);
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.Timestamp).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataQualityReport configuration
            modelBuilder.Entity<DataQualityReport>(entity =>
            {
                entity.HasIndex(e => e.CheckedAt);
                entity.HasIndex(e => e.Status);
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.QualityReports)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.CheckedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSetVersion configuration
            modelBuilder.Entity<DataSetVersion>(entity =>
            {
                entity.HasIndex(e => new { e.DataSetId, e.Version }).IsUnique();
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.Versions)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.CreatedBy)
                      .WithMany()
                      .HasForeignKey(e => e.CreatedById)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSetComment configuration
            modelBuilder.Entity<DataSetComment>(entity =>
            {
                entity.HasIndex(e => e.CreatedAt);
                entity.HasIndex(e => e.IsApproved);
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.Comments)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(e => e.ParentComment)
                      .WithMany(e => e.Replies)
                      .HasForeignKey(e => e.ParentCommentId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSetTag configuration
            modelBuilder.Entity<DataSetTag>(entity =>
            {
                entity.HasIndex(e => e.Name).IsUnique();
                entity.HasIndex(e => e.UsageCount);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSetMetadata configuration
            modelBuilder.Entity<DataSetMetadata>(entity =>
            {
                entity.HasIndex(e => new { e.DataSetId, e.Key }).IsUnique();
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.Metadata)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // DataSetSchema configuration
            modelBuilder.Entity<DataSetSchema>(entity =>
            {
                entity.HasIndex(e => new { e.DataSetId, e.ColumnName }).IsUnique();
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.Schema)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // DataSetAccessLog configuration
            modelBuilder.Entity<DataSetAccessLog>(entity =>
            {
                entity.HasIndex(e => e.AccessedAt);
                entity.HasIndex(e => e.AccessType);
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.AccessLogs)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.SetNull);
                entity.Property(e => e.AccessedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSetExport configuration
            modelBuilder.Entity<DataSetExport>(entity =>
            {
                entity.HasIndex(e => e.RequestedAt);
                entity.HasIndex(e => e.Status);
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.Exports)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.RequestedBy)
                      .WithMany()
                      .HasForeignKey(e => e.RequestedById)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.Property(e => e.RequestedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // DataSetSubscription configuration
            modelBuilder.Entity<DataSetSubscription>(entity =>
            {
                entity.HasIndex(e => new { e.DataSetId, e.UserId }).IsUnique();
                entity.HasOne(e => e.DataSet)
                      .WithMany(e => e.Subscriptions)
                      .HasForeignKey(e => e.DataSetId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // Notification configuration
            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasIndex(e => e.CreatedAt);
                entity.HasIndex(e => e.IsRead);
                entity.HasIndex(e => e.Type);
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // WebhookSubscription configuration
            modelBuilder.Entity<WebhookSubscription>(entity =>
            {
                entity.HasIndex(e => e.Url);
                entity.HasIndex(e => e.IsActive);
                entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // WebhookLog configuration
            modelBuilder.Entity<WebhookLog>(entity =>
            {
                entity.HasIndex(e => e.TriggeredAt);
                entity.HasIndex(e => e.IsSuccess);
                entity.HasOne(e => e.WebhookSubscription)
                      .WithMany()
                      .HasForeignKey(e => e.WebhookSubscriptionId)
                      .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.TriggeredAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            // Many-to-Many relationships
            modelBuilder.Entity<DataSet>()
                .HasMany(d => d.Tags)
                .WithMany(t => t.DataSets);

            // Seed data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Admin user
            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                Email = "admin@acikveri.gov.tr",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                FirstName = "Admin",
                LastName = "User",
                Role = "Admin",
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            });

            // Default categories
            modelBuilder.Entity<Category>().HasData(
                new Category
                {
                    Id = 1,
                    Name = "Ekonomi",
                    Description = "Ekonomik veriler ve istatistikler",
                    Color = "#28a745",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = 2,
                    Name = "Sağlık",
                    Description = "Sağlık verileri ve istatistikler",
                    Color = "#dc3545",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = 3,
                    Name = "Eğitim",
                    Description = "Eğitim verileri ve istatistikler",
                    Color = "#007bff",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = 4,
                    Name = "Ulaştırma",
                    Description = "Ulaştırma verileri ve istatistikler",
                    Color = "#ffc107",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Category
                {
                    Id = 5,
                    Name = "Çevre",
                    Description = "Çevre verileri ve istatistikler",
                    Color = "#20c997",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            );

            // Default tags
            modelBuilder.Entity<DataSetTag>().HasData(
                new DataSetTag
                {
                    Id = 1,
                    Name = "Açık Veri",
                    Description = "Açık veri standartlarına uygun veriler",
                    Color = "#17a2b8",
                    UsageCount = 0,
                    CreatedAt = DateTime.UtcNow
                },
                new DataSetTag
                {
                    Id = 2,
                    Name = "Gerçek Zamanlı",
                    Description = "Gerçek zamanlı güncellenen veriler",
                    Color = "#fd7e14",
                    UsageCount = 0,
                    CreatedAt = DateTime.UtcNow
                },
                new DataSetTag
                {
                    Id = 3,
                    Name = "Coğrafi",
                    Description = "Coğrafi bilgi içeren veriler",
                    Color = "#6f42c1",
                    UsageCount = 0,
                    CreatedAt = DateTime.UtcNow
                },
                new DataSetTag
                {
                    Id = 4,
                    Name = "İstatistik",
                    Description = "İstatistiksel analiz verileri",
                    Color = "#e83e8c",
                    UsageCount = 0,
                    CreatedAt = DateTime.UtcNow
                }
            );
        }
    }
} 