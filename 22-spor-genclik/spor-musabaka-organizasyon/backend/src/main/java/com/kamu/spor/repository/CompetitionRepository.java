package com.kamu.spor.repository;

import com.kamu.spor.model.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {
    
    List<Competition> findBySportType(Competition.SportType sportType);
    
    List<Competition> findByStatus(Competition.CompetitionStatus status);
    
    List<Competition> findByOrganizerId(Long organizerId);
    
    List<Competition> findByVenueId(Long venueId);
    
    List<Competition> findByStartDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    List<Competition> findByGenderCategory(Competition.GenderCategory genderCategory);
    
    @Query("SELECT c FROM Competition c WHERE c.startDate >= :currentDate ORDER BY c.startDate ASC")
    List<Competition> findUpcomingCompetitions(@Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT c FROM Competition c WHERE c.registrationDeadline >= :currentDate AND c.status = 'REGISTRATION_OPEN'")
    List<Competition> findOpenRegistrations(@Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT c FROM Competition c WHERE c.name LIKE %:keyword% OR c.description LIKE %:keyword%")
    List<Competition> findByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT c FROM Competition c WHERE c.sportType = :sportType AND c.status = :status")
    List<Competition> findBySportTypeAndStatus(@Param("sportType") Competition.SportType sportType, 
                                              @Param("status") Competition.CompetitionStatus status);
} 