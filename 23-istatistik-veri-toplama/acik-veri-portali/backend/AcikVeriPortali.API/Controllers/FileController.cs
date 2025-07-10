using AcikVeriPortali.API.Data;
using AcikVeriPortali.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AcikVeriPortali.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly ApplicationDbContext _context;

        public FileController(IFileService fileService, ApplicationDbContext context)
        {
            _fileService = fileService;
            _context = context;
        }

        [HttpPost("upload/{dataSetId}")]
        [Authorize]
        public async Task<IActionResult> UploadFile(int dataSetId, IFormFile file)
        {
            if (file == null)
                return BadRequest("Dosya seçilmedi.");

            if (!_fileService.IsValidFileType(file.FileName))
                return BadRequest("Geçersiz dosya türü.");

            if (!_fileService.IsValidFileSize(file.Length))
                return BadRequest("Dosya boyutu çok büyük.");

            var dataSet = await _context.DataSets.FindAsync(dataSetId);
            if (dataSet == null)
                return NotFound("Veri seti bulunamadı.");

            var fileName = await _fileService.UploadFileAsync(file, dataSetId);
            if (fileName == null)
                return BadRequest("Dosya yüklenemedi.");

            // Veri setini güncelle
            dataSet.FilePath = fileName;
            dataSet.FileFormat = Path.GetExtension(file.FileName).ToUpperInvariant().TrimStart('.');
            dataSet.FileSize = file.Length;
            dataSet.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { fileName, fileSize = file.Length });
        }

        [HttpGet("download/{dataSetId}")]
        public async Task<IActionResult> DownloadFile(int dataSetId)
        {
            var dataSet = await _context.DataSets.FindAsync(dataSetId);
            if (dataSet == null || string.IsNullOrEmpty(dataSet.FilePath))
                return NotFound("Dosya bulunamadı.");

            var fileStream = await _fileService.GetFileAsync(dataSet.FilePath);
            if (fileStream == null)
                return NotFound("Dosya bulunamadı.");

            var fileName = Path.GetFileName(dataSet.FilePath);
            return File(fileStream, "application/octet-stream", fileName);
        }

        [HttpDelete("{dataSetId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteFile(int dataSetId)
        {
            var dataSet = await _context.DataSets.FindAsync(dataSetId);
            if (dataSet == null || string.IsNullOrEmpty(dataSet.FilePath))
                return NotFound("Dosya bulunamadı.");

            var result = await _fileService.DeleteFileAsync(dataSet.FilePath);
            if (!result)
                return BadRequest("Dosya silinemedi.");

            // Veri setini güncelle
            dataSet.FilePath = null;
            dataSet.FileFormat = string.Empty;
            dataSet.FileSize = 0;
            dataSet.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Dosya silindi." });
        }
    }
} 