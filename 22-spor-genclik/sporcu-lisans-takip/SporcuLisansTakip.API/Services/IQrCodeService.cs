namespace SporcuLisansTakip.API.Services
{
    public interface IQrCodeService
    {
        Task<string> GenerateQrCodeAsync(string data);
    }
} 