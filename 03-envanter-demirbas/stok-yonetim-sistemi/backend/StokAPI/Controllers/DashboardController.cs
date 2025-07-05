using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StokAPI.Data;
using StokAPI.DTOs;
using StokAPI.Models;

namespace StokAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<DashboardController> _logger;

        public DashboardController(ApplicationDbContext context, ILogger<DashboardController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/dashboard/stats
        [HttpGet("stats")]
        public async Task<ActionResult<ApiResponse<DashboardStatsDto>>> GetDashboardStats()
        {
            try
            {
                var today = DateTime.Today;

                // Temel istatistikler
                var totalProducts = await _context.Products.CountAsync(p => p.IsActive);
                var totalCategories = await _context.Categories.CountAsync(c => c.IsActive);
                var totalUsers = await _context.Users.CountAsync(u => u.IsActive);
                var criticalStockCount = await _context.Products
                    .CountAsync(p => p.IsActive && p.CurrentStock <= p.MinStockLevel);

                // Bugünkü işlemler
                var todayTransactions = await _context.StockTransactions
                    .CountAsync(st => st.TransactionDate >= today);

                // Bu haftaki giriş/çıkış işlemleri
                var weekStart = today.AddDays(-(int)today.DayOfWeek);
                var weeklyTransactionsIn = await _context.StockTransactions
                    .Where(st => st.TransactionDate >= weekStart && st.Type == TransactionType.Giriş)
                    .SumAsync(st => st.Quantity);

                var weeklyTransactionsOut = await _context.StockTransactions
                    .Where(st => st.TransactionDate >= weekStart && st.Type == TransactionType.Çıkış)
                    .SumAsync(st => st.Quantity);

                // Kritik stok ürünleri (en fazla 10 adet)
                var criticalStockProducts = await _context.Products
                    .Include(p => p.Category)
                    .Where(p => p.IsActive && p.CurrentStock <= p.MinStockLevel)
                    .OrderBy(p => p.CurrentStock)
                    .Take(10)
                    .Select(p => new ProductDto
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        Barcode = p.Barcode,
                        Type = p.Type,
                        CategoryId = p.CategoryId,
                        CategoryName = p.Category.Name,
                        UnitPrice = p.UnitPrice,
                        Unit = p.Unit,
                        CurrentStock = p.CurrentStock,
                        MinStockLevel = p.MinStockLevel,
                        IsActive = p.IsActive,
                        CreatedAt = p.CreatedAt,
                        UpdatedAt = p.UpdatedAt
                    })
                    .ToListAsync();

                // Son işlemler (en fazla 10 adet)
                var recentTransactions = await _context.StockTransactions
                    .Include(st => st.Product)
                    .Include(st => st.User)
                    .OrderByDescending(st => st.TransactionDate)
                    .Take(10)
                    .Select(st => new StockTransactionDto
                    {
                        Id = st.Id,
                        ProductId = st.ProductId,
                        ProductName = st.Product.Name,
                        ProductBarcode = st.Product.Barcode,
                        UserId = st.UserId,
                        UserName = st.User.FirstName + " " + st.User.LastName,
                        Type = st.Type,
                        Quantity = st.Quantity,
                        UnitPrice = st.UnitPrice,
                        Description = st.Description,
                        Reference = st.Reference,
                        TransactionDate = st.TransactionDate,
                        StockBefore = st.StockBefore,
                        StockAfter = st.StockAfter
                    })
                    .ToListAsync();

                var dashboardStats = new DashboardStatsDto
                {
                    TotalProducts = totalProducts,
                    TotalCategories = totalCategories,
                    CriticalStockCount = criticalStockCount,
                    TotalUsers = totalUsers,
                    TodayTransactions = todayTransactions,
                    WeeklyTransactionsIn = weeklyTransactionsIn,
                    WeeklyTransactionsOut = weeklyTransactionsOut,
                    CriticalStockProducts = criticalStockProducts,
                    RecentTransactions = recentTransactions
                };

                return Ok(ApiResponse<DashboardStatsDto>.SuccessResponse(dashboardStats));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Dashboard istatistikleri getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<DashboardStatsDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/dashboard/monthly-transactions
        [HttpGet("monthly-transactions")]
        public async Task<ActionResult<ApiResponse<object>>> GetMonthlyTransactions()
        {
            try
            {
                var currentDate = DateTime.Now;
                var monthlyData = new List<object>();

                // Son 12 ayın verilerini getir
                for (int i = 11; i >= 0; i--)
                {
                    var targetDate = currentDate.AddMonths(-i);
                    var monthStart = new DateTime(targetDate.Year, targetDate.Month, 1);
                    var monthEnd = monthStart.AddMonths(1).AddDays(-1);

                    var incomingTransactions = await _context.StockTransactions
                        .Where(st => st.TransactionDate >= monthStart && 
                                   st.TransactionDate <= monthEnd && 
                                   st.Type == TransactionType.Giriş)
                        .SumAsync(st => st.Quantity);

                    var outgoingTransactions = await _context.StockTransactions
                        .Where(st => st.TransactionDate >= monthStart && 
                                   st.TransactionDate <= monthEnd && 
                                   st.Type == TransactionType.Çıkış)
                        .SumAsync(st => st.Quantity);

                    monthlyData.Add(new
                    {
                        Month = targetDate.ToString("yyyy-MM"),
                        MonthName = targetDate.ToString("MMMM yyyy"),
                        Incoming = incomingTransactions,
                        Outgoing = outgoingTransactions,
                        Net = incomingTransactions - outgoingTransactions
                    });
                }

                return Ok(ApiResponse<object>.SuccessResponse(monthlyData));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Aylık işlem verileri getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/dashboard/category-distribution
        [HttpGet("category-distribution")]
        public async Task<ActionResult<ApiResponse<object>>> GetCategoryDistribution()
        {
            try
            {
                var categoryDistribution = await _context.Categories
                    .Where(c => c.IsActive)
                    .Select(c => new
                    {
                        CategoryName = c.Name,
                        ProductCount = c.Products.Count(p => p.IsActive),
                        TotalStock = c.Products.Where(p => p.IsActive).Sum(p => p.CurrentStock),
                        CriticalStockCount = c.Products.Count(p => p.IsActive && p.CurrentStock <= p.MinStockLevel)
                    })
                    .Where(c => c.ProductCount > 0)
                    .OrderByDescending(c => c.ProductCount)
                    .ToListAsync();

                return Ok(ApiResponse<object>.SuccessResponse(categoryDistribution));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kategori dağılımı getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/dashboard/low-stock-alerts
        [HttpGet("low-stock-alerts")]
        public async Task<ActionResult<ApiResponse<List<ProductDto>>>> GetLowStockAlerts()
        {
            try
            {
                var lowStockProducts = await _context.Products
                    .Include(p => p.Category)
                    .Where(p => p.IsActive && p.CurrentStock <= p.MinStockLevel)
                    .OrderBy(p => p.CurrentStock)
                    .Select(p => new ProductDto
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Description = p.Description,
                        Barcode = p.Barcode,
                        Type = p.Type,
                        CategoryId = p.CategoryId,
                        CategoryName = p.Category.Name,
                        UnitPrice = p.UnitPrice,
                        Unit = p.Unit,
                        CurrentStock = p.CurrentStock,
                        MinStockLevel = p.MinStockLevel,
                        IsActive = p.IsActive,
                        CreatedAt = p.CreatedAt,
                        UpdatedAt = p.UpdatedAt
                    })
                    .ToListAsync();

                return Ok(ApiResponse<List<ProductDto>>.SuccessResponse(lowStockProducts));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Düşük stok uyarıları getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<List<ProductDto>>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/dashboard/recent-activities
        [HttpGet("recent-activities")]
        public async Task<ActionResult<ApiResponse<List<StockTransactionDto>>>> GetRecentActivities([FromQuery] int count = 20)
        {
            try
            {
                var recentActivities = await _context.StockTransactions
                    .Include(st => st.Product)
                    .Include(st => st.User)
                    .OrderByDescending(st => st.TransactionDate)
                    .Take(count)
                    .Select(st => new StockTransactionDto
                    {
                        Id = st.Id,
                        ProductId = st.ProductId,
                        ProductName = st.Product.Name,
                        ProductBarcode = st.Product.Barcode,
                        UserId = st.UserId,
                        UserName = st.User.FirstName + " " + st.User.LastName,
                        Type = st.Type,
                        Quantity = st.Quantity,
                        UnitPrice = st.UnitPrice,
                        Description = st.Description,
                        Reference = st.Reference,
                        TransactionDate = st.TransactionDate,
                        StockBefore = st.StockBefore,
                        StockAfter = st.StockAfter
                    })
                    .ToListAsync();

                return Ok(ApiResponse<List<StockTransactionDto>>.SuccessResponse(recentActivities));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Son aktiviteler getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<List<StockTransactionDto>>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }
    }
} 