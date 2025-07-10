package com.kamu.spor.service;

import com.kamu.spor.dto.ParticipantDto;
import com.kamu.spor.model.Participant;
import com.kamu.spor.model.User;
import com.kamu.spor.repository.ParticipantRepository;
import com.kamu.spor.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ParticipantService {
    
    private final ParticipantRepository participantRepository;
    private final UserRepository userRepository;
    
    public List<ParticipantDto> getAllParticipants() {
        return participantRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<ParticipantDto> getParticipantById(Long id) {
        return participantRepository.findById(id)
                .map(this::convertToDto);
    }
    
    public List<ParticipantDto> getParticipantsByCompetitionId(Long competitionId) {
        return participantRepository.findByCompetitionId(competitionId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByUserId(Long userId) {
        return participantRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByStatus(Participant.ParticipantStatus status) {
        return participantRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByGender(Participant.Gender gender) {
        return participantRepository.findByGender(gender).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByClubName(String clubName) {
        return participantRepository.findByClubName(clubName).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByPaymentStatus(Boolean paymentStatus) {
        return participantRepository.findByPaymentStatus(paymentStatus).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByMedicalCertificate(Boolean medicalCertificate) {
        return participantRepository.findByMedicalCertificate(medicalCertificate).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByInsuranceStatus(Boolean insuranceStatus) {
        return participantRepository.findByInsuranceStatus(insuranceStatus).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByCompetitionIdAndStatus(Long competitionId, Participant.ParticipantStatus status) {
        return participantRepository.findByCompetitionIdAndStatus(competitionId, status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByCompetitionIdAndPaymentStatus(Long competitionId, Boolean paymentStatus) {
        return participantRepository.findByCompetitionIdAndPaymentStatus(competitionId, paymentStatus).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> getParticipantsByDateOfBirthRange(LocalDate startDate, LocalDate endDate) {
        return participantRepository.findByDateOfBirthBetween(startDate, endDate).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<ParticipantDto> searchParticipantsByKeyword(String keyword) {
        return participantRepository.findByKeyword(keyword).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Long getParticipantCountByCompetitionId(Long competitionId) {
        return participantRepository.countByCompetitionId(competitionId);
    }
    
    public List<ParticipantDto> getParticipantsByCompetitionIdAndGender(Long competitionId, Participant.Gender gender) {
        return participantRepository.findByCompetitionIdAndGender(competitionId, gender).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public ParticipantDto createParticipant(Participant participant) {
        // Kullanıcı kontrolü
        if (participant.getUser() != null && participant.getUser().getId() != null) {
            User user = userRepository.findById(participant.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + participant.getUser().getId()));
            participant.setUser(user);
        }
        
        participant.setRegistrationDate(LocalDateTime.now());
        Participant savedParticipant = participantRepository.save(participant);
        log.info("Yeni katılımcı oluşturuldu: {} {}", savedParticipant.getFirstName(), savedParticipant.getLastName());
        return convertToDto(savedParticipant);
    }
    
    public ParticipantDto updateParticipant(Long id, Participant participantDetails) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Katılımcı bulunamadı: " + id));
        
        participant.setFirstName(participantDetails.getFirstName());
        participant.setLastName(participantDetails.getLastName());
        participant.setEmail(participantDetails.getEmail());
        participant.setPhoneNumber(participantDetails.getPhoneNumber());
        participant.setDateOfBirth(participantDetails.getDateOfBirth());
        participant.setNationality(participantDetails.getNationality());
        participant.setClubName(participantDetails.getClubName());
        participant.setLicenseNumber(participantDetails.getLicenseNumber());
        participant.setGender(participantDetails.getGender());
        participant.setStatus(participantDetails.getStatus());
        participant.setPaymentStatus(participantDetails.getPaymentStatus());
        participant.setMedicalCertificate(participantDetails.getMedicalCertificate());
        participant.setInsuranceStatus(participantDetails.getInsuranceStatus());
        participant.setNotes(participantDetails.getNotes());
        
        // Kullanıcı güncelleme
        if (participantDetails.getUser() != null && participantDetails.getUser().getId() != null) {
            User user = userRepository.findById(participantDetails.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı: " + participantDetails.getUser().getId()));
            participant.setUser(user);
        }
        
        Participant updatedParticipant = participantRepository.save(participant);
        log.info("Katılımcı güncellendi: {} {}", updatedParticipant.getFirstName(), updatedParticipant.getLastName());
        return convertToDto(updatedParticipant);
    }
    
    public void deleteParticipant(Long id) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Katılımcı bulunamadı: " + id));
        
        participant.setStatus(Participant.ParticipantStatus.WITHDRAWN);
        participantRepository.save(participant);
        log.info("Katılımcı çekildi: {} {}", participant.getFirstName(), participant.getLastName());
    }
    
    public void changeParticipantStatus(Long id, Participant.ParticipantStatus status) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Katılımcı bulunamadı: " + id));
        
        participant.setStatus(status);
        participantRepository.save(participant);
        log.info("Katılımcı durumu değiştirildi: {} {} -> {}", participant.getFirstName(), participant.getLastName(), status);
    }
    
    public void updatePaymentStatus(Long id, Boolean paymentStatus) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Katılımcı bulunamadı: " + id));
        
        participant.setPaymentStatus(paymentStatus);
        participantRepository.save(participant);
        log.info("Katılımcı ödeme durumu güncellendi: {} {} -> {}", participant.getFirstName(), participant.getLastName(), paymentStatus);
    }
    
    public void updateMedicalCertificateStatus(Long id, Boolean medicalCertificate) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Katılımcı bulunamadı: " + id));
        
        participant.setMedicalCertificate(medicalCertificate);
        participantRepository.save(participant);
        log.info("Katılımcı sağlık raporu durumu güncellendi: {} {} -> {}", participant.getFirstName(), participant.getLastName(), medicalCertificate);
    }
    
    public void updateInsuranceStatus(Long id, Boolean insuranceStatus) {
        Participant participant = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Katılımcı bulunamadı: " + id));
        
        participant.setInsuranceStatus(insuranceStatus);
        participantRepository.save(participant);
        log.info("Katılımcı sigorta durumu güncellendi: {} {} -> {}", participant.getFirstName(), participant.getLastName(), insuranceStatus);
    }
    
    private ParticipantDto convertToDto(Participant participant) {
        ParticipantDto dto = new ParticipantDto();
        dto.setId(participant.getId());
        dto.setFirstName(participant.getFirstName());
        dto.setLastName(participant.getLastName());
        dto.setEmail(participant.getEmail());
        dto.setPhoneNumber(participant.getPhoneNumber());
        dto.setDateOfBirth(participant.getDateOfBirth());
        dto.setNationality(participant.getNationality());
        dto.setClubName(participant.getClubName());
        dto.setLicenseNumber(participant.getLicenseNumber());
        dto.setGender(participant.getGender());
        dto.setStatus(participant.getStatus());
        dto.setRegistrationDate(participant.getRegistrationDate());
        dto.setPaymentStatus(participant.getPaymentStatus());
        dto.setMedicalCertificate(participant.getMedicalCertificate());
        dto.setInsuranceStatus(participant.getInsuranceStatus());
        dto.setNotes(participant.getNotes());
        dto.setCreatedAt(participant.getCreatedAt());
        dto.setUpdatedAt(participant.getUpdatedAt());
        
        if (participant.getCompetition() != null) {
            dto.setCompetitionId(participant.getCompetition().getId());
            dto.setCompetitionName(participant.getCompetition().getName());
        }
        
        if (participant.getUser() != null) {
            dto.setUserId(participant.getUser().getId());
        }
        
        return dto;
    }
} 