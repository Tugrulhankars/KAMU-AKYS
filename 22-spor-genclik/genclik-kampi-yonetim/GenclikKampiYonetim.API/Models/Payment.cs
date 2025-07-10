namespace GenclikKampiYonetim.API.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int RegistrationId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "TRY";
        public string PaymentMethod { get; set; } = string.Empty; // Cash, Credit Card, Bank Transfer, Online Payment
        public string? TransactionId { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Completed, Failed, Refunded, Cancelled
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
        public string? ReceiptNumber { get; set; }
        public string? InvoiceNumber { get; set; }
        public string? Notes { get; set; }
        public string? RefundReason { get; set; }
        public DateTime? RefundDate { get; set; }
        public string? RefundedBy { get; set; }
        public decimal? RefundAmount { get; set; }
        public string? RefundTransactionId { get; set; }
        public string? PaymentGateway { get; set; }
        public string? PaymentGatewayResponse { get; set; }
        public string? CardLastFourDigits { get; set; }
        public string? CardType { get; set; }
        public string? BankName { get; set; }
        public string? AccountNumber { get; set; }
        public string? CheckNumber { get; set; }
        public string? ProcessedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

        // Navigation properties
        public virtual Registration Registration { get; set; } = null!;

        // Computed properties
        public bool IsCompleted => Status == "Completed";
        public bool IsPending => Status == "Pending";
        public bool IsFailed => Status == "Failed";
        public bool IsRefunded => Status == "Refunded";
        public bool IsCancelled => Status == "Cancelled";
        public bool HasRefund => RefundAmount.HasValue && RefundAmount > 0;
        public bool IsPartialRefund => HasRefund && RefundAmount < Amount;
        public bool IsFullRefund => HasRefund && RefundAmount == Amount;
        public string PaymentMethodText => PaymentMethod switch
        {
            "Cash" => "Nakit",
            "Credit Card" => "Kredi Kartı",
            "Bank Transfer" => "Banka Transferi",
            "Online Payment" => "Online Ödeme",
            _ => PaymentMethod
        };
        public string StatusText => Status switch
        {
            "Pending" => "Beklemede",
            "Completed" => "Tamamlandı",
            "Failed" => "Başarısız",
            "Refunded" => "İade Edildi",
            "Cancelled" => "İptal Edildi",
            _ => Status
        };
        public string AmountText => $"{Amount:C} {Currency}";
        public string RefundAmountText => RefundAmount.HasValue ? $"{RefundAmount:C} {Currency}" : "";
        public bool HasTransactionId => !string.IsNullOrEmpty(TransactionId);
        public bool HasReceipt => !string.IsNullOrEmpty(ReceiptNumber);
        public bool HasInvoice => !string.IsNullOrEmpty(InvoiceNumber);
        public bool IsCreditCardPayment => PaymentMethod == "Credit Card";
        public bool IsBankTransfer => PaymentMethod == "Bank Transfer";
        public bool IsOnlinePayment => PaymentMethod == "Online Payment";
        public bool IsCashPayment => PaymentMethod == "Cash";
    }
} 