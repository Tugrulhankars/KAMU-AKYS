namespace GenclikKampiYonetim.API.Services
{
    public interface IReportService
    {
        Task<byte[]> GenerateCampReportAsync(int campId);
        Task<byte[]> GenerateParticipantReportAsync(int participantId);
        Task<byte[]> GenerateRegistrationReportAsync(int registrationId);
        Task<byte[]> GeneratePaymentReportAsync(int paymentId);
        Task<byte[]> GenerateStatisticsReportAsync();
    }
} 