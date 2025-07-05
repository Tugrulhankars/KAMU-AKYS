using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DemirbasAPI.Application.DTOs.Asset;
using DemirbasAPI.Application.Interfaces;
using DemirbasAPI.Domain.Entities;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssetsController : ControllerBase
{
    private readonly IAssetRepository _assetRepository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<AssetsController> _logger;

    public AssetsController(
        IAssetRepository assetRepository,
        ICategoryRepository categoryRepository,
        IMapper mapper,
        ILogger<AssetsController> logger)
    {
        _assetRepository = assetRepository;
        _categoryRepository = categoryRepository;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAssets()
    {
        try
        {
            var assets = await _assetRepository.GetAllAsync();
            var assetDtos = _mapper.Map<IEnumerable<AssetDto>>(assets);
            return Ok(assetDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Demirbaşlar getirilirken hata oluştu");
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAsset(int id)
    {
        try
        {
            var asset = await _assetRepository.GetByIdAsync(id);
            if (asset == null)
            {
                return NotFound(new { message = "Demirbaş bulunamadı" });
            }

            var assetDto = _mapper.Map<AssetDto>(asset);
            return Ok(assetDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Demirbaş getirilirken hata oluştu: {AssetId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateAsset([FromBody] CreateAssetDto createAssetDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kategori kontrolü
            var category = await _categoryRepository.GetByIdAsync(createAssetDto.CategoryId);
            if (category == null)
            {
                return BadRequest(new { message = "Geçersiz kategori" });
            }

            // Demirbaş kodu kontrolü
            if (await _assetRepository.IsAssetCodeExistsAsync(createAssetDto.AssetCode))
            {
                return BadRequest(new { message = "Bu demirbaş kodu zaten kullanılıyor" });
            }

            var asset = _mapper.Map<Asset>(createAssetDto);
            await _assetRepository.AddAsync(asset);

            var assetDto = _mapper.Map<AssetDto>(asset);
            _logger.LogInformation("Yeni demirbaş oluşturuldu: {AssetCode}", asset.AssetCode);
            
            return CreatedAtAction(nameof(GetAsset), new { id = asset.Id }, assetDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Demirbaş oluşturulurken hata oluştu");
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAsset(int id, [FromBody] UpdateAssetDto updateAssetDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var asset = await _assetRepository.GetByIdAsync(id);
            if (asset == null)
            {
                return NotFound(new { message = "Demirbaş bulunamadı" });
            }

            // Kategori kontrolü
            var category = await _categoryRepository.GetByIdAsync(updateAssetDto.CategoryId);
            if (category == null)
            {
                return BadRequest(new { message = "Geçersiz kategori" });
            }

            // Demirbaş kodu kontrolü (başka bir demirbaşta aynı kod var mı?)
            var existingAsset = await _assetRepository.GetByAssetCodeAsync(updateAssetDto.AssetCode);
            if (existingAsset != null && existingAsset.Id != id)
            {
                return BadRequest(new { message = "Bu demirbaş kodu zaten kullanılıyor" });
            }

            _mapper.Map(updateAssetDto, asset);
            asset.UpdatedDate = DateTime.UtcNow;
            await _assetRepository.UpdateAsync(asset);

            var assetDto = _mapper.Map<AssetDto>(asset);
            _logger.LogInformation("Demirbaş güncellendi: {AssetId}", id);
            
            return Ok(assetDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Demirbaş güncellenirken hata oluştu: {AssetId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAsset(int id)
    {
        try
        {
            var asset = await _assetRepository.GetByIdAsync(id);
            if (asset == null)
            {
                return NotFound(new { message = "Demirbaş bulunamadı" });
            }

            // Zimmetli demirbaş silinemez
            if (asset.Status == AssetStatus.Assigned)
            {
                return BadRequest(new { message = "Zimmetli demirbaş silinemez" });
            }

            asset.IsDeleted = true;
            asset.UpdatedDate = DateTime.UtcNow;
            await _assetRepository.UpdateAsync(asset);

            _logger.LogInformation("Demirbaş silindi: {AssetId}", id);
            return Ok(new { message = "Demirbaş başarıyla silindi" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Demirbaş silinirken hata oluştu: {AssetId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("by-status/{status}")]
    public async Task<IActionResult> GetAssetsByStatus(AssetStatus status)
    {
        try
        {
            var assets = await _assetRepository.GetByStatusAsync(status);
            var assetDtos = _mapper.Map<IEnumerable<AssetDto>>(assets);
            return Ok(assetDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Durum bazlı demirbaşlar getirilirken hata oluştu: {Status}", status);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("by-category/{categoryId}")]
    public async Task<IActionResult> GetAssetsByCategory(int categoryId)
    {
        try
        {
            var assets = await _assetRepository.GetByCategoryIdAsync(categoryId);
            var assetDtos = _mapper.Map<IEnumerable<AssetDto>>(assets);
            return Ok(assetDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kategori bazlı demirbaşlar getirilirken hata oluştu: {CategoryId}", categoryId);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("user/{userId}/assigned")]
    public async Task<IActionResult> GetAssignedAssets(int userId)
    {
        try
        {
            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            // Sadece admin veya kendi zimmetli demirbaşlarını görebilir
            if (currentUserRole != UserRole.Admin && currentUserId != userId)
            {
                return Forbid();
            }

            var assets = await _assetRepository.GetAssignedAssetsAsync(userId);
            var assetDtos = _mapper.Map<IEnumerable<AssetDto>>(assets);
            return Ok(assetDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kullanıcı zimmetli demirbaşları getirilirken hata oluştu: {UserId}", userId);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateAssetStatus(int id, [FromBody] UpdateAssetStatusDto statusDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var asset = await _assetRepository.GetByIdAsync(id);
            if (asset == null)
            {
                return NotFound(new { message = "Demirbaş bulunamadı" });
            }

            asset.Status = statusDto.Status;
            asset.UpdatedDate = DateTime.UtcNow;
            await _assetRepository.UpdateAsync(asset);

            _logger.LogInformation("Demirbaş durumu güncellendi: {AssetId} - {Status}", id, statusDto.Status);
            return Ok(new { message = "Demirbaş durumu başarıyla güncellendi" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Demirbaş durumu güncellenirken hata oluştu: {AssetId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
    }

    private UserRole GetCurrentUserRole()
    {
        var roleClaim = User.FindFirst(System.Security.Claims.ClaimTypes.Role);
        return roleClaim != null && Enum.TryParse<UserRole>(roleClaim.Value, out var role) ? role : UserRole.Personel;
    }
} 