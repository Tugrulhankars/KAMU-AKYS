package com.kamu.akys.anket.service;

import com.kamu.akys.anket.entity.Question;
import com.kamu.akys.anket.entity.Survey;
import com.kamu.akys.anket.entity.Choice;
import com.kamu.akys.anket.exception.ResourceNotFoundException;
import com.kamu.akys.anket.repository.QuestionRepository;
import com.kamu.akys.anket.repository.SurveyRepository;
import com.kamu.akys.anket.repository.ChoiceRepository;
import com.kamu.akys.anket.controller.QuestionController.CreateQuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SurveyRepository surveyRepository;
    
    @Autowired
    private ChoiceRepository choiceRepository;

    public Question findById(Long questionId) {
        return questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionId));
    }

    public Question addQuestionToSurvey(Long surveyId, CreateQuestionRequest request) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new ResourceNotFoundException("Survey not found with id: " + surveyId));
        
        // Question oluştur
        Question question = new Question();
        question.setQuestionText(request.getQuestionText());
        question.setQuestionType(request.getQuestionType());
        question.setSurvey(survey);
        
        Question savedQuestion = questionRepository.save(question);
        
        // Seçenekleri oluştur
        if ("MULTIPLE_CHOICE".equals(request.getQuestionType())) {
            if (request.getChoices() != null && !request.getChoices().isEmpty()) {
                // Kullanıcının girdiği seçenekleri kullan
                createCustomChoices(savedQuestion, request.getChoices());
            } else {
                // Varsayılan seçenekleri oluştur
                createDefaultChoices(savedQuestion);
            }
        }
        
        return savedQuestion;
    }
    
    // Backward compatibility için eski metod
    public Question addQuestionToSurvey(Long surveyId, Question question) {
        Survey survey = surveyRepository.findById(surveyId)
                .orElseThrow(() -> new ResourceNotFoundException("Survey not found with id: " + surveyId));
        question.setSurvey(survey);
        Question savedQuestion = questionRepository.save(question);
        
        // Eğer çoktan seçmeli soru ise, varsayılan seçenekler oluştur
        if ("MULTIPLE_CHOICE".equals(question.getQuestionType())) {
            createDefaultChoices(savedQuestion);
        }
        
        return savedQuestion;
    }
    
    private void createCustomChoices(Question question, List<String> choiceTexts) {
        List<Choice> choices = new ArrayList<>();
        for (String choiceText : choiceTexts) {
            if (choiceText != null && !choiceText.trim().isEmpty()) {
                Choice choice = new Choice();
                choice.setChoiceText(choiceText.trim());
                choice.setQuestion(question);
                choices.add(choiceRepository.save(choice));
            }
        }
        question.setChoices(choices);
    }
    
    private void createDefaultChoices(Question question) {
        List<String> defaultChoiceTexts = List.of(
            "Seçenek A",
            "Seçenek B", 
            "Seçenek C",
            "Seçenek D"
        );
        createCustomChoices(question, defaultChoiceTexts);
    }

    public void deleteQuestion(Long questionId) {
        if (!questionRepository.existsById(questionId)) {
            throw new ResourceNotFoundException("Question not found with id: " + questionId);
        }
        questionRepository.deleteById(questionId);
    }
} 