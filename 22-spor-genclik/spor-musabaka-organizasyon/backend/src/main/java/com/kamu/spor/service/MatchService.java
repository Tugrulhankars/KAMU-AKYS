package com.kamu.spor.service;

import com.kamu.spor.dto.MatchDto;
import com.kamu.spor.model.Match;
import com.kamu.spor.model.User;
import com.kamu.spor.repository.MatchRepository;
import com.kamu.spor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MatchService {
    
    private final MatchRepository matchRepository;
    private final UserRepository userRepository;
    
    public List<MatchDto> getAllMatches() {
        return matchRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<MatchDto> getMatchById(Long id) {
        return matchRepository.findById(id)
                .map(this::convertToDto);
    }
    
    public List<MatchDto> getMatchesByCompetitionId(Long competitionId) {
        return matchRepository.findByCompetitionId(competitionId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getMatchesByStatus(Match.MatchStatus status) {
        return matchRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getMatchesByRefereeId(Long refereeId) {
        return matchRepository.findByRefereeId(refereeId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getMatchesByParticipantId(Long participantId) {
        return matchRepository.findByParticipant1IdOrParticipant2Id(participantId, participantId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getMatchesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return matchRepository.findByMatchDateBetween(startDate, endDate).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getMatchesByRoundNumber(Integer roundNumber) {
        return matchRepository.findByRoundNumber(roundNumber).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getMatchesByCourtNumber(Integer courtNumber) {
        return matchRepository.findByCourtNumber(courtNumber).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getMatchesByCompetitionIdAndStatus(Long competitionId, Match.MatchStatus status) {
        return matchRepository.findByCompetitionIdAndStatus(competitionId, status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getUpcomingMatches() {
        return matchRepository.findUpcomingMatches(LocalDateTime.now()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getMatchesByRefereeAndDateRange(Long refereeId, LocalDateTime startDate, LocalDateTime endDate) {
        return matchRepository.findByRefereeAndDateRange(refereeId, startDate, endDate).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<MatchDto> getMatchesByCompetitionAndRound(Long competitionId, Integer roundNumber) {
        return matchRepository.findByCompetitionAndRound(competitionId, roundNumber).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public MatchDto createMatch(Match match) {
        // Hakem kontrolü
        if (match.getReferee() != null && match.getReferee().getId() != null) {
            User referee = userRepository.findById(match.getReferee().getId())
                    .orElseThrow(() -> new RuntimeException("Hakem bulunamadı: " + match.getReferee().getId()));
            match.setReferee(referee);
        }
        
        Match savedMatch = matchRepository.save(match);
        log.info("Yeni maç oluşturuldu: {}", savedMatch.getId());
        return convertToDto(savedMatch);
    }
    
    public MatchDto updateMatch(Long id, Match matchDetails) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Maç bulunamadı: " + id));
        
        match.setMatchDate(matchDetails.getMatchDate());
        match.setDurationMinutes(matchDetails.getDurationMinutes());
        match.setScoreParticipant1(matchDetails.getScoreParticipant1());
        match.setScoreParticipant2(matchDetails.getScoreParticipant2());
        match.setStatus(matchDetails.getStatus());
        match.setMatchNumber(matchDetails.getMatchNumber());
        match.setRoundNumber(matchDetails.getRoundNumber());
        match.setCourtNumber(matchDetails.getCourtNumber());
        match.setNotes(matchDetails.getNotes());
        
        // Hakem güncelleme
        if (matchDetails.getReferee() != null && matchDetails.getReferee().getId() != null) {
            User referee = userRepository.findById(matchDetails.getReferee().getId())
                    .orElseThrow(() -> new RuntimeException("Hakem bulunamadı: " + matchDetails.getReferee().getId()));
            match.setReferee(referee);
        }
        
        Match updatedMatch = matchRepository.save(match);
        log.info("Maç güncellendi: {}", updatedMatch.getId());
        return convertToDto(updatedMatch);
    }
    
    public void deleteMatch(Long id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Maç bulunamadı: " + id));
        
        match.setStatus(Match.MatchStatus.CANCELLED);
        matchRepository.save(match);
        log.info("Maç iptal edildi: {}", match.getId());
    }
    
    public void changeMatchStatus(Long id, Match.MatchStatus status) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Maç bulunamadı: " + id));
        
        match.setStatus(status);
        matchRepository.save(match);
        log.info("Maç durumu değiştirildi: {} -> {}", match.getId(), status);
    }
    
    public void updateMatchScore(Long id, Integer scoreParticipant1, Integer scoreParticipant2) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Maç bulunamadı: " + id));
        
        match.setScoreParticipant1(scoreParticipant1);
        match.setScoreParticipant2(scoreParticipant2);
        matchRepository.save(match);
        log.info("Maç skoru güncellendi: {} - {}:{}", match.getId(), scoreParticipant1, scoreParticipant2);
    }
    
    private MatchDto convertToDto(Match match) {
        MatchDto dto = new MatchDto();
        dto.setId(match.getId());
        dto.setMatchDate(match.getMatchDate());
        dto.setDurationMinutes(match.getDurationMinutes());
        dto.setScoreParticipant1(match.getScoreParticipant1());
        dto.setScoreParticipant2(match.getScoreParticipant2());
        dto.setStatus(match.getStatus());
        dto.setMatchNumber(match.getMatchNumber());
        dto.setRoundNumber(match.getRoundNumber());
        dto.setCourtNumber(match.getCourtNumber());
        dto.setNotes(match.getNotes());
        dto.setCreatedAt(match.getCreatedAt());
        dto.setUpdatedAt(match.getUpdatedAt());
        
        if (match.getCompetition() != null) {
            dto.setCompetitionId(match.getCompetition().getId());
            dto.setCompetitionName(match.getCompetition().getName());
        }
        
        if (match.getParticipant1() != null) {
            dto.setParticipant1Id(match.getParticipant1().getId());
            dto.setParticipant1Name(match.getParticipant1().getFirstName() + " " + match.getParticipant1().getLastName());
        }
        
        if (match.getParticipant2() != null) {
            dto.setParticipant2Id(match.getParticipant2().getId());
            dto.setParticipant2Name(match.getParticipant2().getFirstName() + " " + match.getParticipant2().getLastName());
        }
        
        if (match.getReferee() != null) {
            dto.setRefereeId(match.getReferee().getId());
            dto.setRefereeName(match.getReferee().getFirstName() + " " + match.getReferee().getLastName());
        }
        
        return dto;
    }
} 