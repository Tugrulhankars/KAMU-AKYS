package com.kamu.akys.anket.service;

import com.kamu.akys.anket.entity.Choice;
import com.kamu.akys.anket.entity.Question;
import com.kamu.akys.anket.exception.ResourceNotFoundException;
import com.kamu.akys.anket.repository.ChoiceRepository;
import com.kamu.akys.anket.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChoiceService {

    @Autowired
    private ChoiceRepository choiceRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public Choice findById(Long choiceId) {
        return choiceRepository.findById(choiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Choice not found with id: " + choiceId));
    }

    public Choice addChoiceToQuestion(Long questionId, Choice choice) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionId));
        choice.setQuestion(question);
        return choiceRepository.save(choice);
    }

    public void deleteChoice(Long choiceId) {
        if (!choiceRepository.existsById(choiceId)) {
            throw new ResourceNotFoundException("Choice not found with id: " + choiceId);
        }
        choiceRepository.deleteById(choiceId);
    }
} 