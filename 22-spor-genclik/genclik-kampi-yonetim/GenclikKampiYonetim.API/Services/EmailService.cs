namespace GenclikKampiYonetim.API.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            // Email gönderme işlemi burada implement edilecek
            await Task.Delay(100); // Simüle edilmiş işlem
        }

        public async Task SendRegistrationConfirmationAsync(int registrationId)
        {
            // Kayıt onay emaili gönderme işlemi burada implement edilecek
            await Task.Delay(100); // Simüle edilmiş işlem
        }

        public async Task SendPaymentConfirmationAsync(int paymentId)
        {
            // Ödeme onay emaili gönderme işlemi burada implement edilecek
            await Task.Delay(100); // Simüle edilmiş işlem
        }

        public async Task SendCampReminderAsync(int campId)
        {
            // Kamp hatırlatma emaili gönderme işlemi burada implement edilecek
            await Task.Delay(100); // Simüle edilmiş işlem
        }

        public async Task SendCancellationNotificationAsync(int registrationId)
        {
            // İptal bildirimi emaili gönderme işlemi burada implement edilecek
            await Task.Delay(100); // Simüle edilmiş işlem
        }
    }
} 