package com.kamu.spor.service;

import com.kamu.spor.dto.VenueDto;
import com.kamu.spor.model.Venue;
import com.kamu.spor.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VenueService {
    
    private final VenueRepository venueRepository;
    
    public List<VenueDto> getAllVenues() {
        return venueRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<VenueDto> getVenueById(Long id) {
        return venueRepository.findById(id)
                .map(this::convertToDto);
    }
    
    public List<VenueDto> getVenuesByStatus(Venue.VenueStatus status) {
        return venueRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<VenueDto> getVenuesByCity(String city) {
        return venueRepository.findByCity(city).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<VenueDto> getVenuesByIsIndoor(Boolean isIndoor) {
        return venueRepository.findByIsIndoor(isIndoor).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<VenueDto> getVenuesByHasLighting(Boolean hasLighting) {
        return venueRepository.findByHasLighting(hasLighting).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<VenueDto> getVenuesByHasChangingRooms(Boolean hasChangingRooms) {
        return venueRepository.findByHasChangingRooms(hasChangingRooms).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<VenueDto> getVenuesByHasMedicalRoom(Boolean hasMedicalRoom) {
        return venueRepository.findByHasMedicalRoom(hasMedicalRoom).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<VenueDto> getVenuesByMinCapacity(Integer minCapacity) {
        return venueRepository.findByMinCapacity(minCapacity).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<VenueDto> searchVenuesByKeyword(String keyword) {
        return venueRepository.findByKeyword(keyword).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<VenueDto> getVenuesByCityAndStatus(String city, Venue.VenueStatus status) {
        return venueRepository.findByCityAndStatus(city, status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<VenueDto> getVenuesByIndoorAndLighting(Boolean isIndoor, Boolean hasLighting) {
        return venueRepository.findByIndoorAndLighting(isIndoor, hasLighting).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public VenueDto createVenue(Venue venue) {
        Venue savedVenue = venueRepository.save(venue);
        log.info("Yeni tesis oluşturuldu: {}", savedVenue.getName());
        return convertToDto(savedVenue);
    }
    
    public VenueDto updateVenue(Long id, Venue venueDetails) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tesis bulunamadı: " + id));
        
        venue.setName(venueDetails.getName());
        venue.setDescription(venueDetails.getDescription());
        venue.setAddress(venueDetails.getAddress());
        venue.setCity(venueDetails.getCity());
        venue.setPostalCode(venueDetails.getPostalCode());
        venue.setPhoneNumber(venueDetails.getPhoneNumber());
        venue.setEmail(venueDetails.getEmail());
        venue.setCapacity(venueDetails.getCapacity());
        venue.setParkingCapacity(venueDetails.getParkingCapacity());
        venue.setIsIndoor(venueDetails.getIsIndoor());
        venue.setHasLighting(venueDetails.getHasLighting());
        venue.setHasChangingRooms(venueDetails.getHasChangingRooms());
        venue.setHasMedicalRoom(venueDetails.getHasMedicalRoom());
        venue.setStatus(venueDetails.getStatus());
        
        Venue updatedVenue = venueRepository.save(venue);
        log.info("Tesis güncellendi: {}", updatedVenue.getName());
        return convertToDto(updatedVenue);
    }
    
    public void deleteVenue(Long id) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tesis bulunamadı: " + id));
        
        venue.setStatus(Venue.VenueStatus.CLOSED);
        venueRepository.save(venue);
        log.info("Tesis kapatıldı: {}", venue.getName());
    }
    
    public void changeVenueStatus(Long id, Venue.VenueStatus status) {
        Venue venue = venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tesis bulunamadı: " + id));
        
        venue.setStatus(status);
        venueRepository.save(venue);
        log.info("Tesis durumu değiştirildi: {} -> {}", venue.getName(), status);
    }
    
    private VenueDto convertToDto(Venue venue) {
        VenueDto dto = new VenueDto();
        dto.setId(venue.getId());
        dto.setName(venue.getName());
        dto.setDescription(venue.getDescription());
        dto.setAddress(venue.getAddress());
        dto.setCity(venue.getCity());
        dto.setPostalCode(venue.getPostalCode());
        dto.setPhoneNumber(venue.getPhoneNumber());
        dto.setEmail(venue.getEmail());
        dto.setCapacity(venue.getCapacity());
        dto.setParkingCapacity(venue.getParkingCapacity());
        dto.setIsIndoor(venue.getIsIndoor());
        dto.setHasLighting(venue.getHasLighting());
        dto.setHasChangingRooms(venue.getHasChangingRooms());
        dto.setHasMedicalRoom(venue.getHasMedicalRoom());
        dto.setStatus(venue.getStatus());
        dto.setCreatedAt(venue.getCreatedAt());
        dto.setUpdatedAt(venue.getUpdatedAt());
        
        return dto;
    }
} 