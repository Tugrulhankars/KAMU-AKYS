using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Services;

namespace SporcuLisansTakip.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "Kullanıcı bulunamadı" });

            return Ok(user);
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<UserDto>> GetUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null)
                return NotFound(new { message = "Kullanıcı bulunamadı" });

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(string id, [FromBody] UserDto userDto)
        {
            try
            {
                var result = await _userService.UpdateUserAsync(id, userDto);
                if (!result)
                    return NotFound(new { message = "Kullanıcı bulunamadı" });

                return Ok(new { message = "Kullanıcı başarıyla güncellendi" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("{id}/deactivate")]
        public async Task<ActionResult> DeactivateUser(string id)
        {
            var result = await _userService.DeactivateUserAsync(id);
            if (!result)
                return NotFound(new { message = "Kullanıcı bulunamadı" });

            return Ok(new { message = "Kullanıcı pasif hale getirildi" });
        }

        [HttpPost("{id}/activate")]
        public async Task<ActionResult> ActivateUser(string id)
        {
            var result = await _userService.ActivateUserAsync(id);
            if (!result)
                return NotFound(new { message = "Kullanıcı bulunamadı" });

            return Ok(new { message = "Kullanıcı aktif hale getirildi" });
        }

        [HttpPost("change-password")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            try
            {
                var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Kullanıcı kimliği bulunamadı" });

                var result = await _userService.ChangePasswordAsync(userId, request.CurrentPassword, request.NewPassword);
                if (result)
                    return Ok(new { message = "Şifre başarıyla değiştirildi" });
                else
                    return BadRequest(new { message = "Şifre değiştirilemedi" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
} 