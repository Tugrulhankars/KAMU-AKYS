namespace GenclikKampiYonetim.API.Services
{
    public interface IPdfService
    {
        Task<byte[]> GenerateCampReportAsync(int campId);
        Task<byte[]> GenerateParticipantReportAsync(int participantId);
        Task<byte[]> GenerateRegistrationReportAsync(int registrationId);
        Task<byte[]> GeneratePaymentReceiptAsync(int paymentId);
        Task<byte[]> GenerateCertificateAsync(int registrationId);
    }
} 