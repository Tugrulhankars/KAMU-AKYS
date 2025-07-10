using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SporTesisiRezervasyon.API.DTOs;
using SporTesisiRezervasyon.API.Services;
using System.Security.Claims;

namespace SporTesisiRezervasyon.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllReservations()
        {
            try
            {
                var reservations = await _reservationService.GetAllReservationsAsync();
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservationById(int id)
        {
            try
            {
                var reservation = await _reservationService.GetReservationByIdAsync(id);
                if (reservation == null)
                    return NotFound(new { message = "Rezervasyon bulunamadı" });

                // Kullanıcı sadece kendi rezervasyonlarını görebilir (Admin hariç)
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                
                if (userRole != "Admin" && reservation.UserId != userId)
                    return Forbid();

                return Ok(reservation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] CreateReservationRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var reservation = await _reservationService.CreateReservationAsync(request, userId);
                return CreatedAtAction(nameof(GetReservationById), new { id = reservation.Id }, reservation);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReservation(int id, [FromBody] CreateReservationRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                // Kullanıcı sadece kendi rezervasyonlarını güncelleyebilir (Admin hariç)
                var reservation = await _reservationService.GetReservationByIdAsync(id);
                if (reservation == null)
                    return NotFound(new { message = "Rezervasyon bulunamadı" });

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                
                if (userRole != "Admin" && reservation.UserId != userId)
                    return Forbid();

                var result = await _reservationService.UpdateReservationAsync(id, request);
                if (!result)
                    return BadRequest(new { message = "Rezervasyon güncellenemedi" });

                return Ok(new { message = "Rezervasyon başarıyla güncellendi" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelReservation(int id)
        {
            try
            {
                // Kullanıcı sadece kendi rezervasyonlarını iptal edebilir (Admin hariç)
                var reservation = await _reservationService.GetReservationByIdAsync(id);
                if (reservation == null)
                    return NotFound(new { message = "Rezervasyon bulunamadı" });

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;
                
                if (userRole != "Admin" && reservation.UserId != userId)
                    return Forbid();

                var result = await _reservationService.CancelReservationAsync(id);
                if (!result)
                    return BadRequest(new { message = "Rezervasyon iptal edilemedi" });

                return Ok(new { message = "Rezervasyon başarıyla iptal edildi" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("my-reservations")]
        public async Task<IActionResult> GetMyReservations()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized();

                var reservations = await _reservationService.GetReservationsByUserAsync(userId);
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("facility/{facilityId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetReservationsByFacility(int facilityId)
        {
            try
            {
                var reservations = await _reservationService.GetReservationsByFacilityAsync(facilityId);
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("date-range")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetReservationsByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                var reservations = await _reservationService.GetReservationsByDateRangeAsync(startDate, endDate);
                return Ok(reservations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("availability")]
        public async Task<IActionResult> CheckTimeSlotAvailability([FromQuery] int facilityId, [FromQuery] DateTime startTime, [FromQuery] DateTime endTime)
        {
            try
            {
                var isAvailable = await _reservationService.IsTimeSlotAvailableAsync(facilityId, startTime, endTime);
                return Ok(new { isAvailable });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
} 