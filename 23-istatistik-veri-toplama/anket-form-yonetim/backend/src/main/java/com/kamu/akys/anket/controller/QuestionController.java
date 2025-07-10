package com.kamu.akys.anket.controller;

import com.kamu.akys.anket.entity.Question;
import com.kamu.akys.anket.entity.Choice;
import com.kamu.akys.anket.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import com.kamu.akys.anket.entity.Survey;
import com.kamu.akys.anket.service.SurveyService;
import com.kamu.akys.anket.entity.User;
import com.kamu.akys.anket.repository.UserRepository;
import com.kamu.akys.anket.entity.Group;
import com.kamu.akys.anket.entity.GroupMember;
import com.kamu.akys.anket.repository.GroupMemberRepository;
import java.util.List;

@RestController
@RequestMapping("/api")
public class QuestionController {

    @Autowired
    private QuestionService questionService;
    
    @Autowired
    private SurveyService surveyService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private GroupMemberRepository groupMemberRepository;

    @PostMapping("/surveys/{surveyId}/questions")
    public ResponseEntity<Question> addQuestion(@PathVariable Long surveyId, @RequestBody CreateQuestionRequest request, Principal principal) {
        Survey survey = surveyService.findById(surveyId);
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        // Rol kontrol et - sadece ADMIN ve MODERATOR soru ekleyebilir
        if (!canModifyQuestions(survey, user)) {
            return ResponseEntity.status(403).build();
        }
        
        Question addedQuestion = questionService.addQuestionToSurvey(surveyId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedQuestion);
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long questionId, Principal principal) {
        Question question = questionService.findById(questionId);
        Survey survey = question.getSurvey();
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        
        // Rol kontrol et - sadece ADMIN ve MODERATOR soru silebilir
        if (!canModifyQuestions(survey, user)) {
            return ResponseEntity.status(403).build();
        }
        
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }
    
    // Yardımcı metod
    private boolean canModifyQuestions(Survey survey, User user) {
        if (survey.getGroup() != null) {
            Group group = survey.getGroup();
            // Grup admin'i her şeyi yapabilir
            if (group.getAdmin().getId().equals(user.getId())) {
                return true;
            }
            // Grup moderatörü de soru ekleyip silebilir
            GroupMember groupMember = groupMemberRepository.findByGroupAndUser(group, user);
            return groupMember != null && 
                   "APPROVED".equals(groupMember.getStatus()) && 
                   ("ADMIN".equals(groupMember.getRole()) || "MODERATOR".equals(groupMember.getRole()));
        } else {
            // Grup anketi değilse, anket sahibi soru ekleyip silebilir
            return survey.getCreatedBy() != null && survey.getCreatedBy().getId().equals(user.getId());
        }
    }
    
    // İç sınıf - Soru oluşturma isteği
    public static class CreateQuestionRequest {
        private String questionText;
        private String questionType = "TEXT";
        private List<String> choices;
        
        // Getters and Setters
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public String getQuestionType() { return questionType; }
        public void setQuestionType(String questionType) { this.questionType = questionType; }
        public List<String> getChoices() { return choices; }
        public void setChoices(List<String> choices) { this.choices = choices; }
    }
} 