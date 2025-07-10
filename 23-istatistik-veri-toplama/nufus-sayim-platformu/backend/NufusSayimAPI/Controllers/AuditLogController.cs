using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NufusSayimAPI.Data;
using NufusSayimAPI.Models;
using NufusSayimAPI.Services;

namespace NufusSayimAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AuditLogController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public AuditLogController(ApplicationDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<object>> GetAuditLogs(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? action = null,
        [FromQuery] string? entity = null,
        [FromQuery] string? userName = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        try
        {
            var query = _context.AuditLogs.AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(action))
                query = query.Where(a => a.Action.ToLower().Contains(action.ToLower()));

            if (!string.IsNullOrEmpty(entity))
                query = query.Where(a => a.Entity != null && a.Entity.ToLower().Contains(entity.ToLower()));

            if (!string.IsNullOrEmpty(userName))
                query = query.Where(a => a.UserName != null && a.UserName.ToLower().Contains(userName.ToLower()));

            if (startDate.HasValue)
                query = query.Where(a => a.Timestamp >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(a => a.Timestamp <= endDate.Value.AddDays(1));

            var totalCount = await query.CountAsync();
            var pageCount = (int)Math.Ceiling((double)totalCount / pageSize);

            var logs = await query
                .OrderByDescending(a => a.Timestamp)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(a => new
                {
                    a.Id,
                    a.Timestamp,
                    a.UserName,
                    a.Action,
                    a.Entity,
                    a.EntityId,
                    a.Details,
                    a.IpAddress
                })
                .ToListAsync();

            var result = new
            {
                Items = logs,
                TotalCount = totalCount,
                PageCount = pageCount,
                CurrentPage = page,
                PageSize = pageSize
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Audit logları listelenirken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<object>> GetAuditLog(int id)
    {
        try
        {
            var log = await _context.AuditLogs
                .Where(a => a.Id == id)
                .Select(a => new
                {
                    a.Id,
                    a.Timestamp,
                    a.UserId,
                    a.UserName,
                    a.Action,
                    a.Entity,
                    a.EntityId,
                    a.Details,
                    a.IpAddress
                })
                .FirstOrDefaultAsync();

            if (log == null)
            {
                return NotFound(new { message = "Audit log bulunamadı" });
            }

            return Ok(log);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Audit log bilgileri alınırken hata oluştu", error = ex.Message });
        }
    }

    [HttpPost]
    public async Task<ActionResult<object>> CreateAuditLog([FromBody] CreateAuditLogRequest request)
    {
        try
        {
            // Get current user info
            var token = Request.Headers["Authorization"].FirstOrDefault()?.Replace("Bearer ", "");
            var userId = _jwtService.GetUserIdFromToken(token!);
            var userName = _jwtService.GetUsernameFromToken(token!);

            // Get client IP address
            var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";

            var auditLog = new AuditLog
            {
                Timestamp = DateTime.UtcNow,
                UserId = userId?.ToString(),
                UserName = userName,
                Action = request.Action,
                Entity = request.Entity,
                EntityId = request.EntityId,
                Details = request.Details,
                IpAddress = ipAddress
            };

            _context.AuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Audit log başarıyla oluşturuldu", id = auditLog.Id });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Audit log oluşturulurken hata oluştu", error = ex.Message });
        }
    }

    [HttpGet("stats")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<object>> GetAuditLogStats()
    {
        try
        {
            var totalLogs = await _context.AuditLogs.CountAsync();
            var last24Hours = await _context.AuditLogs
                .CountAsync(a => a.Timestamp >= DateTime.UtcNow.AddHours(-24));
            var last7Days = await _context.AuditLogs
                .CountAsync(a => a.Timestamp >= DateTime.UtcNow.AddDays(-7));

            // Most active users
            var activeUsers = await _context.AuditLogs
                .Where(a => a.Timestamp >= DateTime.UtcNow.AddDays(-7) && a.UserName != null)
                .GroupBy(a => a.UserName)
                .Select(g => new { UserName = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .Take(5)
                .ToListAsync();

            // Most common actions
            var commonActions = await _context.AuditLogs
                .Where(a => a.Timestamp >= DateTime.UtcNow.AddDays(-7))
                .GroupBy(a => a.Action)
                .Select(g => new { Action = g.Key, Count = g.Count() })
                .OrderByDescending(x => x.Count)
                .Take(5)
                .ToListAsync();

            // Daily activity for last 7 days
            var dailyActivity = await _context.AuditLogs
                .Where(a => a.Timestamp >= DateTime.UtcNow.AddDays(-7))
                .GroupBy(a => a.Timestamp.Date)
                .Select(g => new { Date = g.Key, Count = g.Count() })
                .OrderBy(x => x.Date)
                .ToListAsync();

            var stats = new
            {
                TotalLogs = totalLogs,
                Last24Hours = last24Hours,
                Last7Days = last7Days,
                ActiveUsers = activeUsers,
                CommonActions = commonActions,
                DailyActivity = dailyActivity
            };

            return Ok(stats);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Audit log istatistikleri hesaplanırken hata oluştu", error = ex.Message });
        }
    }

    [HttpDelete("cleanup")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> CleanupOldLogs([FromQuery] int daysToKeep = 90)
    {
        try
        {
            var cutoffDate = DateTime.UtcNow.AddDays(-daysToKeep);
            var oldLogs = await _context.AuditLogs
                .Where(a => a.Timestamp < cutoffDate)
                .ToListAsync();

            if (oldLogs.Any())
            {
                _context.AuditLogs.RemoveRange(oldLogs);
                await _context.SaveChangesAsync();

                return Ok(new { message = $"{oldLogs.Count} eski audit log kaydı temizlendi" });
            }

            return Ok(new { message = "Temizlenecek eski kayıt bulunamadı" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Audit log temizliği sırasında hata oluştu", error = ex.Message });
        }
    }
}

public class CreateAuditLogRequest
{
    public string Action { get; set; } = string.Empty;
    public string? Entity { get; set; }
    public string? EntityId { get; set; }
    public string? Details { get; set; }
} 