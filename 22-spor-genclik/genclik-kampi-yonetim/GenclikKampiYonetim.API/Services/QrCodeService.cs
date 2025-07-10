namespace GenclikKampiYonetim.API.Services
{
    public class QrCodeService : IQrCodeService
    {
        public async Task<byte[]> GenerateQrCodeAsync(string content)
        {
            // QR kod oluşturma işlemi burada implement edilecek
            await Task.Delay(100); // Simüle edilmiş işlem
            return new byte[0];
        }

        public async Task<string> GenerateQrCodeBase64Async(string content)
        {
            // QR kod oluşturma işlemi burada implement edilecek
            await Task.Delay(100); // Simüle edilmiş işlem
            return string.Empty;
        }

        public async Task<byte[]> GenerateQrCodeForRegistrationAsync(int registrationId)
        {
            // QR kod oluşturma işlemi burada implement edilecek
            await Task.Delay(100); // Simüle edilmiş işlem
            return new byte[0];
        }

        public async Task<byte[]> GenerateQrCodeForCampAsync(int campId)
        {
            // QR kod oluşturma işlemi burada implement edilecek
            await Task.Delay(100); // Simüle edilmiş işlem
            return new byte[0];
        }
    }
} 