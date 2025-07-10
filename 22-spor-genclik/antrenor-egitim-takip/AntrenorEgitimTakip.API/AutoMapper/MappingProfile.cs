using AutoMapper;
using AntrenorEgitimTakip.API.Models;
using AntrenorEgitimTakip.API.DTOs;

namespace AntrenorEgitimTakip.API.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User mappings
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"));
            CreateMap<UserDto, User>();
            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>();

            // Role mappings
            CreateMap<Role, RoleDto>();
            CreateMap<RoleDto, Role>();
            CreateMap<CreateRoleDto, Role>();
            CreateMap<UpdateRoleDto, Role>();

            // UserRole mappings
            CreateMap<UserRole, UserRoleDto>();
            CreateMap<UserRoleDto, UserRole>();
            CreateMap<CreateUserRoleDto, UserRole>();

            // Trainer mappings
            CreateMap<Antrenor, AntrenorDto>()
                .ForMember(dest => dest.AntrenorAdSoyad, opt => opt.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.User.PhoneNumber))
                .ForMember(dest => dest.LicenseValid, opt => opt.MapFrom(src => src.LicenseValid))
                .ForMember(dest => dest.ExperienceYears, opt => opt.MapFrom(src => src.ExperienceYears));
            CreateMap<AntrenorDto, Antrenor>();
            CreateMap<CreateAntrenorDto, Antrenor>();
            CreateMap<UpdateAntrenorDto, Antrenor>();

            // TrainerInfo mappings
            CreateMap<AntrenorBilgi, AntrenorBilgiDto>();
            CreateMap<AntrenorBilgiDto, AntrenorBilgi>();
            CreateMap<CreateAntrenorBilgiDto, AntrenorBilgi>();
            CreateMap<UpdateAntrenorBilgiDto, AntrenorBilgi>();

            // TrainerExperience mappings
            CreateMap<AntrenorDeneyim, AntrenorDeneyimDto>()
                .ForMember(dest => dest.IsOngoing, opt => opt.MapFrom(src => src.IsOngoing))
                .ForMember(dest => dest.TotalDuration, opt => opt.MapFrom(src => src.TotalDuration));
            CreateMap<AntrenorDeneyimDto, AntrenorDeneyim>();
            CreateMap<CreateAntrenorDeneyimDto, AntrenorDeneyim>();
            CreateMap<UpdateAntrenorDeneyimDto, AntrenorDeneyim>();

            // Expertise mappings
            CreateMap<Uzmanlik, UzmanlikDto>();
            CreateMap<UzmanlikDto, Uzmanlik>();
            CreateMap<CreateUzmanlikDto, Uzmanlik>();
            CreateMap<UpdateUzmanlikDto, Uzmanlik>();

            // TrainerExpertise mappings
            CreateMap<AntrenorUzmanlik, AntrenorUzmanlikDto>()
                .ForMember(dest => dest.UzmanlikName, opt => opt.MapFrom(src => src.Uzmanlik.Name))
                .ForMember(dest => dest.UzmanlikDescription, opt => opt.MapFrom(src => src.Uzmanlik.Description))
                .ForMember(dest => dest.UzmanlikCategory, opt => opt.MapFrom(src => src.Uzmanlik.Category));
            CreateMap<AntrenorUzmanlikDto, AntrenorUzmanlik>();
            CreateMap<CreateAntrenorUzmanlikDto, AntrenorUzmanlik>();

            // Training mappings
            CreateMap<Egitim, EgitimDto>()
                .ForMember(dest => dest.HasStarted, opt => opt.MapFrom(src => src.Basladi))
                .ForMember(dest => dest.HasEnded, opt => opt.MapFrom(src => src.Bitti))
                .ForMember(dest => dest.IsOngoing, opt => opt.MapFrom(src => src.DevamEdiyor))
                .ForMember(dest => dest.RemainingDays, opt => opt.MapFrom(src => src.KalanGun))
                .ForMember(dest => dest.AvailableSlots, opt => opt.MapFrom(src => src.BosKontenjan))
                .ForMember(dest => dest.IsFull, opt => opt.MapFrom(src => src.Dolu));
            CreateMap<EgitimDto, Egitim>();
            CreateMap<CreateEgitimDto, Egitim>();
            CreateMap<UpdateEgitimDto, Egitim>();

            // TrainingCategory mappings
            CreateMap<EgitimKategori, EgitimKategoriDto>();
            CreateMap<EgitimKategoriDto, EgitimKategori>();
            CreateMap<CreateEgitimKategoriDto, EgitimKategori>();
            CreateMap<UpdateEgitimKategoriDto, EgitimKategori>();

            // TrainingModule mappings
            CreateMap<EgitimModul, EgitimModulDto>();
            CreateMap<EgitimModulDto, EgitimModul>();
            CreateMap<CreateEgitimModulDto, EgitimModul>();
            CreateMap<UpdateEgitimModulDto, EgitimModul>();

            // TrainingContent mappings
            CreateMap<EgitimIcerik, EgitimIcerikDto>();
            CreateMap<EgitimIcerikDto, EgitimIcerik>();
            CreateMap<CreateEgitimIcerikDto, EgitimIcerik>();
            CreateMap<UpdateEgitimIcerikDto, EgitimIcerik>();

            // TrainingRegistration mappings
            CreateMap<EgitimKayit, EgitimKayitDto>()
                .ForMember(dest => dest.AntrenorAdSoyad, opt => opt.MapFrom(src => src.Antrenor.User.FirstName + " " + src.Antrenor.User.LastName))
                .ForMember(dest => dest.EgitimAdi, opt => opt.MapFrom(src => src.Egitim.Name))
                .ForMember(dest => dest.IsCompleted, opt => opt.MapFrom(src => src.Tamamlandi))
                .ForMember(dest => dest.IsInProgress, opt => opt.MapFrom(src => src.DevamEdiyor))
                .ForMember(dest => dest.IsSuccessful, opt => opt.MapFrom(src => src.Basarili))
                .ForMember(dest => dest.RemainingDays, opt => opt.MapFrom(src => src.KalanGun));
            CreateMap<EgitimKayitDto, EgitimKayit>();
            CreateMap<CreateEgitimKayitDto, EgitimKayit>();
            CreateMap<UpdateEgitimKayitDto, EgitimKayit>();

            // TrainingCompletion mappings
            CreateMap<EgitimTamamlama, EgitimTamamlamaDto>()
                .ForMember(dest => dest.IsSuccessful, opt => opt.MapFrom(src => src.Basarili));
            CreateMap<EgitimTamamlamaDto, EgitimTamamlama>();
            CreateMap<CreateEgitimTamamlamaDto, EgitimTamamlama>();
            CreateMap<UpdateEgitimTamamlamaDto, EgitimTamamlama>();

            // TrainingAttendance mappings
            CreateMap<EgitimDevam, EgitimDevamDto>()
                .ForMember(dest => dest.FullDay, opt => opt.MapFrom(src => src.TamGun));
            CreateMap<EgitimDevamDto, EgitimDevam>();
            CreateMap<CreateEgitimDevamDto, EgitimDevam>();
            CreateMap<UpdateEgitimDevamDto, EgitimDevam>();

            // TrainingNote mappings
            CreateMap<EgitimNot, EgitimNotDto>();
            CreateMap<EgitimNotDto, EgitimNot>();
            CreateMap<CreateEgitimNotDto, EgitimNot>();
            CreateMap<UpdateEgitimNotDto, EgitimNot>();

            // Certificate mappings
            CreateMap<Sertifika, SertifikaDto>()
                .ForMember(dest => dest.AntrenorAdSoyad, opt => opt.MapFrom(src => $"{src.Antrenor.User.FirstName} {src.Antrenor.User.LastName}"))
                .ForMember(dest => dest.IsValid, opt => opt.MapFrom(src => src.IsValid))
                .ForMember(dest => dest.IsExpired, opt => opt.MapFrom(src => src.IsExpired))
                .ForMember(dest => dest.DaysUntilExpiry, opt => opt.MapFrom(src => src.DaysUntilExpiry))
                .ForMember(dest => dest.IsExpiringSoon, opt => opt.MapFrom(src => src.IsExpiringSoon));
            CreateMap<SertifikaDto, Sertifika>();
            CreateMap<CreateSertifikaDto, Sertifika>();
            CreateMap<UpdateSertifikaDto, Sertifika>();

            // CertificateUpdate mappings
            CreateMap<SertifikaGuncelleme, SertifikaGuncellemeDto>();
            CreateMap<SertifikaGuncellemeDto, SertifikaGuncelleme>();
            CreateMap<CreateSertifikaGuncellemeDto, SertifikaGuncelleme>();
            CreateMap<UpdateSertifikaGuncellemeDto, SertifikaGuncelleme>();

            // CertificateCategory mappings
            CreateMap<SertifikaKategori, SertifikaKategoriDto>();
            CreateMap<SertifikaKategoriDto, SertifikaKategori>();
            CreateMap<CreateSertifikaKategoriDto, SertifikaKategori>();
            CreateMap<UpdateSertifikaKategoriDto, SertifikaKategori>();

            // Performance mappings
            CreateMap<Performans, PerformansDto>()
                .ForMember(dest => dest.IsExcellent, opt => opt.MapFrom(src => src.IsExcellent))
                .ForMember(dest => dest.IsGood, opt => opt.MapFrom(src => src.IsGood))
                .ForMember(dest => dest.IsAverage, opt => opt.MapFrom(src => src.IsAverage))
                .ForMember(dest => dest.IsBelowAverage, opt => opt.MapFrom(src => src.IsBelowAverage))
                .ForMember(dest => dest.IsPoor, opt => opt.MapFrom(src => src.IsPoor))
                .ForMember(dest => dest.PerformanceCategory, opt => opt.MapFrom(src => src.PerformanceGrade));
            CreateMap<PerformansDto, Performans>();
            CreateMap<CreatePerformansDto, Performans>();
            CreateMap<UpdatePerformansDto, Performans>();

            // PerformancePeriod mappings
            CreateMap<PerformansDonemi, PerformansDonemiDto>()
                .ForMember(dest => dest.IsCurrent, opt => opt.MapFrom(src => src.IsCurrent))
                .ForMember(dest => dest.HasEnded, opt => opt.MapFrom(src => src.HasEnded))
                .ForMember(dest => dest.RemainingDays, opt => opt.MapFrom(src => src.RemainingDays));
            CreateMap<PerformansDonemiDto, PerformansDonemi>();
            CreateMap<CreatePerformansDonemiDto, PerformansDonemi>();
            CreateMap<UpdatePerformansDonemiDto, PerformansDonemi>();

            // PerformanceDetail mappings
            CreateMap<PerformansDetay, PerformansDetayDto>()
                .ForMember(dest => dest.IsSuccessful, opt => opt.MapFrom(src => src.IsSuccessful));
            CreateMap<PerformansDetayDto, PerformansDetay>();
            CreateMap<CreatePerformansDetayDto, PerformansDetay>();
            CreateMap<UpdatePerformansDetayDto, PerformansDetay>();

            // PerformanceCriterion mappings
            CreateMap<PerformansKriter, PerformansKriterDto>();
            CreateMap<PerformansKriterDto, PerformansKriter>();
            CreateMap<CreatePerformansKriterDto, PerformansKriter>();
            CreateMap<UpdatePerformansKriterDto, PerformansKriter>();

            // PerformanceGoal mappings
            CreateMap<PerformansHedef, PerformansHedefDto>()
                .ForMember(dest => dest.IsCompleted, opt => opt.MapFrom(src => src.IsCompleted))
                .ForMember(dest => dest.IsOverdue, opt => opt.MapFrom(src => src.IsOverdue));
            CreateMap<PerformansHedefDto, PerformansHedef>();
            CreateMap<CreatePerformansHedefDto, PerformansHedef>();
            CreateMap<UpdatePerformansHedefDto, PerformansHedef>();

            // AthleteTrainer mappings
            CreateMap<SporcuAntrenor, SporcuAntrenorDto>()
                .ForMember(dest => dest.IsCurrent, opt => opt.MapFrom(src => src.IsCurrent))
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => src.Duration));
            CreateMap<SporcuAntrenorDto, SporcuAntrenor>();
            CreateMap<CreateSporcuAntrenorDto, SporcuAntrenor>();
            CreateMap<UpdateSporcuAntrenorDto, SporcuAntrenor>();

            // AthletePerformance mappings
            CreateMap<SporcuPerformans, SporcuPerformansDto>()
                .ForMember(dest => dest.IsExcellent, opt => opt.MapFrom(src => src.IsExcellent))
                .ForMember(dest => dest.IsGood, opt => opt.MapFrom(src => src.IsGood))
                .ForMember(dest => dest.IsAverage, opt => opt.MapFrom(src => src.IsAverage))
                .ForMember(dest => dest.IsBelowAverage, opt => opt.MapFrom(src => src.IsBelowAverage))
                .ForMember(dest => dest.IsPoor, opt => opt.MapFrom(src => src.IsPoor));
            CreateMap<SporcuPerformansDto, SporcuPerformans>();
            CreateMap<CreateSporcuPerformansDto, SporcuPerformans>();
            CreateMap<UpdateSporcuPerformansDto, SporcuPerformans>();

            // AthleteCompetition mappings
            CreateMap<SporcuYarisma, SporcuYarismaDto>()
                .ForMember(dest => dest.IsWinner, opt => opt.MapFrom(src => src.IsWinner))
                .ForMember(dest => dest.IsMedalist, opt => opt.MapFrom(src => src.IsMedalist))
                .ForMember(dest => dest.IsRecent, opt => opt.MapFrom(src => src.IsRecent));
            CreateMap<SporcuYarismaDto, SporcuYarisma>();
            CreateMap<CreateSporcuYarismaDto, SporcuYarisma>();
            CreateMap<UpdateSporcuYarismaDto, SporcuYarisma>();

            // System mappings
            CreateMap<Log, LogDto>();
            CreateMap<LogDto, Log>();

            // Settings mappings
            CreateMap<Ayarlar, AyarlarDto>();
            CreateMap<AyarlarDto, Ayarlar>();

            // Notification mappings
            CreateMap<Bildirim, BildirimDto>();
            CreateMap<BildirimDto, Bildirim>();

            // Report mappings
            CreateMap<Rapor, RaporDto>();
            CreateMap<RaporDto, Rapor>();
        }
    }
} 