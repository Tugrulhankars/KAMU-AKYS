package com.kamu.spor.dto;

import com.kamu.spor.model.Participant;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantDto {
    
    private Long id;
    private Long competitionId;
    private String competitionName;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String nationality;
    private String clubName;
    private String licenseNumber;
    private Participant.Gender gender;
    private Participant.ParticipantStatus status;
    private LocalDateTime registrationDate;
    private Boolean paymentStatus;
    private Boolean medicalCertificate;
    private Boolean insuranceStatus;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 