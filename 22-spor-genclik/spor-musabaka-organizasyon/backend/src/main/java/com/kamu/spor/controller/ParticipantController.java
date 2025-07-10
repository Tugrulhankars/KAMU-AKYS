package com.kamu.spor.controller;

import com.kamu.spor.dto.ParticipantDto;
import com.kamu.spor.model.Participant;
import com.kamu.spor.service.ParticipantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/participants")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Katılımcı Yönetimi", description = "Katılımcı işlemleri için API endpoint'leri")
public class ParticipantController {
    
    private final ParticipantService participantService;
    
    @GetMapping
    @Operation(summary = "Tüm katılımcıları listele", description = "Sistemdeki tüm katılımcıları getirir")
    public ResponseEntity<List<ParticipantDto>> getAllParticipants() {
        List<ParticipantDto> participants = participantService.getAllParticipants();
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Katılımcı detayı", description = "ID'ye göre katılımcı detayını getirir")
    public ResponseEntity<ParticipantDto> getParticipantById(@PathVariable Long id) {
        return participantService.getParticipantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/competition/{competitionId}")
    @Operation(summary = "Müsabakaya göre katılımcılar", description = "Belirli müsabakadaki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByCompetitionId(@PathVariable Long competitionId) {
        List<ParticipantDto> participants = participantService.getParticipantsByCompetitionId(competitionId);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/user/{userId}")
    @Operation(summary = "Kullanıcıya göre katılımcılar", description = "Belirli kullanıcının katılımlarını listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByUserId(@PathVariable Long userId) {
        List<ParticipantDto> participants = participantService.getParticipantsByUserId(userId);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Duruma göre katılımcılar", description = "Belirli durumdaki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByStatus(@PathVariable Participant.ParticipantStatus status) {
        List<ParticipantDto> participants = participantService.getParticipantsByStatus(status);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/gender/{gender}")
    @Operation(summary = "Cinsiyete göre katılımcılar", description = "Belirli cinsiyetteki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByGender(@PathVariable Participant.Gender gender) {
        List<ParticipantDto> participants = participantService.getParticipantsByGender(gender);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/club/{clubName}")
    @Operation(summary = "Kulübe göre katılımcılar", description = "Belirli kulüpteki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByClubName(@PathVariable String clubName) {
        List<ParticipantDto> participants = participantService.getParticipantsByClubName(clubName);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/payment/{paymentStatus}")
    @Operation(summary = "Ödeme durumuna göre katılımcılar", description = "Belirli ödeme durumundaki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByPaymentStatus(@PathVariable Boolean paymentStatus) {
        List<ParticipantDto> participants = participantService.getParticipantsByPaymentStatus(paymentStatus);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/medical/{medicalCertificate}")
    @Operation(summary = "Sağlık raporu durumuna göre katılımcılar", description = "Belirli sağlık raporu durumundaki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByMedicalCertificate(@PathVariable Boolean medicalCertificate) {
        List<ParticipantDto> participants = participantService.getParticipantsByMedicalCertificate(medicalCertificate);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/insurance/{insuranceStatus}")
    @Operation(summary = "Sigorta durumuna göre katılımcılar", description = "Belirli sigorta durumundaki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByInsuranceStatus(@PathVariable Boolean insuranceStatus) {
        List<ParticipantDto> participants = participantService.getParticipantsByInsuranceStatus(insuranceStatus);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/competition-status")
    @Operation(summary = "Müsabaka ve duruma göre katılımcılar", description = "Belirli müsabaka ve durumdaki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByCompetitionIdAndStatus(
            @RequestParam Long competitionId, 
            @RequestParam Participant.ParticipantStatus status) {
        List<ParticipantDto> participants = participantService.getParticipantsByCompetitionIdAndStatus(competitionId, status);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/competition-payment")
    @Operation(summary = "Müsabaka ve ödeme durumuna göre katılımcılar", description = "Belirli müsabaka ve ödeme durumundaki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByCompetitionIdAndPaymentStatus(
            @RequestParam Long competitionId, 
            @RequestParam Boolean paymentStatus) {
        List<ParticipantDto> participants = participantService.getParticipantsByCompetitionIdAndPaymentStatus(competitionId, paymentStatus);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/date-of-birth-range")
    @Operation(summary = "Doğum tarihi aralığına göre katılımcılar", description = "Belirli doğum tarihi aralığındaki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByDateOfBirthRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ParticipantDto> participants = participantService.getParticipantsByDateOfBirthRange(startDate, endDate);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Katılımcı arama", description = "Anahtar kelimeye göre katılımcı arama")
    public ResponseEntity<List<ParticipantDto>> searchParticipants(@RequestParam String keyword) {
        List<ParticipantDto> participants = participantService.searchParticipantsByKeyword(keyword);
        return ResponseEntity.ok(participants);
    }
    
    @GetMapping("/competition/{competitionId}/count")
    @Operation(summary = "Müsabaka katılımcı sayısı", description = "Belirli müsabakadaki katılımcı sayısını getirir")
    public ResponseEntity<Long> getParticipantCountByCompetitionId(@PathVariable Long competitionId) {
        Long count = participantService.getParticipantCountByCompetitionId(competitionId);
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/competition-gender")
    @Operation(summary = "Müsabaka ve cinsiyete göre katılımcılar", description = "Belirli müsabaka ve cinsiyetteki katılımcıları listeler")
    public ResponseEntity<List<ParticipantDto>> getParticipantsByCompetitionIdAndGender(
            @RequestParam Long competitionId, 
            @RequestParam Participant.Gender gender) {
        List<ParticipantDto> participants = participantService.getParticipantsByCompetitionIdAndGender(competitionId, gender);
        return ResponseEntity.ok(participants);
    }
    
    @PostMapping
    @Operation(summary = "Yeni katılımcı oluştur", description = "Sisteme yeni katılımcı ekler")
    public ResponseEntity<ParticipantDto> createParticipant(@RequestBody Participant participant) {
        try {
            ParticipantDto createdParticipant = participantService.createParticipant(participant);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdParticipant);
        } catch (RuntimeException e) {
            log.error("Katılımcı oluşturma hatası: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Katılımcı güncelle", description = "Mevcut katılımcı bilgilerini günceller")
    public ResponseEntity<ParticipantDto> updateParticipant(@PathVariable Long id, @RequestBody Participant participantDetails) {
        try {
            ParticipantDto updatedParticipant = participantService.updateParticipant(id, participantDetails);
            return ResponseEntity.ok(updatedParticipant);
        } catch (RuntimeException e) {
            log.error("Katılımcı güncelleme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Katılımcı çek", description = "Katılımcıyı müsabakadan çeker")
    public ResponseEntity<Void> deleteParticipant(@PathVariable Long id) {
        try {
            participantService.deleteParticipant(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            log.error("Katılımcı çekme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Katılımcı durumu değiştir", description = "Katılımcının durumunu günceller")
    public ResponseEntity<Void> changeParticipantStatus(@PathVariable Long id, @RequestParam Participant.ParticipantStatus status) {
        try {
            participantService.changeParticipantStatus(id, status);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Katılımcı durumu değiştirme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/payment")
    @Operation(summary = "Ödeme durumu güncelle", description = "Katılımcının ödeme durumunu günceller")
    public ResponseEntity<Void> updatePaymentStatus(@PathVariable Long id, @RequestParam Boolean paymentStatus) {
        try {
            participantService.updatePaymentStatus(id, paymentStatus);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Ödeme durumu güncelleme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/medical")
    @Operation(summary = "Sağlık raporu durumu güncelle", description = "Katılımcının sağlık raporu durumunu günceller")
    public ResponseEntity<Void> updateMedicalCertificateStatus(@PathVariable Long id, @RequestParam Boolean medicalCertificate) {
        try {
            participantService.updateMedicalCertificateStatus(id, medicalCertificate);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Sağlık raporu durumu güncelleme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    @PatchMapping("/{id}/insurance")
    @Operation(summary = "Sigorta durumu güncelle", description = "Katılımcının sigorta durumunu günceller")
    public ResponseEntity<Void> updateInsuranceStatus(@PathVariable Long id, @RequestParam Boolean insuranceStatus) {
        try {
            participantService.updateInsuranceStatus(id, insuranceStatus);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Sigorta durumu güncelleme hatası: {}", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
} 