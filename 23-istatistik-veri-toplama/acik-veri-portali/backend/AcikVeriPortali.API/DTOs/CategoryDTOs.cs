using System.ComponentModel.DataAnnotations;

namespace AcikVeriPortali.API.DTOs
{
    public class CategoryCreateRequest
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string Description { get; set; } = string.Empty;
        
        [StringLength(50)]
        public string Color { get; set; } = "#007bff";
        
        public string? Icon { get; set; }
        
        public int? ParentCategoryId { get; set; }
    }

    public class CategoryUpdateRequest
    {
        [StringLength(100)]
        public string? Name { get; set; }
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        [StringLength(50)]
        public string? Color { get; set; }
        
        public string? Icon { get; set; }
        
        public int? ParentCategoryId { get; set; }
        
        public bool? IsActive { get; set; }
    }

    public class CategoryResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string? Icon { get; set; }
        public int? ParentCategoryId { get; set; }
        public string? ParentCategoryName { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int DataSetCount { get; set; }
        public List<CategoryResponse> SubCategories { get; set; } = new List<CategoryResponse>();
    }
} 