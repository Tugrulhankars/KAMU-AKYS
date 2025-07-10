using AcikVeriPortali.API.DTOs;
using AcikVeriPortali.API.Models;

namespace AcikVeriPortali.API.Services
{
    public interface IDataSetService
    {
        Task<IEnumerable<DataSetListResponse>> GetAllAsync(int? categoryId = null, string? status = null);
        Task<DataSetResponse?> GetByIdAsync(int id);
        Task<DataSetResponse> CreateAsync(DataSetCreateRequest request, int createdById);
        Task<DataSetResponse?> UpdateAsync(int id, DataSetUpdateRequest request);
        Task<bool> DeleteAsync(int id);
        Task<bool> PublishAsync(int id);
        Task<bool> ArchiveAsync(int id);
        Task<bool> RecordDownloadAsync(int id, int? userId, string? userIp, string? userAgent);
        Task<bool> RecordViewAsync(int id, int? userId, string? userIp, string? userAgent, string? referrer);
        Task<IEnumerable<DataSetListResponse>> SearchAsync(string searchTerm);
    }
} 