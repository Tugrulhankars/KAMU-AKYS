using AcikVeriPortali.API.Data;
using AcikVeriPortali.API.DTOs;
using AcikVeriPortali.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AcikVeriPortali.API.Services
{
    public class DataSetService : IDataSetService
    {
        private readonly ApplicationDbContext _context;

        public DataSetService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DataSetListResponse>> GetAllAsync(int? categoryId = null, string? status = null)
        {
            var query = _context.DataSets
                .Include(d => d.Category)
                .Include(d => d.CreatedBy)
                .AsQueryable();

            if (categoryId.HasValue)
                query = query.Where(d => d.CategoryId == categoryId.Value);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(d => d.Status == status);

            var dataSets = await query
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();

            return dataSets.Select(MapToListResponse);
        }

        public async Task<DataSetResponse?> GetByIdAsync(int id)
        {
            var dataSet = await _context.DataSets
                .Include(d => d.Category)
                .Include(d => d.CreatedBy)
                .FirstOrDefaultAsync(d => d.Id == id);

            return dataSet != null ? MapToResponse(dataSet) : null;
        }

        public async Task<DataSetResponse> CreateAsync(DataSetCreateRequest request, int createdById)
        {
            var dataSet = new DataSet
            {
                Title = request.Title,
                Description = request.Description,
                Keywords = request.Keywords,
                CategoryId = request.CategoryId,
                CreatedById = createdById,
                FileFormat = request.FileFormat ?? string.Empty,
                FilePath = request.FilePath ?? string.Empty,
                FileSize = 0,
                DownloadCount = 0,
                ViewCount = 0,
                Status = "Draft",
                License = request.License,
                Source = request.Source,
                ContactEmail = request.ContactEmail,
                UpdateFrequency = request.UpdateFrequency,
                NextUpdateDate = request.NextUpdateDate,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.DataSets.Add(dataSet);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(dataSet.Id) ?? new DataSetResponse();
        }

        public async Task<DataSetResponse?> UpdateAsync(int id, DataSetUpdateRequest request)
        {
            var dataSet = await _context.DataSets.FindAsync(id);
            if (dataSet == null)
                return null;

            if (request.Title != null)
                dataSet.Title = request.Title;
            if (request.Description != null)
                dataSet.Description = request.Description;
            if (request.Keywords != null)
                dataSet.Keywords = request.Keywords;
            if (request.CategoryId.HasValue)
                dataSet.CategoryId = request.CategoryId.Value;
            if (request.License != null)
                dataSet.License = request.License;
            if (request.Source != null)
                dataSet.Source = request.Source;
            if (request.ContactEmail != null)
                dataSet.ContactEmail = request.ContactEmail;
            if (request.UpdateFrequency != null)
                dataSet.UpdateFrequency = request.UpdateFrequency;
            if (request.NextUpdateDate.HasValue)
                dataSet.NextUpdateDate = request.NextUpdateDate.Value;
            if (request.Status != null)
                dataSet.Status = request.Status;

            dataSet.UpdatedAt = DateTime.UtcNow;
            if (request.Status == "Published" && dataSet.Status != "Published")
            {
                dataSet.PublishedAt = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
            return await GetByIdAsync(id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var dataSet = await _context.DataSets.FindAsync(id);
            if (dataSet == null)
                return false;

            _context.DataSets.Remove(dataSet);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> PublishAsync(int id)
        {
            var dataSet = await _context.DataSets.FindAsync(id);
            if (dataSet == null)
                return false;

            dataSet.Status = "Published";
            dataSet.PublishedAt = DateTime.UtcNow;
            dataSet.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ArchiveAsync(int id)
        {
            var dataSet = await _context.DataSets.FindAsync(id);
            if (dataSet == null)
                return false;

            dataSet.Status = "Archived";
            dataSet.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RecordDownloadAsync(int id, int? userId, string? userIp, string? userAgent)
        {
            var dataSet = await _context.DataSets.FindAsync(id);
            if (dataSet == null)
                return false;

            var download = new DataSetDownload
            {
                DataSetId = id,
                UserId = userId,
                UserIp = userIp,
                UserAgent = userAgent,
                DownloadedAt = DateTime.UtcNow
            };

            _context.DataSetDownloads.Add(download);
            dataSet.DownloadCount++;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RecordViewAsync(int id, int? userId, string? userIp, string? userAgent, string? referrer)
        {
            var dataSet = await _context.DataSets.FindAsync(id);
            if (dataSet == null)
                return false;

            var view = new DataSetView
            {
                DataSetId = id,
                UserId = userId,
                UserIp = userIp,
                UserAgent = userAgent,
                Referrer = referrer,
                ViewedAt = DateTime.UtcNow
            };

            _context.DataSetViews.Add(view);
            dataSet.ViewCount++;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<DataSetListResponse>> SearchAsync(string searchTerm)
        {
            var query = _context.DataSets
                .Include(d => d.Category)
                .Include(d => d.CreatedBy)
                .Where(d => d.Status == "Published" &&
                           (d.Title.Contains(searchTerm) ||
                            d.Description.Contains(searchTerm) ||
                            d.Keywords.Contains(searchTerm)));

            var dataSets = await query
                .OrderByDescending(d => d.CreatedAt)
                .ToListAsync();

            return dataSets.Select(MapToListResponse);
        }

        private DataSetListResponse MapToListResponse(DataSet dataSet)
        {
            return new DataSetListResponse
            {
                Id = dataSet.Id,
                Title = dataSet.Title,
                Description = dataSet.Description,
                CategoryName = dataSet.Category.Name,
                CategoryColor = dataSet.Category.Color,
                FileFormat = dataSet.FileFormat,
                FilePath = dataSet.FilePath,
                DownloadCount = dataSet.DownloadCount,
                ViewCount = dataSet.ViewCount,
                Status = dataSet.Status,
                CreatedAt = dataSet.CreatedAt,
                LastUpdatedAt = dataSet.LastUpdatedAt
            };
        }

        private DataSetResponse MapToResponse(DataSet dataSet)
        {
            return new DataSetResponse
            {
                Id = dataSet.Id,
                Title = dataSet.Title,
                Description = dataSet.Description,
                Keywords = dataSet.Keywords,
                CategoryId = dataSet.CategoryId,
                CategoryName = dataSet.Category.Name,
                CategoryColor = dataSet.Category.Color,
                CreatedBy = $"{dataSet.CreatedBy.FirstName} {dataSet.CreatedBy.LastName}",
                FileFormat = dataSet.FileFormat,
                FilePath = dataSet.FilePath,
                FileSize = dataSet.FileSize,
                DownloadCount = dataSet.DownloadCount,
                ViewCount = dataSet.ViewCount,
                Status = dataSet.Status,
                PublishedAt = dataSet.PublishedAt,
                LastUpdatedAt = dataSet.LastUpdatedAt,
                CreatedAt = dataSet.CreatedAt,
                License = dataSet.License,
                Source = dataSet.Source,
                ContactEmail = dataSet.ContactEmail,
                UpdateFrequency = dataSet.UpdateFrequency,
                NextUpdateDate = dataSet.NextUpdateDate
            };
        }
    }
} 