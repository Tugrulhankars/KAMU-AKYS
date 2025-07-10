using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AcikVeriPortali.API.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Color = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: true),
                    ParentCategoryId = table.Column<int>(type: "integer", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_Categories_ParentCategoryId",
                        column: x => x.ParentCategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DataSetTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Color = table.Column<string>(type: "text", nullable: false),
                    UsageCount = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetTags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PortalStatistics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_DATE"),
                    TotalViews = table.Column<int>(type: "integer", nullable: false),
                    TotalDownloads = table.Column<int>(type: "integer", nullable: false),
                    TotalUsers = table.Column<int>(type: "integer", nullable: false),
                    NewRegistrations = table.Column<int>(type: "integer", nullable: false),
                    ActiveDataSets = table.Column<int>(type: "integer", nullable: false),
                    NewDataSets = table.Column<int>(type: "integer", nullable: false),
                    TopCategory = table.Column<string>(type: "text", nullable: true),
                    TopDataSet = table.Column<string>(type: "text", nullable: true),
                    AverageResponseTime = table.Column<double>(type: "double precision", nullable: false),
                    ErrorCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PortalStatistics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Role = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    LastLoginAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WebhookSubscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: false),
                    Events = table.Column<string>(type: "text", nullable: false),
                    Secret = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    LastTriggeredAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    SuccessCount = table.Column<int>(type: "integer", nullable: false),
                    FailureCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebhookSubscriptions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DataSets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Keywords = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    CreatedById = table.Column<int>(type: "integer", nullable: false),
                    FilePath = table.Column<string>(type: "text", nullable: true),
                    FileFormat = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    DownloadCount = table.Column<int>(type: "integer", nullable: false),
                    ViewCount = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    PublishedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastUpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    License = table.Column<string>(type: "text", nullable: true),
                    Source = table.Column<string>(type: "text", nullable: true),
                    ContactEmail = table.Column<string>(type: "text", nullable: true),
                    UpdateFrequency = table.Column<string>(type: "text", nullable: true),
                    NextUpdateDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CurrentVersion = table.Column<string>(type: "text", nullable: true),
                    AverageRating = table.Column<double>(type: "double precision", nullable: true),
                    RatingCount = table.Column<int>(type: "integer", nullable: false),
                    IsFeatured = table.Column<bool>(type: "boolean", nullable: false),
                    IsPublic = table.Column<bool>(type: "boolean", nullable: false),
                    AccessLevel = table.Column<string>(type: "text", nullable: true),
                    GeographicCoverage = table.Column<string>(type: "text", nullable: true),
                    TemporalCoverage = table.Column<string>(type: "text", nullable: true),
                    DataLanguage = table.Column<string>(type: "text", nullable: true),
                    CoordinateSystem = table.Column<string>(type: "text", nullable: true),
                    DataQualityScore = table.Column<string>(type: "text", nullable: true),
                    TechnicalSpecifications = table.Column<string>(type: "text", nullable: true),
                    RelatedDataSets = table.Column<string>(type: "text", nullable: true),
                    ExternalLinks = table.Column<string>(type: "text", nullable: true),
                    Citation = table.Column<string>(type: "text", nullable: true),
                    DOI = table.Column<string>(type: "text", nullable: true),
                    IsMachineReadable = table.Column<bool>(type: "boolean", nullable: false),
                    IsOpenFormat = table.Column<bool>(type: "boolean", nullable: false),
                    APIEndpoint = table.Column<string>(type: "text", nullable: true),
                    PreviewData = table.Column<string>(type: "text", nullable: true),
                    DataDictionary = table.Column<string>(type: "text", nullable: true),
                    ChangeLog = table.Column<string>(type: "text", nullable: true),
                    UsageExamples = table.Column<string>(type: "text", nullable: true),
                    DataLineage = table.Column<string>(type: "text", nullable: true),
                    ComplianceInfo = table.Column<string>(type: "text", nullable: true),
                    SecurityClassification = table.Column<string>(type: "text", nullable: true),
                    DataCollectionStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DataCollectionEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    DataCollectionMethod = table.Column<string>(type: "text", nullable: true),
                    SamplingMethod = table.Column<string>(type: "text", nullable: true),
                    SampleSize = table.Column<int>(type: "integer", nullable: true),
                    ConfidenceLevel = table.Column<string>(type: "text", nullable: true),
                    MarginOfError = table.Column<string>(type: "text", nullable: true),
                    Limitations = table.Column<string>(type: "text", nullable: true),
                    Disclaimers = table.Column<string>(type: "text", nullable: true),
                    Acknowledgments = table.Column<string>(type: "text", nullable: true),
                    FundingSource = table.Column<string>(type: "text", nullable: true),
                    ProjectCode = table.Column<string>(type: "text", nullable: true),
                    Department = table.Column<string>(type: "text", nullable: true),
                    ResponsiblePerson = table.Column<string>(type: "text", nullable: true),
                    BackupLocation = table.Column<string>(type: "text", nullable: true),
                    RetentionPolicy = table.Column<string>(type: "text", nullable: true),
                    RetentionEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsBackedUp = table.Column<bool>(type: "boolean", nullable: false),
                    LastBackupDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    BackupStatus = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSets_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DataSets_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    ActionUrl = table.Column<string>(type: "text", nullable: true),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    ReadAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserActivities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Action = table.Column<string>(type: "text", nullable: false),
                    Details = table.Column<string>(type: "text", nullable: true),
                    UserIp = table.Column<string>(type: "text", nullable: true),
                    UserAgent = table.Column<string>(type: "text", nullable: true),
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    SessionId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserActivities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserActivities_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WebhookLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    WebhookSubscriptionId = table.Column<int>(type: "integer", nullable: false),
                    Event = table.Column<string>(type: "text", nullable: false),
                    Payload = table.Column<string>(type: "text", nullable: false),
                    StatusCode = table.Column<int>(type: "integer", nullable: false),
                    Response = table.Column<string>(type: "text", nullable: true),
                    IsSuccess = table.Column<bool>(type: "boolean", nullable: false),
                    TriggeredAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    ResponseTimeMs = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebhookLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WebhookLogs_WebhookSubscriptions_WebhookSubscriptionId",
                        column: x => x.WebhookSubscriptionId,
                        principalTable: "WebhookSubscriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataQualityReports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    CheckedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    TotalRecords = table.Column<int>(type: "integer", nullable: false),
                    ValidRecords = table.Column<int>(type: "integer", nullable: false),
                    InvalidRecords = table.Column<int>(type: "integer", nullable: false),
                    CompletenessScore = table.Column<double>(type: "double precision", nullable: false),
                    AccuracyScore = table.Column<double>(type: "double precision", nullable: false),
                    ConsistencyScore = table.Column<double>(type: "double precision", nullable: false),
                    TimelinessScore = table.Column<double>(type: "double precision", nullable: false),
                    OverallScore = table.Column<double>(type: "double precision", nullable: false),
                    Issues = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataQualityReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataQualityReports_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataSetAccessLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    AccessType = table.Column<string>(type: "text", nullable: false),
                    UserIp = table.Column<string>(type: "text", nullable: true),
                    UserAgent = table.Column<string>(type: "text", nullable: true),
                    Referrer = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: true),
                    Organization = table.Column<string>(type: "text", nullable: true),
                    AccessedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    ResponseTimeMs = table.Column<double>(type: "double precision", nullable: false),
                    StatusCode = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetAccessLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetAccessLogs_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DataSetAccessLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "DataSetComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: false),
                    ParentCommentId = table.Column<int>(type: "integer", nullable: true),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetComments_DataSetComments_ParentCommentId",
                        column: x => x.ParentCommentId,
                        principalTable: "DataSetComments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DataSetComments_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DataSetComments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DataSetDataSetTag",
                columns: table => new
                {
                    DataSetsId = table.Column<int>(type: "integer", nullable: false),
                    TagsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetDataSetTag", x => new { x.DataSetsId, x.TagsId });
                    table.ForeignKey(
                        name: "FK_DataSetDataSetTag_DataSetTags_TagsId",
                        column: x => x.TagsId,
                        principalTable: "DataSetTags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DataSetDataSetTag_DataSets_DataSetsId",
                        column: x => x.DataSetsId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataSetDownloads",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    UserIp = table.Column<string>(type: "text", nullable: true),
                    UserAgent = table.Column<string>(type: "text", nullable: true),
                    DownloadedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetDownloads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetDownloads_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DataSetDownloads_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateTable(
                name: "DataSetExports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    RequestedById = table.Column<int>(type: "integer", nullable: false),
                    ExportFormat = table.Column<string>(type: "text", nullable: false),
                    Filters = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    FilePath = table.Column<string>(type: "text", nullable: true),
                    FileSize = table.Column<long>(type: "bigint", nullable: true),
                    RequestedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ErrorMessage = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetExports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetExports_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DataSetExports_Users_RequestedById",
                        column: x => x.RequestedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DataSetMetadata",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    Key = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    DataType = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetMetadata", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetMetadata_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataSetSchemas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    ColumnName = table.Column<string>(type: "text", nullable: false),
                    DataType = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    IsRequired = table.Column<bool>(type: "boolean", nullable: false),
                    DefaultValue = table.Column<string>(type: "text", nullable: true),
                    ValidationRules = table.Column<string>(type: "text", nullable: true),
                    OrderIndex = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetSchemas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetSchemas_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataSetStatistics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_DATE"),
                    ViewCount = table.Column<int>(type: "integer", nullable: false),
                    DownloadCount = table.Column<int>(type: "integer", nullable: false),
                    UniqueVisitors = table.Column<int>(type: "integer", nullable: false),
                    TopReferrer = table.Column<string>(type: "text", nullable: true),
                    TopUserAgent = table.Column<string>(type: "text", nullable: true),
                    TopCountry = table.Column<string>(type: "text", nullable: true),
                    TopCity = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetStatistics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetStatistics_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataSetSubscriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    NotificationType = table.Column<string>(type: "text", nullable: false),
                    Frequency = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    LastNotifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetSubscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetSubscriptions_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DataSetSubscriptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DataSetVersions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    Version = table.Column<string>(type: "text", nullable: false),
                    Changelog = table.Column<string>(type: "text", nullable: true),
                    FilePath = table.Column<string>(type: "text", nullable: true),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    FileFormat = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    CreatedById = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetVersions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetVersions_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DataSetVersions_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DataSetViews",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    DataSetId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    UserIp = table.Column<string>(type: "text", nullable: true),
                    UserAgent = table.Column<string>(type: "text", nullable: true),
                    Referrer = table.Column<string>(type: "text", nullable: true),
                    ViewedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DataSetViews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DataSetViews_DataSets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "DataSets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DataSetViews_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "CreatedAt", "Description", "Icon", "IsActive", "Name", "ParentCategoryId", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "#28a745", new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3929), "Ekonomik veriler ve istatistikler", null, true, "Ekonomi", null, new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3929) },
                    { 2, "#dc3545", new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3932), "Sağlık verileri ve istatistikler", null, true, "Sağlık", null, new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3933) },
                    { 3, "#007bff", new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3934), "Eğitim verileri ve istatistikler", null, true, "Eğitim", null, new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3935) },
                    { 4, "#ffc107", new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3936), "Ulaştırma verileri ve istatistikler", null, true, "Ulaştırma", null, new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3937) },
                    { 5, "#20c997", new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3939), "Çevre verileri ve istatistikler", null, true, "Çevre", null, new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3939) }
                });

            migrationBuilder.InsertData(
                table: "DataSetTags",
                columns: new[] { "Id", "Color", "CreatedAt", "Description", "Name", "UsageCount" },
                values: new object[,]
                {
                    { 1, "#17a2b8", new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(4003), "Açık veri standartlarına uygun veriler", "Açık Veri", 0 },
                    { 2, "#fd7e14", new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(4005), "Gerçek zamanlı güncellenen veriler", "Gerçek Zamanlı", 0 },
                    { 3, "#6f42c1", new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(4007), "Coğrafi bilgi içeren veriler", "Coğrafi", 0 },
                    { 4, "#e83e8c", new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(4008), "İstatistiksel analiz verileri", "İstatistik", 0 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FirstName", "IsActive", "LastLoginAt", "LastName", "PasswordHash", "Role" },
                values: new object[] { 1, new DateTime(2025, 7, 7, 10, 11, 11, 798, DateTimeKind.Utc).AddTicks(3143), "admin@acikveri.gov.tr", "Admin", true, null, "User", "$2a$11$uQgvUB5b/rSpiw3TKOvfO.E7iFH4EKnyBdIe037AlADNZSbtJgOYu", "Admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_Name",
                table: "Categories",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ParentCategoryId",
                table: "Categories",
                column: "ParentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_DataQualityReports_CheckedAt",
                table: "DataQualityReports",
                column: "CheckedAt");

            migrationBuilder.CreateIndex(
                name: "IX_DataQualityReports_DataSetId",
                table: "DataQualityReports",
                column: "DataSetId");

            migrationBuilder.CreateIndex(
                name: "IX_DataQualityReports_Status",
                table: "DataQualityReports",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetAccessLogs_AccessedAt",
                table: "DataSetAccessLogs",
                column: "AccessedAt");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetAccessLogs_AccessType",
                table: "DataSetAccessLogs",
                column: "AccessType");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetAccessLogs_DataSetId",
                table: "DataSetAccessLogs",
                column: "DataSetId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetAccessLogs_UserId",
                table: "DataSetAccessLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetComments_CreatedAt",
                table: "DataSetComments",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetComments_DataSetId",
                table: "DataSetComments",
                column: "DataSetId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetComments_IsApproved",
                table: "DataSetComments",
                column: "IsApproved");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetComments_ParentCommentId",
                table: "DataSetComments",
                column: "ParentCommentId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetComments_UserId",
                table: "DataSetComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetDataSetTag_TagsId",
                table: "DataSetDataSetTag",
                column: "TagsId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetDownloads_DataSetId",
                table: "DataSetDownloads",
                column: "DataSetId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetDownloads_DownloadedAt",
                table: "DataSetDownloads",
                column: "DownloadedAt");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetDownloads_UserId",
                table: "DataSetDownloads",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetExports_DataSetId",
                table: "DataSetExports",
                column: "DataSetId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetExports_RequestedAt",
                table: "DataSetExports",
                column: "RequestedAt");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetExports_RequestedById",
                table: "DataSetExports",
                column: "RequestedById");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetExports_Status",
                table: "DataSetExports",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetMetadata_DataSetId_Key",
                table: "DataSetMetadata",
                columns: new[] { "DataSetId", "Key" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_AccessLevel",
                table: "DataSets",
                column: "AccessLevel");

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_CategoryId",
                table: "DataSets",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_CreatedAt",
                table: "DataSets",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_CreatedById",
                table: "DataSets",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_DOI",
                table: "DataSets",
                column: "DOI",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_IsFeatured",
                table: "DataSets",
                column: "IsFeatured");

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_IsPublic",
                table: "DataSets",
                column: "IsPublic");

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_Status",
                table: "DataSets",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_DataSets_Title",
                table: "DataSets",
                column: "Title");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetSchemas_DataSetId_ColumnName",
                table: "DataSetSchemas",
                columns: new[] { "DataSetId", "ColumnName" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DataSetStatistics_DataSetId_Date",
                table: "DataSetStatistics",
                columns: new[] { "DataSetId", "Date" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DataSetStatistics_Date",
                table: "DataSetStatistics",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetSubscriptions_DataSetId_UserId",
                table: "DataSetSubscriptions",
                columns: new[] { "DataSetId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DataSetSubscriptions_UserId",
                table: "DataSetSubscriptions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetTags_Name",
                table: "DataSetTags",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DataSetTags_UsageCount",
                table: "DataSetTags",
                column: "UsageCount");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetVersions_CreatedById",
                table: "DataSetVersions",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetVersions_DataSetId_Version",
                table: "DataSetVersions",
                columns: new[] { "DataSetId", "Version" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DataSetViews_DataSetId",
                table: "DataSetViews",
                column: "DataSetId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetViews_UserId",
                table: "DataSetViews",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DataSetViews_ViewedAt",
                table: "DataSetViews",
                column: "ViewedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_CreatedAt",
                table: "Notifications",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_IsRead",
                table: "Notifications",
                column: "IsRead");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_Type",
                table: "Notifications",
                column: "Type");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PortalStatistics_Date",
                table: "PortalStatistics",
                column: "Date",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserActivities_Action",
                table: "UserActivities",
                column: "Action");

            migrationBuilder.CreateIndex(
                name: "IX_UserActivities_SessionId",
                table: "UserActivities",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_UserActivities_Timestamp",
                table: "UserActivities",
                column: "Timestamp");

            migrationBuilder.CreateIndex(
                name: "IX_UserActivities_UserId",
                table: "UserActivities",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WebhookLogs_IsSuccess",
                table: "WebhookLogs",
                column: "IsSuccess");

            migrationBuilder.CreateIndex(
                name: "IX_WebhookLogs_TriggeredAt",
                table: "WebhookLogs",
                column: "TriggeredAt");

            migrationBuilder.CreateIndex(
                name: "IX_WebhookLogs_WebhookSubscriptionId",
                table: "WebhookLogs",
                column: "WebhookSubscriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_WebhookSubscriptions_IsActive",
                table: "WebhookSubscriptions",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_WebhookSubscriptions_Url",
                table: "WebhookSubscriptions",
                column: "Url");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DataQualityReports");

            migrationBuilder.DropTable(
                name: "DataSetAccessLogs");

            migrationBuilder.DropTable(
                name: "DataSetComments");

            migrationBuilder.DropTable(
                name: "DataSetDataSetTag");

            migrationBuilder.DropTable(
                name: "DataSetDownloads");

            migrationBuilder.DropTable(
                name: "DataSetExports");

            migrationBuilder.DropTable(
                name: "DataSetMetadata");

            migrationBuilder.DropTable(
                name: "DataSetSchemas");

            migrationBuilder.DropTable(
                name: "DataSetStatistics");

            migrationBuilder.DropTable(
                name: "DataSetSubscriptions");

            migrationBuilder.DropTable(
                name: "DataSetVersions");

            migrationBuilder.DropTable(
                name: "DataSetViews");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "PortalStatistics");

            migrationBuilder.DropTable(
                name: "UserActivities");

            migrationBuilder.DropTable(
                name: "WebhookLogs");

            migrationBuilder.DropTable(
                name: "DataSetTags");

            migrationBuilder.DropTable(
                name: "DataSets");

            migrationBuilder.DropTable(
                name: "WebhookSubscriptions");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
