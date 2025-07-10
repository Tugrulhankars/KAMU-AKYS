using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Services;

namespace SporcuLisansTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ClubController : ControllerBase
    {
        private readonly IClubService _clubService;

        public ClubController(IClubService clubService)
        {
            _clubService = clubService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ClubListDto>>> GetAllClubs()
        {
            var clubs = await _clubService.GetAllClubsAsync();
            return Ok(clubs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClubDto>> GetClubById(int id)
        {
            var club = await _clubService.GetClubByIdAsync(id);
            if (club == null)
                return NotFound(new { message = "Kulüp bulunamadı" });

            return Ok(club);
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<ClubListDto>>> SearchClubs([FromQuery] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
                return BadRequest(new { message = "Arama terimi boş olamaz" });

            var clubs = await _clubService.SearchClubsAsync(term);
            return Ok(clubs);
        }

        [HttpPost]
        public async Task<ActionResult<ClubDto>> CreateClub([FromBody] CreateClubRequest request)
        {
            try
            {
                var club = await _clubService.CreateClubAsync(request);
                return CreatedAtAction(nameof(GetClubById), new { id = club.Id }, club);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ClubDto>> UpdateClub(int id, [FromBody] UpdateClubRequest request)
        {
            try
            {
                var club = await _clubService.UpdateClubAsync(id, request);
                return Ok(club);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClub(int id)
        {
            try
            {
                var result = await _clubService.DeleteClubAsync(id);
                if (!result)
                    return NotFound(new { message = "Kulüp bulunamadı" });

                return Ok(new { message = "Kulüp başarıyla silindi" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("{id}/deactivate")]
        public async Task<ActionResult> DeactivateClub(int id)
        {
            var result = await _clubService.DeactivateClubAsync(id);
            if (!result)
                return NotFound(new { message = "Kulüp bulunamadı" });

            return Ok(new { message = "Kulüp pasif hale getirildi" });
        }

        [HttpPost("{id}/activate")]
        public async Task<ActionResult> ActivateClub(int id)
        {
            var result = await _clubService.ActivateClubAsync(id);
            if (!result)
                return NotFound(new { message = "Kulüp bulunamadı" });

            return Ok(new { message = "Kulüp aktif hale getirildi" });
        }

        [HttpPost("{id}/logo")]
        public async Task<ActionResult> UploadLogo(int id, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest(new { message = "Dosya seçilmedi" });

            var logoPath = await _clubService.UploadLogoAsync(id, file);
            if (logoPath == null)
                return NotFound(new { message = "Kulüp bulunamadı" });

            return Ok(new { logoPath });
        }
    }
} 