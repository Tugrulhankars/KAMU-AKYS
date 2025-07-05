using Microsoft.EntityFrameworkCore;
using DemirbasAPI.Application.Interfaces;
using DemirbasAPI.Domain.Entities;
using DemirbasAPI.Domain.Enums;
using DemirbasAPI.Infrastructure.Data;

namespace DemirbasAPI.Infrastructure.Repositories;

public class AssetRepository : GenericRepository<Asset>, IAssetRepository
{
    public AssetRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<Asset?> GetByAssetCodeAsync(string assetCode)
    {
        return await _dbSet
            .Include(a => a.Category)
            .Include(a => a.CurrentAssignedUser)
            .FirstOrDefaultAsync(a => a.AssetCode == assetCode && !a.IsDeleted);
    }

    public async Task<IEnumerable<Asset>> GetByStatusAsync(AssetStatus status)
    {
        return await _dbSet
            .Include(a => a.Category)
            .Include(a => a.CurrentAssignedUser)
            .Where(a => a.Status == status && !a.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Asset>> GetByCategoryIdAsync(int categoryId)
    {
        return await _dbSet
            .Include(a => a.Category)
            .Include(a => a.CurrentAssignedUser)
            .Where(a => a.CategoryId == categoryId && !a.IsDeleted)
            .ToListAsync();
    }

    public async Task<IEnumerable<Asset>> GetAssignedAssetsAsync(int userId)
    {
        return await _dbSet
            .Include(a => a.Category)
            .Where(a => a.CurrentAssignedUserId == userId && !a.IsDeleted)
            .ToListAsync();
    }

    public async Task<bool> IsAssetCodeExistsAsync(string assetCode)
    {
        return await _dbSet.AnyAsync(a => a.AssetCode == assetCode && !a.IsDeleted);
    }

    public override async Task<IEnumerable<Asset>> GetAllAsync()
    {
        return await _dbSet
            .Include(a => a.Category)
            .Include(a => a.CurrentAssignedUser)
            .Where(a => !a.IsDeleted)
            .ToListAsync();
    }

    public override async Task<Asset?> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(a => a.Category)
            .Include(a => a.CurrentAssignedUser)
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);
    }
} 