package com.kamu.akys.anket.repository;

import com.kamu.akys.anket.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findBySurveyResponseId(Long surveyResponseId);
} 