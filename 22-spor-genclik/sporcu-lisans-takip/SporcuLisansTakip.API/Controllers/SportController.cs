using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Services;

namespace SporcuLisansTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SportController : ControllerBase
    {
        private readonly ISportService _sportService;

        public SportController(ISportService sportService)
        {
            _sportService = sportService;
        }

        [HttpGet]
        public async Task<ActionResult<List<SportListDto>>> GetAllSports()
        {
            var sports = await _sportService.GetAllSportsAsync();
            return Ok(sports);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SportDto>> GetSportById(int id)
        {
            var sport = await _sportService.GetSportByIdAsync(id);
            if (sport == null)
                return NotFound(new { message = "Spor bulunamadı" });

            return Ok(sport);
        }

        [HttpPost]
        public async Task<ActionResult<SportDto>> CreateSport([FromBody] CreateSportRequest request)
        {
            try
            {
                var sport = await _sportService.CreateSportAsync(request);
                return CreatedAtAction(nameof(GetSportById), new { id = sport.Id }, sport);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SportDto>> UpdateSport(int id, [FromBody] UpdateSportRequest request)
        {
            try
            {
                var sport = await _sportService.UpdateSportAsync(id, request);
                return Ok(sport);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteSport(int id)
        {
            try
            {
                var result = await _sportService.DeleteSportAsync(id);
                if (!result)
                    return NotFound(new { message = "Spor bulunamadı" });

                return Ok(new { message = "Spor başarıyla silindi" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("{id}/deactivate")]
        public async Task<ActionResult> DeactivateSport(int id)
        {
            var result = await _sportService.DeactivateSportAsync(id);
            if (!result)
                return NotFound(new { message = "Spor bulunamadı" });

            return Ok(new { message = "Spor pasif hale getirildi" });
        }

        [HttpPost("{id}/activate")]
        public async Task<ActionResult> ActivateSport(int id)
        {
            var result = await _sportService.ActivateSportAsync(id);
            if (!result)
                return NotFound(new { message = "Spor bulunamadı" });

            return Ok(new { message = "Spor aktif hale getirildi" });
        }

        [HttpPost("{id}/icon")]
        public async Task<ActionResult> UploadIcon(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Dosya seçilmedi" });

            var iconPath = await _sportService.UploadIconAsync(id, file);
            if (iconPath == null)
                return NotFound(new { message = "Spor bulunamadı" });

            return Ok(new { iconPath });
        }
    }
} 