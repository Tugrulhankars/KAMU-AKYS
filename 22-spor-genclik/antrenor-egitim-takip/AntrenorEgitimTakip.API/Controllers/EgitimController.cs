using Microsoft.AspNetCore.Mvc;
using AntrenorEgitimTakip.API.Services;
using AntrenorEgitimTakip.API.DTOs;
using AntrenorEgitimTakip.API.Models;

namespace AntrenorEgitimTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EgitimController : ControllerBase
    {
        private readonly EgitimService _egitimService;
        public EgitimController(EgitimService egitimService)
        {
            _egitimService = egitimService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _egitimService.GetAllEgitimlerAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var egitim = await _egitimService.GetEgitimByIdAsync(id);
            if (egitim == null) return NotFound();
            return Ok(egitim);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEgitimDto dto)
        {
            var egitim = new Egitim
            {
                Name = dto.Name,
                Description = dto.Description,
                KategoriId = dto.KategoriId,
                Egitmen = dto.Egitmen,
                BaslangicTarihi = dto.BaslangicTarihi,
                BitisTarihi = dto.BitisTarihi,
                Sure = dto.Sure,
                Seviye = dto.Seviye,
                Kapasite = dto.Kapasite,
                Lokasyon = dto.Lokasyon,
                Durum = dto.Durum,
                Gereksinimler = dto.Gereksinimler,
                Materyaller = dto.Materyaller,
                Notlar = dto.Notlar
            };
            var created = await _egitimService.CreateEgitimAsync(egitim);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateEgitimDto dto)
        {
            var existing = await _egitimService.GetEgitimByIdAsync(id);
            if (existing == null) return NotFound();
            if (dto.Name != null) existing.Name = dto.Name;
            if (dto.Description != null) existing.Description = dto.Description;
            if (dto.KategoriId.HasValue) existing.KategoriId = dto.KategoriId.Value;
            if (dto.Egitmen != null) existing.Egitmen = dto.Egitmen;
            if (dto.BaslangicTarihi.HasValue) existing.BaslangicTarihi = dto.BaslangicTarihi.Value;
            if (dto.BitisTarihi.HasValue) existing.BitisTarihi = dto.BitisTarihi.Value;
            if (dto.Sure.HasValue) existing.Sure = dto.Sure.Value;
            if (dto.Seviye != null) existing.Seviye = dto.Seviye;
            if (dto.Kapasite.HasValue) existing.Kapasite = dto.Kapasite.Value;
            if (dto.Lokasyon != null) existing.Lokasyon = dto.Lokasyon;
            if (dto.Durum != null) existing.Durum = dto.Durum;
            if (dto.Gereksinimler != null) existing.Gereksinimler = dto.Gereksinimler;
            if (dto.Materyaller != null) existing.Materyaller = dto.Materyaller;
            if (dto.Notlar != null) existing.Notlar = dto.Notlar;
            if (dto.IsActive.HasValue) existing.IsActive = dto.IsActive.Value;
            existing.UpdatedAt = DateTime.UtcNow;
            var updated = await _egitimService.UpdateEgitimAsync(existing);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _egitimService.DeleteEgitimAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
} 