using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Services;

namespace GenclikKampiYonetim.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CampController : ControllerBase
    {
        private readonly ICampService _campService;

        public CampController(ICampService campService)
        {
            _campService = campService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CampListDto>>> GetAll()
        {
            try
            {
                var camps = await _campService.GetAllAsync();
                return Ok(camps);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kamplar alınırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpGet("active")]
        public async Task<ActionResult<List<CampListDto>>> GetActive()
        {
            try
            {
                var camps = await _campService.GetActiveAsync();
                return Ok(camps);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Aktif kamplar alınırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpGet("upcoming")]
        public async Task<ActionResult<List<CampListDto>>> GetUpcoming()
        {
            try
            {
                var camps = await _campService.GetUpcomingAsync();
                return Ok(camps);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Yaklaşan kamplar alınırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpGet("ongoing")]
        public async Task<ActionResult<List<CampListDto>>> GetOngoing()
        {
            try
            {
                var camps = await _campService.GetOngoingAsync();
                return Ok(camps);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Devam eden kamplar alınırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<List<CampListDto>>> GetByCategory(int categoryId)
        {
            try
            {
                var camps = await _campService.GetByCategoryAsync(categoryId);
                return Ok(camps);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kategori kampları alınırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpGet("location/{locationId}")]
        public async Task<ActionResult<List<CampListDto>>> GetByLocation(int locationId)
        {
            try
            {
                var camps = await _campService.GetByLocationAsync(locationId);
                return Ok(camps);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lokasyon kampları alınırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpGet("search")]
        public async Task<ActionResult<List<CampListDto>>> Search([FromQuery] string q)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(q))
                    return BadRequest(new { message = "Arama terimi boş olamaz" });

                var camps = await _campService.SearchAsync(q);
                return Ok(camps);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Arama yapılırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CampDto>> GetById(int id)
        {
            try
            {
                var camp = await _campService.GetByIdAsync(id);
                return Ok(camp);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kamp detayları alınırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<CampDto>> Create([FromBody] CreateCampRequest request)
        {
            try
            {
                var camp = await _campService.CreateAsync(request);
                return CreatedAtAction(nameof(GetById), new { id = camp.Id }, camp);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kamp oluşturulurken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<CampDto>> Update(int id, [FromBody] UpdateCampRequest request)
        {
            try
            {
                var camp = await _campService.UpdateAsync(id, request);
                return Ok(camp);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kamp güncellenirken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                await _campService.DeleteAsync(id);
                return Ok(new { message = "Kamp başarıyla silindi" });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kamp silinirken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPost("{id}/activate")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult> Activate(int id)
        {
            try
            {
                await _campService.ActivateAsync(id);
                return Ok(new { message = "Kamp başarıyla aktifleştirildi" });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kamp aktifleştirilirken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPost("{id}/deactivate")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult> Deactivate(int id)
        {
            try
            {
                await _campService.DeactivateAsync(id);
                return Ok(new { message = "Kamp başarıyla deaktifleştirildi" });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Kamp deaktifleştirilirken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpGet("statistics")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult<CampStatisticsDto>> GetStatistics()
        {
            try
            {
                var statistics = await _campService.GetStatisticsAsync();
                return Ok(statistics);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "İstatistikler alınırken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPost("{id}/photo")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult> UploadPhoto(int id, IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest(new { message = "Dosya seçilmedi" });

                var photoPath = await _campService.UploadPhotoAsync(id, file);
                return Ok(new { message = "Fotoğraf başarıyla yüklendi", photoPath });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Fotoğraf yüklenirken bir hata oluştu", error = ex.Message });
            }
        }

        [HttpPost("{id}/brochure")]
        [Authorize(Roles = "Admin,Staff")]
        public async Task<ActionResult> UploadBrochure(int id, IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest(new { message = "Dosya seçilmedi" });

                var brochurePath = await _campService.UploadBrochureAsync(id, file);
                return Ok(new { message = "Broşür başarıyla yüklendi", brochurePath });
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Broşür yüklenirken bir hata oluştu", error = ex.Message });
            }
        }
    }
} 