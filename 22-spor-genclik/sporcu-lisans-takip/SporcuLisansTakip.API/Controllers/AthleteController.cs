using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Services;

namespace SporcuLisansTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AthleteController : ControllerBase
    {
        private readonly IAthleteService _athleteService;

        public AthleteController(IAthleteService athleteService)
        {
            _athleteService = athleteService;
        }

        [HttpGet]
        public async Task<ActionResult<List<AthleteListDto>>> GetAllAthletes()
        {
            var athletes = await _athleteService.GetAllAthletesAsync();
            return Ok(athletes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AthleteDto>> GetAthleteById(int id)
        {
            var athlete = await _athleteService.GetAthleteByIdAsync(id);
            if (athlete == null)
                return NotFound(new { message = "Sporcu bulunamadı" });

            return Ok(athlete);
        }

        [HttpGet("identity/{identityNumber}")]
        public async Task<ActionResult<AthleteDto>> GetAthleteByIdentityNumber(string identityNumber)
        {
            var athlete = await _athleteService.GetAthleteByIdentityNumberAsync(identityNumber);
            if (athlete == null)
                return NotFound(new { message = "Sporcu bulunamadı" });

            return Ok(athlete);
        }

        [HttpGet("club/{clubId}")]
        public async Task<ActionResult<List<AthleteListDto>>> GetAthletesByClub(int clubId)
        {
            var athletes = await _athleteService.GetAthletesByClubAsync(clubId);
            return Ok(athletes);
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<AthleteListDto>>> SearchAthletes([FromQuery] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
                return BadRequest(new { message = "Arama terimi boş olamaz" });

            var athletes = await _athleteService.SearchAthletesAsync(term);
            return Ok(athletes);
        }

        [HttpPost]
        public async Task<ActionResult<AthleteDto>> CreateAthlete([FromBody] CreateAthleteRequest request)
        {
            try
            {
                var athlete = await _athleteService.CreateAthleteAsync(request);
                return CreatedAtAction(nameof(GetAthleteById), new { id = athlete.Id }, athlete);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AthleteDto>> UpdateAthlete(int id, [FromBody] UpdateAthleteRequest request)
        {
            try
            {
                var athlete = await _athleteService.UpdateAthleteAsync(id, request);
                return Ok(athlete);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAthlete(int id)
        {
            var result = await _athleteService.DeleteAthleteAsync(id);
            if (!result)
                return NotFound(new { message = "Sporcu bulunamadı" });

            return Ok(new { message = "Sporcu başarıyla silindi" });
        }

        [HttpPost("{id}/deactivate")]
        public async Task<ActionResult> DeactivateAthlete(int id)
        {
            var result = await _athleteService.DeactivateAthleteAsync(id);
            if (!result)
                return NotFound(new { message = "Sporcu bulunamadı" });

            return Ok(new { message = "Sporcu pasif hale getirildi" });
        }

        [HttpPost("{id}/activate")]
        public async Task<ActionResult> ActivateAthlete(int id)
        {
            var result = await _athleteService.ActivateAthleteAsync(id);
            if (!result)
                return NotFound(new { message = "Sporcu bulunamadı" });

            return Ok(new { message = "Sporcu aktif hale getirildi" });
        }

        [HttpPost("{id}/photo")]
        public async Task<ActionResult> UploadPhoto(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Dosya seçilmedi" });

            var photoPath = await _athleteService.UploadPhotoAsync(id, file);
            if (photoPath == null)
                return NotFound(new { message = "Sporcu bulunamadı" });

            return Ok(new { photoPath });
        }
    }
} 