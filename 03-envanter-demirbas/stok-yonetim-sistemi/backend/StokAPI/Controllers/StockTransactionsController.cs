using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StokAPI.Data;
using StokAPI.DTOs;
using StokAPI.Models;
using System.Security.Claims;

namespace StokAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockTransactionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<StockTransactionsController> _logger;

        public StockTransactionsController(ApplicationDbContext context, ILogger<StockTransactionsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/stocktransactions
        [HttpGet]
        public async Task<ActionResult<ApiResponse<PagedResult<StockTransactionDto>>>> GetStockTransactions([FromQuery] StockTransactionFilterDto filter)
        {
            try
            {
                var query = _context.StockTransactions
                    .Include(st => st.Product)
                    .Include(st => st.User)
                    .AsQueryable();

                // Filtreleme
                if (filter.ProductId.HasValue)
                {
                    query = query.Where(st => st.ProductId == filter.ProductId.Value);
                }

                if (filter.UserId.HasValue)
                {
                    query = query.Where(st => st.UserId == filter.UserId.Value);
                }

                if (filter.Type.HasValue)
                {
                    query = query.Where(st => st.Type == filter.Type.Value);
                }

                if (filter.StartDate.HasValue)
                {
                    query = query.Where(st => st.TransactionDate >= filter.StartDate.Value);
                }

                if (filter.EndDate.HasValue)
                {
                    query = query.Where(st => st.TransactionDate <= filter.EndDate.Value);
                }

                if (!string.IsNullOrEmpty(filter.Search))
                {
                    query = query.Where(st => st.Product.Name.Contains(filter.Search) ||
                                             st.Product.Barcode.Contains(filter.Search) ||
                                             st.Description.Contains(filter.Search) ||
                                             st.Reference.Contains(filter.Search));
                }

                var totalCount = await query.CountAsync();
                var items = await query
                    .OrderByDescending(st => st.TransactionDate)
                    .Skip((filter.Page - 1) * filter.PageSize)
                    .Take(filter.PageSize)
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

                var pagedResult = new PagedResult<StockTransactionDto>
                {
                    Items = items,
                    TotalCount = totalCount,
                    Page = filter.Page,
                    PageSize = filter.PageSize
                };

                return Ok(ApiResponse<PagedResult<StockTransactionDto>>.SuccessResponse(pagedResult));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Stok işlemleri getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<PagedResult<StockTransactionDto>>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/stocktransactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<StockTransactionDto>>> GetStockTransaction(int id)
        {
            try
            {
                var stockTransaction = await _context.StockTransactions
                    .Include(st => st.Product)
                    .Include(st => st.User)
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
                    .FirstOrDefaultAsync(st => st.Id == id);

                if (stockTransaction == null)
                {
                    return NotFound(ApiResponse<StockTransactionDto>.ErrorResponse("Stok işlemi bulunamadı"));
                }

                return Ok(ApiResponse<StockTransactionDto>.SuccessResponse(stockTransaction));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Stok işlemi getirilirken hata oluştu: {TransactionId}", id);
                return StatusCode(500, ApiResponse<StockTransactionDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // POST: api/stocktransactions
        [HttpPost]
        public async Task<ActionResult<ApiResponse<StockTransactionDto>>> CreateStockTransaction(CreateStockTransactionDto createStockTransactionDto)
        {
            try
            {
                // Ürün kontrolü
                var product = await _context.Products.FindAsync(createStockTransactionDto.ProductId);
                if (product == null)
                {
                    return BadRequest(ApiResponse<StockTransactionDto>.ErrorResponse("Ürün bulunamadı"));
                }

                // Kullanıcı ID'sini JWT token'dan al
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return BadRequest(ApiResponse<StockTransactionDto>.ErrorResponse("Kullanıcı kimliği doğrulanamadı"));
                }

                // Çıkış işlemi için stok kontrolü
                if (createStockTransactionDto.Type == TransactionType.Çıkış)
                {
                    if (product.CurrentStock < createStockTransactionDto.Quantity)
                    {
                        return BadRequest(ApiResponse<StockTransactionDto>.ErrorResponse("Yetersiz stok miktarı"));
                    }
                }

                var stockBefore = product.CurrentStock;
                var stockAfter = createStockTransactionDto.Type == TransactionType.Giriş 
                    ? stockBefore + createStockTransactionDto.Quantity 
                    : stockBefore - createStockTransactionDto.Quantity;

                var stockTransaction = new StockTransaction
                {
                    ProductId = createStockTransactionDto.ProductId,
                    UserId = userId,
                    Type = createStockTransactionDto.Type,
                    Quantity = createStockTransactionDto.Quantity,
                    UnitPrice = createStockTransactionDto.UnitPrice,
                    Description = createStockTransactionDto.Description,
                    Reference = createStockTransactionDto.Reference,
                    TransactionDate = DateTime.UtcNow,
                    StockBefore = stockBefore,
                    StockAfter = stockAfter
                };

                // Ürün stoğunu güncelle
                product.CurrentStock = stockAfter;
                product.UpdatedAt = DateTime.UtcNow;

                _context.StockTransactions.Add(stockTransaction);
                await _context.SaveChangesAsync();

                // Oluşturulan işlemi detaylarıyla getir
                var createdTransaction = await _context.StockTransactions
                    .Include(st => st.Product)
                    .Include(st => st.User)
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
                    .FirstOrDefaultAsync(st => st.Id == stockTransaction.Id);

                return CreatedAtAction(nameof(GetStockTransaction), new { id = stockTransaction.Id }, 
                    ApiResponse<StockTransactionDto>.SuccessResponse(createdTransaction, "Stok işlemi başarıyla oluşturuldu"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Stok işlemi oluşturulurken hata oluştu");
                return StatusCode(500, ApiResponse<StockTransactionDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // POST: api/stocktransactions/barcode
        [HttpPost("barcode")]
        public async Task<ActionResult<ApiResponse<StockTransactionDto>>> CreateStockTransactionByBarcode(BarcodeTransactionDto barcodeTransactionDto)
        {
            try
            {
                // Barkod ile ürün bul
                var product = await _context.Products
                    .FirstOrDefaultAsync(p => p.Barcode == barcodeTransactionDto.Barcode);

                if (product == null)
                {
                    return BadRequest(ApiResponse<StockTransactionDto>.ErrorResponse("Barkod ile ürün bulunamadı"));
                }

                // CreateStockTransactionDto'ya dönüştür
                var createDto = new CreateStockTransactionDto
                {
                    ProductId = product.Id,
                    Type = barcodeTransactionDto.Type,
                    Quantity = barcodeTransactionDto.Quantity,
                    UnitPrice = barcodeTransactionDto.UnitPrice,
                    Description = barcodeTransactionDto.Description,
                    Reference = barcodeTransactionDto.Reference
                };

                // Mevcut CreateStockTransaction metodunu çağır
                return await CreateStockTransaction(createDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Barkod ile stok işlemi oluşturulurken hata oluştu");
                return StatusCode(500, ApiResponse<StockTransactionDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/stocktransactions/product/{productId}
        [HttpGet("product/{productId}")]
        public async Task<ActionResult<ApiResponse<List<StockTransactionDto>>>> GetProductTransactions(int productId)
        {
            try
            {
                var transactions = await _context.StockTransactions
                    .Include(st => st.Product)
                    .Include(st => st.User)
                    .Where(st => st.ProductId == productId)
                    .OrderByDescending(st => st.TransactionDate)
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

                return Ok(ApiResponse<List<StockTransactionDto>>.SuccessResponse(transactions));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ürün stok işlemleri getirilirken hata oluştu: {ProductId}", productId);
                return StatusCode(500, ApiResponse<List<StockTransactionDto>>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/stocktransactions/summary
        [HttpGet("summary")]
        public async Task<ActionResult<ApiResponse<object>>> GetTransactionSummary()
        {
            try
            {
                var today = DateTime.Today;
                var weekStart = today.AddDays(-(int)today.DayOfWeek);
                var monthStart = new DateTime(today.Year, today.Month, 1);

                var summary = new
                {
                    TodayTransactions = await _context.StockTransactions
                        .CountAsync(st => st.TransactionDate >= today),
                    WeekTransactions = await _context.StockTransactions
                        .CountAsync(st => st.TransactionDate >= weekStart),
                    MonthTransactions = await _context.StockTransactions
                        .CountAsync(st => st.TransactionDate >= monthStart),
                    TodayIncoming = await _context.StockTransactions
                        .Where(st => st.TransactionDate >= today && st.Type == TransactionType.Giriş)
                        .SumAsync(st => st.Quantity),
                    TodayOutgoing = await _context.StockTransactions
                        .Where(st => st.TransactionDate >= today && st.Type == TransactionType.Çıkış)
                        .SumAsync(st => st.Quantity),
                    WeekIncoming = await _context.StockTransactions
                        .Where(st => st.TransactionDate >= weekStart && st.Type == TransactionType.Giriş)
                        .SumAsync(st => st.Quantity),
                    WeekOutgoing = await _context.StockTransactions
                        .Where(st => st.TransactionDate >= weekStart && st.Type == TransactionType.Çıkış)
                        .SumAsync(st => st.Quantity)
                };

                return Ok(ApiResponse<object>.SuccessResponse(summary));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Stok işlem özeti getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }
    }
} 