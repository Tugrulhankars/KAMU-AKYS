using System.IO;

namespace GenclikKampiYonetim.API.Services
{
    public class FileService : IFileService
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public FileService(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        public async Task<string> UploadFileAsync(IFormFile file, string folder)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Dosya boş olamaz");

            var fileSettings = _configuration.GetSection("FileStorage");
            var maxFileSize = fileSettings.GetValue<int>("MaxFileSizeInMB") * 1024 * 1024; // MB to bytes
            var allowedExtensions = fileSettings.GetSection("AllowedExtensions").Get<string[]>();

            if (file.Length > maxFileSize)
                throw new ArgumentException($"Dosya boyutu {fileSettings.GetValue<int>("MaxFileSizeInMB")}MB'dan büyük olamaz");

            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedExtensions!.Contains(fileExtension))
                throw new ArgumentException($"Desteklenmeyen dosya türü: {fileExtension}");

            var basePath = fileSettings.GetValue<string>("BasePath") ?? "wwwroot/uploads";
            var uploadPath = Path.Combine(_environment.WebRootPath, basePath, folder);
            
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var fileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(uploadPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Path.Combine(basePath, folder, fileName).Replace("\\", "/");
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

        public async Task<byte[]> GetFileAsync(string filePath)
        {
            var fullPath = Path.Combine(_environment.WebRootPath, filePath);
            if (!File.Exists(fullPath))
                throw new FileNotFoundException("Dosya bulunamadı");

            return await File.ReadAllBytesAsync(fullPath);
        }

        public bool FileExists(string filePath)
        {
            var fullPath = Path.Combine(_environment.WebRootPath, filePath);
            return File.Exists(fullPath);
        }

        public string GetFileUrl(string filePath)
        {
            if (string.IsNullOrEmpty(filePath))
                return string.Empty;

            return $"/{filePath}";
        }
    }
} 