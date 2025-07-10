using AcikVeriPortali.API.DTOs;
using AcikVeriPortali.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AcikVeriPortali.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DataSetController : ControllerBase
    {
        private readonly IDataSetService _dataSetService;

        public DataSetController(IDataSetService dataSetService)
        {
            _dataSetService = dataSetService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] int? categoryId, [FromQuery] string? status)
        {
            var dataSets = await _dataSetService.GetAllAsync(categoryId, status);
            return Ok(dataSets);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var dataSet = await _dataSetService.GetByIdAsync(id);
            if (dataSet == null)
                return NotFound();

            // Görüntüleme kaydı
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userIp = HttpContext.Connection.RemoteIpAddress?.ToString();
            var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();
            var referrer = HttpContext.Request.Headers["Referer"].ToString();

            await _dataSetService.RecordViewAsync(
                id,
                userId != null ? int.Parse(userId) : null,
                userIp,
                userAgent,
                referrer
            );

            return Ok(dataSet);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] DataSetCreateRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var dataSet = await _dataSetService.CreateAsync(request, userId);
            return CreatedAtAction(nameof(GetById), new { id = dataSet.Id }, dataSet);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] DataSetUpdateRequest request)
        {
            var dataSet = await _dataSetService.UpdateAsync(id, request);
            if (dataSet == null)
                return NotFound();
            return Ok(dataSet);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _dataSetService.DeleteAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }

        [HttpPost("{id}/publish")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Publish(int id)
        {
            var result = await _dataSetService.PublishAsync(id);
            if (!result)
                return NotFound();
            return Ok(new { message = "Veri seti yayınlandı." });
        }

        [HttpPost("{id}/archive")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Archive(int id)
        {
            var result = await _dataSetService.ArchiveAsync(id);
            if (!result)
                return NotFound();
            return Ok(new { message = "Veri seti arşivlendi." });
        }

        [HttpPost("{id}/download")]
        public async Task<IActionResult> RecordDownload(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userIp = HttpContext.Connection.RemoteIpAddress?.ToString();
            var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();

            var result = await _dataSetService.RecordDownloadAsync(
                id,
                userId != null ? int.Parse(userId) : null,
                userIp,
                userAgent
            );

            if (!result)
                return NotFound();

            return Ok(new { message = "İndirme kaydedildi." });
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string q)
        {
            if (string.IsNullOrWhiteSpace(q))
                return BadRequest("Arama terimi gerekli.");

            var dataSets = await _dataSetService.SearchAsync(q);
            return Ok(dataSets);
        }

        [HttpPost("upload")]
        [Authorize]
        public async Task<IActionResult> Upload([FromForm] string title, [FromForm] string? description, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Dosya seçilmedi.");
            if (!file.FileName.EndsWith(".csv"))
                return BadRequest("Sadece CSV dosyası yükleyebilirsiniz.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "datasets");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);
            var fileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(uploadsFolder, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
            var dataSet = await _dataSetService.CreateAsync(new DTOs.DataSetCreateRequest
            {
                Title = title,
                Description = description,
                FileFormat = "csv",
                FilePath = $"/datasets/{fileName}"
            }, userId);

            return CreatedAtAction(nameof(GetById), new { id = dataSet.Id }, dataSet);
        }

        [HttpGet("{id}/download")]
        [Authorize]
        public async Task<IActionResult> DownloadFile(int id)
        {
            var dataSet = await _dataSetService.GetByIdAsync(id);
            if (dataSet == null || string.IsNullOrEmpty(dataSet.FilePath))
                return NotFound();
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", dataSet.FilePath.TrimStart('/'));
            if (!System.IO.File.Exists(filePath))
                return NotFound();
            var fileName = Path.GetFileName(filePath);
            return PhysicalFile(filePath, "text/csv", fileName);
        }
    }
} 