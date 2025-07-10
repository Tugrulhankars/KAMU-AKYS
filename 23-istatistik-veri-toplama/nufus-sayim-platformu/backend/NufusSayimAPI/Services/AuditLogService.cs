using NufusSayimAPI.Data;
using NufusSayimAPI.Models;

namespace NufusSayimAPI.Services;

public class AuditLogService
{
    private readonly ApplicationDbContext _context;

    public AuditLogService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task LogAsync(
        string action,
        string? entity = null,
        string? entityId = null,
        string? details = null,
        string? userId = null,
        string? userName = null,
        string? ipAddress = null)
    {
        try
        {
            var auditLog = new AuditLog
            {
                Timestamp = DateTime.UtcNow,
                UserId = userId,
                UserName = userName,
                Action = action,
                Entity = entity,
                EntityId = entityId,
                Details = details,
                IpAddress = ipAddress ?? "Unknown"
            };

            _context.AuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            // Log the error but don't throw to avoid breaking the main operation
            Console.WriteLine($"Audit log error: {ex.Message}");
        }
    }

    public async Task LogLoginAsync(string userName, string ipAddress, bool success)
    {
        var action = success ? "Başarılı Giriş" : "Başarısız Giriş";
        var details = success ? "Kullanıcı başarıyla giriş yaptı" : "Giriş denemesi başarısız";
        
        await LogAsync(action, "User", null, details, null, userName, ipAddress);
    }

    public async Task LogLogoutAsync(string userName, string ipAddress)
    {
        await LogAsync("Çıkış", "User", null, "Kullanıcı çıkış yaptı", null, userName, ipAddress);
    }

    public async Task LogCreateAsync<T>(string entityId, string userName, string ipAddress, string? details = null)
    {
        var entityName = typeof(T).Name;
        await LogAsync($"{entityName} Oluşturuldu", entityName, entityId, details, null, userName, ipAddress);
    }

    public async Task LogUpdateAsync<T>(string entityId, string userName, string ipAddress, string? details = null)
    {
        var entityName = typeof(T).Name;
        await LogAsync($"{entityName} Güncellendi", entityName, entityId, details, null, userName, ipAddress);
    }

    public async Task LogDeleteAsync<T>(string entityId, string userName, string ipAddress, string? details = null)
    {
        var entityName = typeof(T).Name;
        await LogAsync($"{entityName} Silindi", entityName, entityId, details, null, userName, ipAddress);
    }

    public async Task LogViewAsync<T>(string entityId, string userName, string ipAddress)
    {
        var entityName = typeof(T).Name;
        await LogAsync($"{entityName} Görüntülendi", entityName, entityId, null, null, userName, ipAddress);
    }

    public async Task LogSearchAsync(string searchTerm, string userName, string ipAddress, string? entity = null)
    {
        var action = entity != null ? $"{entity} Arama" : "Genel Arama";
        await LogAsync(action, entity, null, $"Arama terimi: {searchTerm}", null, userName, ipAddress);
    }

    public async Task LogExportAsync(string exportType, string userName, string ipAddress, string? details = null)
    {
        await LogAsync($"Veri Dışa Aktarım - {exportType}", "Export", null, details, null, userName, ipAddress);
    }

    public async Task LogImportAsync(string importType, string userName, string ipAddress, string? details = null)
    {
        await LogAsync($"Veri İçe Aktarım - {importType}", "Import", null, details, null, userName, ipAddress);
    }
} 