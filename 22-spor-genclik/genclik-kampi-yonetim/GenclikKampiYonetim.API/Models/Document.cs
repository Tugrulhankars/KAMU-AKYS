namespace GenclikKampiYonetim.API.Models
{
    public class Document
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
        public string FileType { get; set; } = string.Empty;
        public long FileSize { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty; // Brochure, Form, Policy, Manual, etc.
        public string? Tags { get; set; }
        public bool IsPublic { get; set; } = false;
        public bool IsActive { get; set; } = true;
        public int DownloadCount { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Computed properties
        public string FileSizeText => FileSize switch
        {
            < 1024 => $"{FileSize} B",
            < 1024 * 1024 => $"{FileSize / 1024:F1} KB",
            < 1024 * 1024 * 1024 => $"{FileSize / (1024 * 1024):F1} MB",
            _ => $"{FileSize / (1024 * 1024 * 1024):F1} GB"
        };

        public string FileExtension => Path.GetExtension(FilePath).ToLowerInvariant();
        public bool IsImage => new[] { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp" }.Contains(FileExtension);
        public bool IsPdf => FileExtension == ".pdf";
        public bool IsDocument => new[] { ".doc", ".docx", ".pdf", ".txt", ".rtf" }.Contains(FileExtension);
        public bool IsVideo => new[] { ".mp4", ".avi", ".mov", ".wmv", ".flv" }.Contains(FileExtension);
        public bool IsAudio => new[] { ".mp3", ".wav", ".ogg", ".aac" }.Contains(FileExtension);
    }
} 