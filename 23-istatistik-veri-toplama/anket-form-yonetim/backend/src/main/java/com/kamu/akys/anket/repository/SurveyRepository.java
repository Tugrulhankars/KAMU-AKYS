package com.kamu.akys.anket.repository;

import com.kamu.akys.anket.entity.Survey;
import com.kamu.akys.anket.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    List<Survey> findByGroup(Group group);
} 