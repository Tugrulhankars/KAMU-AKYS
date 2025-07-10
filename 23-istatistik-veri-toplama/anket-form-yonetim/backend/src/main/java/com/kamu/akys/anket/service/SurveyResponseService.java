package com.kamu.akys.anket.service;

import com.kamu.akys.anket.dto.SurveyResponseDto;
import com.kamu.akys.anket.entity.*;
import com.kamu.akys.anket.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SurveyResponseService {
    
    @Autowired
    private SurveyResponseRepository surveyResponseRepository;
    
    @Autowired
    private AnswerRepository answerRepository;
    
    @Autowired
    private SurveyRepository surveyRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private QuestionRepository questionRepository;
    
    @Autowired
    private ChoiceRepository choiceRepository;

    public List<SurveyResponse> getAllSurveyResponses() {
        return surveyResponseRepository.findAll();
    }

    public List<SurveyResponse> getSurveyResponsesBySurveyId(Long surveyId) {
        return surveyResponseRepository.findBySurveyId(surveyId);
    }

    public List<SurveyResponse> getSurveyResponsesByUserId(Long userId) {
        return surveyResponseRepository.findByUserId(userId);
    }

    public Optional<SurveyResponse> getSurveyResponseById(Long id) {
        return surveyResponseRepository.findById(id);
    }

    @Transactional
    public SurveyResponse submitSurveyResponse(SurveyResponseDto responseDto, Long userId) {
        // Kullanıcının daha önce bu anketi yanıtlayıp yanıtlamadığını kontrol et
        if (surveyResponseRepository.existsBySurveyIdAndUserId(responseDto.getSurveyId(), userId)) {
            throw new RuntimeException("Bu anketi daha önce yanıtladınız.");
        }

        // Survey ve User'ı bul
        Survey survey = surveyRepository.findById(responseDto.getSurveyId())
                .orElseThrow(() -> new RuntimeException("Anket bulunamadı"));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        // SurveyResponse oluştur
        SurveyResponse surveyResponse = new SurveyResponse();
        surveyResponse.setSurvey(survey);
        surveyResponse.setUser(user);
        surveyResponse.setSubmittedAt(LocalDateTime.now());
        
        surveyResponse = surveyResponseRepository.save(surveyResponse);

        // Cevapları kaydet
        for (var answerDto : responseDto.getAnswers()) {
            Answer answer = new Answer();
            answer.setSurveyResponse(surveyResponse);
            
            Question question = questionRepository.findById(answerDto.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Soru bulunamadı"));
            answer.setQuestion(question);

            if (answerDto.getChoiceId() != null) {
                Choice choice = choiceRepository.findById(answerDto.getChoiceId())
                        .orElseThrow(() -> new RuntimeException("Seçenek bulunamadı"));
                answer.setSelectedChoice(choice);
            }

            if (answerDto.getTextAnswer() != null && !answerDto.getTextAnswer().trim().isEmpty()) {
                answer.setTextAnswer(answerDto.getTextAnswer());
            }

            answerRepository.save(answer);
        }

        return surveyResponse;
    }

    public void deleteSurveyResponse(Long id) {
        surveyResponseRepository.deleteById(id);
    }
} 