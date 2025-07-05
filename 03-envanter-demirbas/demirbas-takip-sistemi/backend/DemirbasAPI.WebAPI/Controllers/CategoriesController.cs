using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DemirbasAPI.Application.DTOs.Category;
using DemirbasAPI.Application.Interfaces;
using DemirbasAPI.Domain.Entities;

namespace DemirbasAPI.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<CategoriesController> _logger;

    public CategoriesController(
        ICategoryRepository categoryRepository,
        IMapper mapper,
        ILogger<CategoriesController> logger)
    {
        _categoryRepository = categoryRepository;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        try
        {
            var categories = await _categoryRepository.GetAllAsync();
            var categoryDtos = _mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(categoryDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kategoriler getirilirken hata oluştu");
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(int id)
    {
        try
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound(new { message = "Kategori bulunamadı" });
            }

            var categoryDto = _mapper.Map<CategoryDto>(category);
            return Ok(categoryDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kategori getirilirken hata oluştu: {CategoryId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto createCategoryDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kategori kodu kontrolü
            if (await _categoryRepository.IsCodeExistsAsync(createCategoryDto.Code))
            {
                return BadRequest(new { message = "Bu kategori kodu zaten kullanılıyor" });
            }

            var category = _mapper.Map<Category>(createCategoryDto);
            await _categoryRepository.AddAsync(category);

            var categoryDto = _mapper.Map<CategoryDto>(category);
            _logger.LogInformation("Yeni kategori oluşturuldu: {CategoryCode}", category.Code);
            
            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, categoryDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kategori oluşturulurken hata oluştu");
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDto updateCategoryDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound(new { message = "Kategori bulunamadı" });
            }

            // Başka bir kategoride aynı kod var mı kontrol et
            var existingCategory = await _categoryRepository.GetByCodeAsync(updateCategoryDto.Code);
            if (existingCategory != null && existingCategory.Id != id)
            {
                return BadRequest(new { message = "Bu kategori kodu zaten kullanılıyor" });
            }

            _mapper.Map(updateCategoryDto, category);
            category.UpdatedDate = DateTime.UtcNow;
            await _categoryRepository.UpdateAsync(category);

            var categoryDto = _mapper.Map<CategoryDto>(category);
            _logger.LogInformation("Kategori güncellendi: {CategoryId}", id);
            
            return Ok(categoryDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kategori güncellenirken hata oluştu: {CategoryId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        try
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound(new { message = "Kategori bulunamadı" });
            }

            category.IsDeleted = true;
            category.UpdatedDate = DateTime.UtcNow;
            await _categoryRepository.UpdateAsync(category);

            _logger.LogInformation("Kategori silindi: {CategoryId}", id);
            return Ok(new { message = "Kategori başarıyla silindi" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kategori silinirken hata oluştu: {CategoryId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }
} 