using Microsoft.AspNetCore.Mvc;
using AntrenorEgitimTakip.API.Services;
using AntrenorEgitimTakip.API.DTOs;
using AntrenorEgitimTakip.API.Models;

namespace AntrenorEgitimTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SertifikaController : ControllerBase
    {
        private readonly SertifikaService _sertifikaService;
        public SertifikaController(SertifikaService sertifikaService)
        {
            _sertifikaService = sertifikaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _sertifikaService.GetAllSertifikalarAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var sertifika = await _sertifikaService.GetSertifikaByIdAsync(id);
            if (sertifika == null) return NotFound();
            return Ok(sertifika);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSertifikaDto dto)
        {
            var sertifika = new Sertifika
            {
                AntrenorId = dto.AntrenorId,
                Name = dto.Name,
                Description = dto.Description,
                IssuingOrganization = dto.IssuingAuthority,
                IssueDate = dto.IssueDate,
                ExpiryDate = dto.ExpiryDate,
                CertificateNumber = dto.CertificateNumber,
                FilePath = dto.FilePath,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };
            var created = await _sertifikaService.CreateSertifikaAsync(sertifika);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSertifikaDto dto)
        {
            var existing = await _sertifikaService.GetSertifikaByIdAsync(id);
            if (existing == null) return NotFound();
            // Güncelleme
            if (dto.Name != null) existing.Name = dto.Name;
            if (dto.Description != null) existing.Description = dto.Description;
            if (dto.IssuingAuthority != null) existing.IssuingOrganization = dto.IssuingAuthority;
            if (dto.IssueDate.HasValue) existing.IssueDate = dto.IssueDate.Value;
            if (dto.ExpiryDate.HasValue) existing.ExpiryDate = dto.ExpiryDate;
            if (dto.CertificateNumber != null) existing.CertificateNumber = dto.CertificateNumber;
            if (dto.FilePath != null) existing.FilePath = dto.FilePath;
            if (dto.IsActive.HasValue) existing.IsActive = dto.IsActive.Value;
            existing.UpdatedAt = DateTime.UtcNow;
            var updated = await _sertifikaService.UpdateSertifikaAsync(existing);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _sertifikaService.DeleteSertifikaAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
} 