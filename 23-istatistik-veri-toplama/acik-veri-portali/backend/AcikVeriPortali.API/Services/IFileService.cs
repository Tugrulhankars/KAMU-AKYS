namespace AcikVeriPortali.API.Services
{
    public interface IFileService
    {
        Task<string?> UploadFileAsync(IFormFile file, int dataSetId);
        Task<bool> DeleteFileAsync(string filePath);
        Task<FileStream?> GetFileAsync(string filePath);
        bool IsValidFileType(string fileName);
        bool IsValidFileSize(long fileSize);
    }
} 