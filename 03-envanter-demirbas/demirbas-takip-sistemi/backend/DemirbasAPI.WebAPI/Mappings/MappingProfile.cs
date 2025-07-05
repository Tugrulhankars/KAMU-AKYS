using AutoMapper;
using DemirbasAPI.Application.DTOs.Asset;
using DemirbasAPI.Application.DTOs.Assignment;
using DemirbasAPI.Application.DTOs.Auth;
using DemirbasAPI.Application.DTOs.Category;
using DemirbasAPI.Application.DTOs.User;
using DemirbasAPI.Domain.Entities;

namespace DemirbasAPI.WebAPI.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // User Mappings
        CreateMap<User, UserDto>();
        CreateMap<RegisterRequestDto, User>()
            .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow))
            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true));

        // Category Mappings
        CreateMap<Category, CategoryDto>()
            .ForMember(dest => dest.AssetCount, opt => opt.MapFrom(src => src.Assets.Count));
        CreateMap<CreateCategoryDto, Category>()
            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow));
        CreateMap<UpdateCategoryDto, Category>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
            .ForMember(dest => dest.IsDeleted, opt => opt.Ignore());

        // Asset Mappings
        CreateMap<Asset, AssetDto>();
        CreateMap<CreateAssetDto, Asset>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => Domain.Enums.AssetStatus.Available))
            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow));
        CreateMap<UpdateAssetDto, Asset>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Status, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
            .ForMember(dest => dest.IsDeleted, opt => opt.Ignore())
            .ForMember(dest => dest.CurrentAssignedUserId, opt => opt.Ignore());

        // Assignment Mappings
        CreateMap<Assignment, AssignmentDto>();
        CreateMap<CreateAssignmentDto, Assignment>()
            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.UtcNow));
    }
} 