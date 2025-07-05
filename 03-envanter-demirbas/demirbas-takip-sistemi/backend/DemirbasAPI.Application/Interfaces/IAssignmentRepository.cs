using DemirbasAPI.Domain.Entities;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Application.Interfaces;

public interface IAssignmentRepository : IGenericRepository<Assignment>
{
    Task<IEnumerable<Assignment>> GetByUserIdAsync(int userId);
    Task<IEnumerable<Assignment>> GetByAssetIdAsync(int assetId);
    Task<Assignment?> GetActiveAssignmentAsync(int assetId);
    Task<IEnumerable<Assignment>> GetByTypeAsync(AssignmentType type);
    Task<IEnumerable<Assignment>> GetByDateRangeAsync(DateTime startDate, DateTime endDate);
} 