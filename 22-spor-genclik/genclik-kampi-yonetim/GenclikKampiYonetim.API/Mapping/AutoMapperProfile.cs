using AutoMapper;
using GenclikKampiYonetim.API.DTOs;
using GenclikKampiYonetim.API.Models;

namespace GenclikKampiYonetim.API.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User mappings
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName));
            CreateMap<ApplicationUser, UserListDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName));
            CreateMap<CreateUserRequest, ApplicationUser>();
            CreateMap<UpdateUserRequest, ApplicationUser>();

            // Camp mappings
            CreateMap<Camp, CampDto>()
                .ForMember(dest => dest.LocationName, opt => opt.MapFrom(src => src.Location.Name))
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));
            CreateMap<Camp, CampListDto>()
                .ForMember(dest => dest.LocationName, opt => opt.MapFrom(src => src.Location.Name))
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name));
            CreateMap<CreateCampRequest, Camp>();
            CreateMap<UpdateCampRequest, Camp>();

            // CampLocation mappings
            CreateMap<CampLocation, CampLocationDto>();
            CreateMap<CreateCampLocationRequest, CampLocation>();
            CreateMap<UpdateCampLocationRequest, CampLocation>();

            // CampCategory mappings
            CreateMap<CampCategory, CampCategoryDto>();
            CreateMap<CreateCampCategoryRequest, CampCategory>();
            CreateMap<UpdateCampCategoryRequest, CampCategory>();

            // Participant mappings
            CreateMap<Participant, ParticipantDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName));
            CreateMap<Participant, ParticipantListDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName));
            CreateMap<CreateParticipantRequest, Participant>();
            CreateMap<UpdateParticipantRequest, Participant>();

            // Activity mappings
            CreateMap<Activity, ActivityDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.DurationText, opt => opt.MapFrom(src => src.DurationText));
            CreateMap<Activity, ActivityListDto>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
                .ForMember(dest => dest.DurationText, opt => opt.MapFrom(src => src.DurationText));
            CreateMap<CreateActivityRequest, Activity>();
            CreateMap<UpdateActivityRequest, Activity>();

            // ActivityCategory mappings
            CreateMap<ActivityCategory, ActivityCategoryDto>();
            CreateMap<CreateActivityCategoryRequest, ActivityCategory>();
            CreateMap<UpdateActivityCategoryRequest, ActivityCategory>();

            // Registration mappings
            CreateMap<Registration, RegistrationDto>()
                .ForMember(dest => dest.CampName, opt => opt.MapFrom(src => src.Camp.Name))
                .ForMember(dest => dest.ParticipantName, opt => opt.MapFrom(src => src.Participant.FullName))
                .ForMember(dest => dest.RegisteredByName, opt => opt.MapFrom(src => src.RegisteredBy.FullName));
            CreateMap<Registration, RegistrationListDto>()
                .ForMember(dest => dest.CampName, opt => opt.MapFrom(src => src.Camp.Name))
                .ForMember(dest => dest.ParticipantName, opt => opt.MapFrom(src => src.Participant.FullName));
            CreateMap<CreateRegistrationRequest, Registration>();
            CreateMap<UpdateRegistrationRequest, Registration>();

            // EmergencyContact mappings
            CreateMap<EmergencyContact, EmergencyContactDto>();
            CreateMap<CreateEmergencyContactRequest, EmergencyContact>();
            CreateMap<UpdateEmergencyContactRequest, EmergencyContact>();

            // HealthRecord mappings
            CreateMap<HealthRecord, HealthRecordDto>();
            CreateMap<CreateHealthRecordRequest, HealthRecord>();
            CreateMap<UpdateHealthRecordRequest, HealthRecord>();

            // CampStaff mappings
            CreateMap<CampStaff, CampStaffDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.Name));
            CreateMap<CampStaff, CampStaffListDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.RoleName, opt => opt.MapFrom(src => src.Role.Name));
            CreateMap<CreateCampStaffRequest, CampStaff>();
            CreateMap<UpdateCampStaffRequest, CampStaff>();

            // StaffRole mappings
            CreateMap<StaffRole, StaffRoleDto>();
            CreateMap<CreateStaffRoleRequest, StaffRole>();
            CreateMap<UpdateStaffRoleRequest, StaffRole>();

            // CampSchedule mappings
            CreateMap<CampSchedule, CampScheduleDto>();
            CreateMap<CreateCampScheduleRequest, CampSchedule>();
            CreateMap<UpdateCampScheduleRequest, CampSchedule>();

            // MealPlan mappings
            CreateMap<MealPlan, MealPlanDto>();
            CreateMap<CreateMealPlanRequest, MealPlan>();
            CreateMap<UpdateMealPlanRequest, MealPlan>();

            // Transportation mappings
            CreateMap<Transportation, TransportationDto>();
            CreateMap<CreateTransportationRequest, Transportation>();
            CreateMap<UpdateTransportationRequest, Transportation>();

            // Payment mappings
            CreateMap<Payment, PaymentDto>();
            CreateMap<CreatePaymentRequest, Payment>();
            CreateMap<UpdatePaymentRequest, Payment>();
        }
    }
} 