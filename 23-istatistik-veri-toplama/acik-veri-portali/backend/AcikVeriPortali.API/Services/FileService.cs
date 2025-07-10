using Microsoft.Extensions.Configuration;

namespace AcikVeriPortali.API.Services
{
    public class FileService : IFileService
    {
        private readonly IConfiguration _configuration;
        private readonly string _basePath;
        private readonly string[] _allowedExtensions;
        private readonly long _maxFileSize;

        public FileService(IConfiguration configuration)
        {
            _configuration = configuration;
            _basePath = _configuration["FileStorage:BasePath"] ?? "wwwroot/uploads";
            _allowedExtensions = _configuration.GetSection("FileStorage:AllowedExtensions").Get<string[]>() ?? new string[0];
            _maxFileSize = long.Parse(_configuration["FileStorage:MaxFileSizeInMB"] ?? "100") * 1024 * 1024; // MB to bytes

            // Uploads klasörünü oluştur
            if (!Directory.Exists(_basePath))
            {
                Directory.CreateDirectory(_basePath);
            }
        }

        public async Task<string?> UploadFileAsync(IFormFile file, int dataSetId)
        {
            if (file == null || file.Length == 0)
                return null;

            if (!IsValidFileType(file.FileName))
                return null;

            if (!IsValidFileSize(file.Length))
                return null;

            var fileName = $"{dataSetId}_{DateTime.UtcNow:yyyyMMddHHmmss}_{Path.GetFileName(file.FileName)}";
            var filePath = Path.Combine(_basePath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        public async Task<bool> DeleteFileAsync(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
                return false;

            var fullPath = Path.Combine(_basePath, filePath);
            if (!File.Exists(fullPath))
                return false;

            try
            {
                File.Delete(fullPath);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<FileStream?> GetFileAsync(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
                return null;

            var fullPath = Path.Combine(_basePath, filePath);
            if (!File.Exists(fullPath))
                return null;

            try
            {
                return new FileStream(fullPath, FileMode.Open, FileAccess.Read);
            }
            catch
            {
                return null;
            }
        }

        public bool IsValidFileType(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return false;

            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            return _allowedExtensions.Contains(extension);
        }

        public bool IsValidFileSize(long fileSize)
        {
            return fileSize <= _maxFileSize;
        }
    }
} 