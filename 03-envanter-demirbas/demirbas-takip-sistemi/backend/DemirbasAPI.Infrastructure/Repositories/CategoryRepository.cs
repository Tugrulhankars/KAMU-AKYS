using Microsoft.EntityFrameworkCore;
using DemirbasAPI.Application.Interfaces;
using DemirbasAPI.Domain.Entities;
using DemirbasAPI.Infrastructure.Data;

namespace DemirbasAPI.Infrastructure.Repositories;

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<Category?> GetByCodeAsync(string code)
    {
        return await _dbSet.FirstOrDefaultAsync(c => c.Code == code && !c.IsDeleted);
    }

    public async Task<bool> IsCodeExistsAsync(string code)
    {
        return await _dbSet.AnyAsync(c => c.Code == code && !c.IsDeleted);
    }

    public override async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await _dbSet
            .Where(c => !c.IsDeleted)
            .ToListAsync();
    }

    public override async Task<Category?> GetByIdAsync(int id)
    {
        return await _dbSet
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);
    }
} 