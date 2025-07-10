using QRCoder;
using System.Drawing;
using System.Drawing.Imaging;

namespace SporcuLisansTakip.API.Services
{
    public class QrCodeService : IQrCodeService
    {
        public async Task<string> GenerateQrCodeAsync(string data)
        {
            using var qrGenerator = new QRCodeGenerator();
            using var qrCodeData = qrGenerator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
            using var qrCode = new BitmapByteQRCode(qrCodeData);
            var qrCodeBytes = qrCode.GetGraphic(20);
            var base64 = Convert.ToBase64String(qrCodeBytes);
            return $"data:image/png;base64,{base64}";
        }
    }
} 