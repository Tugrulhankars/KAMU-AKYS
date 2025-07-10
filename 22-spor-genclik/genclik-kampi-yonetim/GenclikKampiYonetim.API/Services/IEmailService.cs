namespace GenclikKampiYonetim.API.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
        Task SendRegistrationConfirmationAsync(int registrationId);
        Task SendPaymentConfirmationAsync(int paymentId);
        Task SendCampReminderAsync(int campId);
        Task SendCancellationNotificationAsync(int registrationId);
    }
} 