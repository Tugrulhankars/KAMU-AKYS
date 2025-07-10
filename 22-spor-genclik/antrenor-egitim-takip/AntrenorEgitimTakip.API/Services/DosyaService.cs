using AntrenorEgitimTakip.API.DTOs;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace AntrenorEgitimTakip.API.Services
{
    public interface IDosyaService
    {
        Task<FileUploadResponse> UploadFileAsync(IFormFile file, string? klasor = null);
        Task<bool> DeleteFileAsync(string filePath);
        Task<byte[]?> GetFileAsync(string filePath);
        Task<string> GetFileUrlAsync(string filePath);
        bool IsValidFileType(IFormFile file);
        bool IsValidFileSize(IFormFile file);
        string GetFileExtension(string fileName);
        string GenerateFileName(string originalFileName);
    }

    public class DosyaService : IDosyaService
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public DosyaService(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        public async Task<FileUploadResponse> UploadFileAsync(IFormFile file, string? klasor = null)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("Dosya boş olamaz.");
            }

            if (!IsValidFileType(file))
            {
                throw new ArgumentException("Geçersiz dosya türü.");
            }

            if (!IsValidFileSize(file))
            {
                throw new ArgumentException("Dosya boyutu çok büyük.");
            }

            var basePath = _configuration["FileStorage:BasePath"] ?? "wwwroot/uploads";
            var uploadPath = Path.Combine(_environment.WebRootPath, basePath);

            if (!string.IsNullOrEmpty(klasor))
            {
                uploadPath = Path.Combine(uploadPath, klasor);
            }

            // Klasör yoksa oluştur
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }

            var fileName = GenerateFileName(file.FileName);
            var filePath = Path.Combine(uploadPath, fileName);
            var relativePath = Path.Combine(basePath, klasor ?? "", fileName).Replace("\\", "/");

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return new FileUploadResponse
            {
                FilePath = relativePath,
                FileName = fileName,
                FileSize = file.Length,
                ContentType = file.ContentType
            };
        }

        public async Task<bool> DeleteFileAsync(string filePath)
        {
            try
            {
                var fullPath = Path.Combine(_environment.WebRootPath, filePath);
                if (File.Exists(fullPath))
                {
                    File.Delete(fullPath);
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<byte[]?> GetFileAsync(string filePath)
        {
            try
            {
                var fullPath = Path.Combine(_environment.WebRootPath, filePath);
                if (File.Exists(fullPath))
                {
                    return await File.ReadAllBytesAsync(fullPath);
                }
                return null;
            }
            catch
            {
                return null;
            }
        }

        public async Task<string> GetFileUrlAsync(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
            {
                return string.Empty;
            }

            // Burada gerçek bir URL oluşturma mantığı olabilir
            // Şimdilik basit bir path döndürüyoruz
            return $"/{filePath}";
        }

        public bool IsValidFileType(IFormFile file)
        {
            var allowedExtensions = _configuration.GetSection("FileStorage:AllowedExtensions").Get<string[]>();
            if (allowedExtensions == null || !allowedExtensions.Any())
            {
                return true; // Eğer kısıtlama yoksa tüm dosyaları kabul et
            }

            var fileExtension = GetFileExtension(file.FileName).ToLowerInvariant();
            return allowedExtensions.Contains(fileExtension);
        }

        public bool IsValidFileSize(IFormFile file)
        {
            var maxFileSize = _configuration.GetValue<long>("FileStorage:MaxFileSize", 10 * 1024 * 1024); // 10MB varsayılan
            return file.Length <= maxFileSize;
        }

        public string GetFileExtension(string fileName)
        {
            return Path.GetExtension(fileName);
        }

        public string GenerateFileName(string originalFileName)
        {
            var extension = GetFileExtension(originalFileName);
            var fileNameWithoutExtension = Path.GetFileNameWithoutExtension(originalFileName);
            var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
            var random = Guid.NewGuid().ToString("N").Substring(0, 8);
            
            return $"{fileNameWithoutExtension}_{timestamp}_{random}{extension}";
        }
    }
} 