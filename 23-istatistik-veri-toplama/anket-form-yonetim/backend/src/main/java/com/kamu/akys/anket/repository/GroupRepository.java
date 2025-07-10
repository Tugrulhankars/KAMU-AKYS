package com.kamu.akys.anket.repository;

import com.kamu.akys.anket.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByJoinKey(String joinKey);
} 