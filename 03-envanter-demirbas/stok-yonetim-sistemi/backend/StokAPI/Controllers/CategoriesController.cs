using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StokAPI.Data;
using StokAPI.DTOs;
using StokAPI.Models;

namespace StokAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ApplicationDbContext context, ILogger<CategoriesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/categories
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<CategoryDto>>>> GetCategories()
        {
            try
            {
                var categories = await _context.Categories
                    .Select(c => new CategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        IsActive = c.IsActive,
                        CreatedAt = c.CreatedAt,
                        UpdatedAt = c.UpdatedAt,
                        ProductCount = c.Products.Count(p => p.IsActive)
                    })
                    .OrderBy(c => c.Name)
                    .ToListAsync();

                return Ok(ApiResponse<List<CategoryDto>>.SuccessResponse(categories));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kategori listesi getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<List<CategoryDto>>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<CategoryDto>>> GetCategory(int id)
        {
            try
            {
                var category = await _context.Categories
                    .Select(c => new CategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        IsActive = c.IsActive,
                        CreatedAt = c.CreatedAt,
                        UpdatedAt = c.UpdatedAt,
                        ProductCount = c.Products.Count(p => p.IsActive)
                    })
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (category == null)
                {
                    return NotFound(ApiResponse<CategoryDto>.ErrorResponse("Kategori bulunamadı"));
                }

                return Ok(ApiResponse<CategoryDto>.SuccessResponse(category));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kategori getirilirken hata oluştu: {CategoryId}", id);
                return StatusCode(500, ApiResponse<CategoryDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // POST: api/categories
        [HttpPost]
        public async Task<ActionResult<ApiResponse<CategoryDto>>> CreateCategory(CreateCategoryDto createCategoryDto)
        {
            try
            {
                // Kategori adı kontrolü
                var existingCategory = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == createCategoryDto.Name.ToLower());

                if (existingCategory != null)
                {
                    return BadRequest(ApiResponse<CategoryDto>.ErrorResponse("Bu kategori adı zaten kullanılıyor"));
                }

                var category = new Category
                {
                    Name = createCategoryDto.Name,
                    Description = createCategoryDto.Description,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Categories.Add(category);
                await _context.SaveChangesAsync();

                var categoryDto = new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description,
                    IsActive = category.IsActive,
                    CreatedAt = category.CreatedAt,
                    UpdatedAt = category.UpdatedAt,
                    ProductCount = 0
                };

                return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, 
                    ApiResponse<CategoryDto>.SuccessResponse(categoryDto, "Kategori başarıyla oluşturuldu"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kategori oluşturulurken hata oluştu");
                return StatusCode(500, ApiResponse<CategoryDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // PUT: api/categories/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<CategoryDto>>> UpdateCategory(int id, UpdateCategoryDto updateCategoryDto)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                {
                    return NotFound(ApiResponse<CategoryDto>.ErrorResponse("Kategori bulunamadı"));
                }

                // Kategori adı kontrolü (kendi adı hariç)
                var existingCategory = await _context.Categories
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == updateCategoryDto.Name.ToLower() && c.Id != id);

                if (existingCategory != null)
                {
                    return BadRequest(ApiResponse<CategoryDto>.ErrorResponse("Bu kategori adı zaten kullanılıyor"));
                }

                category.Name = updateCategoryDto.Name;
                category.Description = updateCategoryDto.Description;
                category.IsActive = updateCategoryDto.IsActive;
                category.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                var categoryDto = new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    Description = category.Description,
                    IsActive = category.IsActive,
                    CreatedAt = category.CreatedAt,
                    UpdatedAt = category.UpdatedAt,
                    ProductCount = await _context.Products.CountAsync(p => p.CategoryId == id && p.IsActive)
                };

                return Ok(ApiResponse<CategoryDto>.SuccessResponse(categoryDto, "Kategori başarıyla güncellendi"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kategori güncellenirken hata oluştu: {CategoryId}", id);
                return StatusCode(500, ApiResponse<CategoryDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // DELETE: api/categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteCategory(int id)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);
                if (category == null)
                {
                    return NotFound(ApiResponse<bool>.ErrorResponse("Kategori bulunamadı"));
                }

                // Kategori altında ürün olup olmadığını kontrol et
                var hasProducts = await _context.Products.AnyAsync(p => p.CategoryId == id);
                if (hasProducts)
                {
                    return BadRequest(ApiResponse<bool>.ErrorResponse("Bu kategorinin altında ürünler olduğu için silinemez"));
                }

                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<bool>.SuccessResponse(true, "Kategori başarıyla silindi"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kategori silinirken hata oluştu: {CategoryId}", id);
                return StatusCode(500, ApiResponse<bool>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/categories/active
        [HttpGet("active")]
        public async Task<ActionResult<ApiResponse<List<CategoryDto>>>> GetActiveCategories()
        {
            try
            {
                var categories = await _context.Categories
                    .Where(c => c.IsActive)
                    .Select(c => new CategoryDto
                    {
                        Id = c.Id,
                        Name = c.Name,
                        Description = c.Description,
                        IsActive = c.IsActive,
                        CreatedAt = c.CreatedAt,
                        UpdatedAt = c.UpdatedAt,
                        ProductCount = c.Products.Count(p => p.IsActive)
                    })
                    .OrderBy(c => c.Name)
                    .ToListAsync();

                return Ok(ApiResponse<List<CategoryDto>>.SuccessResponse(categories));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Aktif kategoriler getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<List<CategoryDto>>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }
    }
} 