package com.kamu.spor.dto;

import com.kamu.spor.model.Match;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MatchDto {
    
    private Long id;
    private Long competitionId;
    private String competitionName;
    private Long participant1Id;
    private String participant1Name;
    private Long participant2Id;
    private String participant2Name;
    private Long refereeId;
    private String refereeName;
    private LocalDateTime matchDate;
    private Integer durationMinutes;
    private Integer scoreParticipant1;
    private Integer scoreParticipant2;
    private Match.MatchStatus status;
    private Integer matchNumber;
    private Integer roundNumber;
    private Integer courtNumber;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 