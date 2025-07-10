using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SporTesisiRezervasyon.API.DTOs;
using SporTesisiRezervasyon.API.Services;

namespace SporTesisiRezervasyon.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FacilityController : ControllerBase
    {
        private readonly IFacilityService _facilityService;

        public FacilityController(IFacilityService facilityService)
        {
            _facilityService = facilityService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFacilities()
        {
            try
            {
                var facilities = await _facilityService.GetAllFacilitiesAsync();
                return Ok(facilities);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFacilityById(int id)
        {
            try
            {
                var facility = await _facilityService.GetFacilityByIdAsync(id);
                if (facility == null)
                    return NotFound(new { message = "Spor tesisi bulunamadı" });

                return Ok(facility);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateFacility([FromBody] CreateFacilityRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var facility = await _facilityService.CreateFacilityAsync(request);
                return CreatedAtAction(nameof(GetFacilityById), new { id = facility.Id }, facility);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateFacility(int id, [FromBody] CreateFacilityRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _facilityService.UpdateFacilityAsync(id, request);
                if (!result)
                    return NotFound(new { message = "Spor tesisi bulunamadı" });

                return Ok(new { message = "Spor tesisi başarıyla güncellendi" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteFacility(int id)
        {
            try
            {
                var result = await _facilityService.DeleteFacilityAsync(id);
                if (!result)
                    return NotFound(new { message = "Spor tesisi bulunamadı" });

                return Ok(new { message = "Spor tesisi başarıyla silindi" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("type/{typeId}")]
        public async Task<IActionResult> GetFacilitiesByType(int typeId)
        {
            try
            {
                var facilities = await _facilityService.GetFacilitiesByTypeAsync(typeId);
                return Ok(facilities);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetAllFacilityTypes()
        {
            try
            {
                var types = await _facilityService.GetAllFacilityTypesAsync();
                return Ok(types);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}/availability")]
        public async Task<IActionResult> CheckAvailability(int id, [FromQuery] DateTime startTime, [FromQuery] DateTime endTime)
        {
            try
            {
                var isAvailable = await _facilityService.IsFacilityAvailableAsync(id, startTime, endTime);
                return Ok(new { isAvailable });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
} 