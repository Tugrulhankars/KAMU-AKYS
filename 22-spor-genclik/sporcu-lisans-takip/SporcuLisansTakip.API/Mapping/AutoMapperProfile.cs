using AutoMapper;
using SporcuLisansTakip.API.DTOs;
using SporcuLisansTakip.API.Models;

namespace SporcuLisansTakip.API.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User mappings
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"));

            // Athlete mappings
            CreateMap<CreateAthleteRequest, Athlete>();
            CreateMap<UpdateAthleteRequest, Athlete>();
            CreateMap<Athlete, AthleteDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Age))
                .ForMember(dest => dest.ClubName, opt => opt.MapFrom(src => src.Club != null ? src.Club.Name : null))
                .ForMember(dest => dest.LicenseCount, opt => opt.MapFrom(src => src.Licenses.Count));

            CreateMap<Athlete, AthleteListDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.Age))
                .ForMember(dest => dest.ClubName, opt => opt.MapFrom(src => src.Club != null ? src.Club.Name : null))
                .ForMember(dest => dest.LicenseCount, opt => opt.MapFrom(src => src.Licenses.Count));

            // License mappings
            CreateMap<License, LicenseDto>()
                .ForMember(dest => dest.AthleteName, opt => opt.MapFrom(src => src.Athlete.FullName))
                .ForMember(dest => dest.AthleteIdentityNumber, opt => opt.MapFrom(src => src.Athlete.IdentityNumber))
                .ForMember(dest => dest.SportName, opt => opt.MapFrom(src => src.Sport.Name))
                .ForMember(dest => dest.LicenseTypeName, opt => opt.MapFrom(src => src.LicenseType.Name))
                .ForMember(dest => dest.LicenseCategoryName, opt => opt.MapFrom(src => src.LicenseCategory.Name))
                .ForMember(dest => dest.IssuedBy, opt => opt.MapFrom(src => src.IssuedBy != null ? $"{src.IssuedBy.FirstName} {src.IssuedBy.LastName}" : null))
                .ForMember(dest => dest.IsExpired, opt => opt.MapFrom(src => src.IsExpired))
                .ForMember(dest => dest.IsExpiringSoon, opt => opt.MapFrom(src => src.IsExpiringSoon))
                .ForMember(dest => dest.DaysUntilExpiry, opt => opt.MapFrom(src => src.DaysUntilExpiry));

            CreateMap<License, LicenseListDto>()
                .ForMember(dest => dest.AthleteName, opt => opt.MapFrom(src => src.Athlete.FullName))
                .ForMember(dest => dest.SportName, opt => opt.MapFrom(src => src.Sport.Name))
                .ForMember(dest => dest.LicenseTypeName, opt => opt.MapFrom(src => src.LicenseType.Name))
                .ForMember(dest => dest.LicenseCategoryName, opt => opt.MapFrom(src => src.LicenseCategory.Name))
                .ForMember(dest => dest.IsExpired, opt => opt.MapFrom(src => src.IsExpired))
                .ForMember(dest => dest.IsExpiringSoon, opt => opt.MapFrom(src => src.IsExpiringSoon))
                .ForMember(dest => dest.DaysUntilExpiry, opt => opt.MapFrom(src => src.DaysUntilExpiry));

            // Sport mappings
            CreateMap<CreateSportRequest, Sport>();
            CreateMap<UpdateSportRequest, Sport>();
            CreateMap<Sport, SportDto>()
                .ForMember(dest => dest.LicenseCount, opt => opt.MapFrom(src => src.Licenses.Count));

            CreateMap<Sport, SportListDto>()
                .ForMember(dest => dest.LicenseCount, opt => opt.MapFrom(src => src.Licenses.Count));

            // Club mappings
            CreateMap<CreateClubRequest, Club>();
            CreateMap<UpdateClubRequest, Club>();
            CreateMap<Club, ClubDto>()
                .ForMember(dest => dest.AthleteCount, opt => opt.MapFrom(src => src.Athletes.Count));

            CreateMap<Club, ClubListDto>()
                .ForMember(dest => dest.AthleteCount, opt => opt.MapFrom(src => src.Athletes.Count));
        }
    }
} 