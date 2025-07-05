using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StokAPI.Models
{
    public enum ProductType
    {
        SarfMalzeme = 1,
        Demirbas = 2
    }

    public class Product
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string? Description { get; set; }
        
        [StringLength(100)]
        public string? Barcode { get; set; }
        
        [Required]
        public ProductType Type { get; set; }
        
        [Required]
        public int CategoryId { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal? UnitPrice { get; set; }
        
        [StringLength(50)]
        public string? Unit { get; set; } // Adet, Kg, Lt, vb.
        
        public int CurrentStock { get; set; } = 0;
        
        public int MinStockLevel { get; set; } = 0; // Kritik stok seviyesi
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; } = null!;
        
        public virtual ICollection<StockTransaction> StockTransactions { get; set; } = new List<StockTransaction>();
    }
} 