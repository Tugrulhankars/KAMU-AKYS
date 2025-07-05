using Microsoft.EntityFrameworkCore;
using DemirbasAPI.Application.Interfaces;
using DemirbasAPI.Domain.Entities;
using DemirbasAPI.Domain.Enums;
using DemirbasAPI.Infrastructure.Data;

namespace DemirbasAPI.Infrastructure.Repositories;

public class AssignmentRepository : GenericRepository<Assignment>, IAssignmentRepository
{
    public AssignmentRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Assignment>> GetByUserIdAsync(int userId)
    {
        return await _dbSet
            .Include(a => a.Asset)
            .ThenInclude(asset => asset.Category)
            .Include(a => a.User)
            .Include(a => a.AssignedByUser)
            .Where(a => a.UserId == userId && !a.IsDeleted)
            .OrderByDescending(a => a.AssignmentDate)
            .ToListAsync();
    }

    public async Task<IEnumerable<Assignment>> GetByAssetIdAsync(int assetId)
    {
        return await _dbSet
            .Include(a => a.Asset)
            .ThenInclude(asset => asset.Category)
            .Include(a => a.User)
            .Include(a => a.AssignedByUser)
            .Where(a => a.AssetId == assetId && !a.IsDeleted)
            .OrderByDescending(a => a.AssignmentDate)
            .ToListAsync();
    }

    public async Task<Assignment?> GetActiveAssignmentAsync(int assetId)
    {
        return await _dbSet
            .Include(a => a.Asset)
            .ThenInclude(asset => asset.Category)
            .Include(a => a.User)
            .Include(a => a.AssignedByUser)
            .FirstOrDefaultAsync(a => a.AssetId == assetId && 
                                   a.Type == AssignmentType.Assignment && 
                                   a.ReturnDate == null && 
                                   !a.IsDeleted);
    }

    public async Task<IEnumerable<Assignment>> GetByTypeAsync(AssignmentType type)
    {
        return await _dbSet
            .Include(a => a.Asset)
            .ThenInclude(asset => asset.Category)
            .Include(a => a.User)
            .Include(a => a.AssignedByUser)
            .Where(a => a.Type == type && !a.IsDeleted)
            .OrderByDescending(a => a.AssignmentDate)
            .ToListAsync();
    }

    public async Task<IEnumerable<Assignment>> GetByDateRangeAsync(DateTime startDate, DateTime endDate)
    {
        return await _dbSet
            .Include(a => a.Asset)
            .ThenInclude(asset => asset.Category)
            .Include(a => a.User)
            .Include(a => a.AssignedByUser)
            .Where(a => a.AssignmentDate >= startDate && 
                       a.AssignmentDate <= endDate && 
                       !a.IsDeleted)
            .OrderByDescending(a => a.AssignmentDate)
            .ToListAsync();
    }

    public override async Task<IEnumerable<Assignment>> GetAllAsync()
    {
        return await _dbSet
            .Include(a => a.Asset)
            .ThenInclude(asset => asset.Category)
            .Include(a => a.User)
            .Include(a => a.AssignedByUser)
            .Where(a => !a.IsDeleted)
            .OrderByDescending(a => a.AssignmentDate)
            .ToListAsync();
    }

    public override async Task<Assignment?> GetByIdAsync(int id)
    {
        return await _dbSet
            .Include(a => a.Asset)
            .ThenInclude(asset => asset.Category)
            .Include(a => a.User)
            .Include(a => a.AssignedByUser)
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted);
    }
} 