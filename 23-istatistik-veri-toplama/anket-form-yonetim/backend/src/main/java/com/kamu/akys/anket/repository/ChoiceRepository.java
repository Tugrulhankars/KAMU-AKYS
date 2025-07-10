package com.kamu.akys.anket.repository;

import com.kamu.akys.anket.entity.Choice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChoiceRepository extends JpaRepository<Choice, Long> {
} 