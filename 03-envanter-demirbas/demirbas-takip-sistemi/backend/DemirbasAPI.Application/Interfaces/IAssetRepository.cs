using DemirbasAPI.Domain.Entities;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.Application.Interfaces;

public interface IAssetRepository : IGenericRepository<Asset>
{
    Task<Asset?> GetByAssetCodeAsync(string assetCode);
    Task<IEnumerable<Asset>> GetByStatusAsync(AssetStatus status);
    Task<IEnumerable<Asset>> GetByCategoryIdAsync(int categoryId);
    Task<IEnumerable<Asset>> GetAssignedAssetsAsync(int userId);
    Task<bool> IsAssetCodeExistsAsync(string assetCode);
} 