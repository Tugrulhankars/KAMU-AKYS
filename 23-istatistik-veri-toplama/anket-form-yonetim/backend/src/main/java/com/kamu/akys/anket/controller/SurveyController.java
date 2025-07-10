package com.kamu.akys.anket.controller;

import com.kamu.akys.anket.entity.Survey;
import com.kamu.akys.anket.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.security.Principal;
import com.kamu.akys.anket.entity.Group;
import com.kamu.akys.anket.repository.GroupRepository;
import com.kamu.akys.anket.entity.User;
import com.kamu.akys.anket.repository.UserRepository;
import com.kamu.akys.anket.entity.GroupMember;
import com.kamu.akys.anket.repository.GroupMemberRepository;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/surveys")
public class SurveyController {

    @Autowired
    private SurveyService surveyService;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @GetMapping
    public List<Survey> getAllSurveys(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return surveyService.findSurveysForUser(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getSurveyById(@PathVariable Long id, Principal principal) {
        Survey survey = surveyService.findById(id);
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        Map<String, Object> response = new HashMap<>();
        response.put("survey", survey);
        
        // Eğer anket bir gruba aitse, kullanıcının bu gruptaki rolünü kontrol et
        if (survey.getGroup() != null) {
            Group group = survey.getGroup();
            String userRole = "NONE";
            
            // Grup admin'i mi kontrol et
            if (group.getAdmin().getId().equals(user.getId())) {
                userRole = "ADMIN";
            } else {
                // GroupMember tablosundan rolü al
                GroupMember groupMember = groupMemberRepository.findByGroupAndUser(group, user);
                if (groupMember != null && "APPROVED".equals(groupMember.getStatus())) {
                    userRole = groupMember.getRole();
                }
            }
            
            response.put("userRole", userRole);
            response.put("groupId", group.getId());
        } else {
            // Grup anketi değilse, anket sahibi mi kontrol et
            if (survey.getCreatedBy() != null && survey.getCreatedBy().getId().equals(user.getId())) {
                response.put("userRole", "ADMIN");
            } else {
                response.put("userRole", "VIEWER");
            }
        }
        
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Survey> createSurvey(@RequestBody Survey survey, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        survey.setCreatedBy(user);
        Survey savedSurvey = surveyService.save(survey);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSurvey);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Survey> updateSurvey(@PathVariable Long id, @RequestBody Survey surveyDetails, Principal principal) {
        Survey survey = surveyService.findById(id);
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        // Rol kontrol et - sadece ADMIN ve MODERATOR güncelleyebilir
        if (!canModifySurvey(survey, user)) {
            return ResponseEntity.status(403).build();
        }
        
        Survey updatedSurvey = surveyService.update(id, surveyDetails);
        return ResponseEntity.ok(updatedSurvey);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSurvey(@PathVariable Long id, Principal principal) {
        Survey survey = surveyService.findById(id);
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        // Rol kontrol et - sadece ADMIN silebilir
        if (!canDeleteSurvey(survey, user)) {
            return ResponseEntity.status(403).build();
        }
        
        surveyService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Bir gruba bağlı anket oluşturma (sadece admin ve moderator)
    @PostMapping("/group/{groupId}")
    public ResponseEntity<Survey> createSurveyForGroup(@PathVariable Long groupId, @RequestBody Survey survey, Principal principal) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        // Sadece grup admin'i ve moderatör anket oluşturabilir
        if (!canCreateSurveyInGroup(group, user)) {
            return ResponseEntity.status(403).build();
        }
        
        survey.setGroup(group);
        survey.setCreatedBy(user);
        Survey saved = surveyService.save(survey);
        return ResponseEntity.ok(saved);
    }

    // Bir grubun anketlerini listele (sadece grup üyesi görebilir)
    @GetMapping("/group/{groupId}")
    public ResponseEntity<Map<String, Object>> getSurveysByGroup(@PathVariable Long groupId, Principal principal) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        // Kullanıcının grubundan rolünü belirle
        String userRole = "NONE";
        boolean isAdmin = group.getAdmin().getId().equals(user.getId());
        GroupMember gm = groupMemberRepository.findByGroupAndUser(group, user);
        boolean isApprovedMember = gm != null && "APPROVED".equals(gm.getStatus());
        
        if (isAdmin) {
            userRole = "ADMIN";
        } else if (isApprovedMember) {
            userRole = gm.getRole();
        }
        
        // Erişim kontrolü
        if (!isAdmin && !isApprovedMember) {
            return ResponseEntity.status(403).build();
        }
        
        List<Survey> surveys = surveyService.findByGroup(group);
        
        // Response'a anketler ve kullanıcının rolünü ekle
        Map<String, Object> response = new HashMap<>();
        response.put("surveys", surveys);
        response.put("userRole", userRole);
        response.put("groupId", groupId);
        
        return ResponseEntity.ok(response);
    }
    
    // Yardımcı metodlar
    private boolean canModifySurvey(Survey survey, User user) {
        if (survey.getGroup() != null) {
            Group group = survey.getGroup();
            // Grup admin'i her şeyi yapabilir
            if (group.getAdmin().getId().equals(user.getId())) {
                return true;
            }
            // Grup moderatörü de düzenleyebilir
            GroupMember groupMember = groupMemberRepository.findByGroupAndUser(group, user);
            return groupMember != null && 
                   "APPROVED".equals(groupMember.getStatus()) && 
                   ("ADMIN".equals(groupMember.getRole()) || "MODERATOR".equals(groupMember.getRole()));
        } else {
            // Grup anketi değilse, anket sahibi düzenleyebilir
            return survey.getCreatedBy() != null && survey.getCreatedBy().getId().equals(user.getId());
        }
    }
    
    private boolean canDeleteSurvey(Survey survey, User user) {
        if (survey.getGroup() != null) {
            Group group = survey.getGroup();
            // Sadece grup admin'i silebilir
            return group.getAdmin().getId().equals(user.getId());
        } else {
            // Grup anketi değilse, anket sahibi silebilir
            return survey.getCreatedBy() != null && survey.getCreatedBy().getId().equals(user.getId());
        }
    }
    
    private boolean canCreateSurveyInGroup(Group group, User user) {
        // Grup admin'i her zaman oluşturabilir
        if (group.getAdmin().getId().equals(user.getId())) {
            return true;
        }
        // Grup moderatörü de oluşturabilir
        GroupMember groupMember = groupMemberRepository.findByGroupAndUser(group, user);
        return groupMember != null && 
               "APPROVED".equals(groupMember.getStatus()) && 
               ("ADMIN".equals(groupMember.getRole()) || "MODERATOR".equals(groupMember.getRole()));
    }
} 