package com.kamu.akys.anket.dto;

import java.util.List;

public class SurveyResponseDto {
    private Long surveyId;
    private List<AnswerDto> answers;

    // Getters and Setters
    public Long getSurveyId() { return surveyId; }
    public void setSurveyId(Long surveyId) { this.surveyId = surveyId; }
    public List<AnswerDto> getAnswers() { return answers; }
    public void setAnswers(List<AnswerDto> answers) { this.answers = answers; }
} 