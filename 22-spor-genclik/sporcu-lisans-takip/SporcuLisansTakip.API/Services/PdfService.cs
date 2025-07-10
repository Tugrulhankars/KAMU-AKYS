using iTextSharp.text;
using iTextSharp.text.pdf;
using SporcuLisansTakip.API.DTOs;
using System.IO;
using System.Threading.Tasks;

namespace SporcuLisansTakip.API.Services
{
    public class PdfService : IPdfService
    {
        public async Task<byte[]> GenerateLicensePdfAsync(LicenseDto license)
        {
            using var ms = new MemoryStream();
            var doc = new Document(PageSize.A4);
            var writer = PdfWriter.GetInstance(doc, ms);
            doc.Open();

            var titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 18);
            var normalFont = FontFactory.GetFont(FontFactory.HELVETICA, 12);

            doc.Add(new Paragraph("Sporcu Lisans Belgesi", titleFont));
            doc.Add(new Paragraph("\n"));
            doc.Add(new Paragraph($"Lisans No: {license.LicenseNumber}", normalFont));
            doc.Add(new Paragraph($"Sporcu: {license.AthleteName}", normalFont));
            doc.Add(new Paragraph($"TC Kimlik No: {license.AthleteIdentityNumber}", normalFont));
            doc.Add(new Paragraph($"Spor Dalı: {license.SportName}", normalFont));
            doc.Add(new Paragraph($"Lisans Türü: {license.LicenseTypeName}", normalFont));
            doc.Add(new Paragraph($"Kategori: {license.LicenseCategoryName}", normalFont));
            doc.Add(new Paragraph($"Veriliş Tarihi: {license.IssueDate:dd.MM.yyyy}", normalFont));
            doc.Add(new Paragraph($"Son Geçerlilik Tarihi: {license.ExpiryDate:dd.MM.yyyy}", normalFont));
            doc.Add(new Paragraph($"Durum: {license.Status}", normalFont));
            doc.Add(new Paragraph($"Açıklama: {license.Notes}", normalFont));

            doc.Close();
            return ms.ToArray();
        }
    }
} 