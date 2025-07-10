package com.kamu.spor.controller;

import com.kamu.spor.dto.MatchDto;
import com.kamu.spor.model.Match;
import com.kamu.spor.service.MatchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/matches")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Maç Yönetimi", description = "Maç işlemleri için API endpoint'leri")
public class MatchController {
    
    private final MatchService matchService;
    
    @GetMapping
    @Operation(summary = "Tüm maçları listele", description = "Sistemdeki tüm maçları getirir")
    public ResponseEntity<List<MatchDto>> getAllMatches() {
        List<MatchDto> matches = matchService.getAllMatches();
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Maç detayı", description = "ID'ye göre maç detayını getirir")
    public ResponseEntity<MatchDto> getMatchById(@PathVariable Long id) {
        return matchService.getMatchById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/competition/{competitionId}")
    @Operation(summary = "Müsabakaya göre maçlar", description = "Belirli müsabakadaki maçları listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByCompetitionId(@PathVariable Long competitionId) {
        List<MatchDto> matches = matchService.getMatchesByCompetitionId(competitionId);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Duruma göre maçlar", description = "Belirli durumdaki maçları listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByStatus(@PathVariable Match.MatchStatus status) {
        List<MatchDto> matches = matchService.getMatchesByStatus(status);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/referee/{refereeId}")
    @Operation(summary = "Hakeme göre maçlar", description = "Belirli hakemin maçlarını listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByRefereeId(@PathVariable Long refereeId) {
        List<MatchDto> matches = matchService.getMatchesByRefereeId(refereeId);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/participant/{participantId}")
    @Operation(summary = "Katılımcıya göre maçlar", description = "Belirli katılımcının maçlarını listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByParticipantId(@PathVariable Long participantId) {
        List<MatchDto> matches = matchService.getMatchesByParticipantId(participantId);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/date-range")
    @Operation(summary = "Tarih aralığına göre maçlar", description = "Belirli tarih aralığındaki maçları listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<MatchDto> matches = matchService.getMatchesByDateRange(startDate, endDate);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/round/{roundNumber}")
    @Operation(summary = "Tura göre maçlar", description = "Belirli turdaki maçları listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByRoundNumber(@PathVariable Integer roundNumber) {
        List<MatchDto> matches = matchService.getMatchesByRoundNumber(roundNumber);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/court/{courtNumber}")
    @Operation(summary = "Korta göre maçlar", description = "Belirli korttaki maçları listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByCourtNumber(@PathVariable Integer courtNumber) {
        List<MatchDto> matches = matchService.getMatchesByCourtNumber(courtNumber);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/competition-status")
    @Operation(summary = "Müsabaka ve duruma göre maçlar", description = "Belirli müsabaka ve durumdaki maçları listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByCompetitionIdAndStatus(
            @RequestParam Long competitionId, 
            @RequestParam Match.MatchStatus status) {
        List<MatchDto> matches = matchService.getMatchesByCompetitionIdAndStatus(competitionId, status);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/upcoming")
    @Operation(summary = "Yaklaşan maçlar", description = "Gelecekteki maçları listeler")
    public ResponseEntity<List<MatchDto>> getUpcomingMatches() {
        List<MatchDto> matches = matchService.getUpcomingMatches();
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/referee-date-range")
    @Operation(summary = "Hakem ve tarih aralığına göre maçlar", description = "Belirli hakemin belirli tarih aralığındaki maçlarını listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByRefereeAndDateRange(
            @RequestParam Long refereeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<MatchDto> matches = matchService.getMatchesByRefereeAndDateRange(refereeId, startDate, endDate);
        return ResponseEntity.ok(matches);
    }
    
    @GetMapping("/competition-round")
    @Operation(summary = "Müsabaka ve tura göre maçlar", description = "Belirli müsabaka ve turdaki maçları listeler")
    public ResponseEntity<List<MatchDto>> getMatchesByCompetitionAndRound(
            @RequestParam Long competitionId, 
            @RequestParam Integer roundNumber) {
        List<MatchDto> matches = matchService.getMatchesByCompetitionAndRound(competitionId, roundNumber);
        return ResponseEntity.ok(matches);
    }
    
    @PostMapping
    @Operation(summary = "Yeni maç oluştur", description = "Sisteme yeni maç ekler")
    public ResponseEntity<MatchDto> createMatch(@RequestBody Match match) {
        try {
            MatchDto createdMatch = matchService.createMatch(match);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMatch);
        } catch (RuntimeException e) {
            log.error("Maç oluşturma hatası: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Maç güncelle", description = "Mevcut maç bilgilerini günceller")
    public ResponseEntity<MatchDto> updateMatch(@PathVariable Long id, @RequestBody Match matchDetails) {
        try {
            MatchDto updatedMatch = matchService.updateMatch(id, matchDetails);
            return ResponseEntity.ok(updatedMatch);
        } catch (RuntimeException e) {
            log.error("Maç güncelleme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Maç iptal et", description = "Maçı iptal eder")
    public ResponseEntity<Void> deleteMatch(@PathVariable Long id) {
        try {
            matchService.deleteMatch(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            log.error("Maç iptal etme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Maç durumu değiştir", description = "Maçın durumunu günceller")
    public ResponseEntity<Void> changeMatchStatus(@PathVariable Long id, @RequestParam Match.MatchStatus status) {
        try {
            matchService.changeMatchStatus(id, status);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Maç durumu değiştirme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/score")
    @Operation(summary = "Maç skoru güncelle", description = "Maç skorunu günceller")
    public ResponseEntity<Void> updateMatchScore(
            @PathVariable Long id, 
            @RequestParam Integer scoreParticipant1, 
            @RequestParam Integer scoreParticipant2) {
        try {
            matchService.updateMatchScore(id, scoreParticipant1, scoreParticipant2);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Maç skoru güncelleme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
} 