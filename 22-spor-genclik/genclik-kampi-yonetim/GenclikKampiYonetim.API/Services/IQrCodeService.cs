namespace GenclikKampiYonetim.API.Services
{
    public interface IQrCodeService
    {
        Task<byte[]> GenerateQrCodeAsync(string content);
        Task<string> GenerateQrCodeBase64Async(string content);
        Task<byte[]> GenerateQrCodeForRegistrationAsync(int registrationId);
        Task<byte[]> GenerateQrCodeForCampAsync(int campId);
    }
} 