using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StokAPI.Data;
using StokAPI.DTOs;
using StokAPI.Models;
using System.Security.Claims;

namespace StokAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UsersController> _logger;

        public UsersController(ApplicationDbContext context, ILogger<UsersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<UserDto>>>> GetUsers()
        {
            try
            {
                var users = await _context.Users
                    .Select(u => new UserDto
                    {
                        Id = u.Id,
                        FirstName = u.FirstName,
                        LastName = u.LastName,
                        Email = u.Email,
                        Username = u.Username,
                        Role = u.Role,
                        IsActive = u.IsActive,
                        CreatedAt = u.CreatedAt,
                        UpdatedAt = u.UpdatedAt
                    })
                    .OrderBy(u => u.FirstName)
                    .ToListAsync();

                return Ok(ApiResponse<List<UserDto>>.SuccessResponse(users));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kullanıcı listesi getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<List<UserDto>>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<UserDto>>> GetUser(int id)
        {
            try
            {
                var user = await _context.Users
                    .Select(u => new UserDto
                    {
                        Id = u.Id,
                        FirstName = u.FirstName,
                        LastName = u.LastName,
                        Email = u.Email,
                        Username = u.Username,
                        Role = u.Role,
                        IsActive = u.IsActive,
                        CreatedAt = u.CreatedAt,
                        UpdatedAt = u.UpdatedAt
                    })
                    .FirstOrDefaultAsync(u => u.Id == id);

                if (user == null)
                {
                    return NotFound(ApiResponse<UserDto>.ErrorResponse("Kullanıcı bulunamadı"));
                }

                return Ok(ApiResponse<UserDto>.SuccessResponse(user));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kullanıcı getirilirken hata oluştu: {UserId}", id);
                return StatusCode(500, ApiResponse<UserDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // POST: api/users
        [HttpPost]
        public async Task<ActionResult<ApiResponse<UserDto>>> CreateUser(CreateUserDto createUserDto)
        {
            try
            {
                // Kullanıcı adı ve email kontrolü
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == createUserDto.Username || u.Email == createUserDto.Email);

                if (existingUser != null)
                {
                    return BadRequest(ApiResponse<UserDto>.ErrorResponse("Bu kullanıcı adı veya email zaten kullanılıyor"));
                }

                var user = new User
                {
                    FirstName = createUserDto.FirstName,
                    LastName = createUserDto.LastName,
                    Email = createUserDto.Email,
                    Username = createUserDto.Username,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(createUserDto.Password),
                    Role = createUserDto.Role,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var userDto = new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Username = user.Username,
                    Role = user.Role,
                    IsActive = user.IsActive,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt
                };

                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, 
                    ApiResponse<UserDto>.SuccessResponse(userDto, "Kullanıcı başarıyla oluşturuldu"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kullanıcı oluşturulurken hata oluştu");
                return StatusCode(500, ApiResponse<UserDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // PUT: api/users/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<UserDto>>> UpdateUser(int id, UpdateUserDto updateUserDto)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound(ApiResponse<UserDto>.ErrorResponse("Kullanıcı bulunamadı"));
                }

                // Email kontrolü (kendi emaili hariç)
                var existingUser = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == updateUserDto.Email && u.Id != id);

                if (existingUser != null)
                {
                    return BadRequest(ApiResponse<UserDto>.ErrorResponse("Bu email zaten kullanılıyor"));
                }

                user.FirstName = updateUserDto.FirstName;
                user.LastName = updateUserDto.LastName;
                user.Email = updateUserDto.Email;
                user.Role = updateUserDto.Role;
                user.IsActive = updateUserDto.IsActive;
                user.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                var userDto = new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Username = user.Username,
                    Role = user.Role,
                    IsActive = user.IsActive,
                    CreatedAt = user.CreatedAt,
                    UpdatedAt = user.UpdatedAt
                };

                return Ok(ApiResponse<UserDto>.SuccessResponse(userDto, "Kullanıcı başarıyla güncellendi"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kullanıcı güncellenirken hata oluştu: {UserId}", id);
                return StatusCode(500, ApiResponse<UserDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteUser(int id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound(ApiResponse<bool>.ErrorResponse("Kullanıcı bulunamadı"));
                }

                // Kullanıcının stok işlemleri olup olmadığını kontrol et
                var hasTransactions = await _context.StockTransactions.AnyAsync(st => st.UserId == id);
                if (hasTransactions)
                {
                    return BadRequest(ApiResponse<bool>.ErrorResponse("Bu kullanıcının stok işlemleri olduğu için silinemez"));
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<bool>.SuccessResponse(true, "Kullanıcı başarıyla silindi"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kullanıcı silinirken hata oluştu: {UserId}", id);
                return StatusCode(500, ApiResponse<bool>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/users/current
        [HttpGet("current")]
        public async Task<ActionResult<ApiResponse<UserDto>>> GetCurrentUser()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return BadRequest(ApiResponse<UserDto>.ErrorResponse("Kullanıcı kimliği doğrulanamadı"));
                }

                var user = await _context.Users
                    .Select(u => new UserDto
                    {
                        Id = u.Id,
                        FirstName = u.FirstName,
                        LastName = u.LastName,
                        Email = u.Email,
                        Username = u.Username,
                        Role = u.Role,
                        IsActive = u.IsActive,
                        CreatedAt = u.CreatedAt,
                        UpdatedAt = u.UpdatedAt
                    })
                    .FirstOrDefaultAsync(u => u.Id == userId);

                if (user == null)
                {
                    return NotFound(ApiResponse<UserDto>.ErrorResponse("Kullanıcı bulunamadı"));
                }

                return Ok(ApiResponse<UserDto>.SuccessResponse(user));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Mevcut kullanıcı bilgisi getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<UserDto>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // PUT: api/users/change-password
        [HttpPut("change-password")]
        public async Task<ActionResult<ApiResponse<bool>>> ChangePassword(ChangePasswordDto changePasswordDto)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return BadRequest(ApiResponse<bool>.ErrorResponse("Kullanıcı kimliği doğrulanamadı"));
                }

                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound(ApiResponse<bool>.ErrorResponse("Kullanıcı bulunamadı"));
                }

                // Mevcut şifre kontrolü
                if (!BCrypt.Net.BCrypt.Verify(changePasswordDto.CurrentPassword, user.PasswordHash))
                {
                    return BadRequest(ApiResponse<bool>.ErrorResponse("Mevcut şifre hatalı"));
                }

                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NewPassword);
                user.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();

                return Ok(ApiResponse<bool>.SuccessResponse(true, "Şifre başarıyla değiştirildi"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Şifre değiştirme işlemi sırasında hata oluştu");
                return StatusCode(500, ApiResponse<bool>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }

        // GET: api/users/statistics
        [HttpGet("statistics")]
        public async Task<ActionResult<ApiResponse<object>>> GetUserStatistics()
        {
            try
            {
                var totalUsers = await _context.Users.CountAsync();
                var activeUsers = await _context.Users.CountAsync(u => u.IsActive);
                var adminCount = await _context.Users.CountAsync(u => u.Role == UserRole.Admin);
                var depoGorevlisiCount = await _context.Users.CountAsync(u => u.Role == UserRole.DepoGorevlisi);
                var incelemeYetkilisiCount = await _context.Users.CountAsync(u => u.Role == UserRole.IncelemeYetkilisi);

                var statistics = new
                {
                    TotalUsers = totalUsers,
                    ActiveUsers = activeUsers,
                    InactiveUsers = totalUsers - activeUsers,
                    AdminCount = adminCount,
                    DepoGorevlisiCount = depoGorevlisiCount,
                    IncelemeYetkilisiCount = incelemeYetkilisiCount
                };

                return Ok(ApiResponse<object>.SuccessResponse(statistics));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Kullanıcı istatistikleri getirilirken hata oluştu");
                return StatusCode(500, ApiResponse<object>.ErrorResponse("Sunucu hatası oluştu"));
            }
        }
    }
} 