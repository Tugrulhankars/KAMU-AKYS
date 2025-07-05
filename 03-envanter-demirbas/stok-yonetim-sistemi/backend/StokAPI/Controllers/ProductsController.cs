using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StokAPI.Data;
using StokAPI.DTOs;
using StokAPI.Models;

namespace StokAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(ApplicationDbContext context, ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<ApiResponse<PagedResult<ProductDto>>>> GetProducts([FromQuery] ProductFilterDto filter)
        {
            try
            {
                var query = _context.Products
                    .Include(p => p.Category)
                    .AsQueryable();

                // Filtreleme
                if (!string.IsNullOrEmpty(filter.Search))
                {
                    query = query.Where(p => p.Name.Contains(filter.Search) || 
                                           p.Description.Contains(filter.Search) ||
                                           p.Barcode.Contains(filter.Search));
                }

                if (filter.CategoryId.HasValue)
                {
                    query = query.Where(p => p.CategoryId == filter.CategoryId.Value);
                }

                if (filter.Type.HasValue)
                {
                    query = query.Where(p => p.Type == filter.Type.Value);
                }

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(p => p.IsActive == filter.IsActive.Value);
                }

                if (filter.IsCriticalStock.HasValue && filter.IsCriticalStock.Value)
                {
                    query = query.Where(p => p.CurrentStock <= p.MinStockLevel);
                }

                // Sıralama
                string sortBy = filter.SortBy?.ToLower() ?? "name";
                bool desc = (filter.SortDir?.ToLower() == "desc");
                switch (sortBy)
                {
                    case "currentstock":
                        query = desc ? query.OrderByDescending(p => p.CurrentStock) : query.OrderBy(p => p.CurrentStock);
                        break;
                    case "unitprice":
                        query = desc ? query.OrderByDescending(p => p.UnitPrice) : query.OrderBy(p => p.UnitPrice);
                        break;
                    case "createdat":
                        query = desc ? query.OrderByDescending(p => p.CreatedAt) : query.OrderBy(p => p.CreatedAt);
                        break;
                    default:
                        query = desc ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name);
                        break;
                }

                var totalCount = await query.CountAsync();
                var items = await query
                    .Skip((filter.Page - 1) * filter.PageSize)
                    .Take(filter.PageSize)
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

                var pagedResult = new PagedResult<ProductDto>
                {
                    Items = items,
                    TotalCount = totalCount,
                    Page = filter.Page,
                    PageSize = filter.PageSize
                };

                return Ok(ApiResponse<PagedResult<ProductDto>>.SuccessResponse(pagedResult));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ürün listesi getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<PagedResult<ProductDto>>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<ProductDto>>> GetProduct(int id)
        {
            try
            {
                var product = await _context.Products
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (product == null)
                {
                    return NotFound(ApiResponse<ProductDto>.ErrorResponse("Ürün bulunamadı"));
                }

                var productDto = new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Barcode = product.Barcode,
                    Type = product.Type,
                    CategoryId = product.CategoryId,
                    CategoryName = product.Category.Name,
                    UnitPrice = product.UnitPrice,
                    Unit = product.Unit,
                    CurrentStock = product.CurrentStock,
                    MinStockLevel = product.MinStockLevel,
                    IsActive = product.IsActive,
                    CreatedAt = product.CreatedAt,
                    UpdatedAt = product.UpdatedAt
                };

                return Ok(ApiResponse<ProductDto>.SuccessResponse(productDto));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ürün getirilirken hata oluştu: {ProductId}", id);
                return StatusCode(500, ApiResponse<ProductDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<ApiResponse<ProductDto>>> CreateProduct(CreateProductDto createProductDto)
        {
            try
            {
                // Kategori kontrolü
                var category = await _context.Categories.FindAsync(createProductDto.CategoryId);
                if (category == null)
                {
                    return BadRequest(ApiResponse<ProductDto>.ErrorResponse("Geçersiz kategori"));
                }

                // Barkod kontrolü
                if (!string.IsNullOrEmpty(createProductDto.Barcode))
                {
                    var existingProduct = await _context.Products
                        .FirstOrDefaultAsync(p => p.Barcode == createProductDto.Barcode);
                    if (existingProduct != null)
                    {
                        return BadRequest(ApiResponse<ProductDto>.ErrorResponse("Bu barkod zaten kullanılıyor"));
                    }
                }

                var product = new Product
                {
                    Name = createProductDto.Name,
                    Description = createProductDto.Description,
                    Barcode = createProductDto.Barcode,
                    Type = createProductDto.Type,
                    CategoryId = createProductDto.CategoryId,
                    UnitPrice = createProductDto.UnitPrice,
                    Unit = createProductDto.Unit,
                    CurrentStock = createProductDto.CurrentStock,
                    MinStockLevel = createProductDto.MinStockLevel,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                // Ürün oluşturuldu, kategori ile birlikte getir
                var createdProduct = await _context.Products
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == product.Id);

                var productDto = new ProductDto
                {
                    Id = createdProduct.Id,
                    Name = createdProduct.Name,
                    Description = createdProduct.Description,
                    Barcode = createdProduct.Barcode,
                    Type = createdProduct.Type,
                    CategoryId = createdProduct.CategoryId,
                    CategoryName = createdProduct.Category.Name,
                    UnitPrice = createdProduct.UnitPrice,
                    Unit = createdProduct.Unit,
                    CurrentStock = createdProduct.CurrentStock,
                    MinStockLevel = createdProduct.MinStockLevel,
                    IsActive = createdProduct.IsActive,
                    CreatedAt = createdProduct.CreatedAt,
                    UpdatedAt = createdProduct.UpdatedAt
                };

                return CreatedAtAction(nameof(GetProduct), new { id = productDto.Id }, 
                    ApiResponse<ProductDto>.SuccessResponse(productDto));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ürün oluşturulurken hata oluştu");
                return StatusCode(500, ApiResponse<ProductDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // PUT: api/products/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<ProductDto>>> UpdateProduct(int id, UpdateProductDto updateProductDto)
        {
            try
            {
                var product = await _context.Products
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (product == null)
                {
                    return NotFound(ApiResponse<ProductDto>.ErrorResponse("Ürün bulunamadı"));
                }

                // Kategori kontrolü
                var category = await _context.Categories.FindAsync(updateProductDto.CategoryId);
                if (category == null)
                {
                    return BadRequest(ApiResponse<ProductDto>.ErrorResponse("Geçersiz kategori"));
                }

                // Barkod kontrolü
                if (!string.IsNullOrEmpty(updateProductDto.Barcode))
                {
                    var existingProduct = await _context.Products
                        .FirstOrDefaultAsync(p => p.Barcode == updateProductDto.Barcode && p.Id != id);
                    if (existingProduct != null)
                    {
                        return BadRequest(ApiResponse<ProductDto>.ErrorResponse("Bu barkod zaten kullanılıyor"));
                    }
                }

                product.Name = updateProductDto.Name;
                product.Description = updateProductDto.Description;
                product.Barcode = updateProductDto.Barcode;
                product.Type = updateProductDto.Type;
                product.CategoryId = updateProductDto.CategoryId;
                product.UnitPrice = updateProductDto.UnitPrice;
                product.Unit = updateProductDto.Unit;
                product.MinStockLevel = updateProductDto.MinStockLevel;
                product.IsActive = updateProductDto.IsActive;
                product.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                var productDto = new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Barcode = product.Barcode,
                    Type = product.Type,
                    CategoryId = product.CategoryId,
                    CategoryName = product.Category.Name,
                    UnitPrice = product.UnitPrice,
                    Unit = product.Unit,
                    CurrentStock = product.CurrentStock,
                    MinStockLevel = product.MinStockLevel,
                    IsActive = product.IsActive,
                    CreatedAt = product.CreatedAt,
                    UpdatedAt = product.UpdatedAt
                };

                return Ok(ApiResponse<ProductDto>.SuccessResponse(productDto));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ürün güncellenirken hata oluştu: {ProductId}", id);
                return StatusCode(500, ApiResponse<ProductDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteProduct(int id)
        {
            try
            {
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound(ApiResponse<bool>.ErrorResponse("Ürün bulunamadı"));
                }

                // Stok işlemleri kontrolü
                var hasTransactions = await _context.StockTransactions.AnyAsync(st => st.ProductId == id);
                if (hasTransactions)
                {
                    return BadRequest(ApiResponse<bool>.ErrorResponse("Bu ürünün stok işlemleri bulunduğu için silinemez"));
                }

                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<bool>.SuccessResponse(true));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ürün silinirken hata oluştu: {ProductId}", id);
                return StatusCode(500, ApiResponse<bool>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/products/critical-stock
        [HttpGet("critical-stock")]
        public async Task<ActionResult<ApiResponse<List<ProductDto>>>> GetCriticalStockProducts()
        {
            try
            {
                var products = await _context.Products
                    .Include(p => p.Category)
                    .Where(p => p.CurrentStock <= p.MinStockLevel && p.IsActive)
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

                return Ok(ApiResponse<List<ProductDto>>.SuccessResponse(products));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kritik stok ürünleri getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<List<ProductDto>>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // POST: api/products/5/update-stock
        [HttpPost("{id}/update-stock")]
        public async Task<ActionResult<ApiResponse<ProductDto>>> UpdateStock(int id, [FromBody] UpdateStockDto updateStockDto)
        {
            try
            {
                var product = await _context.Products
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (product == null)
                {
                    return NotFound(ApiResponse<ProductDto>.ErrorResponse("Ürün bulunamadı"));
                }

                if (updateStockDto.Quantity < 0)
                {
                    return BadRequest(ApiResponse<ProductDto>.ErrorResponse("Stok miktarı negatif olamaz"));
                }

                product.CurrentStock = updateStockDto.Quantity;
                product.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                var productDto = new ProductDto
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Barcode = product.Barcode,
                    Type = product.Type,
                    CategoryId = product.CategoryId,
                    CategoryName = product.Category.Name,
                    UnitPrice = product.UnitPrice,
                    Unit = product.Unit,
                    CurrentStock = product.CurrentStock,
                    MinStockLevel = product.MinStockLevel,
                    IsActive = product.IsActive,
                    CreatedAt = product.CreatedAt,
                    UpdatedAt = product.UpdatedAt
                };

                return Ok(ApiResponse<ProductDto>.SuccessResponse(productDto));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Stok güncellenirken hata oluştu: {ProductId}", id);
                return StatusCode(500, ApiResponse<ProductDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }
    }

    public class UpdateStockDto
    {
        public int Quantity { get; set; }
    }
} 