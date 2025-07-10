package com.kamu.akys.anket.controller;

import com.kamu.akys.anket.entity.Choice;
import com.kamu.akys.anket.service.ChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.security.Principal;
import com.kamu.akys.anket.entity.Question;
import com.kamu.akys.anket.service.QuestionService;
import com.kamu.akys.anket.entity.Survey;
import com.kamu.akys.anket.entity.User;
import com.kamu.akys.anket.repository.UserRepository;
import com.kamu.akys.anket.entity.Group;
import com.kamu.akys.anket.entity.GroupMember;
import com.kamu.akys.anket.repository.GroupMemberRepository;

@RestController
@RequestMapping("/api")
public class ChoiceController {

    @Autowired
    private ChoiceService choiceService;
    
    @Autowired
    private QuestionService questionService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @PostMapping("/questions/{questionId}/choices")
    public ResponseEntity<Choice> addChoice(@PathVariable Long questionId, @RequestBody Choice choice, Principal principal) {
        Question question = questionService.findById(questionId);
        Survey survey = question.getSurvey();
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        // Rol kontrol et - sadece ADMIN ve MODERATOR seçenek ekleyebilir
        if (!canModifyChoices(survey, user)) {
            return ResponseEntity.status(403).build();
        }
        
        Choice addedChoice = choiceService.addChoiceToQuestion(questionId, choice);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedChoice);
    }

    @DeleteMapping("/choices/{choiceId}")
    public ResponseEntity<Void> deleteChoice(@PathVariable Long choiceId, Principal principal) {
        Choice choice = choiceService.findById(choiceId);
        Question question = choice.getQuestion();
        Survey survey = question.getSurvey();
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        // Rol kontrol et - sadece ADMIN ve MODERATOR seçenek silebilir
        if (!canModifyChoices(survey, user)) {
            return ResponseEntity.status(403).build();
        }
        
        choiceService.deleteChoice(choiceId);
        return ResponseEntity.noContent().build();
    }
    
    // Yardımcı metod
    private boolean canModifyChoices(Survey survey, User user) {
        if (survey.getGroup() != null) {
            Group group = survey.getGroup();
            // Grup admin'i her şeyi yapabilir
            if (group.getAdmin().getId().equals(user.getId())) {
                return true;
            }
            // Grup moderatörü de seçenek ekleyip silebilir
            GroupMember groupMember = groupMemberRepository.findByGroupAndUser(group, user);
            return groupMember != null && 
                   "APPROVED".equals(groupMember.getStatus()) && 
                   ("ADMIN".equals(groupMember.getRole()) || "MODERATOR".equals(groupMember.getRole()));
        } else {
            // Grup anketi değilse, anket sahibi seçenek ekleyip silebilir
            return survey.getCreatedBy() != null && survey.getCreatedBy().getId().equals(user.getId());
        }
    }
} 