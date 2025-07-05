using StokAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace StokAPI.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Barcode { get; set; }
        public ProductType Type { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public decimal? UnitPrice { get; set; }
        public string? Unit { get; set; }
        public int CurrentStock { get; set; }
        public int MinStockLevel { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsCriticalStock => CurrentStock <= MinStockLevel;
    }

    public class CreateProductDto
    {
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
        
        public decimal? UnitPrice { get; set; }
        
        [StringLength(50)]
        public string? Unit { get; set; }
        
        [Range(0, int.MaxValue)]
        public int CurrentStock { get; set; } = 0;
        
        [Range(0, int.MaxValue)]
        public int MinStockLevel { get; set; } = 0;
    }

    public class UpdateProductDto
    {
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
        
        public decimal? UnitPrice { get; set; }
        
        [StringLength(50)]
        public string? Unit { get; set; }
        
        [Range(0, int.MaxValue)]
        public int MinStockLevel { get; set; } = 0;
        
        public bool IsActive { get; set; }
    }

    public class ProductFilterDto
    {
        public string? Search { get; set; }
        public int? CategoryId { get; set; }
        public ProductType? Type { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsCriticalStock { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? SortBy { get; set; }
        public string? SortDir { get; set; }
    }
} 