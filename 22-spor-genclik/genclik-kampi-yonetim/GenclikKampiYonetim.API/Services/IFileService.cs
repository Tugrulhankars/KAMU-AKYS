namespace GenclikKampiYonetim.API.Services
{
    public interface IFileService
    {
        Task<string> UploadFileAsync(IFormFile file, string folder);
        Task<bool> DeleteFileAsync(string filePath);
        Task<byte[]> GetFileAsync(string filePath);
        bool FileExists(string filePath);
        string GetFileUrl(string filePath);
    }
} 