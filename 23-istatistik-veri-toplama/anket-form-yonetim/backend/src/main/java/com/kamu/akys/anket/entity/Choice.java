package com.kamu.akys.anket.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "choices")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Choice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String choiceText;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    @JsonBackReference
    private Question question;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getChoiceText() { return choiceText; }
    public void setChoiceText(String choiceText) { this.choiceText = choiceText; }
    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }
    
    // Backward compatibility - getText() metodunu da korun
    public String getText() { return choiceText; }
    public void setText(String text) { this.choiceText = text; }
} 