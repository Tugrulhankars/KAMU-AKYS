package com.kamu.spor.dto.request;

import com.kamu.spor.model.Competition;
import com.kamu.spor.model.User;
import com.kamu.spor.model.Venue;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateCompetitionRequest {
    
    @NotBlank(message = "Müsabaka adı boş olamaz")
    @Size(max = 200, message = "Müsabaka adı en fazla 200 karakter olabilir")
    private String name;
    
    @Size(max = 1000, message = "Açıklama en fazla 1000 karakter olabilir")
    private String description;
    
    @NotNull(message = "Spor türü seçilmelidir")
    private Competition.SportType sportType;
    
    @NotNull(message = "Başlangıç tarihi belirtilmelidir")
    @Future(message = "Başlangıç tarihi gelecekte olmalıdır")
    private LocalDateTime startDate;
    
    @NotNull(message = "Bitiş tarihi belirtilmelidir")
    @Future(message = "Bitiş tarihi gelecekte olmalıdır")
    private LocalDateTime endDate;
    
    @NotNull(message = "Kayıt son tarihi belirtilmelidir")
    @Future(message = "Kayıt son tarihi gelecekte olmalıdır")
    private LocalDateTime registrationDeadline;
    
    @Min(value = 2, message = "Maksimum katılımcı sayısı en az 2 olmalıdır")
    @Max(value = 1000, message = "Maksimum katılımcı sayısı en fazla 1000 olabilir")
    private Integer maxParticipants;
    
    @Min(value = 0, message = "Minimum yaş 0'dan küçük olamaz")
    @Max(value = 120, message = "Minimum yaş 120'den büyük olamaz")
    private Integer minAge;
    
    @Min(value = 0, message = "Maksimum yaş 0'dan küçük olamaz")
    @Max(value = 120, message = "Maksimum yaş 120'den büyük olamaz")
    private Integer maxAge;
    
    @NotNull(message = "Cinsiyet kategorisi seçilmelidir")
    private Competition.GenderCategory genderCategory;
    
    @DecimalMin(value = "0.0", message = "Kayıt ücreti negatif olamaz")
    private Double entryFee;
    
    @DecimalMin(value = "0.0", message = "Ödül havuzu negatif olamaz")
    private Double prizePool;
    
    private Long venueId;
    private Long organizerId;
    
    public Competition toCompetition() {
        Competition competition = new Competition();
        competition.setName(this.name);
        competition.setDescription(this.description);
        competition.setSportType(this.sportType);
        competition.setStartDate(this.startDate);
        competition.setEndDate(this.endDate);
        competition.setRegistrationDeadline(this.registrationDeadline);
        competition.setMaxParticipants(this.maxParticipants);
        competition.setMinAge(this.minAge);
        competition.setMaxAge(this.maxAge);
        competition.setGenderCategory(this.genderCategory);
        competition.setEntryFee(this.entryFee);
        competition.setPrizePool(this.prizePool);
        
        if (this.venueId != null) {
            Venue venue = new Venue();
            venue.setId(this.venueId);
            competition.setVenue(venue);
        }
        
        if (this.organizerId != null) {
            User organizer = new User();
            organizer.setId(this.organizerId);
            competition.setOrganizer(organizer);
        }
        
        return competition;
    }
} 