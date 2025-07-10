package com.kamu.spor.dto;

import com.kamu.spor.model.Competition;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompetitionDto {
    
    private Long id;
    private String name;
    private String description;
    private Competition.SportType sportType;
    private Competition.CompetitionStatus status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime registrationDeadline;
    private Integer maxParticipants;
    private Integer minAge;
    private Integer maxAge;
    private Competition.GenderCategory genderCategory;
    private Double entryFee;
    private Double prizePool;
    private Long venueId;
    private String venueName;
    private Long organizerId;
    private String organizerName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 