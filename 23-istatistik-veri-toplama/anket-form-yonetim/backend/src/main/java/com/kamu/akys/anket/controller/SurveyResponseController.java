package com.kamu.akys.anket.controller;

import com.kamu.akys.anket.dto.SurveyResponseDto;
import com.kamu.akys.anket.entity.SurveyResponse;
import com.kamu.akys.anket.entity.User;
import com.kamu.akys.anket.service.SurveyResponseService;
import com.kamu.akys.anket.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/survey-responses")
@Tag(name = "Anket Yanıtları", description = "Anket yanıtları yönetimi")
public class SurveyResponseController {

    @Autowired
    private SurveyResponseService surveyResponseService;
    
    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(summary = "Tüm anket yanıtlarını listele")
    public ResponseEntity<List<SurveyResponse>> getAllSurveyResponses() {
        List<SurveyResponse> responses = surveyResponseService.getAllSurveyResponses();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    @Operation(summary = "ID'ye göre anket yanıtı getir")
    public ResponseEntity<SurveyResponse> getSurveyResponseById(@PathVariable Long id) {
        Optional<SurveyResponse> response = surveyResponseService.getSurveyResponseById(id);
        return response.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/survey/{surveyId}")
    @Operation(summary = "Anket ID'sine göre yanıtları listele")
    public ResponseEntity<List<SurveyResponse>> getSurveyResponsesBySurveyId(@PathVariable Long surveyId) {
        List<SurveyResponse> responses = surveyResponseService.getSurveyResponsesBySurveyId(surveyId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/user")
    @Operation(summary = "Kullanıcının yanıtlarını listele")
    public ResponseEntity<List<SurveyResponse>> getSurveyResponsesByCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        Optional<User> user = userService.findByUsername(username);
        if (user.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        List<SurveyResponse> responses = surveyResponseService.getSurveyResponsesByUserId(user.get().getId());
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    @Operation(summary = "Yeni anket yanıtı gönder")
    public ResponseEntity<SurveyResponse> submitSurveyResponse(@RequestBody SurveyResponseDto responseDto) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            
            Optional<User> user = userService.findByUsername(username);
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            SurveyResponse response = surveyResponseService.submitSurveyResponse(responseDto, user.get().getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Anket yanıtını sil")
    public ResponseEntity<Void> deleteSurveyResponse(@PathVariable Long id) {
        surveyResponseService.deleteSurveyResponse(id);
        return ResponseEntity.noContent().build();
    }
} 