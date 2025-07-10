using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using GenclikKampiYonetim.API.Models;

namespace GenclikKampiYonetim.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Camp> Camps { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Registration> Registrations { get; set; }
        public DbSet<CampActivity> CampActivities { get; set; }
        public DbSet<ParticipantActivity> ParticipantActivities { get; set; }
        public DbSet<CampLocation> CampLocations { get; set; }
        public DbSet<CampCategory> CampCategories { get; set; }
        public DbSet<ActivityCategory> ActivityCategories { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<EmergencyContact> EmergencyContacts { get; set; }
        public DbSet<CampStaff> CampStaff { get; set; }
        public DbSet<StaffRole> StaffRoles { get; set; }
        public DbSet<CampSchedule> CampSchedules { get; set; }
        public DbSet<MealPlan> MealPlans { get; set; }
        public DbSet<Transportation> Transportations { get; set; }
        public DbSet<HealthRecord> HealthRecords { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Camp konfigürasyonu
            builder.Entity<Camp>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Location).IsRequired().HasMaxLength(500);
                entity.Property(e => e.Capacity).IsRequired();
                entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
                entity.HasOne(e => e.Category).WithMany().HasForeignKey(e => e.CategoryId);
                entity.HasOne(e => e.Location).WithMany().HasForeignKey(e => e.LocationId);
            });

            // Participant konfigürasyonu
            builder.Entity<Participant>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.IdentityNumber).IsRequired().HasMaxLength(11);
                entity.Property(e => e.Email).HasMaxLength(200);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.Address).HasMaxLength(500);
                entity.Property(e => e.Gender).IsRequired().HasMaxLength(10);
                entity.Property(e => e.BloodType).HasMaxLength(5);
                entity.Property(e => e.Allergies).HasMaxLength(500);
                entity.Property(e => e.MedicalConditions).HasMaxLength(500);
                entity.Property(e => e.EmergencyContactName).HasMaxLength(200);
                entity.Property(e => e.EmergencyContactPhone).HasMaxLength(20);
                entity.Property(e => e.PhotoPath).HasMaxLength(500);
                entity.Property(e => e.ParentConsentPath).HasMaxLength(500);
                entity.Property(e => e.HealthReportPath).HasMaxLength(500);
            });

            // Activity konfigürasyonu
            builder.Entity<Activity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Duration).IsRequired();
                entity.Property(e => e.MaxParticipants).IsRequired();
                entity.Property(e => e.Requirements).HasMaxLength(500);
                entity.Property(e => e.Equipment).HasMaxLength(500);
                entity.Property(e => e.Location).HasMaxLength(200);
                entity.HasOne(e => e.Category).WithMany().HasForeignKey(e => e.CategoryId);
            });

            // Registration konfigürasyonu
            builder.Entity<Registration>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.RegistrationNumber).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Notes).HasMaxLength(1000);
                entity.Property(e => e.PaymentStatus).IsRequired().HasMaxLength(20);
                entity.Property(e => e.PaymentMethod).HasMaxLength(50);
                entity.Property(e => e.TransactionId).HasMaxLength(100);
                entity.HasOne(e => e.Camp).WithMany().HasForeignKey(e => e.CampId);
                entity.HasOne(e => e.Participant).WithMany().HasForeignKey(e => e.ParticipantId);
                entity.HasOne(e => e.RegisteredBy).WithMany().HasForeignKey(e => e.RegisteredById);
            });

            // CampActivity konfigürasyonu
            builder.Entity<CampActivity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Camp).WithMany().HasForeignKey(e => e.CampId);
                entity.HasOne(e => e.Activity).WithMany().HasForeignKey(e => e.ActivityId);
            });

            // ParticipantActivity konfigürasyonu
            builder.Entity<ParticipantActivity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Participant).WithMany().HasForeignKey(e => e.ParticipantId);
                entity.HasOne(e => e.Activity).WithMany().HasForeignKey(e => e.ActivityId);
                entity.HasOne(e => e.Camp).WithMany().HasForeignKey(e => e.CampId);
            });

            // CampLocation konfigürasyonu
            builder.Entity<CampLocation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Address).IsRequired().HasMaxLength(500);
                entity.Property(e => e.City).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Province).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PostalCode).HasMaxLength(10);
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(200);
                entity.Property(e => e.Website).HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Facilities).HasMaxLength(1000);
                entity.Property(e => e.PhotoPath).HasMaxLength(500);
            });

            // CampCategory konfigürasyonu
            builder.Entity<CampCategory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.IconPath).HasMaxLength(500);
            });

            // ActivityCategory konfigürasyonu
            builder.Entity<ActivityCategory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.IconPath).HasMaxLength(500);
            });

            // Document konfigürasyonu
            builder.Entity<Document>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.FilePath).IsRequired().HasMaxLength(500);
                entity.Property(e => e.FileType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.FileSize).IsRequired();
                entity.Property(e => e.Description).HasMaxLength(500);
            });

            // EmergencyContact konfigürasyonu
            builder.Entity<EmergencyContact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Relationship).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PhoneNumber).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Email).HasMaxLength(200);
                entity.Property(e => e.Address).HasMaxLength(500);
                entity.HasOne(e => e.Participant).WithMany().HasForeignKey(e => e.ParticipantId);
            });

            // CampStaff konfigürasyonu
            builder.Entity<CampStaff>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.PhotoPath).HasMaxLength(500);
                entity.Property(e => e.Qualifications).HasMaxLength(500);
                entity.Property(e => e.Experience).HasMaxLength(500);
                entity.HasOne(e => e.Role).WithMany().HasForeignKey(e => e.RoleId);
            });

            // StaffRole konfigürasyonu
            builder.Entity<StaffRole>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Responsibilities).HasMaxLength(1000);
            });

            // CampSchedule konfigürasyonu
            builder.Entity<CampSchedule>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.DayOfWeek).IsRequired();
                entity.Property(e => e.StartTime).IsRequired();
                entity.Property(e => e.EndTime).IsRequired();
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.HasOne(e => e.Camp).WithMany().HasForeignKey(e => e.CampId);
                entity.HasOne(e => e.Activity).WithMany().HasForeignKey(e => e.ActivityId);
            });

            // MealPlan konfigürasyonu
            builder.Entity<MealPlan>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.MealType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Menu).IsRequired().HasMaxLength(1000);
                entity.Property(e => e.SpecialDiet).HasMaxLength(500);
                entity.Property(e => e.Notes).HasMaxLength(500);
                entity.HasOne(e => e.Camp).WithMany().HasForeignKey(e => e.CampId);
            });

            // Transportation konfigürasyonu
            builder.Entity<Transportation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
                entity.Property(e => e.DepartureLocation).IsRequired().HasMaxLength(200);
                entity.Property(e => e.DepartureTime).IsRequired();
                entity.Property(e => e.ArrivalTime).IsRequired();
                entity.Property(e => e.Capacity).IsRequired();
                entity.Property(e => e.DriverName).HasMaxLength(200);
                entity.Property(e => e.DriverPhone).HasMaxLength(20);
                entity.Property(e => e.VehicleInfo).HasMaxLength(200);
                entity.HasOne(e => e.Camp).WithMany().HasForeignKey(e => e.CampId);
            });

            // HealthRecord konfigürasyonu
            builder.Entity<HealthRecord>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.BloodType).HasMaxLength(5);
                entity.Property(e => e.Allergies).HasMaxLength(500);
                entity.Property(e => e.MedicalConditions).HasMaxLength(500);
                entity.Property(e => e.Medications).HasMaxLength(500);
                entity.Property(e => e.EmergencyContactName).HasMaxLength(200);
                entity.Property(e => e.EmergencyContactPhone).HasMaxLength(20);
                entity.Property(e => e.InsuranceInfo).HasMaxLength(200);
                entity.Property(e => e.Notes).HasMaxLength(1000);
                entity.HasOne(e => e.Participant).WithMany().HasForeignKey(e => e.ParticipantId);
            });

            // Payment konfigürasyonu
            builder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Amount).IsRequired().HasColumnType("decimal(18,2)");
                entity.Property(e => e.PaymentMethod).IsRequired().HasMaxLength(50);
                entity.Property(e => e.TransactionId).HasMaxLength(100);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Notes).HasMaxLength(500);
                entity.HasOne(e => e.Registration).WithMany().HasForeignKey(e => e.RegistrationId);
            });

            // Notification konfigürasyonu
            builder.Entity<Notification>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Message).IsRequired().HasMaxLength(1000);
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
            });

            // Seed data
            SeedData(builder);
        }

        private void SeedData(ModelBuilder builder)
        {
            // Camp Categories
            builder.Entity<CampCategory>().HasData(
                new CampCategory { Id = 1, Name = "Doğa Kampı", Description = "Doğa ile iç içe kamp deneyimi" },
                new CampCategory { Id = 2, Name = "Spor Kampı", Description = "Spor odaklı kamp aktiviteleri" },
                new CampCategory { Id = 3, Name = "Sanat Kampı", Description = "Sanat ve kültür odaklı kamp" },
                new CampCategory { Id = 4, Name = "Bilim Kampı", Description = "Bilim ve teknoloji odaklı kamp" },
                new CampCategory { Id = 5, Name = "Liderlik Kampı", Description = "Liderlik ve kişisel gelişim kampı" }
            );

            // Activity Categories
            builder.Entity<ActivityCategory>().HasData(
                new ActivityCategory { Id = 1, Name = "Doğa Sporları", Description = "Doğa ile ilgili spor aktiviteleri" },
                new ActivityCategory { Id = 2, Name = "Takım Sporları", Description = "Takım halinde yapılan sporlar" },
                new ActivityCategory { Id = 3, Name = "Sanat ve El Sanatları", Description = "Sanat ve el sanatları aktiviteleri" },
                new ActivityCategory { Id = 4, Name = "Bilim ve Teknoloji", Description = "Bilim ve teknoloji aktiviteleri" },
                new ActivityCategory { Id = 5, Name = "Liderlik ve İletişim", Description = "Liderlik ve iletişim becerileri" },
                new ActivityCategory { Id = 6, Name = "Eğlence ve Oyun", Description = "Eğlenceli oyun ve aktiviteler" }
            );

            // Staff Roles
            builder.Entity<StaffRole>().HasData(
                new StaffRole { Id = 1, Name = "Kamp Müdürü", Description = "Kampın genel yönetiminden sorumlu", Responsibilities = "Kamp planlaması, personel yönetimi, bütçe kontrolü" },
                new StaffRole { Id = 2, Name = "Aktivite Lideri", Description = "Kamp aktivitelerini yöneten", Responsibilities = "Aktivite planlaması, katılımcı yönetimi, güvenlik" },
                new StaffRole { Id = 3, Name = "Sağlık Görevlisi", Description = "Kamp sağlık hizmetlerinden sorumlu", Responsibilities = "Sağlık kontrolü, ilk yardım, ilaç yönetimi" },
                new StaffRole { Id = 4, Name = "Yemek Görevlisi", Description = "Kamp yemek hizmetlerinden sorumlu", Responsibilities = "Yemek planlaması, hijyen kontrolü, diyet yönetimi" },
                new StaffRole { Id = 5, Name = "Güvenlik Görevlisi", Description = "Kamp güvenliğinden sorumlu", Responsibilities = "Güvenlik kontrolü, acil durum yönetimi, erişim kontrolü" }
            );
        }
    }
} 