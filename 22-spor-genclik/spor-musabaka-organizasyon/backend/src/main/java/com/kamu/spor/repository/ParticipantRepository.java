package com.kamu.spor.repository;

import com.kamu.spor.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ParticipantRepository extends JpaRepository<Participant, Long> {
    
    List<Participant> findByCompetitionId(Long competitionId);
    
    List<Participant> findByUserId(Long userId);
    
    List<Participant> findByStatus(Participant.ParticipantStatus status);
    
    List<Participant> findByGender(Participant.Gender gender);
    
    List<Participant> findByClubName(String clubName);
    
    List<Participant> findByPaymentStatus(Boolean paymentStatus);
    
    List<Participant> findByMedicalCertificate(Boolean medicalCertificate);
    
    List<Participant> findByInsuranceStatus(Boolean insuranceStatus);
    
    @Query("SELECT p FROM Participant p WHERE p.competition.id = :competitionId AND p.status = :status")
    List<Participant> findByCompetitionIdAndStatus(@Param("competitionId") Long competitionId, 
                                                  @Param("status") Participant.ParticipantStatus status);
    
    @Query("SELECT p FROM Participant p WHERE p.competition.id = :competitionId AND p.paymentStatus = :paymentStatus")
    List<Participant> findByCompetitionIdAndPaymentStatus(@Param("competitionId") Long competitionId, 
                                                         @Param("paymentStatus") Boolean paymentStatus);
    
    @Query("SELECT p FROM Participant p WHERE p.dateOfBirth BETWEEN :startDate AND :endDate")
    List<Participant> findByDateOfBirthBetween(@Param("startDate") LocalDate startDate, 
                                              @Param("endDate") LocalDate endDate);
    
    @Query("SELECT p FROM Participant p WHERE p.firstName LIKE %:keyword% OR p.lastName LIKE %:keyword% OR p.email LIKE %:keyword%")
    List<Participant> findByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT COUNT(p) FROM Participant p WHERE p.competition.id = :competitionId")
    Long countByCompetitionId(@Param("competitionId") Long competitionId);
    
    @Query("SELECT p FROM Participant p WHERE p.competition.id = :competitionId AND p.gender = :gender")
    List<Participant> findByCompetitionIdAndGender(@Param("competitionId") Long competitionId, 
                                                  @Param("gender") Participant.Gender gender);
} 