package com.kamu.spor.repository;

import com.kamu.spor.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    
    List<Match> findByCompetitionId(Long competitionId);
    
    List<Match> findByStatus(Match.MatchStatus status);
    
    List<Match> findByRefereeId(Long refereeId);
    
    List<Match> findByParticipant1IdOrParticipant2Id(Long participant1Id, Long participant2Id);
    
    List<Match> findByMatchDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    List<Match> findByRoundNumber(Integer roundNumber);
    
    List<Match> findByCourtNumber(Integer courtNumber);
    
    @Query("SELECT m FROM Match m WHERE m.competition.id = :competitionId AND m.status = :status")
    List<Match> findByCompetitionIdAndStatus(@Param("competitionId") Long competitionId, 
                                            @Param("status") Match.MatchStatus status);
    
    @Query("SELECT m FROM Match m WHERE m.matchDate >= :currentDate ORDER BY m.matchDate ASC")
    List<Match> findUpcomingMatches(@Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT m FROM Match m WHERE m.referee.id = :refereeId AND m.matchDate BETWEEN :startDate AND :endDate")
    List<Match> findByRefereeAndDateRange(@Param("refereeId") Long refereeId, 
                                         @Param("startDate") LocalDateTime startDate, 
                                         @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT m FROM Match m WHERE m.competition.id = :competitionId AND m.roundNumber = :roundNumber ORDER BY m.matchNumber")
    List<Match> findByCompetitionAndRound(@Param("competitionId") Long competitionId, 
                                         @Param("roundNumber") Integer roundNumber);
} 