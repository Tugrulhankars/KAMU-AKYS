package com.kamu.spor.controller;

import com.kamu.spor.dto.CompetitionDto;
import com.kamu.spor.dto.request.CreateCompetitionRequest;
import com.kamu.spor.model.Competition;
import com.kamu.spor.service.CompetitionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/competitions")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Müsabaka Yönetimi", description = "Müsabaka işlemleri için API endpoint'leri")
public class CompetitionController {
    
    private final CompetitionService competitionService;
    
    @GetMapping
    @Operation(summary = "Tüm müsabakaları listele", description = "Sistemdeki tüm müsabakaları getirir")
    public ResponseEntity<List<CompetitionDto>> getAllCompetitions() {
        List<CompetitionDto> competitions = competitionService.getAllCompetitions();
        return ResponseEntity.ok(competitions);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Müsabaka detayı", description = "ID'ye göre müsabaka detayını getirir")
    public ResponseEntity<CompetitionDto> getCompetitionById(@PathVariable Long id) {
        return competitionService.getCompetitionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/sport-type/{sportType}")
    @Operation(summary = "Spor türüne göre müsabakalar", description = "Belirli spor türündeki müsabakaları listeler")
    public ResponseEntity<List<CompetitionDto>> getCompetitionsBySportType(@PathVariable Competition.SportType sportType) {
        List<CompetitionDto> competitions = competitionService.getCompetitionsBySportType(sportType);
        return ResponseEntity.ok(competitions);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Duruma göre müsabakalar", description = "Belirli durumdaki müsabakaları listeler")
    public ResponseEntity<List<CompetitionDto>> getCompetitionsByStatus(@PathVariable Competition.CompetitionStatus status) {
        List<CompetitionDto> competitions = competitionService.getCompetitionsByStatus(status);
        return ResponseEntity.ok(competitions);
    }
    
    @GetMapping("/organizer/{organizerId}")
    @Operation(summary = "Organizatöre göre müsabakalar", description = "Belirli organizatörün müsabakalarını listeler")
    public ResponseEntity<List<CompetitionDto>> getCompetitionsByOrganizer(@PathVariable Long organizerId) {
        List<CompetitionDto> competitions = competitionService.getCompetitionsByOrganizer(organizerId);
        return ResponseEntity.ok(competitions);
    }
    
    @GetMapping("/venue/{venueId}")
    @Operation(summary = "Tesise göre müsabakalar", description = "Belirli tesisteki müsabakaları listeler")
    public ResponseEntity<List<CompetitionDto>> getCompetitionsByVenue(@PathVariable Long venueId) {
        List<CompetitionDto> competitions = competitionService.getCompetitionsByVenue(venueId);
        return ResponseEntity.ok(competitions);
    }
    
    @GetMapping("/upcoming")
    @Operation(summary = "Yaklaşan müsabakalar", description = "Gelecekteki müsabakaları listeler")
    public ResponseEntity<List<CompetitionDto>> getUpcomingCompetitions() {
        List<CompetitionDto> competitions = competitionService.getUpcomingCompetitions();
        return ResponseEntity.ok(competitions);
    }
    
    @GetMapping("/open-registrations")
    @Operation(summary = "Açık kayıtlar", description = "Kayıtları açık olan müsabakaları listeler")
    public ResponseEntity<List<CompetitionDto>> getOpenRegistrations() {
        List<CompetitionDto> competitions = competitionService.getOpenRegistrations();
        return ResponseEntity.ok(competitions);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Müsabaka arama", description = "Anahtar kelimeye göre müsabaka arama")
    public ResponseEntity<List<CompetitionDto>> searchCompetitions(@RequestParam String keyword) {
        List<CompetitionDto> competitions = competitionService.searchCompetitionsByKeyword(keyword);
        return ResponseEntity.ok(competitions);
    }
    
    @PostMapping
    @Operation(summary = "Yeni müsabaka oluştur", description = "Sisteme yeni müsabaka ekler")
    public ResponseEntity<CompetitionDto> createCompetition(@Valid @RequestBody CreateCompetitionRequest request) {
        try {
            Competition competition = request.toCompetition();
            CompetitionDto createdCompetition = competitionService.createCompetition(competition);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCompetition);
        } catch (RuntimeException e) {
            log.error("Müsabaka oluşturma hatası: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Müsabaka güncelle", description = "Mevcut müsabaka bilgilerini günceller")
    public ResponseEntity<CompetitionDto> updateCompetition(@PathVariable Long id, @Valid @RequestBody CreateCompetitionRequest request) {
        try {
            Competition competitionDetails = request.toCompetition();
            CompetitionDto updatedCompetition = competitionService.updateCompetition(id, competitionDetails);
            return ResponseEntity.ok(updatedCompetition);
        } catch (RuntimeException e) {
            log.error("Müsabaka güncelleme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Müsabaka iptal et", description = "Müsabakayı iptal eder")
    public ResponseEntity<Void> deleteCompetition(@PathVariable Long id) {
        try {
            competitionService.deleteCompetition(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            log.error("Müsabaka iptal etme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Müsabaka durumu değiştir", description = "Müsabakanın durumunu günceller")
    public ResponseEntity<Void> changeCompetitionStatus(@PathVariable Long id, @RequestParam Competition.CompetitionStatus status) {
        try {
            competitionService.changeCompetitionStatus(id, status);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Müsabaka durumu değiştirme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
} 