using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StokAPI.Models
{
    public enum TransactionType
    {
        Giriş = 1,
        Çıkış = 2
    }

    public class StockTransaction
    {
        public int Id { get; set; }
        
        [Required]
        public int ProductId { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public TransactionType Type { get; set; }
        
        [Required]
        public int Quantity { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UnitPrice { get; set; }
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
        [StringLength(200)]
        public string? Reference { get; set; } // Fatura/Fiş numarası vb.
        
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
        
        public int StockBefore { get; set; } // İşlem öncesi stok
        
        public int StockAfter { get; set; } // İşlem sonrası stok
        
        // Navigation properties
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; } = null!;
        
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
    }
} 