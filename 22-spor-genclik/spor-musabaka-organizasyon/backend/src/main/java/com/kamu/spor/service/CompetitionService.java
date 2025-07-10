package com.kamu.spor.service;

import com.kamu.spor.dto.CompetitionDto;
import com.kamu.spor.model.Competition;
import com.kamu.spor.model.User;
import com.kamu.spor.model.Venue;
import com.kamu.spor.repository.CompetitionRepository;
import com.kamu.spor.repository.UserRepository;
import com.kamu.spor.repository.VenueRepository;
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
public class CompetitionService {
    
    private final CompetitionRepository competitionRepository;
    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    
    public List<CompetitionDto> getAllCompetitions() {
        return competitionRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<CompetitionDto> getCompetitionById(Long id) {
        return competitionRepository.findById(id)
                .map(this::convertToDto);
    }
    
    public List<CompetitionDto> getCompetitionsBySportType(Competition.SportType sportType) {
        return competitionRepository.findBySportType(sportType).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<CompetitionDto> getCompetitionsByStatus(Competition.CompetitionStatus status) {
        return competitionRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<CompetitionDto> getCompetitionsByOrganizer(Long organizerId) {
        return competitionRepository.findByOrganizerId(organizerId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<CompetitionDto> getCompetitionsByVenue(Long venueId) {
        return competitionRepository.findByVenueId(venueId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<CompetitionDto> getUpcomingCompetitions() {
        return competitionRepository.findUpcomingCompetitions(LocalDateTime.now()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<CompetitionDto> getOpenRegistrations() {
        return competitionRepository.findOpenRegistrations(LocalDateTime.now()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<CompetitionDto> searchCompetitionsByKeyword(String keyword) {
        return competitionRepository.findByKeyword(keyword).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public CompetitionDto createCompetition(Competition competition) {
        // Organizatör kontrolü
        if (competition.getOrganizer() != null && competition.getOrganizer().getId() != null) {
            User organizer = userRepository.findById(competition.getOrganizer().getId())
                    .orElseThrow(() -> new RuntimeException("Organizatör bulunamadı: " + competition.getOrganizer().getId()));
            competition.setOrganizer(organizer);
        }
        
        // Tesis kontrolü
        if (competition.getVenue() != null && competition.getVenue().getId() != null) {
            Venue venue = venueRepository.findById(competition.getVenue().getId())
                    .orElseThrow(() -> new RuntimeException("Tesis bulunamadı: " + competition.getVenue().getId()));
            competition.setVenue(venue);
        }
        
        Competition savedCompetition = competitionRepository.save(competition);
        log.info("Yeni müsabaka oluşturuldu: {}", savedCompetition.getName());
        return convertToDto(savedCompetition);
    }
    
    public CompetitionDto updateCompetition(Long id, Competition competitionDetails) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Müsabaka bulunamadı: " + id));
        
        competition.setName(competitionDetails.getName());
        competition.setDescription(competitionDetails.getDescription());
        competition.setSportType(competitionDetails.getSportType());
        competition.setStartDate(competitionDetails.getStartDate());
        competition.setEndDate(competitionDetails.getEndDate());
        competition.setRegistrationDeadline(competitionDetails.getRegistrationDeadline());
        competition.setMaxParticipants(competitionDetails.getMaxParticipants());
        competition.setMinAge(competitionDetails.getMinAge());
        competition.setMaxAge(competitionDetails.getMaxAge());
        competition.setGenderCategory(competitionDetails.getGenderCategory());
        competition.setEntryFee(competitionDetails.getEntryFee());
        competition.setPrizePool(competitionDetails.getPrizePool());
        
        // Organizatör güncelleme
        if (competitionDetails.getOrganizer() != null && competitionDetails.getOrganizer().getId() != null) {
            User organizer = userRepository.findById(competitionDetails.getOrganizer().getId())
                    .orElseThrow(() -> new RuntimeException("Organizatör bulunamadı: " + competitionDetails.getOrganizer().getId()));
            competition.setOrganizer(organizer);
        }
        
        // Tesis güncelleme
        if (competitionDetails.getVenue() != null && competitionDetails.getVenue().getId() != null) {
            Venue venue = venueRepository.findById(competitionDetails.getVenue().getId())
                    .orElseThrow(() -> new RuntimeException("Tesis bulunamadı: " + competitionDetails.getVenue().getId()));
            competition.setVenue(venue);
        }
        
        Competition updatedCompetition = competitionRepository.save(competition);
        log.info("Müsabaka güncellendi: {}", updatedCompetition.getName());
        return convertToDto(updatedCompetition);
    }
    
    public void deleteCompetition(Long id) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Müsabaka bulunamadı: " + id));
        
        competition.setStatus(Competition.CompetitionStatus.CANCELLED);
        competitionRepository.save(competition);
        log.info("Müsabaka iptal edildi: {}", competition.getName());
    }
    
    public void changeCompetitionStatus(Long id, Competition.CompetitionStatus status) {
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Müsabaka bulunamadı: " + id));
        
        competition.setStatus(status);
        competitionRepository.save(competition);
        log.info("Müsabaka durumu değiştirildi: {} -> {}", competition.getName(), status);
    }
    
    private CompetitionDto convertToDto(Competition competition) {
        CompetitionDto dto = new CompetitionDto();
        dto.setId(competition.getId());
        dto.setName(competition.getName());
        dto.setDescription(competition.getDescription());
        dto.setSportType(competition.getSportType());
        dto.setStatus(competition.getStatus());
        dto.setStartDate(competition.getStartDate());
        dto.setEndDate(competition.getEndDate());
        dto.setRegistrationDeadline(competition.getRegistrationDeadline());
        dto.setMaxParticipants(competition.getMaxParticipants());
        dto.setMinAge(competition.getMinAge());
        dto.setMaxAge(competition.getMaxAge());
        dto.setGenderCategory(competition.getGenderCategory());
        dto.setEntryFee(competition.getEntryFee());
        dto.setPrizePool(competition.getPrizePool());
        dto.setCreatedAt(competition.getCreatedAt());
        dto.setUpdatedAt(competition.getUpdatedAt());
        
        if (competition.getVenue() != null) {
            dto.setVenueId(competition.getVenue().getId());
            dto.setVenueName(competition.getVenue().getName());
        }
        
        if (competition.getOrganizer() != null) {
            dto.setOrganizerId(competition.getOrganizer().getId());
            dto.setOrganizerName(competition.getOrganizer().getFirstName() + " " + competition.getOrganizer().getLastName());
        }
        
        return dto;
    }
} 