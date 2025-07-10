using AcikVeriPortali.API.Models;

namespace AcikVeriPortali.API.Services
{
    public interface INotificationService
    {
        Task<Notification> CreateNotificationAsync(int? userId, string title, string message, string type = "Info", string? actionUrl = null, DateTime? expiresAt = null);
        Task<bool> CreateSystemNotificationAsync(string title, string message, string type = "Info", string? actionUrl = null);
        Task<IEnumerable<Notification>> GetUserNotificationsAsync(int userId, bool includeRead = false, int page = 1, int pageSize = 20);
        Task<IEnumerable<Notification>> GetSystemNotificationsAsync(int page = 1, int pageSize = 20);
        Task<bool> MarkAsReadAsync(int notificationId, int userId);
        Task<bool> MarkAllAsReadAsync(int userId);
        Task<bool> DeleteNotificationAsync(int notificationId, int userId);
        Task<int> GetUnreadCountAsync(int userId);
        Task<bool> SendEmailNotificationAsync(int userId, string subject, string body);
        Task<bool> SendBulkNotificationAsync(int[] userIds, string title, string message, string type = "Info");
        Task<bool> CreateDataSetUpdateNotificationAsync(int dataSetId, string updateType);
        Task<bool> CreateQualityAlertNotificationAsync(int dataSetId, string issue);
        Task<bool> CreateSystemMaintenanceNotificationAsync(string message, DateTime? scheduledTime = null);
    }
} 