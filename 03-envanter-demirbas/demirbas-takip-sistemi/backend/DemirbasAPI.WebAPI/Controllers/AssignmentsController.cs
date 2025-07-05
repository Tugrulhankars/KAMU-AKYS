using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DemirbasAPI.Application.DTOs.Assignment;
using DemirbasAPI.Application.Interfaces;
using DemirbasAPI.Domain.Entities;
using DemirbasAPI.Domain.Enums;

namespace DemirbasAPI.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AssignmentsController : ControllerBase
{
    private readonly IAssignmentRepository _assignmentRepository;
    private readonly IAssetRepository _assetRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<AssignmentsController> _logger;

    public AssignmentsController(
        IAssignmentRepository assignmentRepository,
        IAssetRepository assetRepository,
        IUserRepository userRepository,
        IMapper mapper,
        ILogger<AssignmentsController> logger)
    {
        _assignmentRepository = assignmentRepository;
        _assetRepository = assetRepository;
        _userRepository = userRepository;
        _mapper = mapper;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAssignments()
    {
        try
        {
            var assignments = await _assignmentRepository.GetAllAsync();
            var assignmentDtos = _mapper.Map<IEnumerable<AssignmentDto>>(assignments);
            return Ok(assignmentDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Zimmet kayıtları getirilirken hata oluştu");
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAssignment(int id)
    {
        try
        {
            var assignment = await _assignmentRepository.GetByIdAsync(id);
            if (assignment == null)
            {
                return NotFound(new { message = "Zimmet kaydı bulunamadı" });
            }

            var assignmentDto = _mapper.Map<AssignmentDto>(assignment);
            return Ok(assignmentDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Zimmet kaydı getirilirken hata oluştu: {AssignmentId}", id);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateAssignment([FromBody] CreateAssignmentDto createAssignmentDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var currentUserId = GetCurrentUserId();
            
            // Asset kontrolü
            var asset = await _assetRepository.GetByIdAsync(createAssignmentDto.AssetId);
            if (asset == null)
            {
                return BadRequest(new { message = "Geçersiz demirbaş" });
            }

            // User kontrolü
            var user = await _userRepository.GetByIdAsync(createAssignmentDto.UserId);
            if (user == null)
            {
                return BadRequest(new { message = "Geçersiz kullanıcı" });
            }

            // Zimmet işlemi kontrolü
            if (createAssignmentDto.Type == AssignmentType.Assignment)
            {
                // Demirbaş müsait mi?
                if (asset.Status != AssetStatus.Available)
                {
                    return BadRequest(new { message = "Bu demirbaş zimmetlenmeye müsait değil" });
                }

                // Aktif zimmet var mı?
                var activeAssignment = await _assignmentRepository.GetActiveAssignmentAsync(createAssignmentDto.AssetId);
                if (activeAssignment != null)
                {
                    return BadRequest(new { message = "Bu demirbaş zaten zimmetli" });
                }

                // Demirbaş durumunu güncelle
                asset.Status = AssetStatus.Assigned;
                asset.CurrentAssignedUserId = createAssignmentDto.UserId;
                asset.UpdatedDate = DateTime.UtcNow;
                await _assetRepository.UpdateAsync(asset);
            }
            else if (createAssignmentDto.Type == AssignmentType.Return)
            {
                // İade işlemi - aktif zimmet var mı?
                var activeAssignment = await _assignmentRepository.GetActiveAssignmentAsync(createAssignmentDto.AssetId);
                if (activeAssignment == null)
                {
                    return BadRequest(new { message = "Bu demirbaş için aktif zimmet bulunamadı" });
                }

                // Zimmet alan kullanıcı ile iade eden aynı mı?
                if (activeAssignment.UserId != createAssignmentDto.UserId)
                {
                    return BadRequest(new { message = "Bu demirbaş farklı bir kullanıcıya zimmetli" });
                }

                // Aktif zimmeti kapat
                activeAssignment.ReturnDate = DateTime.UtcNow;
                activeAssignment.UpdatedDate = DateTime.UtcNow;
                await _assignmentRepository.UpdateAsync(activeAssignment);

                // Demirbaş durumunu güncelle
                asset.Status = AssetStatus.Available;
                asset.CurrentAssignedUserId = null;
                asset.UpdatedDate = DateTime.UtcNow;
                await _assetRepository.UpdateAsync(asset);

                createAssignmentDto.ReturnDate = DateTime.UtcNow;
            }

            var assignment = _mapper.Map<Assignment>(createAssignmentDto);
            assignment.AssignedByUserId = currentUserId;
            await _assignmentRepository.AddAsync(assignment);

            var assignmentDto = _mapper.Map<AssignmentDto>(assignment);
            _logger.LogInformation("Yeni zimmet kaydı oluşturuldu: {AssignmentType} - Asset: {AssetId} - User: {UserId}", 
                createAssignmentDto.Type, createAssignmentDto.AssetId, createAssignmentDto.UserId);
            
            return CreatedAtAction(nameof(GetAssignment), new { id = assignment.Id }, assignmentDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Zimmet kaydı oluşturulurken hata oluştu");
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetAssignmentsByUser(int userId)
    {
        try
        {
            var currentUserId = GetCurrentUserId();
            var currentUserRole = GetCurrentUserRole();

            // Sadece admin veya kendi kayıtlarını görebilir
            if (currentUserRole != UserRole.Admin && currentUserId != userId)
            {
                return Forbid();
            }

            var assignments = await _assignmentRepository.GetByUserIdAsync(userId);
            var assignmentDtos = _mapper.Map<IEnumerable<AssignmentDto>>(assignments);
            return Ok(assignmentDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Kullanıcı zimmet kayıtları getirilirken hata oluştu: {UserId}", userId);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("asset/{assetId}")]
    public async Task<IActionResult> GetAssignmentsByAsset(int assetId)
    {
        try
        {
            var assignments = await _assignmentRepository.GetByAssetIdAsync(assetId);
            var assignmentDtos = _mapper.Map<IEnumerable<AssignmentDto>>(assignments);
            return Ok(assignmentDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Demirbaş zimmet kayıtları getirilirken hata oluştu: {AssetId}", assetId);
            return StatusCode(500, new { message = "İç sunucu hatası" });
        }
    }

    [HttpGet("asset/{assetId}/active")]
    public async Task<IActionResult> GetActiveAssignment(int assetId)
    {
        try
        {
            var assignment = await _assignmentRepository.GetActiveAssignmentAsync(assetId);
            if (assignment == null)
            {
                return NotFound(new { message = "Aktif zimmet bulunamadı" });
            }

            var assignmentDto = _mapper.Map<AssignmentDto>(assignment);
            return Ok(assignmentDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Aktif zimmet getirilirken hata oluştu: {AssetId}", assetId);
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