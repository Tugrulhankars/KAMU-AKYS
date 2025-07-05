using StokAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace StokAPI.DTOs
{
    public class StockTransactionDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string? ProductBarcode { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public TransactionType Type { get; set; }
        public int Quantity { get; set; }
        public decimal? UnitPrice { get; set; }
        public string? Description { get; set; }
        public string? Reference { get; set; }
        public DateTime TransactionDate { get; set; }
        public int StockBefore { get; set; }
        public int StockAfter { get; set; }
    }

    public class CreateStockTransactionDto
    {
        [Required]
        public int ProductId { get; set; }
        
        [Required]
        public TransactionType Type { get; set; }
        
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Miktar en az 1 olmalıdır")]
        public int Quantity { get; set; }
        
        public decimal? UnitPrice { get; set; }
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
        [StringLength(200)]
        public string? Reference { get; set; }
    }

    public class BarcodeTransactionDto
    {
        [Required]
        public string Barcode { get; set; } = string.Empty;
        
        [Required]
        public TransactionType Type { get; set; }
        
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Miktar en az 1 olmalıdır")]
        public int Quantity { get; set; }
        
        public decimal? UnitPrice { get; set; }
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
        [StringLength(200)]
        public string? Reference { get; set; }
    }

    public class StockTransactionFilterDto
    {
        public int? ProductId { get; set; }
        public int? UserId { get; set; }
        public TransactionType? Type { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Search { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
} 