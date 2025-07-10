using AcikVeriPortali.API.Models;

namespace AcikVeriPortali.API.Services
{
    public interface IWebhookService
    {
        Task<WebhookSubscription> CreateSubscriptionAsync(string name, string url, string[] events, string? secret = null);
        Task<bool> UpdateSubscriptionAsync(int id, string name, string url, string[] events, string? secret = null);
        Task<bool> DeleteSubscriptionAsync(int id);
        Task<IEnumerable<WebhookSubscription>> GetActiveSubscriptionsAsync();
        Task<IEnumerable<WebhookLog>> GetWebhookLogsAsync(int subscriptionId, int page = 1, int pageSize = 20);
        Task<bool> TriggerWebhookAsync(string eventType, object payload);
        Task<bool> RetryFailedWebhookAsync(int logId);
        Task<bool> TestWebhookAsync(int subscriptionId);
        Task<object> GetWebhookStatisticsAsync(int subscriptionId);
        Task<bool> ValidateWebhookUrlAsync(string url);
        Task<bool> ProcessWebhookQueueAsync();
    }

    public class WebhookEvent
    {
        public string Type { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public object Data { get; set; } = new();
        public string? UserId { get; set; }
        public string? SessionId { get; set; }
    }
} 