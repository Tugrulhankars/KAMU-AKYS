using DemirbasAPI.Domain.Entities;

namespace DemirbasAPI.Application.Interfaces;

public interface ICategoryRepository : IGenericRepository<Category>
{
    Task<Category?> GetByCodeAsync(string code);
    Task<bool> IsCodeExistsAsync(string code);
} 