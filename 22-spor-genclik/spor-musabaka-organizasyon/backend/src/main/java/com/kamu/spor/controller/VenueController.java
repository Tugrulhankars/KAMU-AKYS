package com.kamu.spor.controller;

import com.kamu.spor.dto.VenueDto;
import com.kamu.spor.model.Venue;
import com.kamu.spor.service.VenueService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/venues")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Tesis Yönetimi", description = "Spor tesisi işlemleri için API endpoint'leri")
public class VenueController {
    
    private final VenueService venueService;
    
    @GetMapping
    @Operation(summary = "Tüm tesisleri listele", description = "Sistemdeki tüm spor tesislerini getirir")
    public ResponseEntity<List<VenueDto>> getAllVenues() {
        List<VenueDto> venues = venueService.getAllVenues();
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Tesis detayı", description = "ID'ye göre tesis detayını getirir")
    public ResponseEntity<VenueDto> getVenueById(@PathVariable Long id) {
        return venueService.getVenueById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Duruma göre tesisler", description = "Belirli durumdaki tesisleri listeler")
    public ResponseEntity<List<VenueDto>> getVenuesByStatus(@PathVariable Venue.VenueStatus status) {
        List<VenueDto> venues = venueService.getVenuesByStatus(status);
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/city/{city}")
    @Operation(summary = "Şehre göre tesisler", description = "Belirli şehirdeki tesisleri listeler")
    public ResponseEntity<List<VenueDto>> getVenuesByCity(@PathVariable String city) {
        List<VenueDto> venues = venueService.getVenuesByCity(city);
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/indoor/{isIndoor}")
    @Operation(summary = "Kapalı/Açık tesisler", description = "Kapalı veya açık tesisleri listeler")
    public ResponseEntity<List<VenueDto>> getVenuesByIsIndoor(@PathVariable Boolean isIndoor) {
        List<VenueDto> venues = venueService.getVenuesByIsIndoor(isIndoor);
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/lighting/{hasLighting}")
    @Operation(summary = "Aydınlatmalı tesisler", description = "Aydınlatması olan tesisleri listeler")
    public ResponseEntity<List<VenueDto>> getVenuesByHasLighting(@PathVariable Boolean hasLighting) {
        List<VenueDto> venues = venueService.getVenuesByHasLighting(hasLighting);
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/changing-rooms/{hasChangingRooms}")
    @Operation(summary = "Soyunma odalı tesisler", description = "Soyunma odası olan tesisleri listeler")
    public ResponseEntity<List<VenueDto>> getVenuesByHasChangingRooms(@PathVariable Boolean hasChangingRooms) {
        List<VenueDto> venues = venueService.getVenuesByHasChangingRooms(hasChangingRooms);
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/medical-room/{hasMedicalRoom}")
    @Operation(summary = "Sağlık odalı tesisler", description = "Sağlık odası olan tesisleri listeler")
    public ResponseEntity<List<VenueDto>> getVenuesByHasMedicalRoom(@PathVariable Boolean hasMedicalRoom) {
        List<VenueDto> venues = venueService.getVenuesByHasMedicalRoom(hasMedicalRoom);
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/capacity/{minCapacity}")
    @Operation(summary = "Minimum kapasiteli tesisler", description = "Belirli minimum kapasitedeki tesisleri listeler")
    public ResponseEntity<List<VenueDto>> getVenuesByMinCapacity(@PathVariable Integer minCapacity) {
        List<VenueDto> venues = venueService.getVenuesByMinCapacity(minCapacity);
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Tesis arama", description = "Anahtar kelimeye göre tesis arama")
    public ResponseEntity<List<VenueDto>> searchVenues(@RequestParam String keyword) {
        List<VenueDto> venues = venueService.searchVenuesByKeyword(keyword);
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/city-status")
    @Operation(summary = "Şehir ve duruma göre tesisler", description = "Belirli şehir ve durumdaki tesisleri listeler")
    public ResponseEntity<List<VenueDto>> getVenuesByCityAndStatus(
            @RequestParam String city, 
            @RequestParam Venue.VenueStatus status) {
        List<VenueDto> venues = venueService.getVenuesByCityAndStatus(city, status);
        return ResponseEntity.ok(venues);
    }
    
    @GetMapping("/indoor-lighting")
    @Operation(summary = "Kapalı ve aydınlatmalı tesisler", description = "Kapalı ve aydınlatması olan tesisleri listeler")
    public ResponseEntity<List<VenueDto>> getVenuesByIndoorAndLighting(
            @RequestParam Boolean isIndoor, 
            @RequestParam Boolean hasLighting) {
        List<VenueDto> venues = venueService.getVenuesByIndoorAndLighting(isIndoor, hasLighting);
        return ResponseEntity.ok(venues);
    }
    
    @PostMapping
    @Operation(summary = "Yeni tesis oluştur", description = "Sisteme yeni spor tesisi ekler")
    public ResponseEntity<VenueDto> createVenue(@RequestBody Venue venue) {
        try {
            VenueDto createdVenue = venueService.createVenue(venue);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdVenue);
        } catch (RuntimeException e) {
            log.error("Tesis oluşturma hatası: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Tesis güncelle", description = "Mevcut tesis bilgilerini günceller")
    public ResponseEntity<VenueDto> updateVenue(@PathVariable Long id, @RequestBody Venue venueDetails) {
        try {
            VenueDto updatedVenue = venueService.updateVenue(id, venueDetails);
            return ResponseEntity.ok(updatedVenue);
        } catch (RuntimeException e) {
            log.error("Tesis güncelleme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Tesis kapat", description = "Tesisi kapatır")
    public ResponseEntity<Void> deleteVenue(@PathVariable Long id) {
        try {
            venueService.deleteVenue(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            log.error("Tesis kapatma hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Tesis durumu değiştir", description = "Tesisin durumunu günceller")
    public ResponseEntity<Void> changeVenueStatus(@PathVariable Long id, @RequestParam Venue.VenueStatus status) {
        try {
            venueService.changeVenueStatus(id, status);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Tesis durumu değiştirme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
} 