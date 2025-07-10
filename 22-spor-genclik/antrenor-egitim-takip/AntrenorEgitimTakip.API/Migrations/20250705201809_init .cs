using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AntrenorEgitimTakip.API.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ayarlar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ayarlar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bildirimler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Okunmamis = table.Column<bool>(type: "bit", nullable: false),
                    Gecmis = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bildirimler", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EgitimKategorileri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Color = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EgitimKategorileri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Loglar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Level = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Exception = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Properties = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Loglar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PerformansKategorileri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Unit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Type = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Color = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformansKategorileri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PerformansKriterleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Weight = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformansKriterleri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Raporlar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Tamamlandi = table.Column<bool>(type: "bit", nullable: false),
                    HataVar = table.Column<bool>(type: "bit", nullable: false),
                    Sure = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Raporlar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SertifikaKategorileri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Color = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DisplayOrder = table.Column<int>(type: "int", nullable: false),
                    ValidityPeriod = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SertifikaKategorileri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sistemler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Version = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Environment = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    LastMaintenanceDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NextMaintenanceDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MaintenanceNotes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sistemler", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SistemRolleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Level = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsSystem = table.Column<bool>(type: "bit", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SistemRolleri", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Uzmanliklar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Category = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Uzmanliklar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Egitimler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    KategoriId = table.Column<int>(type: "int", nullable: false),
                    Egitmen = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    BaslangicTarihi = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BitisTarihi = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sure = table.Column<int>(type: "int", nullable: false),
                    Seviye = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Kapasite = table.Column<int>(type: "int", nullable: false),
                    KayitliKisi = table.Column<int>(type: "int", nullable: false),
                    Lokasyon = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Durum = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Gereksinimler = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Materyaller = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Notlar = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Egitimler", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Egitimler_EgitimKategorileri_KategoriId",
                        column: x => x.KategoriId,
                        principalTable: "EgitimKategorileri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SistemAyarlari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Key = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Value = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Type = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    IsEncrypted = table.Column<bool>(type: "bit", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SystemId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SistemAyarlari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SistemAyarlari_Sistemler_SystemId",
                        column: x => x.SystemId,
                        principalTable: "Sistemler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SistemLoglari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Level = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Source = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    User = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IPAddress = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    UserAgent = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Exception = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    StackTrace = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    AdditionalData = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    SystemId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SistemLoglari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SistemLoglari_Sistemler_SystemId",
                        column: x => x.SystemId,
                        principalTable: "Sistemler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SistemYetkileri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    Permission = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Resource = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Action = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsGranted = table.Column<bool>(type: "bit", nullable: false),
                    Conditions = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    GrantedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SistemYetkileri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SistemYetkileri_SistemRolleri_RoleId",
                        column: x => x.RoleId,
                        principalTable: "SistemRolleri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Department = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Position = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ProfilePhotoPath = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastLoginAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SistemRolId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_SistemRolleri_SistemRolId",
                        column: x => x.SistemRolId,
                        principalTable: "SistemRolleri",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EgitimModulleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EgitimId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Sure = table.Column<int>(type: "int", nullable: false),
                    Sira = table.Column<int>(type: "int", nullable: false),
                    Durum = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Hedefler = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Materyaller = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EgitimModulleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EgitimModulleri_Egitimler_EgitimId",
                        column: x => x.EgitimId,
                        principalTable: "Egitimler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Antrenorler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    TrainerNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    LicenseNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ExpertiseArea = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Level = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    LicenseStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LicenseEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LicenseIssuingAuthority = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Antrenorler", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Antrenorler_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SistemBildirimleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Message = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Type = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Priority = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsRead = table.Column<bool>(type: "bit", nullable: false),
                    ReadDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActionUrl = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Sender = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    AdditionalData = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SistemBildirimleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SistemBildirimleri_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sporcular",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AthleteNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    LicenseNumber = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Sport = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Category = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Level = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    LicenseStartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LicenseEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Club = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Team = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sporcular", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sporcular_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    AssignedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AssignedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EgitimIcerikleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ModulId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Tip = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DosyaYolu = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Sure = table.Column<int>(type: "int", nullable: false),
                    Sira = table.Column<int>(type: "int", nullable: false),
                    Notlar = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EgitimIcerikleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EgitimIcerikleri_EgitimModulleri_ModulId",
                        column: x => x.ModulId,
                        principalTable: "EgitimModulleri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AntrenorBilgileri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AntrenorId = table.Column<int>(type: "int", nullable: false),
                    EducationStatus = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    GraduatedSchool = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Department = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    GraduationDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Certificates = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Courses = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    References = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Hobbies = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AntrenorBilgileri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AntrenorBilgileri_Antrenorler_AntrenorId",
                        column: x => x.AntrenorId,
                        principalTable: "Antrenorler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AntrenorDeneyimler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AntrenorId = table.Column<int>(type: "int", nullable: false),
                    InstitutionName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Position = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Responsibilities = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Achievements = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ReferencePerson = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ReferencePhone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AntrenorDeneyimler", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AntrenorDeneyimler_Antrenorler_AntrenorId",
                        column: x => x.AntrenorId,
                        principalTable: "Antrenorler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AntrenorUzmanliklar",
                columns: table => new
                {
                    AntrenorId = table.Column<int>(type: "int", nullable: false),
                    UzmanlikId = table.Column<int>(type: "int", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Id = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AntrenorUzmanliklar", x => new { x.AntrenorId, x.UzmanlikId });
                    table.ForeignKey(
                        name: "FK_AntrenorUzmanliklar_Antrenorler_AntrenorId",
                        column: x => x.AntrenorId,
                        principalTable: "Antrenorler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AntrenorUzmanliklar_Uzmanliklar_UzmanlikId",
                        column: x => x.UzmanlikId,
                        principalTable: "Uzmanliklar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EgitimKayitlari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AntrenorId = table.Column<int>(type: "int", nullable: false),
                    EgitimId = table.Column<int>(type: "int", nullable: false),
                    KayitTarihi = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Durum = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    BaslangicTarihi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BitisTarihi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TamamlanmaOrani = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BasariPuani = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    BasariDurumu = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    KaydedenKisi = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EgitimKayitlari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EgitimKayitlari_Antrenorler_AntrenorId",
                        column: x => x.AntrenorId,
                        principalTable: "Antrenorler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EgitimKayitlari_Egitimler_EgitimId",
                        column: x => x.EgitimId,
                        principalTable: "Egitimler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SertifikaBasvurulari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AntrenorId = table.Column<int>(type: "int", nullable: false),
                    KategoriId = table.Column<int>(type: "int", nullable: false),
                    ApplicationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ReviewDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Reviewer = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ReviewNotes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ApprovalDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RejectionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RejectionReason = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SertifikaBasvurulari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SertifikaBasvurulari_Antrenorler_AntrenorId",
                        column: x => x.AntrenorId,
                        principalTable: "Antrenorler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SertifikaBasvurulari_SertifikaKategorileri_KategoriId",
                        column: x => x.KategoriId,
                        principalTable: "SertifikaKategorileri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sertifikalar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AntrenorId = table.Column<int>(type: "int", nullable: false),
                    KategoriId = table.Column<int>(type: "int", nullable: false),
                    CertificateNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    IssuingOrganization = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    IssueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Level = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    FilePath = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sertifikalar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sertifikalar_Antrenorler_AntrenorId",
                        column: x => x.AntrenorId,
                        principalTable: "Antrenorler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Sertifikalar_SertifikaKategorileri_KategoriId",
                        column: x => x.KategoriId,
                        principalTable: "SertifikaKategorileri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerformansGrafikleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AthleteId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    ChartType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeUnit = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DataPoints = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Configuration = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformansGrafikleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformansGrafikleri_PerformansKategorileri_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "PerformansKategorileri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PerformansGrafikleri_Sporcular_AthleteId",
                        column: x => x.AthleteId,
                        principalTable: "Sporcular",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerformansHedefleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SporcuId = table.Column<int>(type: "int", nullable: false),
                    KategoriId = table.Column<int>(type: "int", nullable: false),
                    Goal = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TargetDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TargetValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CurrentValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ActionPlan = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformansHedefleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformansHedefleri_PerformansKategorileri_KategoriId",
                        column: x => x.KategoriId,
                        principalTable: "PerformansKategorileri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PerformansHedefleri_Sporcular_SporcuId",
                        column: x => x.SporcuId,
                        principalTable: "Sporcular",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Performanslar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SporcuId = table.Column<int>(type: "int", nullable: false),
                    KategoriId = table.Column<int>(type: "int", nullable: false),
                    EvaluationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Evaluator = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Score = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Level = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Strengths = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    AreasForImprovement = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Recommendations = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    UpdatedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    AntrenorId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Performanslar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Performanslar_Antrenorler_AntrenorId",
                        column: x => x.AntrenorId,
                        principalTable: "Antrenorler",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Performanslar_PerformansKategorileri_KategoriId",
                        column: x => x.KategoriId,
                        principalTable: "PerformansKategorileri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Performanslar_Sporcular_SporcuId",
                        column: x => x.SporcuId,
                        principalTable: "Sporcular",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerformansRaporlari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AthleteId = table.Column<int>(type: "int", nullable: false),
                    ReportDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Period = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Author = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    KeyFindings = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Recommendations = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ActionItems = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformansRaporlari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformansRaporlari_Sporcular_AthleteId",
                        column: x => x.AthleteId,
                        principalTable: "Sporcular",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SporcuAntrenorler",
                columns: table => new
                {
                    SporcuId = table.Column<int>(type: "int", nullable: false),
                    AntrenorId = table.Column<int>(type: "int", nullable: false),
                    BaslangicTarihi = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BitisTarihi = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsCurrent = table.Column<bool>(type: "bit", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SporcuAntrenorler", x => new { x.SporcuId, x.AntrenorId });
                    table.ForeignKey(
                        name: "FK_SporcuAntrenorler_Antrenorler_AntrenorId",
                        column: x => x.AntrenorId,
                        principalTable: "Antrenorler",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SporcuAntrenorler_Sporcular_SporcuId",
                        column: x => x.SporcuId,
                        principalTable: "Sporcular",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SporcuBilgileri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AthleteId = table.Column<int>(type: "int", nullable: false),
                    EducationStatus = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    School = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Grade = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ParentName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ParentPhone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ParentEmail = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    EmergencyContact = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    EmergencyPhone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    MedicalHistory = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Allergies = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Medications = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SporcuBilgileri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SporcuBilgileri_Sporcular_AthleteId",
                        column: x => x.AthleteId,
                        principalTable: "Sporcular",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SporcuYarismalari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SporcuId = table.Column<int>(type: "int", nullable: false),
                    CompetitionName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CompetitionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsWinner = table.Column<bool>(type: "bit", nullable: false),
                    IsMedalist = table.Column<bool>(type: "bit", nullable: false),
                    IsRecent = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SporcuYarismalari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SporcuYarismalari_Sporcular_SporcuId",
                        column: x => x.SporcuId,
                        principalTable: "Sporcular",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EgitimDevamlar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KayitId = table.Column<int>(type: "int", nullable: false),
                    Tarih = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Katildi = table.Column<bool>(type: "bit", nullable: false),
                    GecGelis = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ErkenCikis = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Notlar = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    KaydedenKisi = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EgitimDevamlar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EgitimDevamlar_EgitimKayitlari_KayitId",
                        column: x => x.KayitId,
                        principalTable: "EgitimKayitlari",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EgitimNotlar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KayitId = table.Column<int>(type: "int", nullable: false),
                    Baslik = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Icerik = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Tip = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Yazar = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Tarih = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Onemli = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EgitimNotlar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EgitimNotlar_EgitimKayitlari_KayitId",
                        column: x => x.KayitId,
                        principalTable: "EgitimKayitlari",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EgitimTamamlamalar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KayitId = table.Column<int>(type: "int", nullable: false),
                    ModulId = table.Column<int>(type: "int", nullable: false),
                    TamamlanmaTarihi = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Puan = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Durum = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Notlar = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EgitimTamamlamalar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EgitimTamamlamalar_EgitimKayitlari_KayitId",
                        column: x => x.KayitId,
                        principalTable: "EgitimKayitlari",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EgitimTamamlamalar_EgitimModulleri_ModulId",
                        column: x => x.ModulId,
                        principalTable: "EgitimModulleri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SertifikaGecmisleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CertificateId = table.Column<int>(type: "int", nullable: false),
                    Action = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ActionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PerformedBy = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ActionType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    PreviousValue = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    NewValue = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SertifikaGecmisleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SertifikaGecmisleri_Sertifikalar_CertificateId",
                        column: x => x.CertificateId,
                        principalTable: "Sertifikalar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SertifikaGereksinimleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CertificateId = table.Column<int>(type: "int", nullable: false),
                    Requirement = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Type = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    CompletionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Evidence = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    SertifikaKategoriId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SertifikaGereksinimleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SertifikaGereksinimleri_SertifikaKategorileri_SertifikaKategoriId",
                        column: x => x.SertifikaKategoriId,
                        principalTable: "SertifikaKategorileri",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SertifikaGereksinimleri_Sertifikalar_CertificateId",
                        column: x => x.CertificateId,
                        principalTable: "Sertifikalar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SertifikaSinavlari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CertificateId = table.Column<int>(type: "int", nullable: false),
                    ExamName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    ExamDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Score = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PassingScore = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SertifikaSinavlari", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SertifikaSinavlari_Sertifikalar_CertificateId",
                        column: x => x.CertificateId,
                        principalTable: "Sertifikalar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerformansDetaylar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PerformanceId = table.Column<int>(type: "int", nullable: false),
                    CriterionId = table.Column<int>(type: "int", nullable: false),
                    Score = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Comments = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Evidence = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsSuccessful = table.Column<bool>(type: "bit", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformansDetaylar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformansDetaylar_PerformansKriterleri_CriterionId",
                        column: x => x.CriterionId,
                        principalTable: "PerformansKriterleri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PerformansDetaylar_Performanslar_PerformanceId",
                        column: x => x.PerformanceId,
                        principalTable: "Performanslar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PerformansOlcumleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PerformanceId = table.Column<int>(type: "int", nullable: false),
                    MeasurementName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Value = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Type = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformansOlcumleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformansOlcumleri_Performanslar_PerformanceId",
                        column: x => x.PerformanceId,
                        principalTable: "Performanslar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SporcuPerformanslar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SporcuId = table.Column<int>(type: "int", nullable: false),
                    PerformansId = table.Column<int>(type: "int", nullable: false),
                    IsExcellent = table.Column<bool>(type: "bit", nullable: false),
                    IsGood = table.Column<bool>(type: "bit", nullable: false),
                    IsAverage = table.Column<bool>(type: "bit", nullable: false),
                    IsBelowAverage = table.Column<bool>(type: "bit", nullable: false),
                    IsPoor = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SporcuPerformanslar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SporcuPerformanslar_Performanslar_PerformansId",
                        column: x => x.PerformansId,
                        principalTable: "Performanslar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SporcuPerformanslar_Sporcular_SporcuId",
                        column: x => x.SporcuId,
                        principalTable: "Sporcular",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "EgitimKategorileri",
                columns: new[] { "Id", "Color", "CreatedAt", "Description", "DisplayOrder", "Icon", "IsActive", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2025, 7, 5, 20, 18, 8, 659, DateTimeKind.Utc).AddTicks(8064), "Temel antrenör eğitimleri", 0, null, true, "Temel Eğitim", null },
                    { 2, null, new DateTime(2025, 7, 5, 20, 18, 8, 659, DateTimeKind.Utc).AddTicks(8068), "İleri seviye antrenör eğitimleri", 0, null, true, "İleri Seviye", null },
                    { 3, null, new DateTime(2025, 7, 5, 20, 18, 8, 659, DateTimeKind.Utc).AddTicks(8069), "Uzmanlık alanı eğitimleri", 0, null, true, "Uzmanlık", null },
                    { 4, null, new DateTime(2025, 7, 5, 20, 18, 8, 659, DateTimeKind.Utc).AddTicks(8070), "Sertifika programları", 0, null, true, "Sertifika", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AntrenorBilgileri_AntrenorId",
                table: "AntrenorBilgileri",
                column: "AntrenorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AntrenorDeneyimler_AntrenorId",
                table: "AntrenorDeneyimler",
                column: "AntrenorId");

            migrationBuilder.CreateIndex(
                name: "IX_Antrenorler_UserId",
                table: "Antrenorler",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AntrenorUzmanliklar_UzmanlikId",
                table: "AntrenorUzmanliklar",
                column: "UzmanlikId");

            migrationBuilder.CreateIndex(
                name: "IX_EgitimDevamlar_KayitId",
                table: "EgitimDevamlar",
                column: "KayitId");

            migrationBuilder.CreateIndex(
                name: "IX_EgitimIcerikleri_ModulId",
                table: "EgitimIcerikleri",
                column: "ModulId");

            migrationBuilder.CreateIndex(
                name: "IX_EgitimKayitlari_AntrenorId",
                table: "EgitimKayitlari",
                column: "AntrenorId");

            migrationBuilder.CreateIndex(
                name: "IX_EgitimKayitlari_EgitimId",
                table: "EgitimKayitlari",
                column: "EgitimId");

            migrationBuilder.CreateIndex(
                name: "IX_Egitimler_KategoriId",
                table: "Egitimler",
                column: "KategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_EgitimModulleri_EgitimId",
                table: "EgitimModulleri",
                column: "EgitimId");

            migrationBuilder.CreateIndex(
                name: "IX_EgitimNotlar_KayitId",
                table: "EgitimNotlar",
                column: "KayitId");

            migrationBuilder.CreateIndex(
                name: "IX_EgitimTamamlamalar_KayitId",
                table: "EgitimTamamlamalar",
                column: "KayitId");

            migrationBuilder.CreateIndex(
                name: "IX_EgitimTamamlamalar_ModulId",
                table: "EgitimTamamlamalar",
                column: "ModulId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformansDetaylar_CriterionId",
                table: "PerformansDetaylar",
                column: "CriterionId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformansDetaylar_PerformanceId",
                table: "PerformansDetaylar",
                column: "PerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformansGrafikleri_AthleteId",
                table: "PerformansGrafikleri",
                column: "AthleteId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformansGrafikleri_CategoryId",
                table: "PerformansGrafikleri",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformansHedefleri_KategoriId",
                table: "PerformansHedefleri",
                column: "KategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformansHedefleri_SporcuId",
                table: "PerformansHedefleri",
                column: "SporcuId");

            migrationBuilder.CreateIndex(
                name: "IX_Performanslar_AntrenorId",
                table: "Performanslar",
                column: "AntrenorId");

            migrationBuilder.CreateIndex(
                name: "IX_Performanslar_KategoriId",
                table: "Performanslar",
                column: "KategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_Performanslar_SporcuId",
                table: "Performanslar",
                column: "SporcuId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformansOlcumleri_PerformanceId",
                table: "PerformansOlcumleri",
                column: "PerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformansRaporlari_AthleteId",
                table: "PerformansRaporlari",
                column: "AthleteId");

            migrationBuilder.CreateIndex(
                name: "IX_SertifikaBasvurulari_AntrenorId",
                table: "SertifikaBasvurulari",
                column: "AntrenorId");

            migrationBuilder.CreateIndex(
                name: "IX_SertifikaBasvurulari_KategoriId",
                table: "SertifikaBasvurulari",
                column: "KategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_SertifikaGecmisleri_CertificateId",
                table: "SertifikaGecmisleri",
                column: "CertificateId");

            migrationBuilder.CreateIndex(
                name: "IX_SertifikaGereksinimleri_CertificateId",
                table: "SertifikaGereksinimleri",
                column: "CertificateId");

            migrationBuilder.CreateIndex(
                name: "IX_SertifikaGereksinimleri_SertifikaKategoriId",
                table: "SertifikaGereksinimleri",
                column: "SertifikaKategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_Sertifikalar_AntrenorId",
                table: "Sertifikalar",
                column: "AntrenorId");

            migrationBuilder.CreateIndex(
                name: "IX_Sertifikalar_KategoriId",
                table: "Sertifikalar",
                column: "KategoriId");

            migrationBuilder.CreateIndex(
                name: "IX_SertifikaSinavlari_CertificateId",
                table: "SertifikaSinavlari",
                column: "CertificateId");

            migrationBuilder.CreateIndex(
                name: "IX_SistemAyarlari_SystemId",
                table: "SistemAyarlari",
                column: "SystemId");

            migrationBuilder.CreateIndex(
                name: "IX_SistemBildirimleri_UserId",
                table: "SistemBildirimleri",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SistemLoglari_SystemId",
                table: "SistemLoglari",
                column: "SystemId");

            migrationBuilder.CreateIndex(
                name: "IX_SistemYetkileri_RoleId",
                table: "SistemYetkileri",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_SporcuAntrenorler_AntrenorId",
                table: "SporcuAntrenorler",
                column: "AntrenorId");

            migrationBuilder.CreateIndex(
                name: "IX_SporcuBilgileri_AthleteId",
                table: "SporcuBilgileri",
                column: "AthleteId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sporcular_UserId",
                table: "Sporcular",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SporcuPerformanslar_PerformansId",
                table: "SporcuPerformanslar",
                column: "PerformansId");

            migrationBuilder.CreateIndex(
                name: "IX_SporcuPerformanslar_SporcuId",
                table: "SporcuPerformanslar",
                column: "SporcuId");

            migrationBuilder.CreateIndex(
                name: "IX_SporcuYarismalari_SporcuId",
                table: "SporcuYarismalari",
                column: "SporcuId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SistemRolId",
                table: "Users",
                column: "SistemRolId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AntrenorBilgileri");

            migrationBuilder.DropTable(
                name: "AntrenorDeneyimler");

            migrationBuilder.DropTable(
                name: "AntrenorUzmanliklar");

            migrationBuilder.DropTable(
                name: "Ayarlar");

            migrationBuilder.DropTable(
                name: "Bildirimler");

            migrationBuilder.DropTable(
                name: "EgitimDevamlar");

            migrationBuilder.DropTable(
                name: "EgitimIcerikleri");

            migrationBuilder.DropTable(
                name: "EgitimNotlar");

            migrationBuilder.DropTable(
                name: "EgitimTamamlamalar");

            migrationBuilder.DropTable(
                name: "Loglar");

            migrationBuilder.DropTable(
                name: "PerformansDetaylar");

            migrationBuilder.DropTable(
                name: "PerformansGrafikleri");

            migrationBuilder.DropTable(
                name: "PerformansHedefleri");

            migrationBuilder.DropTable(
                name: "PerformansOlcumleri");

            migrationBuilder.DropTable(
                name: "PerformansRaporlari");

            migrationBuilder.DropTable(
                name: "Raporlar");

            migrationBuilder.DropTable(
                name: "SertifikaBasvurulari");

            migrationBuilder.DropTable(
                name: "SertifikaGecmisleri");

            migrationBuilder.DropTable(
                name: "SertifikaGereksinimleri");

            migrationBuilder.DropTable(
                name: "SertifikaSinavlari");

            migrationBuilder.DropTable(
                name: "SistemAyarlari");

            migrationBuilder.DropTable(
                name: "SistemBildirimleri");

            migrationBuilder.DropTable(
                name: "SistemLoglari");

            migrationBuilder.DropTable(
                name: "SistemYetkileri");

            migrationBuilder.DropTable(
                name: "SporcuAntrenorler");

            migrationBuilder.DropTable(
                name: "SporcuBilgileri");

            migrationBuilder.DropTable(
                name: "SporcuPerformanslar");

            migrationBuilder.DropTable(
                name: "SporcuYarismalari");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "Uzmanliklar");

            migrationBuilder.DropTable(
                name: "EgitimKayitlari");

            migrationBuilder.DropTable(
                name: "EgitimModulleri");

            migrationBuilder.DropTable(
                name: "PerformansKriterleri");

            migrationBuilder.DropTable(
                name: "Sertifikalar");

            migrationBuilder.DropTable(
                name: "Sistemler");

            migrationBuilder.DropTable(
                name: "Performanslar");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Egitimler");

            migrationBuilder.DropTable(
                name: "SertifikaKategorileri");

            migrationBuilder.DropTable(
                name: "Antrenorler");

            migrationBuilder.DropTable(
                name: "PerformansKategorileri");

            migrationBuilder.DropTable(
                name: "Sporcular");

            migrationBuilder.DropTable(
                name: "EgitimKategorileri");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "SistemRolleri");
        }
    }
}
