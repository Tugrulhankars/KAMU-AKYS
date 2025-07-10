namespace SporcuLisansTakip.API.Services
{
    public interface IFileService
    {
        Task<string> SaveFileAsync(IFormFile file, string folder, string fileName);
        Task<bool> DeleteFileAsync(string filePath);
        Task<byte[]> GetFileAsync(string filePath);
        bool IsValidFileType(IFormFile file);
        bool IsValidFileSize(IFormFile file);
    }
} 