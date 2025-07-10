using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace SporcuLisansTakip.API.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfiguration _configuration;

        public FileService(IWebHostEnvironment env, IConfiguration configuration)
        {
            _env = env;
            _configuration = configuration;
        }

        public async Task<string> SaveFileAsync(IFormFile file, string folder, string fileName)
        {
            var basePath = Path.Combine(_env.WebRootPath ?? "wwwroot", "uploads", folder);
            if (!Directory.Exists(basePath))
                Directory.CreateDirectory(basePath);

            var filePath = Path.Combine(basePath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return $"/uploads/{folder}/{fileName}";
        }

        public async Task<bool> DeleteFileAsync(string filePath)
        {
            var fullPath = Path.Combine(_env.WebRootPath ?? "wwwroot", filePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
                return true;
            }
            return false;
        }

        public async Task<byte[]> GetFileAsync(string filePath)
        {
            var fullPath = Path.Combine(_env.WebRootPath ?? "wwwroot", filePath.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
            if (!File.Exists(fullPath))
                throw new FileNotFoundException("Dosya bulunamadı", filePath);
            return await File.ReadAllBytesAsync(fullPath);
        }

        public bool IsValidFileType(IFormFile file)
        {
            var allowedExtensions = _configuration.GetSection("FileStorage:AllowedExtensions").Get<string[]>();
            var ext = Path.GetExtension(file.FileName).ToLower();
            return allowedExtensions != null && allowedExtensions.Contains(ext);
        }

        public bool IsValidFileSize(IFormFile file)
        {
            var maxFileSize = _configuration.GetValue<long>("FileStorage:MaxFileSize");
            return file.Length <= maxFileSize;
        }
    }
} 