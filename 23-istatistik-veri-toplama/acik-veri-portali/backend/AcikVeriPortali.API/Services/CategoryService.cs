using AcikVeriPortali.API.Data;
using AcikVeriPortali.API.DTOs;
using AcikVeriPortali.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AcikVeriPortali.API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoryResponse>> GetAllAsync()
        {
            var categories = await _context.Categories
                .Include(c => c.ParentCategory)
                .Include(c => c.SubCategories)
                .Include(c => c.DataSets)
                .Where(c => c.ParentCategoryId == null) // Sadece ana kategorileri getir
                .ToListAsync();

            return categories.Select(MapToResponse);
        }

        public async Task<CategoryResponse?> GetByIdAsync(int id)
        {
            var category = await _context.Categories
                .Include(c => c.ParentCategory)
                .Include(c => c.SubCategories)
                .Include(c => c.DataSets)
                .FirstOrDefaultAsync(c => c.Id == id);

            return category != null ? MapToResponse(category) : null;
        }

        public async Task<CategoryResponse> CreateAsync(CategoryCreateRequest request)
        {
            var category = new Category
            {
                Name = request.Name,
                Description = request.Description,
                Color = request.Color,
                Icon = request.Icon,
                ParentCategoryId = request.ParentCategoryId,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(category.Id) ?? new CategoryResponse();
        }

        public async Task<CategoryResponse?> UpdateAsync(int id, CategoryUpdateRequest request)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return null;

            if (request.Name != null)
                category.Name = request.Name;
            if (request.Description != null)
                category.Description = request.Description;
            if (request.Color != null)
                category.Color = request.Color;
            if (request.Icon != null)
                category.Icon = request.Icon;
            if (request.ParentCategoryId.HasValue)
                category.ParentCategoryId = request.ParentCategoryId;
            if (request.IsActive.HasValue)
                category.IsActive = request.IsActive.Value;

            category.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return await GetByIdAsync(id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories
                .Include(c => c.DataSets)
                .Include(c => c.SubCategories)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return false;

            // Eğer kategoride veri seti varsa silme
            if (category.DataSets.Any())
                return false;

            // Alt kategorileri de sil
            if (category.SubCategories.Any())
            {
                _context.Categories.RemoveRange(category.SubCategories);
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CategoryResponse>> GetActiveCategoriesAsync()
        {
            var categories = await _context.Categories
                .Include(c => c.ParentCategory)
                .Include(c => c.SubCategories.Where(sc => sc.IsActive))
                .Include(c => c.DataSets)
                .Where(c => c.IsActive && c.ParentCategoryId == null)
                .ToListAsync();

            return categories.Select(MapToResponse);
        }

        private CategoryResponse MapToResponse(Category category)
        {
            return new CategoryResponse
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                Color = category.Color,
                Icon = category.Icon,
                ParentCategoryId = category.ParentCategoryId,
                ParentCategoryName = category.ParentCategory?.Name,
                IsActive = category.IsActive,
                CreatedAt = category.CreatedAt,
                UpdatedAt = category.UpdatedAt,
                DataSetCount = category.DataSets.Count,
                SubCategories = category.SubCategories.Where(sc => sc.IsActive).Select(MapToResponse).ToList()
            };
        }
    }
} 