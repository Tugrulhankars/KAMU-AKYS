using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Services;
using System.Security.Claims;

namespace SporcuLisansTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class LicenseController : ControllerBase
    {
        private readonly ILicenseService _licenseService;

        public LicenseController(ILicenseService licenseService)
        {
            _licenseService = licenseService;
        }

        [HttpGet]
        public async Task<ActionResult<List<LicenseListDto>>> GetAllLicenses()
        {
            var licenses = await _licenseService.GetAllLicensesAsync();
            return Ok(licenses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LicenseDto>> GetLicenseById(int id)
        {
            var license = await _licenseService.GetLicenseByIdAsync(id);
            if (license == null)
                return NotFound(new { message = "Lisans bulunamadı" });

            return Ok(license);
        }

        [HttpGet("number/{licenseNumber}")]
        public async Task<ActionResult<LicenseDto>> GetLicenseByNumber(string licenseNumber)
        {
            var license = await _licenseService.GetLicenseByNumberAsync(licenseNumber);
            if (license == null)
                return NotFound(new { message = "Lisans bulunamadı" });

            return Ok(license);
        }

        [HttpGet("athlete/{athleteId}")]
        public async Task<ActionResult<List<LicenseListDto>>> GetLicensesByAthlete(int athleteId)
        {
            var licenses = await _licenseService.GetLicensesByAthleteAsync(athleteId);
            return Ok(licenses);
        }

        [HttpGet("sport/{sportId}")]
        public async Task<ActionResult<List<LicenseListDto>>> GetLicensesBySport(int sportId)
        {
            var licenses = await _licenseService.GetLicensesBySportAsync(sportId);
            return Ok(licenses);
        }

        [HttpGet("expired")]
        public async Task<ActionResult<List<LicenseListDto>>> GetExpiredLicenses()
        {
            var licenses = await _licenseService.GetExpiredLicensesAsync();
            return Ok(licenses);
        }

        [HttpGet("expiring-soon")]
        public async Task<ActionResult<List<LicenseListDto>>> GetExpiringSoonLicenses()
        {
            var licenses = await _licenseService.GetExpiringSoonLicensesAsync();
            return Ok(licenses);
        }

        [HttpGet("statistics")]
        public async Task<ActionResult<LicenseStatisticsDto>> GetLicenseStatistics()
        {
            var statistics = await _licenseService.GetLicenseStatisticsAsync();
            return Ok(statistics);
        }

        [HttpPost]
        public async Task<ActionResult<LicenseDto>> CreateLicense([FromBody] CreateLicenseRequest request)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Kullanıcı kimliği bulunamadı" });

                var license = await _licenseService.CreateLicenseAsync(request, userId);
                return CreatedAtAction(nameof(GetLicenseById), new { id = license.Id }, license);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<LicenseDto>> UpdateLicense(int id, [FromBody] UpdateLicenseRequest request)
        {
            try
            {
                var license = await _licenseService.UpdateLicenseAsync(id, request);
                return Ok(license);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("renew")]
        public async Task<ActionResult<LicenseDto>> RenewLicense([FromBody] LicenseRenewalRequest request)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Kullanıcı kimliği bulunamadı" });

                var license = await _licenseService.RenewLicenseAsync(request, userId);
                return Ok(license);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("{id}/suspend")]
        public async Task<ActionResult> SuspendLicense(int id, [FromBody] SuspendLicenseRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Kullanıcı kimliği bulunamadı" });

            var result = await _licenseService.SuspendLicenseAsync(id, request.Reason, userId);
            if (!result)
                return NotFound(new { message = "Lisans bulunamadı" });

            return Ok(new { message = "Lisans askıya alındı" });
        }

        [HttpPost("{id}/cancel")]
        public async Task<ActionResult> CancelLicense(int id, [FromBody] CancelLicenseRequest request)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new { message = "Kullanıcı kimliği bulunamadı" });

            var result = await _licenseService.CancelLicenseAsync(id, request.Reason, userId);
            if (!result)
                return NotFound(new { message = "Lisans bulunamadı" });

            return Ok(new { message = "Lisans iptal edildi" });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteLicense(int id)
        {
            var result = await _licenseService.DeleteLicenseAsync(id);
            if (!result)
                return NotFound(new { message = "Lisans bulunamadı" });

            return Ok(new { message = "Lisans başarıyla silindi" });
        }

        [HttpGet("{id}/pdf")]
        public async Task<ActionResult> DownloadLicensePdf(int id)
        {
            try
            {
                var pdfBytes = await _licenseService.GenerateLicensePdfAsync(id);
                return File(pdfBytes, "application/pdf", $"license_{id}.pdf");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}/qr-code")]
        public async Task<ActionResult> GetLicenseQrCode(int id)
        {
            try
            {
                var qrCode = await _licenseService.GenerateLicenseQrCodeAsync(id);
                return Ok(new { qrCode });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

    public class SuspendLicenseRequest
    {
        public string Reason { get; set; } = string.Empty;
    }

    public class CancelLicenseRequest
    {
        public string Reason { get; set; } = string.Empty;
    }
} 