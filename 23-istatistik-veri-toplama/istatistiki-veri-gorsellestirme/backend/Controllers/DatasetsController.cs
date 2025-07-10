using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using KamuVeriAPI.Data;
using KamuVeriAPI.DTOs;
using KamuVeriAPI.Models;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace KamuVeriAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatasetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DatasetsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DatasetDto>>> GetDatasets()
        {
            var query = _context.Datasets
                .Include(d => d.CreatedByUser)
                .Include(d => d.DataPoints)
                .AsQueryable();

            // If user is not authenticated, show only public datasets
            if (!User.Identity?.IsAuthenticated ?? true)
            {
                query = query.Where(d => d.IsPublic);
            }

            var datasets = await query
                .Select(d => new DatasetDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Description = d.Description,
                    IsPublic = d.IsPublic,
                    CreatedAt = d.CreatedAt,
                    CreatedByUsername = d.CreatedByUser.Username,
                    DataPointsCount = d.DataPoints.Count,
                    FileUrl = d.FilePath
                })
                .ToListAsync();

            return Ok(datasets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DatasetDto>> GetDataset(int id)
        {
            var dataset = await _context.Datasets
                .Include(d => d.CreatedByUser)
                .Include(d => d.DataPoints)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (dataset == null)
            {
                return NotFound(new { message = "Veri seti bulunamadı." });
            }

            // Check authorization
            if (!dataset.IsPublic && (!User.Identity?.IsAuthenticated ?? true))
            {
                return Unauthorized(new { message = "Bu veri setine erişim izniniz yok." });
            }

            var datasetDto = new DatasetDto
            {
                Id = dataset.Id,
                Name = dataset.Name,
                Description = dataset.Description,
                IsPublic = dataset.IsPublic,
                CreatedAt = dataset.CreatedAt,
                CreatedByUsername = dataset.CreatedByUser.Username,
                DataPointsCount = dataset.DataPoints.Count,
                FileUrl = dataset.FilePath
            };

            return Ok(datasetDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<DatasetDto>> CreateDataset(CreateDatasetDto createDatasetDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var dataset = new Dataset
            {
                Name = createDatasetDto.Name,
                Description = createDatasetDto.Description,
                IsPublic = createDatasetDto.IsPublic,
                CreatedByUserId = userId
            };

            _context.Datasets.Add(dataset);
            await _context.SaveChangesAsync();

            // Load the created dataset with related data
            var createdDataset = await _context.Datasets
                .Include(d => d.CreatedByUser)
                .Include(d => d.DataPoints)
                .FirstAsync(d => d.Id == dataset.Id);

            var datasetDto = new DatasetDto
            {
                Id = createdDataset.Id,
                Name = createdDataset.Name,
                Description = createdDataset.Description,
                IsPublic = createdDataset.IsPublic,
                CreatedAt = createdDataset.CreatedAt,
                CreatedByUsername = createdDataset.CreatedByUser.Username,
                DataPointsCount = createdDataset.DataPoints.Count
            };

            return CreatedAtAction(nameof(GetDataset), new { id = dataset.Id }, datasetDto);
        }

        [HttpGet("{id}/data")]
        public async Task<ActionResult<IEnumerable<DataPointDto>>> GetDatasetData(int id, 
            [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate, [FromQuery] string? category)
        {
            var dataset = await _context.Datasets.FindAsync(id);
            if (dataset == null)
            {
                return NotFound(new { message = "Veri seti bulunamadı." });
            }

            // Check authorization
            if (!dataset.IsPublic && (!User.Identity?.IsAuthenticated ?? true))
            {
                return Unauthorized(new { message = "Bu veri setine erişim izniniz yok." });
            }

            var query = _context.DataPoints.Where(dp => dp.DatasetId == id);

            // Apply filters
            if (startDate.HasValue)
                query = query.Where(dp => dp.Date >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(dp => dp.Date <= endDate.Value);

            if (!string.IsNullOrEmpty(category))
                query = query.Where(dp => dp.Category == category);

            var dataPoints = await query
                .Select(dp => new DataPointDto
                {
                    Id = dp.Id,
                    Key = dp.Key,
                    Value = dp.Value,
                    Date = dp.Date,
                    Category = dp.Category
                })
                .OrderBy(dp => dp.Date)
                .ToListAsync();

            return Ok(dataPoints);
        }

        [HttpPost("{id}/data")]
        [Authorize]
        public async Task<ActionResult<DataPointDto>> AddDataPoint(int id, CreateDataPointDto createDataPointDto)
        {
            var dataset = await _context.Datasets.FindAsync(id);
            if (dataset == null)
            {
                return NotFound(new { message = "Veri seti bulunamadı." });
            }

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (!int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            // Check if user can add data (owner or admin)
            if (dataset.CreatedByUserId != userId && userRole != "Admin")
            {
                return Forbid("Bu veri setine veri ekleme izniniz yok.");
            }

            var dataPoint = new DataPoint
            {
                DatasetId = id,
                Key = createDataPointDto.Key,
                Value = createDataPointDto.Value,
                Date = createDataPointDto.Date,
                Category = createDataPointDto.Category
            };

            _context.DataPoints.Add(dataPoint);
            await _context.SaveChangesAsync();

            var dataPointDto = new DataPointDto
            {
                Id = dataPoint.Id,
                Key = dataPoint.Key,
                Value = dataPoint.Value,
                Date = dataPoint.Date,
                Category = dataPoint.Category
            };

            return CreatedAtAction(nameof(GetDatasetData), new { id }, dataPointDto);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<DatasetDto>> UpdateDataset(int id, CreateDatasetDto updateDto)
        {
            var dataset = await _context.Datasets.Include(d => d.CreatedByUser).FirstOrDefaultAsync(d => d.Id == id);
            if (dataset == null)
                return NotFound(new { message = "Veri seti bulunamadı." });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();
            if (dataset.CreatedByUserId != userId && userRole != "Admin")
                return Forbid("Bu veri setini güncelleme izniniz yok.");

            dataset.Name = updateDto.Name;
            dataset.Description = updateDto.Description;
            dataset.IsPublic = updateDto.IsPublic;
            await _context.SaveChangesAsync();

            var dto = new DatasetDto
            {
                Id = dataset.Id,
                Name = dataset.Name,
                Description = dataset.Description,
                IsPublic = dataset.IsPublic,
                CreatedAt = dataset.CreatedAt,
                CreatedByUsername = dataset.CreatedByUser.Username,
                DataPointsCount = dataset.DataPoints.Count
            };
            return Ok(dto);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteDataset(int id)
        {
            var dataset = await _context.Datasets.Include(d => d.DataPoints).FirstOrDefaultAsync(d => d.Id == id);
            if (dataset == null)
                return NotFound(new { message = "Veri seti bulunamadı." });

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();
            if (dataset.CreatedByUserId != userId && userRole != "Admin")
                return Forbid("Bu veri setini silme izniniz yok.");

            _context.DataPoints.RemoveRange(dataset.DataPoints);
            _context.Datasets.Remove(dataset);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{datasetId}/data/{dataPointId}")]
        [Authorize]
        public async Task<ActionResult<DataPointDto>> UpdateDataPoint(int datasetId, int dataPointId, CreateDataPointDto updateDto)
        {
            var dataPoint = await _context.DataPoints.FirstOrDefaultAsync(dp => dp.Id == dataPointId && dp.DatasetId == datasetId);
            if (dataPoint == null)
                return NotFound(new { message = "Veri bulunamadı." });

            var dataset = await _context.Datasets.FindAsync(datasetId);
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();
            if (dataset == null || (dataset.CreatedByUserId != userId && userRole != "Admin"))
                return Forbid("Bu veriyi güncelleme izniniz yok.");

            dataPoint.Key = updateDto.Key;
            dataPoint.Value = updateDto.Value;
            dataPoint.Date = updateDto.Date;
            dataPoint.Category = updateDto.Category;
            await _context.SaveChangesAsync();

            var dto = new DataPointDto
            {
                Id = dataPoint.Id,
                Key = dataPoint.Key,
                Value = dataPoint.Value,
                Date = dataPoint.Date,
                Category = dataPoint.Category
            };
            return Ok(dto);
        }

        [HttpDelete("{datasetId}/data/{dataPointId}")]
        [Authorize]
        public async Task<IActionResult> DeleteDataPoint(int datasetId, int dataPointId)
        {
            var dataPoint = await _context.DataPoints.FirstOrDefaultAsync(dp => dp.Id == dataPointId && dp.DatasetId == datasetId);
            if (dataPoint == null)
                return NotFound(new { message = "Veri bulunamadı." });

            var dataset = await _context.Datasets.FindAsync(datasetId);
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();
            if (dataset == null || (dataset.CreatedByUserId != userId && userRole != "Admin"))
                return Forbid("Bu veriyi silme izniniz yok.");

            _context.DataPoints.Remove(dataPoint);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("upload")]
        [Authorize]
        [RequestSizeLimit(20_000_000)] // 20 MB limit
        public async Task<IActionResult> UploadDataset([FromForm] CreateDatasetDto dto, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Dosya seçilmedi." });

            // JWT'den kullanıcı ID'sini al
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                return Unauthorized();

            // Dosyayı sunucuda kaydet (örnek: wwwroot/uploads klasörüne)
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);
            var filePath = Path.Combine(uploadsFolder, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Dataset kaydını oluştur
            var dataset = new Dataset
            {
                Name = dto.Name,
                Description = dto.Description,
                IsPublic = dto.IsPublic,
                CreatedAt = DateTime.UtcNow,
                CreatedByUserId = userId,
                FilePath = $"/uploads/{file.FileName}"
            };
            _context.Datasets.Add(dataset);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Veri seti ve dosya başarıyla yüklendi.", datasetId = dataset.Id });
        }
    }
} 