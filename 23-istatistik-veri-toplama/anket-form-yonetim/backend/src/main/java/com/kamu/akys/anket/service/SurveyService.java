package com.kamu.akys.anket.service;

import com.kamu.akys.anket.entity.Survey;
import com.kamu.akys.anket.entity.Group;
import com.kamu.akys.anket.entity.User;
import com.kamu.akys.anket.entity.GroupMember;
import com.kamu.akys.anket.exception.ResourceNotFoundException;
import com.kamu.akys.anket.repository.SurveyRepository;
import com.kamu.akys.anket.repository.GroupMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class SurveyService {

    @Autowired
    private SurveyRepository surveyRepository;

    @Autowired
    private GroupMemberRepository groupMemberRepository;

    public List<Survey> findAll() {
        return surveyRepository.findAll();
    }

    public Survey findById(Long id) {
        return surveyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Survey not found with id: " + id));
    }

    public Survey save(Survey survey) {
        return surveyRepository.save(survey);
    }

    public Survey update(Long id, Survey surveyDetails) {
        Survey survey = findById(id);
        survey.setTitle(surveyDetails.getTitle());
        survey.setDescription(surveyDetails.getDescription());
        return surveyRepository.save(survey);
    }

    public void deleteById(Long id) {
        Survey survey = findById(id);
        surveyRepository.delete(survey);
    }

    public List<Survey> findByGroup(Group group) {
        return surveyRepository.findByGroup(group);
    }

    public List<Survey> findSurveysForUser(User user) {
        // Kullanıcının onaylanmış grup üyeliklerini al
        List<GroupMember> userMemberships = groupMemberRepository.findByUserAndStatus(user, "APPROVED");
        
        List<Survey> allSurveys = new ArrayList<>();
        
        // Her grubun anketlerini topla
        for (GroupMember membership : userMemberships) {
            List<Survey> groupSurveys = surveyRepository.findByGroup(membership.getGroup());
            allSurveys.addAll(groupSurveys);
        }
        
        return allSurveys;
    }
} 