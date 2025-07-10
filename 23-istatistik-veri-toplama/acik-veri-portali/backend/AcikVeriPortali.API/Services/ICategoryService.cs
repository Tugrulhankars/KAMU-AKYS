using AcikVeriPortali.API.DTOs;
using AcikVeriPortali.API.Models;

namespace AcikVeriPortali.API.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryResponse>> GetAllAsync();
        Task<CategoryResponse?> GetByIdAsync(int id);
        Task<CategoryResponse> CreateAsync(CategoryCreateRequest request);
        Task<CategoryResponse?> UpdateAsync(int id, CategoryUpdateRequest request);
        Task<bool> DeleteAsync(int id);
        Task<IEnumerable<CategoryResponse>> GetActiveCategoriesAsync();
    }
} 